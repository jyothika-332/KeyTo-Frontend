// import React, { useEffect, useState } from "react";
// import { BaseUrl } from "../../utils/Constants";
// import jwtDecode from "jwt-decode";
// import { PencilIcon } from "@heroicons/react/24/solid";
// import {
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Input,
//   Textarea,
// } from "@material-tailwind/react";
// import axios from "axios";


// const TABLE_HEAD = ["Heading", "Image", "Priority", "Description","",""];

// function Bannerlist() {
//   const tableStyle = {
//     borderCollapse: "separate",
//     borderSpacing: "10px", // Adjust the value to set the desired gap
//   };

//   const [bannerList, setbannerList] = useState([]);

//   const TABLE_ROWS = bannerList;

//   return (
//     <Card className="h-full w-full">
//       <table className="w-full min-w-max table-auto text-left">
//         <thead>
//           <tr>
//             {TABLE_HEAD.map((head) => (
//               <th
//                 key={head}
//                 className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
//               >
//                 <Typography
//                   variant="small"
//                   color="blue-gray"
//                   className="font-normal leading-none opacity-70"
//                 >
//                   {head}
//                 </Typography>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {TABLE_ROWS.map(
//             ({ heading, image, priority, description }, index) => {
//               const isLast = index === TABLE_ROWS.length - 1;
//               const classes = isLast
//                 ? "p-4"
//                 : "p-4 border-b border-blue-gray-50";

//               return (
//                 <tr key={name}>
//                   <td className={classes}>
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="font-normal"
//                     >
//                       {heading}
//                     </Typography>
//                   </td>
//                   <td className={`${classes} bg-blue-gray-50/50`}>
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="font-normal"
//                     >
//                       {image}
//                     </Typography>
//                   </td>
//                   <td className={classes}>
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="font-normal"
//                     >
//                       {priority}
//                     </Typography>
//                   </td>
//                   <td className={`${classes} bg-blue-gray-50/50`}>
//                     <Typography
//                       variant="small"
//                       color="blue-gray"
//                       className="font-normal"
//                     >
//                       {description}
//                     </Typography>
//                   </td>
//                   <td className={classes}>
//                 <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
//                   <Tooltip content="Edit User">
//                     <IconButton variant="text">
//                       <PencilIcon className="h-4 w-4" />
//                     </IconButton>
//                   </Tooltip>
//                 </Typography>
//               </td>
//               <td className={classes}>
//   <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
//     <Tooltip content="Delete User">
//       <IconButton variant="text" onClick={handleDelete}>
//         <TrashIcon className="h-4 w-4" />
//       </IconButton>
//     </Tooltip>
//   </Typography>
// </td>
//               <td className={`${classes} bg-blue-gray-50/50`}>
//                 <Button></Button>
//               </td>
//                 </tr>
//               );
//             }
//           )}
//         </tbody>
//       </table>
//     </Card>
//   );
// }

// export default Bannerlist;
