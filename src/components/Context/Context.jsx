import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../utils/Constants";

export const SimpleContext = createContext();

const AuthContext = ({ children }) => {
  const [Datas, setDatas] = useState("Its a Test Data");

  const [authtoken, setauthtoken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );

  const UpdateToken = () => {
    var data = {
      refresh: localStorage.getItem("refresh")
        ? localStorage.getItem("refresh")
        : null,
    };
    axios
      .post(`${BaseUrl}/user/get_refresh_token/`, data)
      .then((res) => {
        const { access, refresh } = res.data;

        localStorage.setItem("token", access);
        localStorage.setItem("refresh", refresh);
      })
      .catch((err) => {
        localStorage.clear();
        window.location.href = "/";
      });
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (authtoken) {
        UpdateToken();
      }
    }, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [authtoken]);

  return (
    <SimpleContext.Provider value={{ Datas }}>
      {children}
    </SimpleContext.Provider>
  );
};

export default AuthContext;
