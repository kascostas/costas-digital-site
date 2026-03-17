# TODO

## Active
- [ ] Check Google Ads tomorrow and confirm Purchase (Google tag) starts recording conversions and value.
- [ ] Keep daily LinkedIn Cyprus outreach running (10-20/day, stop on limits/challenges).
- [ ] Review LinkedIn invite acceptance rate after 2-3 days and adjust targeting/message if needed.
- [ ] Clean old pending LinkedIn invites older than 14 days.

## Cron inventory
- Nightly Dev Website Health | main | 20 1 * * * | Europe/Bucharest | enabled
- Nightly Sec Security Review | main | 10 3 * * * | Europe/Bucharest | enabled
- Nightly Mark Personal LinkedIn Feedback | main | 40 4 * * * | Europe/Bucharest | enabled
- Morning Mission Control Summary | main | 30 7 * * * | Europe/Bucharest | enabled
- Weekly Mark Content Approval Pack | mark | 0 9 * * 6 | Europe/Bucharest | enabled (last run error: OAuth refresh)
- Daily HP Smart Tank KPI Report | bio | 0 8 * * * | Europe/Nicosia | enabled

## Timezone migration recommendations
- [x] Move Nightly Dev Website Health to Europe/Nicosia.
- [x] Move Nightly Sec Security Review to Europe/Nicosia.
- [x] Move Nightly Mark Personal LinkedIn Feedback to Europe/Nicosia.
- [x] Move Morning Mission Control Summary to Europe/Nicosia.
- [x] Move Weekly Mark Content Approval Pack to Europe/Nicosia.
- [x] Daily HP Smart Tank KPI Report already uses Europe/Nicosia.

## Done
- [x] Fixed HP campaign purchase tracking payload on site (value, currency, transaction_id, item fields).
- [x] Fixed Google Ads Purchase (Google tag) value setting to dynamic conversion value.
- [x] Fixed HP KPI email/report script to stop sending all-N/A placeholders.
