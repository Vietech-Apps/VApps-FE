import { Button, Select } from "antd";
import React from "react";
import EnqDashboard from "./Enq";
import { LayoutDiv, StyleSelect, StyleTabs } from "./index.style";

const items = [
  {
    key: "1",
    label: `Enquiry`,
    children: (
      <>
        <EnqDashboard />
      </>
    ),
  },
  {
    key: "2",
    label: `Estimation`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: "3",
    label: `SO`,
    children: `Content of Tab Pane 3`,
  },
];
const index = () => {
  return (
    <LayoutDiv>
      <StyleTabs
        tabBarExtraContent={
          <StyleSelect
            defaultValue="lucy"
            loading
            options={[{ value: "lucy", label: "Lucy" }]}
          />
        }
        defaultActiveKey="1"
        items={items}
      />
    </LayoutDiv>
  );
};

export default index;
