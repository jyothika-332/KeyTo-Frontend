import { Card } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../utils/Constants";
import jwtDecode from "jwt-decode";

function Seller_Dashboard() {
  const [dashboard_data, setdashboard_data] = useState("");

  useEffect(() => {
    getDashboard()
    console.log(jwtDecode(localStorage.getItem("token")).user_id)
  }, []);

  const getDashboard = () => {
    axios.get(`${BaseUrl}/property/agent_dashboard/`,{
      params : {
        "id" : jwtDecode(localStorage.getItem("token")).user_id
      }
    })
    .then((res) => {
      console.log( res)
      setdashboard_data(res.data)
    })
  }
  return (
    <>
      <div>
        <div className="text-deep-orange-900 font-serif text-3xl mt-14 ml-11">
          Dashboard
        </div>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto mt-8">
          <div className="flex justify-center items-center">
            <Card className="h-52 w-80 bg-deep-orange-200 shadow-deep-orange-900 rounded-lg">
              <div className="mt-14">
                <span className="flex justify-center text-3xl font-serif">
                  Total Property
                </span>
              </div>
              <div className="mt-5">
                <span className="flex justify-center text-5xl font-serif">
                  { dashboard_data ? dashboard_data.property : 0}
                </span>
              </div>
            </Card>
          </div>
          <div className="flex justify-center items-center">
            <Card className="h-52 w-80 bg-deep-orange-200 shadow-deep-orange-900 rounded-lg">
              <div className="mt-14">
                <span className="flex justify-center text-3xl font-serif">
                  Sold Property
                </span>
              </div>
              <div className="mt-5">
                <span className="flex justify-center text-5xl font-serif">
                { dashboard_data ? dashboard_data.sold : 0}
                </span>
              </div>
            </Card>
          </div>
          </div>
        </div>
        <div className="mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto mt-8">
          <div className="flex justify-center items-center">
            <Card className="h-52 w-80 bg-deep-orange-200 shadow-deep-orange-900 rounded-lg">
              <div className="mt-14">
                <span className="flex justify-center text-3xl font-serif">
                  For Sale
                </span>
              </div>
              <div className="mt-5">
                <span className="flex justify-center text-5xl font-serif">
                { dashboard_data ? dashboard_data.sale_prpty : 0}
                </span>
              </div>
            </Card>
          </div>
          <div className="flex justify-center items-center">
            <Card className="h-52 w-80 bg-deep-orange-200 shadow-deep-orange-900 rounded-lg">
              <div className="mt-14">
                <span className="flex justify-center text-3xl font-serif">
                  For Rent
                </span>
              </div>
              <div className="mt-5">
                <span className="flex justify-center text-5xl font-serif">
                { dashboard_data ? dashboard_data.rent_prpty : 0}
                </span>
              </div>
            </Card>
          </div>
        </div>
        </div>
    </>
  );
}

export default Seller_Dashboard;
