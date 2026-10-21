/** Original decorative vectors keep symbols independent of installed system fonts. */
export default function DecorativeMark({
  kind = "spark",
}: {
  kind?: "burst" | "spark" | "outline" | "arrow";
}) {
  return (
    <svg
      className="decorative-mark"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      {kind === "burst" ? (
        <path
          d="M16 4v8m0 8v8M4 16h8m8 0h8M7.5 7.5l5.7 5.7m5.6 5.6 5.7 5.7m0-17-5.7 5.7m-5.6 5.6-5.7 5.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      ) : kind === "arrow" ? (
        <path
          d="M8 25 24 7M10 7h14v14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M16 3c2.5 8 5 10.5 13 13-8 2.5-10.5 5-13 13C13.5 21 11 18.5 3 16c8-2.5 10.5-5 13-13Z"
          fill={kind === "outline" ? "none" : "currentColor"}
          stroke="currentColor"
          strokeWidth={kind === "outline" ? 1.5 : 0}
        />
      )}
    </svg>
  );
}
