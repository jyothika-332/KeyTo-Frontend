import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export function UserProfile() {
  return (
    <div className="border-2 border-gray-800">
      <div className="mt-8 border-2 border-gray-800">
        <p className="text-2xl font-semibold font-serif">Hello, Jessie</p>
      </div>
      <div className="mt-10 mx-72">
        <div className="text-blue-gray-600 font-medium text-left">Personal Info</div>
        <div className="md:flex-row mt-5">
          <div className="md:w-1/2">
            <div className="mb-4">
              <p className="text-xs text-blue-gray-800 text-left">First Name</p>
              <div className="h-10 border-blue-gray-50 border-2 mt-2 rounded-md text-sm ps-10 pt-2">
                Name
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xs text-blue-gray-800 text-left">Last Name</p>
              <div className="h-10 border-blue-gray-50 border-2 mt-2 rounded-md text-sm ps-10 pt-2">
                Name
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xs text-blue-gray-800 text-left">Email</p>
              <div className="h-10 border-blue-gray-50 border-2 mt-2 rounded-md text-sm ps-10 pt-2">
                Email Address
              </div>
            </div>
            <div className="flex mt-4 md:mt-10">
              <div>
                <Button className="bg-deep-orange-500">Edit Profile</Button>
              </div>
              <div className="ml-4">
                <Button className="bg-deep-orange-500">Change Password</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
