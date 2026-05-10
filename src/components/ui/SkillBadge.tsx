import type { SkillToolId } from "@/lib/types";
import { SkillIcon } from "@/components/ui/SkillIcon";

type SkillBadgeProps = {
  toolId: SkillToolId;
};

export function SkillBadge({ toolId }: SkillBadgeProps) {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg"
      aria-hidden
    >
      <SkillIcon toolId={toolId} size={28} />
    </span>
  );
}
