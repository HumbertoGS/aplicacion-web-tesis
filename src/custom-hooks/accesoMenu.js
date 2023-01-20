import { useState, useEffect } from "react";

const user = JSON.parse(localStorage.getItem("user"));
const url = process.env.REACT_APP_API_CORE_URL + "login/acceso";

export const PostData = (respuesta) => {
  useEffect(() => {
    if (user) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(user),
      };

      const updateData = async () => {
        try {
          const response = await fetch(url, requestOptions);
          const json = await response.json();
          respuesta(json.datos ? json.datos : false);
        } catch (error) {
          console.log(error.toString());
        }
      };

      updateData();
    }
  }, [user]);
};
