import Image from "next/image";
//test
export default function About() {
  return (
    <div className="flex items-center justify-center p-10 bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold">About Us</h1>
        <div className="mt-4 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
          <p>We are TSE and stuff and we play Valorant.</p>
        </div>
      </div>
    </div>
  );
}
