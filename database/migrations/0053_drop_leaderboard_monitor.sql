-- The 4.0 application no longer reads the leaderboard and reset-monitor tables.
-- Keep existing data during this upgrade. Archive or remove it separately only
-- after the site owner has reviewed a database backup and chosen to do so.
SELECT 1;
