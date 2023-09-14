import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
   
  export function ProfileForm() {
    return (
        <>
            <div className="flex justify-center mt-8 w-full">
                <p className="text-2xl font-semibold font-serif">Hello, Jessie</p>
            </div>
            <div className="mt-10 ml-10">
                <div className="text-blue-gray-600 font-medium">
                    Personal Info
                </div>
                <div className="flex flex-col md:flex-row mt-5">
  <div className="md:w-1/2">
    <div className="mb-4">
      <p className="text-xs text-blue-gray-800">First Name</p>
      <div className="h-10 border-blue-gray-50 border-2 mt-2 rounded-md text-sm ps-10 pt-2">Name</div>
    </div>
    <div className="mb-4">
      <p className="text-xs text-blue-gray-800">Last Name</p>
      <div className="h-10 border-blue-gray-50 border-2 mt-2 rounded-md text-sm ps-10 pt-2">Name</div>
    </div>
    <div className="mb-4">
      <p className="text-xs text-blue-gray-800">Email</p>
      <div className="h-10 border-blue-gray-50 border-2 mt-2 rounded-md text-sm ps-10 pt-2">Email Address</div>
    </div>
  </div>
  <div className="md:w-1/2 md:ml-4">
    <div className="mb-4">
      <p className="text-xs text-blue-gray-800">Phone</p>
      <div className="h-10 border-blue-gray-50 border-2 mt-2 rounded-md text-sm ps-10 pt-2">Phone number</div>
    </div>
    <div className="mb-4">
      <p className="text-xs text-blue-gray-800">Address</p>
      <div className="h-10 border-blue-gray-50 border-2 mt-2 rounded-md text-sm ps-10 pt-2">Address</div>
    </div>
    <div className="flex mt-4 md:mt-10">
      <div><Button className="bg-deep-orange-500">Edit Profile</Button></div>
      <div className="ml-4"><Button className="bg-deep-orange-500">Change Password</Button></div>
    </div>
  </div>
</div>

            </div>
        </>
    );
  }







//   <>
//   <StickyNavbar />
//   <div className="grid grid-cols-1 md:grid-cols-4 mt-5 ">
//     <div className="">
//       <SidebarWithContentSeparator />
//     </div>
//     <div className=" col-span-3">
//       <p className="mt-24 ml-10 font-serif text-3xl  text-deep-orange-900">
//         My Profile
//       </p>
//       <ProfileForm/>
//     </div>
//   </div>
//   <div className="mt-36"> 
//     <FooterWithSocialLinks/>
//   </div>
// </>