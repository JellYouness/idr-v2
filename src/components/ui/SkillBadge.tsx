import type { SkillToolId } from "@/lib/types";

const abbrev: Record<SkillToolId, string> = {
  "after-effects": "Ae",
  premiere: "Pr",
  photoshop: "Ps",
  illustrator: "Ai",
  blender: "B",
};

type SkillBadgeProps = {
  toolId: SkillToolId;
};

export function SkillBadge({ toolId }: SkillBadgeProps) {
  const label = abbrev[toolId];
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center bg-foreground text-[20px] rounded-lg font-bold text-background"
      aria-hidden
    >
      {label}
    </span>
  );
}
