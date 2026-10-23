# Personal revision plans

23 October 2026. This feature reuses the 18 authored draft lessons; it does not add lessons or claim mastery.

After at least one graded answer, Revise offers a plan of up to 5, 10 or 20 previously attempted questions. A short plan takes one question from each available topic before filling additional places. Within a topic, the player preserves the selected question order. The plan visits topics in sequence, with a worked-example reminder between them.

- **Due now:** questions due today or earlier in IST, oldest first.
- **Needs practice:** questions whose latest scheduled attempt was incorrect (`wrong > 0` and zero successful repetitions). A later correct graded answer removes a question from this view without deleting its mistake history. Optional ungraded retry inside feedback preserves the original result.
- **All learned questions:** all known questions previously attempted, including upcoming reviews. This label does not establish that the learner has mastered them. The surrounding explanation identifies them as questions already tried.
- **Seven-day calendar:** today includes overdue work; later columns show only that exact IST date. Future practice is available early. Every checked answer reschedules that question; dates are not fixed appointments or notifications.

Plans start at the first question rather than repeating the lesson introduction. On completion of each topic, learners revisit its existing notes and worked example, then explicitly save the revision and move to the next topic. Completing the last topic returns to Revise. Individual lesson revision also returns to Revise, rather than unexpectedly starting a new lesson.

Every graded answer and the remaining topics are saved locally. Revise can resume an unfinished plan after closing, reloading, going offline, or returning from a saved topic summary. Starting a new plan asks before replacing the unfinished session. Previously checked answers remain in review history, while the old session's resume position is replaced only after confirmation. There is one suspended session, not multiple parallel session slots.

Revision uses the existing XP and spaced-review rules. It preserves original lesson scores, attempt counts, note cards, personal notes and earned streak protection. It does not mark a new lesson complete or award a new note card. The summary shows topics left for a review, rather than claiming a note card was saved.

## Data compatibility

Progress payload version 3 adds an optional `session.reviewPlan` with remaining `{lessonId, questionIds}` groups, completed-question count and total-question count. Existing per-question answers and single-lesson sessions retain their format. Version 1 and 2 payloads migrate to 3 without deleting user fields. IndexedDB and SQLite table schemas stay at their existing storage version; the version change is inside the saved JSON payload.

Validation rejects malformed groups, duplicate IDs within a group, non-integer/negative counters, inconsistent totals and plans attached to a non-review session. The selection pool ignores retired/unknown questions and wrong lesson mappings rather than opening an empty quiz. Question and lesson IDs remain unchanged. Older builds cannot import a version 3 backup; retain an older backup separately if testing a rollback.

## Validation and limits

Pure tests cover selection, topic diversity, caps, month boundaries, mistake recovery, queue advancement and legacy migrations. Browser tests cover answer → exit → reload → resume → topic summary → reload → next topic, preservation of original scores/notes, replacement confirmation, date/mode controls, and English/Hindi at 360×800 and 1440×900 in light/dark with accessibility and enlarged-text checks. The offline script exercises real previously answered questions, starts a plan and resumes it after an offline reload.

Screenshots and visual critique are in [screens/revision-planner](screens/revision-planner/README.md). Physical Android SQLite recovery, TalkBack pronunciation, novice comprehension and real-device scrolling remain **Not verified**. This is guided repetition, not a cumulative exam, placement result or academic credit.
