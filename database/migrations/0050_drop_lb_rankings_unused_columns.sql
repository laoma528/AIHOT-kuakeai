-- Ranking rows are written and read by run_id, board, model_id, rank, score, coverage and detail only.
-- Nothing writes these five columns any more, and nothing reads their earlier values.
-- Preserve historical ranking details during this upgrade.
SELECT 1;
