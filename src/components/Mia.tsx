import { useId } from "react";
export default function Mia({
  className = "",
  pose = "wave",
}: {
  className?: string;
  pose?: "wave" | "read" | "celebrate" | "face";
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={`mia ${className}`}
      viewBox={pose === "face" ? "38 16 180 162" : "0 0 280 280"}
      role="img"
      aria-label="Mia, your friendly cat finance guide"
    >
      <defs>
        <linearGradient id={`fur${id}`} x2="0.3" y2="1">
          <stop stopColor="#f6f7f0" />
          <stop offset="1" stopColor="#dce4d6" />
        </linearGradient>
        <linearGradient id={`green${id}`} x2="1" y2="1">
          <stop stopColor="#87d24e" />
          <stop offset="1" stopColor="#4f9d39" />
        </linearGradient>
      </defs>
      {pose !== "face" && (
        <>
          <ellipse
            cx="142"
            cy="259"
            rx="75"
            ry="10"
            fill="#416834"
            opacity=".09"
          />
          <path
            className="mia-tail"
            d="M183 225q62 11 50-43q-4-14-14-8q-6 5 0 17q8 25-37 15"
            fill="#9eaf9a"
            stroke="#374b36"
            strokeWidth="3"
          />
          <ellipse
            cx="138"
            cy="205"
            rx="55"
            ry="49"
            fill={`url(#fur${id})`}
            stroke="#374b36"
            strokeWidth="3"
          />
          <ellipse cx="137" cy="211" rx="32" ry="32" fill="#fafbf5" />
          <path
            d="M111 239q-22-9-26 5q-4 16 29 13M161 239q24-7 27 7q2 14-31 11"
            fill="#e5ebdf"
            stroke="#374b36"
            strokeWidth="3"
          />
          {pose === "read" ? (
            <>
              <path
                d="M87 201q27-9 51 7q25-17 51-7l-3 42q-26-4-48 9q-24-14-49-10Z"
                fill="#c2e99a"
                stroke="#374b36"
                strokeWidth="3"
              />
              <path d="M138 208v43" stroke="#374b36" strokeWidth="3" />
              <path
                d="m99 213 23 5m-22 5 22 5m32-10 21-6m-21 16 20-5"
                stroke="#6e9c4f"
                strokeWidth="2"
              />
              <ellipse
                cx="91"
                cy="215"
                rx="12"
                ry="8"
                fill="#f4f6ec"
                stroke="#374b36"
                strokeWidth="3"
              />
              <ellipse
                cx="185"
                cy="215"
                rx="12"
                ry="8"
                fill="#f4f6ec"
                stroke="#374b36"
                strokeWidth="3"
              />
            </>
          ) : (
            <>
              <path
                className="mia-wave"
                d="M184 193q21-12 23-38q0-14-12-14q-10 2-9 16q-3 15-14 20"
                fill="#e5ebdf"
                stroke="#374b36"
                strokeWidth="3"
              />
              <path
                d="M90 187q-14 16-4 32q6 8 14 1"
                fill="#e5ebdf"
                stroke="#374b36"
                strokeWidth="3"
              />
            </>
          )}
        </>
      )}
      <path
        d="M66 87 57 29Q60 16 76 27l35 31m55-1 34-31q18-13 20 4l-8 62"
        fill="#a8b8a0"
        stroke="#374b36"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path d="m69 39 6 37 26-13m79 1 28-27-4 42" fill="#e4b1a6" />
      <path
        d="M75 70q16-21 62-21q46 0 66 23q23 23 19 56q-4 41-82 48q-72-2-86-43q-10-34 21-63"
        fill={`url(#fur${id})`}
        stroke="#374b36"
        strokeWidth="3.5"
      />
      <path
        d="M79 119q13-26 41-17q17 8 32 0q30-9 47 18q11 31-17 40q-43 21-85 0q-24-11-18-41"
        fill="#fffef8"
      />
      <path
        d="m122 53 5 13m11-16v15m11-13-2 13"
        stroke="#8c9e82"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <g className="mia-eyes">
        <ellipse cx="106" cy="109" rx="8" ry="12" fill="#293c2c" />
        <ellipse cx="170" cy="109" rx="8" ry="12" fill="#293c2c" />
        <circle cx="109" cy="105" r="2.5" fill="white" />
        <circle cx="173" cy="105" r="2.5" fill="white" />
      </g>
      <path d="m130 126q8-5 16 0l-8 7Z" fill="#b8847c" />
      <path
        d="M138 132q-1 14-14 8m14-8q1 14 14 8"
        fill="none"
        stroke="#374b36"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <ellipse cx="84" cy="131" rx="12" ry="6.5" fill="#edb3a5" opacity=".8" />
      <ellipse cx="192" cy="131" rx="12" ry="6.5" fill="#edb3a5" opacity=".8" />
      <path
        d="m65 120-16-4m17 13-19 1m161-10 18-5m-18 15 20 1"
        stroke="#71816a"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {pose !== "face" && (
        <>
          <path
            d="M94 166q44 18 87-1l-5 16q-38 16-76-1Z"
            fill={`url(#green${id})`}
            stroke="#374b36"
            strokeWidth="2.5"
          />
          <path
            d="m150 182 13 27 16-9-10-24"
            fill="#72ba46"
            stroke="#374b36"
            strokeWidth="2.5"
          />
          <circle
            cx="138"
            cy="181"
            r="10"
            fill="#f5d46b"
            stroke="#977b35"
            strokeWidth="2"
          />
          <text
            x="138"
            y="186"
            fontSize="14"
            fontWeight="800"
            textAnchor="middle"
            fill="#786025"
          >
            ₹
          </text>
        </>
      )}
      {pose === "celebrate" && (
        <g fill="#79bb45">
          <path d="m38 59 4-11 4 11 11 4-11 4-4 11-4-11-11-4Z" />
          <path d="m238 82 3-8 3 8 8 3-8 3-3 8-3-8-8-3Z" />
          <circle cx="62" cy="184" r="4" />
          <circle cx="235" cy="124" r="4" />
        </g>
      )}
    </svg>
  );
}
