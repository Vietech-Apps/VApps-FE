import React from "react";
import { Dropdown, message } from "antd";
import { FiMoreVertical } from "react-icons/fi";

const TableOptions = ({ buttons }) => {
  const items = buttons.map((button, index) => {
    return {
      key: index,
      label: button.props.children,
      onClick: button?.props?.onClick,
    };
  });

  return (
    <Dropdown menu={{ items }}>
      <a
        className="ant-dropdown-link cr-dropdown-link"
        onClick={(e) => e.preventDefault()}
      >
        <FiMoreVertical />
      </a>
    </Dropdown>
  );
};

export default TableOptions;
