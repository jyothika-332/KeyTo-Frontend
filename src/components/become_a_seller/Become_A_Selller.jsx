import React, { useEffect, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";

function Become_A_Selller() {
  const [sellerData, setsellerData] = useState("");
  useEffect(() => {
    console.log(jwtDecode(localStorage.getItem("token")));
    if (localStorage.getItem("token")) {
      console.log("ok");
    } else {
      localStorage.clear();
      window.location.href = "/";
    }
  }, []);
  const updateSellerData = async () => {
    console.log(sellerData);
    const formData = new FormData();
    formData.append("id", jwtDecode(localStorage.getItem("token")).user_id);
    formData.append("role", "seller");
    formData.append("address", sellerData.address);
    formData.append("phone", sellerData.phone);
    formData.append("location", sellerData.location);
    formData.append("id_card_image", sellerData.id_card_image);
    axios.put(`${BaseUrl}/user/`, formData).then((res) => {
      localStorage.clear();
      window.location.href = "/login";
    });
  };

  return (
    <div>
      <div className="flex-col items-center">
        <form>
          <div className="w-96 mt-6">
            <Input
              label="Address"
              type="text"
              value={sellerData.address ? sellerData.address : ""}
              onChange={(e) =>
                setsellerData({ ...sellerData, address: e.target.value })
              }
            />
          </div>
          <div className="w-96 mt-8">
            <Input
              label="Phone Number"
              type="text"
              value={sellerData.phone ? sellerData.phone : ""}
              onChange={(e) =>
                setsellerData({ ...sellerData, phone: e.target.value })
              }
            />
          </div>
          <div className="w-96 mt-8">
            <Input
              label="Location"
              type="text"
              value={sellerData.location ? sellerData.location : ""}
              onChange={(e) =>
                setsellerData({ ...sellerData, location: e.target.value })
              }
            />
          </div>
          <div className="w-96 mt-8">
            <Input
              label="Upload Id"
              type="file"
              onChange={(e) =>
                setsellerData({
                  ...sellerData,
                  id_card_image: e.target.files[0],
                })
              }
            />
          </div>
          <div>
            <Button
              className="mt-10 ml-72 bg-deep-orange-500"
              onClick={() => updateSellerData()}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Become_A_Selller;
