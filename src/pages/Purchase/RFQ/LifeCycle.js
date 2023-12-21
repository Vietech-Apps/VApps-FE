import { Steps } from "antd";
import moment from "moment";
import React from "react";

const LifeCycle = ({record}) => {
  return (
    <Steps
      style={{
        marginTop: 8,
      }}
      // type="inline"
      current={record.current}
      progressDot
      status={record.status == "done" ? "finish" : "process"}
      items={[
        {
          title: "Enquiry",
          description: record?.cuId,
          subTitle: moment(record?.createdAt).format("ll"),
        },
        {
          title: "Estimation",
          description: record.estimationId,
          subTitle: record.estimationDate
            ? moment(record?.estimationDate).format("ll")
            : "",
        },
        {
          title: "Quotation",
          description: record.quotationId,
          subTitle: record.quotationDate
            ? moment(record?.quotationDate).format("ll")
            : "",
        },
        {
          title: "Forward",
          description: "This is a Step 3.",
        },
      ]}
    />
  );
};

export default LifeCycle;
