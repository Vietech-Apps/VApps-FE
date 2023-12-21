import { Descriptions } from "antd";
import React from "react";

const Additional = ({ selected }) => {
  return (
    <div>
      <Descriptions>
        <Descriptions.Item label="PO By">
          {selected?.po?.createdBy?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Gate By">
          {selected?.gateIn?.createdBy?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Quality By">
          {selected?.createdBy?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Driver Name">
          {selected?.gateIn?.visitorName}
        </Descriptions.Item>
        <Descriptions.Item label="Vehicle No">
          {selected?.gateIn?.vehicleNo}
        </Descriptions.Item>
        <Descriptions.Item label="Gate No">
          {selected?.gateIn?.gateNo}
        </Descriptions.Item>
        <Descriptions.Item label="Remark">empty</Descriptions.Item>
        <Descriptions.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Additional;
