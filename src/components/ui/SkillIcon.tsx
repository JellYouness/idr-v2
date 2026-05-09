import Image from "next/image";
import type { SkillToolId } from "@/lib/types";

const iconSrc: Partial<Record<SkillToolId, string>> = {
  "after-effects": "/icons/aftereffects-svgrepo-com.svg",
  premiere: "/icons/premiere-svgrepo-com.svg",
  photoshop: "/icons/photoshop-svgrepo-com.svg",
  illustrator: "/icons/illustrator-svgrepo-com.svg",
};

type SkillIconProps = {
  toolId: SkillToolId;
  size?: number;
};

function BlenderGlyph({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0 text-accent"
    >
      <path
        d="M12 2L4 6v6c0 4.42 5.37 8.66 8 10 2.63-1.34 8-5.58 8-10V6l-8-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 8v8M8 12h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SkillIcon({ toolId, size = 28 }: SkillIconProps) {
  const src = iconSrc[toolId];
  if (toolId === "blender" || !src) {
    return <BlenderGlyph size={size} />;
  }
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className="shrink-0 opacity-90"
    />
  );
}
