import { Typography } from '@material-tailwind/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { BaseUrl } from '../../utils/Constants';

const TABLE_HEAD = ["Location", "Address", "Total_cent", "Price_per_cent","Is_rent","Is_sell",""];  

function Admin_propertylist() {

  const [propertyList, setPropertyList] = useState([]);
  const TABLE_ROWS = propertyList

  useEffect(() => {
    getProperty();
  }, []);

  const getProperty = () => {
    axios.get(`${BaseUrl}/property/`).then((res) => {
      console.log(res);
      setPropertyList(res.data);
    });
  };

  const Delete = (id) => {
    axios.delete(`${BaseUrl}/property/`,{data : {id:id}}).then((res) =>{
      getProperty();
    });
  };

  return (
    <div>
      <div className=" col-span-2">
        <div className="grid grid-cols-2">
            <p className="mt-9 ml-10 font-serif text-3xl  text-deep-orange-900">
              Property List
            </p>
        </div>
        <div className="mt-10 w-full h-full">
        <Card className="h-full w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ location, address, total_cent,price_per_cent,is_rent,is_sell , id  }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={name}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {location}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {address}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {total_cent}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {price_per_cent}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {is_rent}
                  </Typography>
                </td>
                <td className={`${classes} bg-blue-gray-50/50`}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {is_sell}
                  </Typography>
                </td>
                <td className={classes}>
                  <Button className='bg-deep-orange-500 h-10 w-28 rounded-xl text-white' onClick={() => Delete(id)}>
                    DELETE
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>

        </div>
      </div>
    </div>
  )
}

export default Admin_propertylist