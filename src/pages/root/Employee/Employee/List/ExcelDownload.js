import React, { useState } from "react";
import json2xls from "json-as-xlsx";
import FileSaver from "file-saver";
import { DownloadOutlined } from "@ant-design/icons";
///column length and content length must be equal other wise length error
const Example = ({ data }) => {
  
  const [jsonData, setJsonData] = useState([
    {
      sheet: "EmployeeSheet",
      columns: [
        { label: "Name", value: "name" },
        { label: "LastName", value: "lastName" },
        { label: "Phone", value: "phone" },
        { label: "Email", value: "email" },
        { label: "Gender", value: "gender" },
        { label: "Designation", value: "designation" },
        { label: "Department", value: "department" },
        { label: "Whatsapp", value: "whatsapp" },
      ],
      content: data?.map((item) => ({
        name: item.name,
        lastName: item.lastName,
        phone: item.phone,
        email: item.email,
        gender: item.gender,
        designation: item.designation?.title,
        department: item.process?.title,
        whatsapp: item.whatsappCode + item.whatsappNumber,
      })),
    },
  ]);
  let settings = { fileName: "EmployeeSheet" };
  const handleExport = () => {
    json2xls(jsonData, settings);
  };

  return <DownloadOutlined key={"download"} onClick={handleExport} />;
};

export default Example;
