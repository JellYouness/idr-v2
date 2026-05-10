import Image from "next/image";
import type { SkillToolId } from "@/lib/types";

const iconSrc: Record<SkillToolId, string> = {
  "after-effects": "/icons/aftereffects-svgrepo-com.svg",
  premiere: "/icons/premiere-svgrepo-com.svg",
  photoshop: "/icons/photoshop-svgrepo-com.svg",
  illustrator: "/icons/illustrator-svgrepo-com.svg",
  blender: "/icons/Blender.svg",
};

type SkillIconProps = {
  toolId: SkillToolId;
  size?: number;
};

export function SkillIcon({ toolId, size = 28 }: SkillIconProps) {
  return (
    <Image
      src={iconSrc[toolId]}
      alt=""
      width={size}
      height={size}
      className="shrink-0 object-contain opacity-90"
    />
  );
}
