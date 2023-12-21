import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { Button, Col, Form, Input, Row, Select, Table } from "antd";
import { ArrowRightOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";
import { pInfo, route, validateData } from "../Product/Code";
import successHandler2 from "meta/services/auth/successHandle2";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import FormLayout from "meta/JLayouts/Layout";
import ProductDBFields from "./productFields";

function DataImport({ id }) {
  const productFields = ProductDBFields();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [maxEntry, setMaxEntry] = useState(null);
  const [validTableData, setValidTableData] = useState([]);

  const [fieldMapping, setFieldMapping] = useState({});
  const [nextClicked, setNextClicked] = useState(false);

  const handleMappingChange = (key, value) => {
    console.log("IM hitted");
    if (value === undefined) {
      // If the selection was cleared, remove the corresponding field from the fieldMapping state
      setFieldMapping((prev) => {
        const newFieldMapping = { ...prev };
        delete newFieldMapping[key];
        return newFieldMapping;
      });
    } else {
      // If a new option was selected, add it to the fieldMapping state
      setFieldMapping((prev) => ({ ...prev, [key]: value }));
    }
    setNextClicked(false);
    setValidTableData([]);
    setColumns([]);
  };

  const handleFileRead = (file) => {
    const reader = new FileReader();
    reader.onload = function (evt) {
      /* Parse data */
      const bstr = evt.target.result;
      let dataArray = [];
      let headerArray = [];

      // CSV parsing
      if (file.name.endsWith(".csv")) {
        Papa.parse(bstr, {
          complete: function (results) {
            headerArray = results.data[0];
            dataArray = results.data.slice(1);
          },
        });
      }
      // Excel parsing
      else if (file.name.endsWith(".xls") || file.name.endsWith(".xlsx")) {
        const wb = XLSX.read(bstr, { type: "binary" });

        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        /* Convert array of arrays */
        const rawData = XLSX.utils.sheet_to_json(ws, { header: 1 });
        headerArray = rawData[0];
        dataArray = rawData.slice(1);
      }
      let newDataArray = dataArray.map((row) => {
        return row.map((item, index) => {
          if (
            headerArray[index].toLowerCase().includes("date") &&
            typeof item === "number"
          ) {
            return new Date((item - (25567 + 2)) * 86400 * 1000);
          } else {
            return item;
          }
        });
      });

      const objectsArray = newDataArray
        .map((row) => {
          let obj = {};
          row.forEach((item, index) => {
            obj[headerArray[index]] = item;
          });
          return obj;
        })
        .filter(
          (obj) =>
            Object.values(obj).filter(
              (item) => item !== undefined && item !== ""
            ).length >= 3
        );

      let maxEntry = objectsArray[0];
      let maxCount = Object.values(maxEntry).filter(
        (item) => item !== undefined && item !== ""
      ).length;
      for (let entry of objectsArray) {
        let count = Object.values(entry).filter(
          (item) => item !== undefined && item !== ""
        ).length;
        if (count > maxCount) {
          maxEntry = entry;
          maxCount = count;
        }
        // If maxCount equals the number of columns, stop searching
        if (maxCount === headerArray.length) {
          break;
        }
      }
      setData(objectsArray);
      setMaxEntry(maxEntry);
      setSelectedOptions([]);
      setNextClicked(false);
      setValidTableData([]);
      setFieldMapping({});
    };

    if (file) {
      reader.readAsBinaryString(file);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    handleFileRead(file);
  };
  const handNext = async () => {
    // check if required fields are mapped
    const requiredFields = ["name"];
    const mappedFields = Object.values(fieldMapping);
    const missingFields = requiredFields.filter(
      (field) => !mappedFields.includes(field)
    );
    if (missingFields.length > 0) {
      alert(
        `Please map the following fields before saving: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }
    const newData = data.map((entry) => {
      const convertedEntry = {};
      for (const [key, value] of Object.entries(entry)) {
        const mappedField = fieldMapping[key];
        convertedEntry[mappedField] = value;
      }
      return convertedEntry;
    });

    const { validData, invalidData } = validateData(newData, productFields);

    const transformedColumns = [
      { title: "No", dataIndex: "index", key: "index" }, // Add an extra column for index
      ...Object.entries(fieldMapping).map(([oldKey, newKey]) => {
        const relatedProductField = productFields.find(
          (field) => field.value === newKey
        );
        const label = relatedProductField ? relatedProductField.label : newKey;
        return { title: label, dataIndex: newKey, key: oldKey };
      }),
    ];

    setValidTableData(validData);
    console.log(
      `Invalid fields found for item: ${JSON.stringify(invalidData)}`
    );
    setColumns(transformedColumns);
    setNextClicked(true);
  };

  const onFinish = async () => {
    let values = {};
    // Sort the data based on the date
    const sortedData = validTableData;

    try {
      console.log(values);
      const response = await jwtAxios.post(`${route}/customCreate`, values);
      successHandler2(response);
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <FormLayout isTable={true} codes={pInfo}>
      <input type="file" accept=".csv,.xls,.xlsx" onChange={handleFileUpload} />

      <StyledMetaForm className="p-5">
        {maxEntry && (
          <>
            <Row gutter={24} className="py-2 px-5">
              <Col xs={12} sm={9}>
                <div className="font-semibold ">
                  Headings From Uploaded file
                </div>
              </Col>
              <Col xs={12} sm={8}>
                <div className="font-semibold px-0">
                  Preview From Uploaded file
                </div>
              </Col>
              <Col xs={24} sm={{ span: 6, offset: 1 }}>
                <div className="font-semibold">
                  Select Related Database field
                </div>
              </Col>
            </Row>
            {Object.entries(maxEntry)?.map(([key, value]) => (
              <Row gutter={24} key={key} className="px-5">
                <Col
                  xs={24}
                  sm={17}
                  className="flex gap-4 rounded mb-3 p-3"
                  style={{
                    border: "1px solid #dfdfdf",
                  }}
                >
                  <Input
                    value={key}
                    disabled
                    prefix={<UnorderedListOutlined />}
                    className="w-full"
                  />
                  <Input
                    value={value}
                    disabled
                    prefix={
                      <ArrowRightOutlined className="site-form-item-icon" />
                    }
                    className="w-full"
                  />
                </Col>
                <Col
                  xs={24}
                  sm={{ span: 6, offset: 1 }}
                  className="mb-3 rounded p-3 pb-0"
                  style={{
                    border: "1px solid #dfdfdf",
                  }}
                >
                  <Select
                    className="w-full"
                    allowClear
                    showSearch
                    options={productFields.filter(
                      ({ value }) =>
                        !Object.values(fieldMapping).includes(value) ||
                        fieldMapping[key] === value
                    )}
                    onChange={(value) => handleMappingChange(key, value)}
                    value={fieldMapping[key]}
                    defaultValue={
                      fieldMapping[key] ||
                      (() => {
                        const defaultValue = productFields.find(
                          ({ value, label }) =>
                            key.toLowerCase().includes(value.toLowerCase()) ||
                            key.toLowerCase().includes(label.toLowerCase())
                        )?.value;
                        if (defaultValue) {
                          handleMappingChange(key, defaultValue);
                          return defaultValue;
                        }
                        return undefined;
                      })()
                    }
                  />
                </Col>
              </Row>
            ))}
            {!nextClicked && <Button onClick={handNext}>Next</Button>}
          </>
        )}

        {validTableData?.length > 0 && (
          <Table
            rowSelection={{
              type: "checkbox",
            }}
            dataSource={validTableData}
            columns={columns}
          />
        )}
        {nextClicked && <Button onClick={onFinish}>Save to Database</Button>}
      </StyledMetaForm>
    </FormLayout>
  );
}

export default DataImport;
