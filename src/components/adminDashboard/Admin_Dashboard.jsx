import { Card } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";
import Donut from "../chart_admin/Chart_Admin";
import Donut2 from "../admin_chart/Admin_Chart";

function Admin_Dashboard() {
  const [dashboard_datas, setdashboard_datas] = useState("");
  useEffect(() => {
    DashboardData();
  }, []);

  const DashboardData = () => {
    axios.get(`${BaseUrl}/property/dashboard_datas/`).then((response) => {
      setdashboard_datas(response.data);
    });
  };

  return (
    <>

      <div className="container mx-auto flex flex-col md:flex-row justify-center mt-14 space-y-4 md:space-y-0 md:space-x-4">
        <div><p className="text-deep-orange-600">User</p>
          <Donut
            series_data={[
              dashboard_datas ? dashboard_datas.user_count : 0,
              dashboard_datas ? dashboard_datas.seller_count : 0,
              dashboard_datas ? dashboard_datas.premium : 0,
              dashboard_datas ? dashboard_datas.not_premium : 0,
            ]}
          />
        </div>
        <div><p className="text-deep-orange-600">Property</p>
          <Donut2
            series_data={[
              dashboard_datas ? dashboard_datas.sold_property : 0,
              dashboard_datas ? dashboard_datas.not_sold_property : 0,
              dashboard_datas ? dashboard_datas.rent_property : 0,
              dashboard_datas ? dashboard_datas.sale_property : 0,
            ]}
          />
        </div>
      </div>
      <div className="mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
          <div className="flex justify-center items-center">
            <Card className="h-60 w-64 bg-deep-orange-200 shadow-deep-orange-900 rounded-lg">
              <div className="mt-7">
                <span className="flex justify-center text-3xl font-serif">
                  Total Users
                </span>
              </div>
              <div className="mt-10 grid grid-cols-[1fr,1fr]">
                <div className="ml-7">
                  <p>Normal Users:</p>
                  <p className="mt-5">Sellers :</p>
                </div>
                <div className="ml-7 mt-6">
                  <p>{dashboard_datas ? dashboard_datas.user_count : 0}</p>
                  <p className="mt-5">
                    {dashboard_datas ? dashboard_datas.seller_count : 0}
                  </p>
                </div>
              </div>
            </Card>
          </div>
          <div className="flex justify-center items-center">
            <Card className="h-60 w-64 bg-deep-orange-200 shadow-deep-orange-900 rounded-lg">
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
                  <p>{dashboard_datas ? dashboard_datas.sold_property : 0}</p>
                  <p className="mt-5">
                    {dashboard_datas ? dashboard_datas.not_sold_property : 0}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
          <div className="flex justify-center items-center">
            <Card className="h-60 w-64 bg-deep-orange-200 shadow-deep-orange-900 rounded-lg">
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
                  <p>{dashboard_datas ? dashboard_datas.rent_property : 0}</p>
                  <p className="mt-5">
                    {dashboard_datas ? dashboard_datas.sale_property : 0}
                  </p>
                </div>
              </div>
            </Card>
          </div>
          <div className="flex justify-center items-center">
            <Card className="h-60 w-64 bg-deep-orange-200 shadow-deep-orange-900 rounded-lg">
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
                  <p>{dashboard_datas ? dashboard_datas.premium : 0}</p>
                  <p className="mt-5">
                    {dashboard_datas ? dashboard_datas.not_premium : 0}
                  </p>
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
