import { CheckCircleTwoTone, StopOutlined } from "@ant-design/icons";
import { Button, Modal, Radio } from "antd";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler from "meta/services/auth/successHandler";
import React, { useState } from "react";

function EmployeeStatusRadio({ options, onChange }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <Radio.Group value={selectedValue} onChange={handleChange}>
      {options.map((option) => (
        <Radio key={option.value} value={option.value}>
          {option.label}
        </Radio>
      ))}
    </Radio.Group>
  );
}

function DisabledReason({ options, record, refreshTable, route }) {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOk = async () => {
    record.removed = selectedOption == "Active" ? false : true;
    record.status = selectedOption;
    try {
      const response = await jwtAxios.patch(`${route}/disabled/${record._id}`, {
        ...record,
      });
      successHandler(response);
      setVisible(false);
      refreshTable();
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="text"
        size="small"
        onClick={() => setVisible(true)}
        key="delete"
        icon={
          record.removed == true ? (
            <StopOutlined style={{ color: "red" }} />
          ) : (
            <CheckCircleTwoTone />
          )
        }
      ></Button>

      <Modal
        title={"Please select reason"}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <EmployeeStatusRadio
          options={options}
          onChange={(value) => setSelectedOption(value)}
        />
      </Modal>
    </div>
  );
}

export default DisabledReason;
