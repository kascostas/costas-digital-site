# MEMORY.md

## User profile
- User: Costas
- Preferred output rule: never use the em dash character; use normal hyphen.
- Wants completion feedback immediately after requested jobs finish.
- Wants watchdog-style updates for agents (ETA and delay updates).
- Must ask before restarting any worker/sub-agent.

## Operating setup and decisions
- OpenClaw runs in manual-first mode by user preference.
- Mixed manual starts + scheduled service previously caused gateway port conflicts on 18889.
- Stabilization direction: use one gateway run mode consistently.
- Security hardening done for SMTP: password removed from config files and moved to environment variable.

## Messaging and channel context
- WhatsApp is actively used.
- Group access defaults are restrictive (allowlist policies present in config).

## Agent architecture
- Multi-agent setup exists with these agent IDs: main, work, mark, sec, dev, loc, bio, phy, exp.
- `phy` scope: Stavros Physiotherapy operations and growth tasks.
- `exp` scope: Explorer Cyprus Guide operations and growth tasks.
- Mark scope clarified: personal LinkedIn context by default, not Campaign Manager unless explicitly requested.

## Business/workflow memory
- Bio reporting default: send to ckastamoulas@bionic.com.cy from bio@costas.digital unless overridden.
- SMTP alias delivery from bio@costas.digital was validated after Gmail send-as setup.
- LinkedIn draft persistence rule confirmed: upload image -> Next -> Save as draft.

## Health and monitoring history
- Nightly checks were running across Dev, Sec, and Mark roles.
- Noted recurring WhatsApp reconnect loops linked to unstable gateway process ownership during mixed run modes.
- Latest known blocker in prior troubleshooting: process holding port 18889 and scheduled task deletion requiring admin rights.

## Known gaps to keep fixing
- Identity file was never finalized, so assistant name/persona fields remain unset in IDENTITY.md.
- Long-term memory file had been missing before this reconstruction.
- Some earlier sessions had tools available but LobsterBands Gmail actions were not exposed in-session despite token readiness.
