# CI font regression evidence

21 October 2026 (India). `before/` retains the 48 previously committed reference images. `after/` contains the same six-screen × two-width × two-language × two-theme matrix after the font fix. These are test fixtures, not personal progress. The active regression references remain in `../foundation-redesign/visual-baselines/`.

A minimal Debian container reproduced eight visual failures while 70 functional cases passed. Diffs concentrated on system-font fallbacks: the home asterisk, sparkles, arrow, currency symbols and a few Hindi labels. The cloud machine's larger font collection had hidden the dependency. The app now uses original SVG decorations and explicitly includes its bundled Devanagari font in label/number font stacks.

Reviewed the eight home captures and the changed calculator captures. Only ten of the 48 references changed: eight home images and two English desktop calculator images. The rounded asterisk, arrow and sparkles are deliberately consistent; the rupee shape uses the existing bundled font. No cards, navigation actions, lesson content, calculations or screen hierarchy changed. The other 38 references remain byte-identical. Screenshot tolerances and all accessibility/overflow checks remain unchanged.

Visual critique: the small glyph corrections preserve Mia, spacing and the calm green/white/charcoal hierarchy. Hindi labels and currency marks no longer depend on the machine's installed fonts. Small secondary labels still have the compact density already documented in the foundation review. These images do not establish physical Android performance, TalkBack quality or financial editorial approval.

The cross-environment run also exposed a touch-drag race inside lesson carousels. The scoped range gesture rule changes interaction only; it does not change these images. The regression now checks that dragging a range does not select another concept, in addition to its existing native-swipe and live-amount assertions.

The touch regression now waits for each native snap to finish before taking coordinates or starting another touch. The carousel code is unchanged; the scoped range rule protects horizontal input gestures.
