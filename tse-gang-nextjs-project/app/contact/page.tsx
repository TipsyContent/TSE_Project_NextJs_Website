import Image from "next/image";
import Link from "next/link";
import FormContacts from "@/components/ui/formContact";
import ContactPersonBox from "@/components/ui/ContactPersonBox";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white font-sans dark:bg-black">
      <div className="px-1 pt-1">
        <FormContacts />
      </div>

      <hr></hr>
      <div className="contactContainer px-6 py-8">
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
      <hr></hr>

      <div className="mt-12 bg-zinc-50 px-6 py-8 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-gray-700 dark:text-gray-200">
            Before you reach out, feel free to review how we look after your
            data:
          </p>
          <Link
            href="/privacy"
            className="mt-2 inline-block text-base font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
