import axios from "axios";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../utils/Constants";
import jwtDecode from "jwt-decode";

function Userlist() {
  const tableStyle = {
    borderCollapse: "separate",
    borderSpacing: "10px", // Adjust the value to set the desired gap
  };

  const [userList, setuserList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
        if ( jwtDecode(localStorage.getItem("token")).role != "admin")
        {
            localStorage.clear();
            window.location.href = "/";
        }
        else{
      getUserData();

        }
    } else {
      localStorage.clear();
      window.location.href = "/";
    }
  }, []);

  const getUserData =  () => {
    axios
      .get(`${BaseUrl}/user/`)
      .then((res) => {
        console.log(res);
        setuserList(res.data);
      })
      .catch((err) => {
        localStorage.clear();
        window.location.href = "/";
      });
  };

  return (
    <table className="table-fixed" style={tableStyle}>
      <thead>
        <tr className="text-left">
          <th>ID</th>
          <th>FIRST_NAME</th>
          <th>EMAIL</th>
          <th>ROLE</th>
          <th>ISPREMIUM</th>
          <th>STATUS</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* <tr>
          <td>{userList ? userList.id : ""}</td>
          <td>{userList ? userList.first_name : ""}</td>
          <td>{userList ? userList.email : ""}</td>
          <td>{userList ? userList.role : ""}</td>
          <td>{userList ? userList.is_premium : ""}</td>
          <td>{userList ? userList.is_active : ""}</td>
          <td></td>
        </tr> */}
        {
            userList.length ? <>
            {
                userList.map((value,key) => (
                    <tr key={key}>
                        <td>{key+1 }</td>
                        <td>{value.first_name }</td>
                        <td>{value.email }</td>
                        <td>{value.role }</td>
                        <td>{value.is_premium ? 'Yes' : 'No' }</td>
                        <td>{value.is_active  ? 'Yes' : 'No'}</td>
                        <td></td>
                    </tr>
                ))
            }
            </> :
            <tr>
                <td colSpan={7}><b> No Users Joined </b></td>
            </tr>
        }
      </tbody>
    </table>
  );
}

export default Userlist;
