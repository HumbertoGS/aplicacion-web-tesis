import { useState, useEffect } from "react";

const PostData = (url, datos, validar, respuesta) => {
  useEffect(() => {
    if (validar) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(datos),
      };

      const updateData = async () => {
        try {
          const response = await fetch(url, requestOptions);
          const json = await response.json();
          respuesta(json);
        } catch (error) {
          console.log(error.toString());
        }
      };

      updateData();
    }
  }, [validar, url]);
};

const GetData = (url, respuesta) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          // headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        });
        const json = await response.json();
        respuesta(json);
      } catch (error) {
        console.log(`Error: ${error.toString()}`);
      }
    };
    fetchData();
  }, [url]);
};

const ReloadData = (url, validar, respuesta) => {
  useEffect(() => {
    if (validar) {
      const GetData = async () => {
        try {
          const response = await fetch(url, {
            // headers: {
            //   Authorization: "Bearer " + localStorage.getItem("token"),
            // },
          });
          const json = await response.json();
          respuesta(json);
        } catch (error) {
          console.log(`Error: ${error.toString()}`);
        }
      };

      GetData();
    }
  }, [validar, url, respuesta]);
};

const PostImage = (url, formData, validar, respuesta) => {
  useEffect(() => {
    if (validar) {
      const updateData = async () => {
        try {
          const response = await fetch(url, {
            method: "POST",
            body: formData,
          });
          const json = await response.json();
          respuesta(json);
        } catch (error) {
          console.log(error.toString());
        }
      };

      updateData();
    }
  }, [validar, url]);
};

export { PostData, GetData, ReloadData, PostImage };
