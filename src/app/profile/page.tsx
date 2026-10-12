// "use client";

// import { authClient } from "@/lib/auth-client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// const ProfilePage = () => {
//   const { data: session } = authClient.useSession();
//   const user = session?.user;

//   const [show, setShow] = useState(false);

//   const router = useRouter();
//   const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const newUserData = Object.fromEntries(formData.entries()) as {
//       name: string;
//       image: string;
//     };

//     try {
//       await authClient.updateUser({
//         ...newUserData,
//       });
//       toast.success("✅ প্রোফাইল সফলভাবে আপডেট হয়েছে!");
//     } catch (err) {
//       toast.error("❌ প্রোফাইল আপডেট করতে সমস্যা হয়েছে!");
//     }
//   };

//   const handleShowForm = () => {
//     setShow(!show);
//   };

//   const handleSignOut = async () => {
//     try {
//       const { error } = await authClient.signOut();

//       if (error) {
//         toast.error("❌ সাইন আউট করতে সমস্যা হয়েছে!");
//         return;
//       }

//       toast.success("✅ সফলভাবে সাইন আউট হয়েছে!");

//       router.replace("/");
//       router.refresh();
//     } catch (err) {
//       console.error("Sign out error:", err);
//       toast.error("❌ সাইন আউট করতে সমস্যা হয়েছে!");
//     }
//   };

//   return (
//     <div className="mt-5">
//       <div className="flex flex-col items-center gap-2">
//         <Link href={"/profile"}>
//           <div className="avatar">
//             <div className="ring-primary ring-offset-base-100 w-16 rounded-full ring-2 ring-offset-2">
//               <Image
//                 src={user?.image || "/default-avatar.png"}
//                 alt="User Avatar"
//                 width={64} // এখানে width দিতে হবে
//                 height={64} // height দিতে হবে
//                 className="rounded-full"
//               />
//             </div>
//           </div>
//         </Link>

//         <h2 className="text-lg font-semibold">{user?.name}</h2>
//         <p className="text-sm text-gray-600">{user?.email}</p>

//         {/* Edit Profile Button */}
//         <button
//           onClick={handleShowForm}
//           className="btn bg-green-600 text-white hover:bg-green-700 mt-2"
//         >
//           Edit Profile
//         </button>

//         {/* Sign Out Button */}
//         <button
//           onClick={handleSignOut}
//           className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 transition-colors"
//         >
//           সাইন আউট
//         </button>

//         {/* Update Form */}
//         {show && (
//           <form
//             onSubmit={handleUpdateProfile}
//             className="mt-4 w-full max-w-sm bg-white shadow-md rounded-lg p-4"
//           >
//             <fieldset className="fieldset space-y-3">
//               <label className="label">নাম</label>
//               <input
//                 name="name"
//                 type="text"
//                 className="input w-full border rounded-md px-3 py-2"
//                 placeholder="Name"
//                 defaultValue={user?.name || ""}
//               />

//               <label className="label">Image URL</label>
//               <input
//                 name="image"
//                 type="url"
//                 className="input w-full border rounded-md px-3 py-2"
//                 placeholder="Image"
//                 defaultValue={user?.image || ""}
//               />

//               <button
//                 type="submit"
//                 className="btn w-full bg-red-700 text-white mt-4 hover:bg-red-800"
//               >
//                 Update Profile
//               </button>
//             </fieldset>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("❌ সাইন আউট করতে সমস্যা হয়েছে!");
        return;
      }

      toast.success("✅ সফলভাবে সাইন আউট হয়েছে!");
      router.replace("/"); // Home page এ redirect করবে
      router.refresh();
    } catch (err) {
      toast.error("❌ সাইন আউট করতে সমস্যা হয়েছে!");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <div className="avatar">
        <Image
          src={user?.image || "/default-avatar.png"}
          alt="ইউজার ছবি"
          width={64}
          height={64}
          className="rounded-full object-cover"
        />
      </div>

      <h2 className="text-lg font-semibold">{user?.name}</h2>
      <p className="text-sm text-gray-600">{user?.email}</p>

      {/* তথ্য আপডেট বাটন */}
      <Link
        href="/profile/update"
        className="btn bg-green-600 text-white hover:bg-green-700"
      >
        তথ্য আপডেট করুন
      </Link>

      {/* সাইন আউট বাটন */}
      <button
        onClick={handleSignOut}
        className="btn bg-red-600 text-white hover:bg-red-700 mt-2"
      >
        সাইন আউট
      </button>
    </div>
  );
}
