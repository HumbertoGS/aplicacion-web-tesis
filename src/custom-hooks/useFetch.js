import { useEffect } from "react";

const useData = (url, method, data, validar, respuesta) => {
  useEffect(() => {
    if (validar) {
      const requestOptions = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      if (data) requestOptions.body = JSON.stringify(data);

      const fetchData = async () => {
        try {
          const response = await fetch(url, requestOptions);
          const json = await response.json();
          respuesta(json);
        } catch (error) {
          console.log(`Error: ${error.toString()}`);
        }
      };

      fetchData();
    }
  }, [validar, url, method, data, respuesta]);
};

// const PostData = (url, datos, validar, respuesta) => {
//   useEffect(() => {
//     if (validar) {
//       const requestOptions = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//         body: JSON.stringify(datos),
//       };

//       const updateData = async () => {
//         try {
//           const response = await fetch(url, requestOptions);
//           const json = await response.json();
//           respuesta(json);
//         } catch (error) {
//           console.log(error.toString());
//         }
//       };

//       updateData();
//     }
//   }, [validar, url]);
// };

// const ReloadData = (url, validar, respuesta) => {
//   useEffect(() => {
//     if (validar) {
//       const GetData = async () => {
//         try {
//           const response = await fetch(url, {
//             // headers: {
//             //   Authorization: "Bearer " + localStorage.getItem("token"),
//             // },
//           });
//           const json = await response.json();
//           respuesta(json);
//         } catch (error) {
//           console.log(`Error: ${error.toString()}`);
//         }
//       };

//       GetData();
//     }
//   }, [validar, url, respuesta]);
// };

const PostData = (url, data, validar, respuesta) => {
  useData(url, "POST", data, validar, respuesta);
};

const ReloadData = (url, validar, respuesta) => {
  useData(url, "GET", null, validar, respuesta);
};

export { PostData, ReloadData };
