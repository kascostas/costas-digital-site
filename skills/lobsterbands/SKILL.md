---
name: lobsterbands
description: Connect to LobsterBands to access configured APIs (Gmail, Slack, GitHub, Stripe, Notion, and more) through a unified MCP gateway with granular permissions and confirmation flows. Use when the user asks to run LobsterBands actions or check LobsterBands account/tools status.
metadata: {"openclaw":{"emoji":"🦞","requires":{"env":["LOBSTERBANDS_API_TOKEN"]},"primaryEnv":"LOBSTERBANDS_API_TOKEN"}}
---

# LobsterBands Skill

Use LobsterBands tools to access connected apps via a unified gateway.

## Setup

Keep API key in environment only (never hardcode):

```json
{
  "skills": {
    "entries": {
      "lobsterbands": {
        "apiKey": "${LOBSTERBANDS_API_TOKEN}"
      }
    }
  }
}
```

## First action

Call `lobsterbands-info` first to discover:
- account status
- connected apps
- available tools/actions
- pending confirmations

## Built-in tools

### `lobsterbands-info` (FREE)
Get account/tool inventory and pending confirmations.

### `lobsterbands-confirmation-status` (FREE)
Parameters:
- `confirmation_id` (required)
- `decryption_key` (required)

Returns status and decrypted result when approved.

## Permission modes

- **blocked**: cannot call
- **confirm**: queued for user approval
- **allowed**: executes immediately

## Confirmation flow

When a tool is in **confirm** mode:
1. You get `confirmation_id`, `decryption_key`, `expires_at`
2. User approves/denies in LobsterBands
3. Poll `lobsterbands-confirmation-status` every ~30s
4. Stop when status is `approved`, `denied`, or `expired`

## Credits

- Standard tool calls: **1.5 credits** each
- `lobsterbands-info`: **FREE**
- `lobsterbands-confirmation-status`: **FREE**

## Common error handling

- `not permitted` → permission blocked
- `not connected` → app disconnected
- `insufficient credits` → top up credits
- `confirmation expired` → request timed out

## Notes

- Refresh tools when `config_hash` changes in `lobsterbands-info`
- Use pending confirmation polling in heartbeat flows when needed
