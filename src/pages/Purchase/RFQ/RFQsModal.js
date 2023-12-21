import { ProTable } from "@ant-design/pro-components";
import { Button, message, Modal, Space, Table, Tag } from "antd";
import getColumnSearchProps from "meta/Reusable/getColumnSearchProps";
import getColumnSearchPropsCustom from "meta/Reusable/getColumnSearchPropsCustom";
import { useGetData } from "meta/services/auth/ezAPI";
import jwtAxios from "meta/services/auth/jwt-api";

import { useRef, useState } from "react";

const RFQsModal = ({ data, setAlternative, alternative, setReqData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const actionRef = useRef();
  const refreshTable = () => actionRef?.current?.reload();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "cuId",
      width: 120,
      key: "cuId",
      fixed: "left",
      ...getColumnSearchProps("cuId", true),
    },
    {
      title: "Vendor Detail",
      key: "vendor",
      width: 350,
      ...getColumnSearchPropsCustom("vendor", true),
    },
    { title: "Status", dataIndex: "status", key: "status" },
  ];
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const handleSelected = async (e, keys, onCleanSelected) => {
    let x = e.map((d) => ({
      alternativeId: data?._id,
      isAlternative: true,
      ...d,
    }));
    const response = await jwtAxios.put("erp/RFQ/bulk/update", {
      ids: keys,
      data: { isAlternative: true, alternativeId: data?._id },
    });
    const respon = await jwtAxios.put(`erp/RFQ/update/${data?._id}`, {
      isAlternative: true,
    });
    setReqData(respon.data.result);
    setAlternative([...alternative, ...x]);
    handleCancel();
    onCleanSelected();
    refreshTable();
  };
  const getCheckboxProps = (record) => ({
    disabled: alternative?.find(
      (p) => p._id == record._id || data?._id == record._id
    ),
  });
  return (
    <>
      <Button
        type="link"
        onClick={() => {
          !data?._id ? message.info("select vendor") : showModal();
        }}
        size="small"
      >
        Link to exsiting RFQs
      </Button>
      <Modal
        width={1100}
        title="Exsiting RFQs"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        <ProTable
          actionRef={actionRef}
          rowKey={(p) => p._id}
          pagination={{
            pageSizeOptions: [10, 20, 30, 50],
            showQuickJumper: true,
            showSizeChanger: true,
            pageSize: pageSize,
          }}
          rowSelection={{
            getCheckboxProps,
            selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          }}
          tableAlertRender={({
            selectedRowKeys,
            selectedRows,
            onCleanSelected,
          }) => {
            return (
              <Space size={24}>
                <span>
                  Select {selectedRowKeys.length} item
                  <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                    cancel selection
                  </a>
                  <Button
                    type="link"
                    onClick={() => {
                      selectedRows?.length == 0
                        ? message.info("please select RFQs")
                        : handleSelected(
                            selectedRows,
                            selectedRowKeys,
                            onCleanSelected
                          );
                    }}
                  >
                    Insert into RFQ
                  </Button>
                  Disabled items are already into list
                </span>
              </Space>
            );
          }}
          onShowSizeChange={(current, size) => {
            setPageSize(size);
            setCurrent(current);
          }}
          columns={columns}
          size="small"
          search={false}
          request={async (params = { pageSize, current }, sort, filter) => {
            const res = await jwtAxios.get(`erp/RFQ/proList`, {
              params,
            });

            const filteredData = res.data?.data?.filter(
              (item) => item._id !== data?._id && item.status !== "Cancelled"
            );
            delete res.data[data];
            const result = { data: filteredData, ...res.data?.data };

            return result;
          }}
          toolBarRender={false}
          params={{ isAlternative: false }}
        />
      </Modal>
    </>
  );
};
export default RFQsModal;
