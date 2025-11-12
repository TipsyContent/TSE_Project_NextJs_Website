import { AboutSocials } from "@/app/about/components/socials";
import TSElogo from "@/public/TSE_Logo_Border4x.png";
import TSXlogo from "@/public/TSX_Logo_Border4xx.png";
import TSAlogo from "@/public/TSA_Logo_Border4xA.png";
import Image from "next/image";
import { Team } from "./components/team";
export default function About() {
  return (
    <div className="flex flex-col items-center text-center p-10">
      <h1 className="text-3xl font-bold">About Us</h1>
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

      <Team
        teamName="TSE"
        teamImgSrc={TSElogo}
        members={["gina <3", "jib"]}
        isLarge
      />
      <Team teamName="TSX" teamImgSrc={TSXlogo} members={["gina <3", "jib"]} />
      <Team
        teamName="TSA"
        teamImgSrc={TSAlogo}
        members={["gina <3", "CJAM <3"]}
      />

      <h2 className="text-2xl font-semibold mt-8">Join our community</h2>

      <AboutSocials />
    </div>
  );
}
