import { Card } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FooterWithSocialLinks } from "../../components/footer/Footer";
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";

function Admin_Dashboard() {

  const [dashboard_datas, setdashboard_datas] = useState("");
  useEffect(() => {
    DashboardData();
  }, []);

  const DashboardData = () => {
    axios.get(`${BaseUrl}/property/dashboard_datas/`).then((response) => {
      setdashboard_datas(response.data)
    });
  };

  return (
    <>
      <div>
        <div className="text-deep-orange-900 font-serif text-3xl mt-14 ml-11">
          Dashboard
        </div>
      </div>
      <div className="">
        <div className="grid grid-cols-[1fr,1fr] h-40 mt-8">
          <div className="flex justify-center items-center">
            <Card className="h-60 w-80 bg-deep-orange-200 shadow-deep-orange-900 rounded-lg">
              <div className="mt-7">
                <span className="flex justify-center text-3xl font-serif">
                  Total Users
                </span>
              </div>
              <div className="mt-10 grid grid-cols-[1fr,1fr]">
                <div className="ml-7">
                  <p>Normal Users :</p>
                  <p className="mt-5">Sellers :</p>
                </div>
                <div className="ml-7">
                  <p>{ dashboard_datas ? dashboard_datas.user_count : 0}</p>
                  <p className="mt-5">{ dashboard_datas ? dashboard_datas.seller_count : 0}</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="flex justify-center items-center">
            <Card className="h-60 w-80 bg-deep-orange-200 shadow-deep-orange-900 rounded-lg">
              <div className="mt-7">
                <span className="flex justify-center text-3xl font-serif">
                  Property Sold
                </span>
              </div>
              <div className="mt-10 grid grid-cols-[1fr,1fr]">
                <div className="ml-7">
                  <p>Sold:</p>
                  <p className="mt-5">Pending :</p>
                </div>
                <div className="ml-7">
                  <p>{ dashboard_datas ? dashboard_datas.sold_property : 0}</p>
                  <p className="mt-5">{ dashboard_datas ? dashboard_datas.not_sold_property : 0}</p>
                </div>
              </div>
            </Card>
          </div>
        </div> 



           <div className="grid grid-cols-[1fr,1fr] h-40 mt-8">
          <div className="flex justify-center items-center">
            <Card className="h-60 w-80 bg-deep-orange-200 shadow-deep-orange-900 rounded-lg">
              <div className="mt-7">
                <span className="flex justify-center text-3xl font-serif">
                  Property Types
                </span>
              </div>
              <div className="mt-10 grid grid-cols-[1fr,1fr]">
                <div className="ml-7">
                  <p>For Rent :</p>
                  <p className="mt-5">For Sale :</p>
                </div>
                <div className="ml-7">
                  <p>{ dashboard_datas ? dashboard_datas.rent_property : 0}</p>
                  <p className="mt-5">{ dashboard_datas ? dashboard_datas.sale_property : 0}</p>
                </div>
              </div>
            </Card>
          </div>
          <div className="flex justify-center items-center">
            <Card className="h-60 w-80 bg-deep-orange-200 shadow-deep-orange-900 rounded-lg">
              <div className="mt-7">
                <span className="flex justify-center text-3xl font-serif">
                  Premium Sellers
                </span>
              </div>
              <div className="mt-10 grid grid-cols-[1fr,1fr]">
                <div className="ml-7">
                  <p>Premium:</p>
                  <p className="mt-5">Other :</p>
                </div>
                <div className="ml-7">
                  <p>{ dashboard_datas ? dashboard_datas.premium : 0}</p>
                  <p className="mt-5">{ dashboard_datas ? dashboard_datas.not_premium : 0}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>      
      </div>
    </>
  );
}

export default Admin_Dashboard;

