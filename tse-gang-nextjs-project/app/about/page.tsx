import { AboutSocials } from "@/app/about/components/socials";
import TSElogo from "@/public/TSEgoodSize.png";
import TSXlogo from "@/public/TSX_Logo_Border4xx.png";
import TSAlogo from "@/public/TSA_Logo_Border4xA.png";
import valPicture from "@/public/63df--valorant-full-review-fantastic-shooter-from-riot.jpeg.webp";
import Image from "next/image";
import { Team } from "./components/team";
export default function About() {
  return (
    <div className="flex flex-col items-center text-center p-10">
      <h1 className="text-3xl font-bold">About Us</h1>
      <Image
        src={valPicture}
        alt="Valorant Review"
        className="my-6 rounded-lg w-full max-w-2xl h-65 object-cover object-bottom my-1"
      />
      <div className="mt-4 max-w-2xl text-lg">
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          consectetur eveniet, provident a quam dolorem consequatur incidunt rem
          nobis inventore impedit odio vitae omnis esse, voluptatem quis modi
          temporibus ut animi expedita. Ducimus odit ea nisi unde, ut doloribus,
          quasi molestiae voluptatibus, modi accusantium in tempora quas.
          Repudiandae enim eos voluptas quis doloremque expedita vitae nobis,
          accusantium pariatur dolore? Maiores pariatur praesentium accusantium
          nesciunt porro, accusamus sit quo doloremque est a impedit sequi
          ratione doloribus facilis sapiente quam tempora voluptas ab!
          Voluptates, illo placeat modi nostrum vel expedita labore, suscipit
          voluptas, molestias excepturi numquam. Culpa modi eos autem quis
          quidem!
        </p>
      </div>
      <div className="my-3"></div>

      <hr className="w-100 border-t-1 border-gray-300 my-4 mx-auto" />

      <h2 className="text-2xl font-semibold mt-8">Our teams</h2>

      <div className="flex justify-center z-10">
        <Team
          teamName="TSX"
          teamImgSrc={TSXlogo}
          members={[
            { name: "gina", link: "#" },
            { name: "CJAM", link: "#" },
            { name: "tåfis", link: "#" },
            { name: "kevin", link: "#" },
            { name: "pelle", link: "#" },
          ]}
        />
        <Team
          teamName="TSE"
          teamImgSrc={TSElogo}
          members={[
            { name: "gina", link: "#" },
            { name: "CJAM", link: "#" },
            { name: "tåfis", link: "#" },
            { name: "kevin", link: "#" },
            { name: "pelle", link: "#" },
          ]}
          isLarge={true}
        />

        <Team
          teamName="TSA"
          teamImgSrc={TSAlogo}
          members={[
            { name: "gina", link: "#" },
            { name: "CJAM", link: "#" },
            { name: "tåfis", link: "#" },
            { name: "kevin", link: "#" },
            { name: "pelle", link: "#" },
          ]}
        />
      </div>

      <h2 className="text-2xl font-semibold mt-8">Join our community</h2>

      <AboutSocials />
    </div>
  );
}
