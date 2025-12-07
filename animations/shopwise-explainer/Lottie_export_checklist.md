# Lottie / After Effects Export Checklist

Steps to create a Lottie JSON from the prototype:

1. Open After Effects and create a new project with composition size matching target (e.g., 1280x720, 30fps).
2. Import the AE-ready SVGs in `animations/shopwise-explainer/assets/`:
   - `rohan-layered.svg` (contains groups: `head`, `torso`, `left_arm`, `right_arm`, `phone`)
   - `phone-layered.svg` (groups: `phone_shell`, `phone_screen`, `phone_button`)
   - `icons-refined.svg` (use individual symbols as separate layers)
3. Right-click imported SVGs -> select 'Create Shapes from Vector Layer' for Bodymovin compatibility.
4. Recreate the timeline frames (0:00–0:30) inside AE using shape layers and keyframes:
   - Scene 1: animate icons as small shape layers that scale/fade and move; animate Rohan arm wipe.
   - Scene 2: animate logo drop (position) and icons fade out; transition to phone mockup.
   - Scene 3: animate text typing using text animator or mask reveal.
   - Scene 4: animate rows and slide-in coupon/card shapes; animate price number changes via keyframed text.
   - Scene 5: scale/highlight lowest price row and show badge.
   - Scene 6: animate final CTA button pulse and stars fade-in.
5. Keep all elements vector/shape layers — avoid layer styles that Lottie doesn't support (no 3D, no unsupported effects).
6. Install Bodymovin (Lottie) AE plugin and export:
   - Window -> Extensions -> Bodymovin
   - Select composition -> Destination folder -> Render
7. Test the output Lottie JSON in LottieFiles or a player; adjust AE animations to be Lottie-friendly.

Notes:
- Complex particle systems and some effects (e.g., advanced blur) may not translate; recreate with shape animations instead.
- Keep fonts readable; consider converting text to shapes where necessary.
