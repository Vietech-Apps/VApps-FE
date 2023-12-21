import { CloseOutlined } from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import errorHandler from "meta/services/auth/errorHandler";
import { useGetData } from "meta/services/auth/ezAPI";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler2 from "meta/services/auth/successHandle2";
import React, { useEffect } from "react";
import RFQsModal from "./RFQsModal";

const AlternativeTable = ({
  data,
  alternative,
  setAlternative,
  setReqData,
  isModal = true,
}) => {
  // const [{ apiData: alternatives, loading }, { setRefreshing, setData }] =
  //   useGetData(`erp/RFQ/alternative/${data?._id}`, []);
  // useEffect(() => {
  //   setAlternative(alternatives);
  //   setRefreshing(true);
  // }, [alternative]);
  const handleDelete = async (record) => {
    try {
      const response = await jwtAxios.put(`erp/RFQ/update/${record._id}`, {
        rfqStatus: "Cancelled",
      });

      setAlternative((prevAlternative) => {
        const index = prevAlternative.findIndex(
          (item) => item._id === record._id
        );
        if (index === -1) {
          // item not found in alternativeData array
          return prevAlternative;
        } else {
          const updatedAlternative = [...prevAlternative];
          updatedAlternative[index] = response.data.result;
          return updatedAlternative;
        }
      });
      successHandler2(response);
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <Table
      size="small"
      // loading={loading}
      dataSource={alternative?.filter((p) => p._id !== data?._id)}
      rowKey={(key) => key._id}
      columns={[
        {
          title: "ID",
          dataIndex: "cuId",
          width: 120,
          key: "cuId",
          fixed: "left",
          render: (Id) => <Tag color="#87d068">{Id}</Tag>,
        },
        {
          title: "Vendor Detail",
          key: "vendor",
          width: 350,
          render: (key) => <span key={key._id}>{key.vendor?.title}</span>,
        },
        {
          title: "Expacted Date",
          key: "date",
          width: 100,
          dataIndex: "",
        },
        { title: "Status", dataIndex: "rfqStatus", key: "status", width: 100 },
        {
          key: "action",
          render: (record) => (
            <Button
              hidden={record.rfqStatus == "Cancelled"}
              icon={<CloseOutlined />}
              type={"text"}
              onClick={() => handleDelete(record)}
            ></Button>
          ),
          width: 20,
        },
      ]}
      footer={() =>
        isModal && (
          <RFQsModal
            data={data}
            setAlternative={setAlternative}
            alternative={alternative}
            setReqData={setReqData}
          />
        )
      }
      pagination={false}
    />
  );
};

export default AlternativeTable;
