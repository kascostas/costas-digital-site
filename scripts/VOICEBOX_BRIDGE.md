# Voicebox → WhatsApp Bridge (OpenClaw workspace)

This script generates speech with your local Voicebox server and outputs an MP3 path you can send as WhatsApp media.

## Script

`scripts/voicebox_bridge.ps1`

## Usage

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\voicebox_bridge.ps1 `
  -Text "System online. Gideon test." `
  -ProfileId "2f62563e-a9fa-45a1-8d84-e489f453070c" `
  -ModelSize "0.6B"
```

It returns JSON with `audio_mp3`.

## Notes

- Requires Voicebox local API on `http://127.0.0.1:17493`
- Requires ffmpeg (`winget install --id Gyan.FFmpeg -e`)
- First run may fail with `model is downloading` — rerun after download completes.

## Optional: trigger model download manually

```powershell
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:17493/models/download -ContentType 'application/json' -Body '{"model_name":"qwen-tts-0.6B"}'
```
