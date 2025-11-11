import ContactPersonBox from "@/components/ui/ContactPersonBox";
//test
export default function Test() {
  return (
    <div className="contactContainer flex ">
        <div className="flex flex-row items-center justify-center gap-6 bg-white font-sans dark:bg-black">
        <ContactPersonBox
            name="Bobby"
            role="Staff"
            email="test@test.com"
            phone="20020202"
            //image=""
        />
        <ContactPersonBox
            name="Flexer"
            role="MVP"
            email="test@test.com"
            phone="20020202"
            //image=""
        />
                <ContactPersonBox
            name="Flexer"
            role="MVP"
            email="test@test.com"
            phone="20020202"
            //image=""
        />
        </div>
    </div>
  );
}
