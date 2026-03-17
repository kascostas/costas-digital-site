# HEARTBEAT.md

# Active checks

- LinkedIn post monitoring (Costas profile)
  - Check at heartbeat time if a new post was published in the last 24h.
  - If yes, collect latest: reactions, comments, reposts, impressions.
  - Send an update only when metrics changed since last check.
  - If no change, stay quiet.

- Quiet hours
  - Do not send non-urgent updates between 23:00 and 08:00 Europe/Bucharest.

- State tracking
  - Persist last seen post metrics in `memory/heartbeat-state.json` under `linkedin`.

- LinkedIn connection outreach (Cyprus)
  - Run once per day between 10:00 and 18:00 Europe/Bucharest.
  - Send a safe batch of 10-20 connection requests to relevant Cyprus profiles (retail, sales, marketing, business).
  - Stop immediately if LinkedIn shows verification, challenge, or invitation limit warnings.
  - Send an update after execution with exact sent count and names.
  - Track progress in `memory/heartbeat-state.json` under `linkedinOutreach` (date, sentCount, lastNames).
