import { Descriptions, Typography } from "antd";
import React from "react";

const VendorDetail = ({ selected }) => {
  console.log(selected);
  return (
    <div>
      <Descriptions>
        <Descriptions.Item label="Vendor Name">
          {selected?.vendor?.title}
        </Descriptions.Item>
        <Descriptions.Item label="Telephone">
          {selected?.vendor?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Live">
          {selected?.vendor?.addresss}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {selected?.vendor?.email}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item> */}
      </Descriptions>
    </div>
  );
};

export default VendorDetail;
