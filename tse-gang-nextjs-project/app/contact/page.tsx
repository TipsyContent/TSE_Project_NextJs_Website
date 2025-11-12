import Link from "next/link";
import FormContacts from "@/components/ui/formContact";

// export default function ContactPage() {
//   return (
    
//     <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-50 px-6 text-center font-sans dark:bg-black">
//       <p className="text-gray-700 dark:text-gray-200">
//       <FormContacts></FormContacts>
//         Before you reach out, feel free to review how we look after your data:
//       </p>
//       <Link
//         href="/privacy"
//         className="text-base font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
//       >
//         Privacy Policy
//       </Link>
//     </div>
//   );
// }

// export default function ContactPage() {
//   return (
//     <div className="min-h-screen bg-zinc-50 px-6 py-12 font-sans dark:bg-black">
//       <div className="mx-auto max-w-6xl">
//         <FormContacts />
        
//         <div className="mt-8 text-center">
//           <p className="text-gray-700 dark:text-gray-200">
//             Before you reach out, feel free to review how we look after your data:
//           </p>
//           <Link
//             href="/privacy"
//             className="text-base font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
//           >
//             Privacy Policy
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ContactPage() {
//   return (
//     <div className="min-h-screen bg-zinc-50 px-6 py-12 font-sans dark:bg-black">
//       <FormContacts />
      
//       <div className="mt-8 text-center">
//         <p className="text-gray-700 dark:text-gray-200">
//           Before you reach out, feel free to review how we look after your data:
//         </p>
//         <Link
//           href="/privacy"
//           className="text-base font-medium text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
//         >
//           Privacy Policy
//         </Link>
//       </div>
//     </div>
//   );
// }

export default function ContactPage() {
  return (
   <div className="min-h-screen bg-white font-sans dark:bg-black">
      {/* Contact Form - hvid baggrund */}
      <div className="px-6 pt-6">
        <FormContacts />
      </div>
      
      {/* Privacy Policy section - GRÅ BAGGRUND */}
      <div className="mt-12 bg-zinc-50 px-6 py-8 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-gray-700 dark:text-gray-200">
            Before you reach out, feel free to review how we look after your data:
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