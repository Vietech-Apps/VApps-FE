import { FilterOutlined } from "@ant-design/icons";
import { generate } from "@ant-design/colors";
import { Button, Image, message, Space, Table } from "antd";
import React, { useState } from "react";
import { StyledProTable } from "pages/Gatepass/Gatein/index.styled";
import PassFailModal from "../PassFailModal";
const QCProductTable = ({
  dataSource,
  setDataSource,
  d,
  setD,
  handleSelectProduct,
}) => {
  const valueEnum = dataSource?.reduce((acc, curr) => {
    acc[curr.gateIn] = { text: curr.gateIn };
    return acc;
  }, {});
  const [open, setOpen] = useState(false);
  const [s, setS] = useState();
  const columns = [
    {
      title: "Sr",
      width: "3%",
      dataIndex: "index",
      valueType: "indexBorder",
    },
    {
      title: "Code",
      dataIndex: "code",
      width: "10%",
      type: 2,
      copyable: true,
    },
    // {
    //   title: "gateIn",
    //   dataIndex: "gateIn",
    //   width: "10%",
    //   filters: true,
    //   onFilter: true,
    //   filterIcon: (filtered) => (
    //     <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    //   ),
    //   valueEnum: valueEnum,
    //   type: "0",
    // },
    {
      title: "Item",
      dataIndex: "name",
      width: "20%",
      //   editable: true,
      type: 2,
    },

    {
      title: "QTY",
      dataIndex: "deliveredQty",
      type: 2,
    },

    {
      title: "Defect",
      dataIndex: "defectedQty",
      type: 2,
    },
    {
      title: "Type",
      dataIndex: "qType",
      width: "6%",
      type: 2,
    },
    {
      title: "Act.Pref",
      render: (_, key) =>
        key.measure ||
        (key.picture.length > 0 && (
          <Image src={key.picture} height={30} width={60} />
        )) ||
        null,
      type: 2,
    },
    {
      title: "notes",
      dataIndex: "notes",
      type: 1,
    },
    {
      title: "Instructions",
      dataIndex: "instruction",
      type: 1,
    },

    {
      title: "Action",
      width: "8%",
      render: (_, r) => (
        <Space wrap size={0}>
          {r.qualityCheckStatus || (
            <>
              {/* <Button type="link" size="small" onClick={() => handlePass(r)}>
                Pass
              </Button> */}
              <Button
                type="link"
                size="small"
                onClick={() => {
                  setOpen(true);
                  setS(r);
                }}
              >
                Quality
              </Button>
            </>
          )}
        </Space>
      ),
    },
    // Table.EXPAND_COLUMN,
  ];

  function getRowClassName(record, index) {
    const cuIdGroups = {};
    let groupIndex = 1;
    dataSource.forEach((r, i) => {
      if (!cuIdGroups[r.gateIn]) {
        cuIdGroups[r.gateIn] = groupIndex;
        groupIndex += 1;
      }
    });
    groupIndex = cuIdGroups[record.gateIn];
    const colors = [
      "red",
      "pink",
      "orange",
      "gold",
      "lime",
      "green",
      "cyan",
      "blue",
      "geekblue",
      "purple",
    ];
    const startIndex = groupIndex > 1 ? 1 : 0;
    const colorIndex = (startIndex + groupIndex) % colors.length;
    const colorName = `${colors[colorIndex]}-${(index % 10) + 1}`;

    const className = `group-${groupIndex}`;
    return `${className} ${colorName} editable-row`;
  }

  const groupColors = [
    generate("red")[1],
    generate("pink")[1],
    generate("orange")[1],
    generate("gold")[1],
    generate("lime")[1],
    generate("green")[1],
    generate("cyan")[1],
    generate("blue")[1],
    generate("geekblue")[1],
    generate("purple")[1],
    generate("red")[3],
    generate("pink")[3],
    generate("orange")[3],
    generate("gold")[3],
    generate("lime")[3],
    generate("green")[3],
    generate("cyan")[3],
    generate("blue")[3],
    generate("geekblue")[3],
    generate("purple")[3],
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const onSelectChange = (newSelectedRowKeys, newSelectedRows) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRows);
  };
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  //   selections: [
  //     ...Object.values(valueEnum).map((button) => ({
  //       key: button.text,
  //       text: button.text,
  //       onSelect: () => {
  //         let selectedRows = dataSource?.filter(
  //           (item) => item.gateIn === button.text
  //         );
  //         setSelectedRowKeys(selectedRows?.map((row) => row.key));
  //         setSelectedRows(selectedRows);
  //       },
  //     })),
  //   ],
  // };

  const handlePass = async (rows) => {
    const updatedDataSource = dataSource.map((product) => {
      const matchingProduct = rows.find(
        (sProduct) => sProduct._id === product._id
      );
      if (matchingProduct) {
        return {
          ...product,
          qualityCheckStatus: "Passed",
          save: true,
        };
      } else {
        return product;
      }
    });

    setDataSource(updatedDataSource);
  };
  const handleDelete = async (rows, onCleanSelected) => {
    let filterD = dataSource?.filter(
      (dd) => !rows.some((w) => w.gateInId == dd.gateInId)
    );

    onCleanSelected();
    setDataSource(filterD);
  };

  return (
    <div>
      <StyledProTable
        locale={{ emptyText: () => "" }}
        headerTitle={
          <Space>
            Defected Pieces{" "}
            {dataSource?.reduce((accumulator, currentValue) => {
              return accumulator + currentValue.defectedQty;
            }, 0)}{" "}
            out of{" "}
            {dataSource?.reduce((accumulator, currentValue) => {
              return accumulator + currentValue.deliveredQty;
            }, 0)}
          </Space>
        }
        pagination={false}
        rowKey={(key) => key.key}
        search={false}
        size={"small"}
        // rowSelection={rowSelection}
        // components={components}
        rowClassName={getRowClassName}
        bordered
        dataSource={dataSource}
        columns={columns}
        options={{
          setting: false,
          search: false,
          density: false,
          reset: false,
          refresh: false,
          fullScreen: true,
        }}
        groupColors={groupColors}
        // footer={() => (
        //   <div>
        //     {!d?.qualityCheckStatus && (
        //       <SelectSearch
        //         handleSelect={handleSelectProduct}
        //         fields={"cuId,passType,visitorName,vehicleNo,materialType"}
        //         route={`erp/GateInPO/dsearch`}
        //         columns={[
        //           { label: "PO", size: 4, field: "cuId" },
        //           { label: "GateIn", size: 4, accessor: (e) => e.gateIn?.cuId },
        //           {
        //             label: "Products",
        //             size: 2,
        //             accessor: (e) =>
        //               e.products?.reduce((accumulator, currentValue) => {
        //                 return accumulator + currentValue.deliveredQty;
        //               }, 0),
        //           },
        //           { label: "Status", size: 2, field: "deliveredStatus" },
        //           {
        //             label: "PO By",
        //             size: 2,
        //             accessor: (e) => e.createdBy?.name,
        //           },
        //           {
        //             label: "Gate By",
        //             size: 2,
        //             accessor: (e) => e.gateIn?.createdBy?.name,
        //           },
        //           {
        //             label: "GateIn Date",
        //             size: 2,
        //             accessor: (e) =>
        //               dayjs(e.createdAt).format("DD-MM-YY hh:mm a"),
        //           },
        //         ]}
        //         placeholder="search POs"
        //       />
        //     )}
        //   </div>
        // )}
        // tableAlertRender={({ onCleanSelected }) => {
        //   let qty = selectedRows?.reduce(
        //     (pre, item) => pre + item.deliveredQty,
        //     0
        //   );
        //   const counts = countByGateIn(selectedRows);

        //   return (
        //     <Space size={12}>
        //       <span>
        //         {Object.keys(counts).length} GateIns with {qty} qunatity
        //       </span>
        //       {/* <Button
        //         size="small"
        //         type="primary"
        //         onClick={() => handlePass(selectedRows)}
        //       >
        //         Pass
        //       </Button>
        //       <Button
        //         size="small"
        //         type="primary"
        //         onClick={() => {
        //           setOpen(true);
        //           setS(selectedRows);
        //         }}
        //       >
        //         Fail
        //       </Button> */}
        //       <Button
        //         size="small"
        //         type="primary"
        //         onClick={() => handleDelete(selectedRows, onCleanSelected)}
        //       >
        //         Remove Selected GateIn
        //       </Button>
        //     </Space>
        //   );
        // }}
      />
      <PassFailModal
        open={open}
        s={s}
        setOpen={setOpen}
        d={d}
        setD={setD}
        dataSource={dataSource}
        setDataSource={setDataSource}
      />
    </div>
  );
};
export default QCProductTable;
