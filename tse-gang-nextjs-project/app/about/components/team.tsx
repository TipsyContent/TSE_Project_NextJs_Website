import { StaticImageData } from "next/image";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Team({
  teamName,
  teamImgSrc,
  members,
  isLarge = false,
}: {
  teamName: string;
  teamImgSrc: StaticImageData;
  members: string[];
  isLarge?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200">
      <Image
        src={teamImgSrc}
        alt={teamName}
        className={cn("w-16 h-16 rounded-full object-cover", {
          "w-24 h-24": isLarge,
        })}
      />
      <h3 className="text-xl font-semibold">{teamName}</h3>
      <ul className="ml-4 list-disc list-inside">
        {members.map((member) => (
          <li key={member}>{member}</li>
        ))}
      </ul>
    </div>
  );
}
