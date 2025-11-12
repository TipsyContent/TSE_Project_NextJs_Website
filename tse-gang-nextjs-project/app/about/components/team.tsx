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
  members: { name: string; link: string }[];
  isLarge?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 border-b border-gray-200 text-center">
      <Image
        src={teamImgSrc}
        alt={teamName}
        className={cn("w-23 h-23 rounded-full object-cover", {
          "w-34 h-34": isLarge,
        })}
      />
      <h3 className="text-xl font-semibold">{teamName}</h3>
      <div className="flex flex-col items-center">
        <ul className="list-disc list-inside">
          {members.map((member) => (
            <li className="list-none" key={member.name}>
              <a
                href={member.link}
                className="text-gray-900 hover:text-red-600 transition-colors"
              >
                {member.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="my-2"></div>
    </div>
  );
}
