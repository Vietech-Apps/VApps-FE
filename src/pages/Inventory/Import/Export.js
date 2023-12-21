import React, { useState } from "react";
import json2xls from "json-as-xlsx";
import { Button } from "antd";

const ExportExcel = ({ data }) => {
  const [jsonData, setJsonData] = useState([
    {
      sheet: "SampleProduct",
      columns: [
        { label: "code", value: "code" },
        { label: "name", value: "name" },
        { label: "qty", value: "qty" },
        { label: "salePrice", value: "salePrice" },
        { label: "purchasePrice", value: "purchasePrice" },
        { label: "saleDiscount", value: "saleDiscount" },
        { label: "purchaseDiscount", value: "purchaseDiscount" },
        { label: "model", value: "model" },
        { label: "make", value: "make" },
        { label: "detail", value: "detail" },
        { label: "currency", value: "currency" },
      ],
      content: [
        {
          code: "",
          name: "",
          qty: "",
          salePrice: "",
          purchasePrice: "",
          saleDiscount: "",
          purchaseDiscount: "",
          model: "",
          make: "",
          detail: "",
          currency: "",
        },
      ],
    },
  ]);
  let settings = { fileName: "SampleProduct" };
  const handleExport = () => {
    json2xls(jsonData, settings);
  };

  return <Button onClick={handleExport}>Download Sample file</Button>;
};

export default ExportExcel;
