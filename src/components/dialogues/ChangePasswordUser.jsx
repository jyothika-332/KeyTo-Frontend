import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
 
export function ChangePasswordUser() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
 
  return (
    <>
      <Button className="bg-deep-orange-500" onClick={handleOpen}>Change Password</Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
            <Typography variant="h5" className="text-deep-orange-900 text-center mt-10">
              Change Password
            </Typography>
          <CardBody className="flex flex-col gap-4 mt-5">
            <Input label="Current Password" size="lg" type="password"/>
            <Input label="New Password" size="lg" type="password"/>
            <Input label="Confirm Password" size="lg" type="password"/>
          </CardBody>
          <CardFooter className="pt-0 mt-5">
            <Button className="bg-deep-orange-500" onClick={handleOpen} fullWidth>
              Submit
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}