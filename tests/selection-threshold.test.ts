// Test that low-scoring articles are not published even when marked selected
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isSelectable, isPoolEligible } from "../packages/backend/src/publication/rules.ts";

describe("isSelectable with score threshold", () => {
  it("blocks selected articles below T1 threshold (60)", () => {
    const result = isSelectable(true, true, "T1", 59, 60);
    assert.equal(result, false, "Score 59 should not be selectable for T1 (threshold 60)");
  });

  it("allows selected articles meeting T1 threshold", () => {
    const result = isSelectable(true, true, "T1", 60, 60);
    assert.equal(result, true, "Score 60 should be selectable for T1 (threshold 60)");
  });

  it("blocks selected articles below T1_5 threshold (65)", () => {
    const result = isSelectable(true, true, "T1_5", 64, 65);
    assert.equal(result, false, "Score 64 should not be selectable for T1_5 (threshold 65)");
  });

  it("allows selected articles meeting T1_5 threshold", () => {
    const result = isSelectable(true, true, "T1_5", 65, 65);
    assert.equal(result, true, "Score 65 should be selectable for T1_5 (threshold 65)");
  });

  it("blocks selected articles below T2 threshold (76)", () => {
    const result = isSelectable(true, true, "T2", 75, 76);
    assert.equal(result, false, "Score 75 should not be selectable for T2 (threshold 76)");
  });

  it("allows selected articles meeting T2 threshold", () => {
    const result = isSelectable(true, true, "T2", 76, 76);
    assert.equal(result, true, "Score 76 should be selectable for T2 (threshold 76)");
  });

  it("blocks when score is null", () => {
    const result = isSelectable(true, true, "T1", null, 60);
    assert.equal(result, false, "Null score should not be selectable");
  });

  it("blocks when threshold is null", () => {
    const result = isSelectable(true, true, "T1", 80, null);
    assert.equal(result, false, "Null threshold should not be selectable");
  });

  it("blocks EXCLUDE_MP tier regardless of score", () => {
    const result = isSelectable(true, true, "EXCLUDE_MP", 100, 60);
    assert.equal(result, false, "EXCLUDE_MP tier should never be selectable");
  });

  it("blocks when not eligible", () => {
    const result = isSelectable(false, true, "T1", 80, 60);
    assert.equal(result, false, "Not eligible should not be selectable");
  });

  it("blocks when judgedSelected is false", () => {
    const result = isSelectable(true, false, "T1", 80, 60);
    assert.equal(result, false, "judgedSelected=false should not be selectable");
  });
});

describe("isPoolEligible with public floor", () => {
  describe("scored sources (T1/T1_5/T2)", () => {
    it("blocks articles below public floor (20)", () => {
      const result = isPoolEligible({
        participationMode: "editorial",
        relevance: "pass",
        title: "Test Title",
        summary: "Test Summary",
        score: 19,
        requiresScoreCheck: true,
        publicFloor: 20,
      });
      assert.equal(result, false, "Score 19 should not be eligible (publicFloor 20)");
    });

    it("allows articles meeting public floor", () => {
      const result = isPoolEligible({
        participationMode: "editorial",
        relevance: "pass",
        title: "Test Title",
        summary: "Test Summary",
        score: 20,
        requiresScoreCheck: true,
        publicFloor: 20,
      });
      assert.equal(result, true, "Score 20 should be eligible (publicFloor 20)");
    });

    it("allows articles above public floor", () => {
      const result = isPoolEligible({
        participationMode: "editorial",
        relevance: "pass",
        title: "Test Title",
        summary: "Test Summary",
        score: 50,
        requiresScoreCheck: true,
        publicFloor: 20,
      });
      assert.equal(result, true, "Score 50 should be eligible (publicFloor 20)");
    });

    it("blocks when score is null", () => {
      const result = isPoolEligible({
        participationMode: "editorial",
        relevance: "pass",
        title: "Test Title",
        summary: "Test Summary",
        score: null,
        requiresScoreCheck: true,
        publicFloor: 20,
      });
      assert.equal(result, false, "Null score should not be eligible for scored sources");
    });
  });

  describe("EXCLUDE_MP and non-scored sources", () => {
    it("allows articles without scores (EXCLUDE_MP)", () => {
      const result = isPoolEligible({
        participationMode: "editorial",
        relevance: "pass",
        title: "Test Title",
        summary: "Test Summary",
        score: null,
        requiresScoreCheck: false,
        publicFloor: 20,
      });
      assert.equal(result, true, "EXCLUDE_MP should be eligible without score");
    });

    it("allows low-scored articles from EXCLUDE_MP", () => {
      const result = isPoolEligible({
        participationMode: "editorial",
        relevance: "pass",
        title: "Test Title",
        summary: "Test Summary",
        score: 10,
        requiresScoreCheck: false,
        publicFloor: 20,
      });
      assert.equal(result, true, "EXCLUDE_MP with low score should still be eligible");
    });
  });

  describe("common eligibility rules", () => {
    it("blocks when relevance is not pass", () => {
      const result = isPoolEligible({
        participationMode: "editorial",
        relevance: "block",
        title: "Test Title",
        summary: "Test Summary",
        score: 50,
        requiresScoreCheck: true,
        publicFloor: 20,
      });
      assert.equal(result, false, "relevance=block should not be eligible");
    });

    it("blocks when title is missing", () => {
      const result = isPoolEligible({
        participationMode: "editorial",
        relevance: "pass",
        title: null,
        summary: "Test Summary",
        score: 50,
        requiresScoreCheck: true,
        publicFloor: 20,
      });
      assert.equal(result, false, "Missing title should not be eligible");
    });

    it("blocks when summary is missing", () => {
      const result = isPoolEligible({
        participationMode: "editorial",
        relevance: "pass",
        title: "Test Title",
        summary: null,
        score: 50,
        requiresScoreCheck: true,
        publicFloor: 20,
      });
      assert.equal(result, false, "Missing summary should not be eligible");
    });
  });
});



