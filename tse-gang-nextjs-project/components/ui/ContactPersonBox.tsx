import Image from "next/image";

interface ContactPersonBoxProps {
  name: string;
  role: string;
  image?: string;
  email?: string;
  phone?: string;
}

const defaultImage = "/TSE_PLACEHOLDER.png"

export default function ContactPersonBox({ name, role, image = defaultImage,email, phone, }: ContactPersonBoxProps) {
    return (
    <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-md dark:bg-zinc-900">
      <div className="relative h-16 w-16 overflow-hidden rounded-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">{name}</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{role}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{email}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{phone}</p>
        
      </div>
    </div>
  );
}
