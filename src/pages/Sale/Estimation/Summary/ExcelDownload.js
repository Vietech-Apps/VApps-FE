import React, { useEffect, useState } from "react";
import json2xls from "json-as-xlsx";
import { Button } from "antd";
import { productTotal, productUnit } from "meta/Reusable/CalcData";

const ExportExcel = ({ products, estimation, rerender }) => {
  const [jsonData, setJsonData] = useState();
  useEffect(() => {
    setJsonData([
      {
        sheet: "SampleProduct",
        columns: [
          { label: "code", value: "code" },
          { label: "name", value: "name" },
          { label: "qty", value: "qty" },
          { label: "price", value: "price" },
          { label: "model", value: "model" },
          { label: "make", value: "make" },
          { label: "discount", value: "discount" },
          { label: "currency", value: "currency" },
          { label: "unit", value: "unit" },
          { label: "total", value: "total" },
          { label: "panel", value: "panel" },
        ],
        content: products?.map((d) => ({
          code: d.code,
          name: d.name,
          qty: d.qty,
          price: d.type == 1 ? d.price : "",
          model: d.type == 1 ? d.model : "",
          make: d.type == 1 ? d.make : "",
          discount: d.type == 1 ? d.discount : "",
          currency: d.type == 1 ? d.currency : "",
          unit: d.type == 1 ? productUnit(d, estimation)?.toFixed(1) : "",
          total: d.type == 1 ? productTotal(d, estimation)?.toFixed(1) : "",
          panel: d.panel,
        })),
      },
    ]);
  }, [products, rerender]);

  let settings = { fileName: "SampleProduct" };
  const handleExport = () => {
    json2xls(jsonData, settings);
  };

  return (
    <Button onClick={handleExport} type="primary">
      Download{" "}
    </Button>
  );
};

export default ExportExcel;
