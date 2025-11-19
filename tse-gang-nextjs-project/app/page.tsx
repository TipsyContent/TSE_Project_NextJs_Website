import { TournamentCard } from "@/components/ui/card";
import { NewsCard } from "@/components/ui/newsCard";
import Image from "next/image";
import valPicture from "@/public/63df--valorant-full-review-fantastic-shooter-from-riot.jpeg.webp";


export default function Home() {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <Image
        src={valPicture}
        alt="Valorant Review"
        className="my-2 rounded-lg w-full max-w-2xl h-65 object-cover object-bottom"
      />
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-8 px-16 bg-white dark:bg-black sm:items-start">

       <div className="flex flex-col md:flex-row gap-8 w-full">
        
          <div className="w-3/4 min-h-[400px]">
            <NewsCard />    
          </div>

          <div className="w-3/4 ">
           <TournamentCard />
          </div>
        </div>
      </main>
    </div>
    </div>
  );
}
