#!/usr/bin/env node
// Revalidate all public articles against current thresholds.
// Articles below publicFloor (30) will be removed from pool (eligible=false) but detail pages remain.
// Articles below selection threshold will be removed from selected set but stay in pool.
import { sql } from "../packages/backend/src/db.ts";
import { publishArticle } from "../packages/backend/src/publication/publish.ts";
import { SELECTION } from "../industry/selection.ts";

const DRY_RUN = process.argv.includes("--dry-run");

async function main() {
  console.log(DRY_RUN ? "DRY RUN: no changes will be made\n" : "REVALIDATING public articles\n");
  console.log(`Thresholds:`);
  console.log(`  Public floor (for scored sources): ${SELECTION.publicFloor}`);
  console.log(`  Selection: T1=${SELECTION.thresholds.T1}, T1_5=${SELECTION.thresholds.T1_5}, T2=${SELECTION.thresholds.T2}`);
  console.log(`  EXCLUDE_MP and non-scored tiers: not subject to public floor\n`);

  // Find all currently eligible or selected articles
  const rows = await sql<Array<{
    article_id: string;
    score: number | null;
    tier: string;
    threshold: number | null;
    title: string;
    source_name: string;
    eligible: boolean;
    selected: boolean;
  }>>`
    SELECT
      p.article_id,
      p.score,
      s.tier,
      CASE
        WHEN s.tier = 'T1' THEN 60
        WHEN s.tier = 'T1_5' THEN 65
        WHEN s.tier = 'T2' THEN 76
        ELSE NULL
      END as threshold,
      p.title,
      s.name as source_name,
      p.eligible,
      p.selected
    FROM publications p
    JOIN sources s ON s.id = p.source_id
    WHERE (p.eligible = true OR p.selected = true)
      AND p.visibility = 'public'
    ORDER BY p.score ASC NULLS FIRST
  `;

  console.log(`Found ${rows.length} public articles (eligible or selected)\n`);

  let belowPublicFloor = 0;
  let belowSelectionThreshold = 0;
  let nullScore = 0;
  let willUpdate = 0;

  for (const row of rows) {
    const isScored = row.tier !== "EXCLUDE_MP" && row.threshold !== null;

    if (row.score === null && isScored) {
      nullScore++;
      console.log(`⚠️  ${row.article_id} - null score (${row.tier}) - ${row.title.slice(0, 60)}`);
      willUpdate++;
      continue;
    }

    // Check public floor (30) - only for scored sources
    if (isScored && row.score !== null && row.score < SELECTION.publicFloor) {
      belowPublicFloor++;
      console.log(`🚫 ${row.article_id} - score ${row.score} < public floor ${SELECTION.publicFloor} (${row.tier}) - will be removed from pool - ${row.title.slice(0, 60)}`);
      willUpdate++;
      continue;
    }

    // Check selection threshold (only if currently selected)
    if (row.selected && row.threshold !== null && row.score !== null && row.score < row.threshold) {
      belowSelectionThreshold++;
      console.log(`❌ ${row.article_id} - score ${row.score} < threshold ${row.threshold} (${row.tier}) - will be deselected - ${row.title.slice(0, 60)}`);
      willUpdate++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Total public: ${rows.length}`);
  console.log(`   Below public floor (will be removed from pool, detail page remains): ${belowPublicFloor}`);
  console.log(`   Below selection threshold (will be deselected): ${belowSelectionThreshold}`);
  console.log(`   Null score for scored sources: ${nullScore}`);
  console.log(`   Total will update: ${willUpdate}`);

  if (willUpdate === 0) {
    console.log("\n✅ All articles meet current thresholds!");
    return;
  }

  if (DRY_RUN) {
    console.log("\n🔍 DRY RUN complete. Run without --dry-run to apply changes.");
    return;
  }

  console.log("\n🔄 Republishing articles to apply new thresholds...");

  let processed = 0;
  let removedFromPool = 0;
  let deselected = 0;

  for (const row of rows) {
    const isScored = row.tier !== "EXCLUDE_MP" && row.threshold !== null;
    const shouldUpdate =
      (isScored && row.score === null) ||
      (isScored && row.score !== null && row.score < SELECTION.publicFloor) ||
      (row.selected && row.threshold !== null && row.score !== null && row.score < row.threshold);

    if (!shouldUpdate) continue;

    const result = await publishArticle(row.article_id);
    processed++;

    if (result) {
      if (!result.selected && row.selected) {
        deselected++;
        console.log(`  ✓ ${row.article_id} deselected`);
      }
      if (!result.changed) {
        // No change means it was already in the correct state
      } else if (row.eligible && isScored && row.score !== null && row.score < SELECTION.publicFloor) {
        removedFromPool++;
      }
    }

    if (processed % 10 === 0) {
      console.log(`  ... ${processed}/${willUpdate} processed`);
    }
  }

  console.log(`\n✅ Complete: ${deselected} deselected, ${removedFromPool} removed from pool (detail pages remain)`);
}

main()
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  })
  .finally(() => sql.end());
