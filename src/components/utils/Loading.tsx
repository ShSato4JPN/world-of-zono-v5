"use client";

import TextType from "../bits-ui/TextType";

export default function Loading() {
  return (
    <div className="grid place-items-center">
      <TextType
        text={["Loading......."]}
        className="text-xl"
        typingSpeed={75}
        pauseDuration={1500}
        showCursor
        cursorCharacter="_"
        deletingSpeed={50}
        cursorBlinkDuration={0.5}
      />
    </div>
  );
}
