#!/usr/bin/env bash
set -e
# Generate voiceover WAVs for each subtitle line using macOS `say` (if available)
OUT_DIR="$(dirname "$0")/../animations/shopwise-explainer/audio"
mkdir -p "$OUT_DIR"

declare -a LINES=(
  "Tired of checking ten different apps for the best price?"
  "Meet ShopWise. One App. Every Deal."
  "Just search for your gadget..."
  "We auto-apply coupons and bank offers for you."
  "Guaranteed lowest price. Instantly."
  "Shop smarter. Download ShopWise today."
)

INDEX=1
for text in "${LINES[@]}"; do
  filename="$OUT_DIR/voice_$INDEX.wav"
  if command -v say >/dev/null 2>&1; then
    say -v "Samantha" -o "$filename" --data-format=LEF32@22050 "$text"
  else
    # fallback: generate silence placeholder
    ffmpeg -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=22050 -t 2 -q:a 9 -y "$filename"
  fi
  INDEX=$((INDEX+1))
done

echo "Voiceover files in $OUT_DIR"
