import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { Form } from "react-bootstrap";

export function CreateListingForm() {
  return (
    <Card color="transparent" shadow={false}>
      <form className="mt-8 mb-2 w-2/3 ">
        <div className="mb-4 flex flex-col gap-6">
          <div>
            <Input size="lg" label="Property Title" />
          </div>
          <div className="mt-3">
            <Textarea size="lg" label="Description" />
          </div>
          <div className="my-1 flex items-center gap-2">
            <Input
              type="password"
              size="lg"
              label="Price"
              containerProps={{ className: "min-w-[72px]" }}
            />
            <Input
              type="password"
              size="lg"
              label="Area"
              containerProps={{ className: "min-w-[72px]" }}
            />
          </div>
          <div className="mt-3">
            <Textarea size="lg" label="Location" />
          </div>
          <div className="mt-3">
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </div>
        </div>
        <Button className="mt-10 bg-deep-orange-500">Submit</Button>
      </form>
    </Card>
  );
}
