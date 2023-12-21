import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import jsPDF from "jspdf";
import successHandler2 from "meta/services/auth/successHandle2";
import jwtAxios from "meta/services/auth/jwt-api";
import errorHandler from "meta/services/auth/errorHandler";
import Check from "./Check";

const PrintCheck = () => {
  const [fields, setFields] = useState([
    { name: "Date", position: { x: 0, y: 0 } },
    { name: "**Amount**", position: { x: 0, y: 0 } },
    { name: "**Payee Name**", position: { x: 0, y: 0 } },
    { name: "**Amount In Words**", position: { x: 0, y: 0 } },
  ]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await jwtAxios.get(`accounts/CheckSetting`);
  //       setFields(response.data);
  //     } catch (error) {
  //       errorHandler(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleFieldMove = async (name, data) => {
    const updatedFields = fields.map((field) => {
      if (field.name === name) {
        field.position = { x: data.x, y: data.y };
      }
      return field;
    });
    setFields(updatedFields);
    // try {
    //   const response = await jwtAxios.patch(`accounts/CheckSetting/update`, {
    //     name,
    //     position: { x: data.x, y: data.y },
    //   });
    //   successHandler2(response);
    // } catch (error) {
    //   errorHandler(error);
    // }
  };

  return (
    <div>
      <Check fields={fields} onFieldMove={handleFieldMove} />
    </div>
  );
};

export default PrintCheck;
