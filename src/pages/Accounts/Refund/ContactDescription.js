import { Descriptions } from "antd";
import React from "react";

const ContactDescription = ({ selected }) => {
  return (
    <Descriptions title="Vendor Info">
      <Descriptions.Item label="Name">
        {selected?.contact?.title}
      </Descriptions.Item>
      <Descriptions.Item label="Telephone">
        {selected?.contact?.phone}
      </Descriptions.Item>
      <Descriptions.Item label="Id">
        {selected?.contact?.cuId}
      </Descriptions.Item>

      <Descriptions.Item label={"Address"}>
        {selected?.contact?.address}
      </Descriptions.Item>
      {selected?.contact?.bankAccounts?.map((a, i) => (
        <Descriptions.Item label={a.accountHolderName} key={a._id}>
          {a.accountNumber}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

export default ContactDescription;
