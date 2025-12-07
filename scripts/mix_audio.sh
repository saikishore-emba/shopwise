#!/usr/bin/env bash
set -e
OUT_DIR="$(dirname "$0")/../animations/shopwise-explainer/audio"
mkdir -p "$OUT_DIR"

# Create simple background music (ambient pad + soft beat) using ffmpeg lavfi
BG="$OUT_DIR/background.wav"
ffmpeg -y -f lavfi -i "sine=frequency=220:duration=30:sample_rate=44100" -af "volume=0.05,asetrate=44100*1" "$BG"

# Concatenate voice files in order into a single voice track
VOICE_LIST="$OUT_DIR/voice_files.txt"
ls $OUT_DIR/voice_*.wav | sort > $VOICE_LIST

VOICE_COMBINED="$OUT_DIR/voice_combined.wav"
ffmpeg -y -f concat -safe 0 -i <(for f in $(cat $VOICE_LIST); do echo "file '$PWD/$f'"; done) -c copy "$VOICE_COMBINED"

# Mix voice over background, voice at 0dB, bg at -12dB
FINAL="$OUT_DIR/final_mix.wav"
ffmpeg -y -i "$BG" -i "$VOICE_COMBINED" -filter_complex "[0:a]volume=0.2[a0];[1:a]volume=1.0[a1];[a0][a1]amix=inputs=2:duration=longest" -c:a pcm_s16le "$FINAL"

echo "Final mixed audio: $FINAL"
