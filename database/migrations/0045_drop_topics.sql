-- Topics are read from the industry pack (industry/topics.json); the copy the database kept is no longer
-- read by anything.
-- Preserve existing topic rows during this upgrade; the 4.0 app reads industry/topics.json.
SELECT 1;
