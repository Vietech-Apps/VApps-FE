import { Avatar, Steps } from "antd";
import moment from "moment";
import React from "react";

const LifeCycle = ({ record }) => {
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
          description: (
            <Steps
              progressDot
              current={1}
              direction="vertical"
              items={[
                {
                  title: "Sr #",
                  description: record.cuId,
                },
                {
                  title: "Created At",
                  description: moment(record?.createdAt).format("ll"),
                },
                {
                  title: "Created By",
                  description: record.createdBy?.name,
                  subTitle: (
                    <Avatar
                      src={
                        record.createdBy?.picture?.length > 0
                          ? record.createdBy?.picture[0]?.url
                          : null
                      }
                    />
                  ),
                },
                {
                  title: "Status",
                  description: record.status,
                },
              ]}
            />
          ),
        },
        record?.isEstimation && {
          title: "Estimation",
          description: (
            <Steps
              progressDot
              current={1}
              direction="vertical"
              items={[
                {
                  title: "Created At",
                  description: moment(record?.estimationDate).format(
                    "DD-MM-YYYY"
                  ),
                },
                {
                  title: "Created By",
                  description: record.estimationBy?.name,
                  subTitle: (
                    <Avatar
                      src={
                        record.estimationBy?.picture?.length > 0
                          ? record.estimationBy?.picture[0]?.url
                          : []
                      }
                    />
                  ),
                },
                {
                  title: "Status",
                  description: record.estimationStatus,
                },
              ]}
            />
          ),
        },
        record?.isQuotation && {
          title: "Quotation",
          description: (
            <Steps
              progressDot
              current={1}
              direction="vertical"
              items={[
                {
                  title: "Created At",
                  description: moment(record?.quotationDate).format("ll"),
                },
                {
                  title: "Created By",
                  description: record.quotationBy?.name,
                  subTitle: (
                    <Avatar
                      src={
                        record.quotationBy?.picture?.length > 0
                          ? record.quotationBy?.picture[0]?.url
                          : null
                      }
                    />
                  ),
                },
                {
                  title: "Status",
                  description: record.quotationStatus,
                },
              ]}
            />
          ),
        },
        record?.isSO && {
          title: "SO",
          description: (
            <Steps
              progressDot
              current={1}
              direction="vertical"
              items={[
                {
                  title: "Created At",
                  description: moment(record?.soDate).format("ll"),
                },
                {
                  title: "Created By",
                  description: record.soBy?.name,
                  subTitle: (
                    <Avatar
                      src={
                        record.soBy?.picture?.length > 0
                          ? record.soBy?.picture[0]?.url
                          : null
                      }
                    />
                  ),
                },
                {
                  title: "Status",
                  description: record.soStatus,
                },
              ]}
            />
          ),
        },
      ]}
    />
  );
};

export default LifeCycle;
