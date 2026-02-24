param(
  [Parameter(Mandatory=$true)][string]$Text,
  [string]$ProfileId = "2f62563e-a9fa-45a1-8d84-e489f453070c",
  [string]$ApiBase = "http://127.0.0.1:17493",
  [ValidateSet('en','zh','ja','ko','de','fr','ru','pt','es','it')][string]$Language = "en",
  [ValidateSet('0.6B','1.7B')][string]$ModelSize = "0.6B",
  [string]$OutDir = "$PSScriptRoot\..\.openclaw\voicebox-out"
)

$ErrorActionPreference = 'Stop'

function Invoke-Json($Method, $Uri, $BodyObj=$null) {
  if ($null -eq $BodyObj) {
    return Invoke-RestMethod -Method $Method -Uri $Uri -TimeoutSec 180 -ErrorAction Stop
  }
  $json = $BodyObj | ConvertTo-Json -Depth 8
  return Invoke-RestMethod -Method $Method -Uri $Uri -ContentType 'application/json' -Body $json -TimeoutSec 180 -ErrorAction Stop
}

function Ensure-Dir([string]$Path) {
  if (!(Test-Path $Path)) { New-Item -ItemType Directory -Path $Path | Out-Null }
}

# Ensure output dir
Ensure-Dir $OutDir

# Ensure ffmpeg is reachable (winget alias path fallback)
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  $wg = Join-Path $env:LOCALAPPDATA 'Microsoft\WinGet\Links'
  if (Test-Path (Join-Path $wg 'ffmpeg.exe')) { $env:Path = "$wg;$env:Path" }
}
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  throw "ffmpeg not found in PATH. Install with: winget install --id Gyan.FFmpeg -e"
}

# Health check
$health = Invoke-Json GET "$ApiBase/health"

# Check model status first to avoid noisy API errors
$modelName = if ($ModelSize -eq '0.6B') { 'qwen-tts-0.6B' } else { 'qwen-tts-1.7B' }
$status = Invoke-Json GET "$ApiBase/models/status"
$target = $status.models | Where-Object { $_.model_name -eq $modelName } | Select-Object -First 1
if ($target -and $target.downloading) {
  throw "Voicebox model is downloading ($modelName). Re-run this command in a few minutes."
}
if ($target -and -not $target.downloaded) {
  try { Invoke-Json POST "$ApiBase/models/download" @{ model_name = $modelName } | Out-Null } catch {}
  throw "Voicebox model download started ($modelName). Re-run this command in a few minutes."
}

$payload = @{
  profile_id = $ProfileId
  text = $Text
  language = $Language
  model_size = $ModelSize
}

$gen = Invoke-Json POST "$ApiBase/generate" $payload

if (-not $gen.id) {
  throw "Voicebox generate returned no id."
}

$wavPath = Join-Path $OutDir ("voicebox-{0}.wav" -f $gen.id)
$mp3Path = Join-Path $OutDir ("voicebox-{0}.mp3" -f $gen.id)

Invoke-WebRequest -Uri "$ApiBase/audio/$($gen.id)" -OutFile $wavPath -TimeoutSec 180

# Convert WAV -> MP3 for easier WhatsApp delivery
& ffmpeg -y -i $wavPath -codec:a libmp3lame -q:a 3 $mp3Path | Out-Null

# Return machine-readable JSON
[pscustomobject]@{
  ok = $true
  id = $gen.id
  profile_id = $ProfileId
  audio_wav = $wavPath
  audio_mp3 = $mp3Path
  duration = $gen.duration
} | ConvertTo-Json -Depth 5
