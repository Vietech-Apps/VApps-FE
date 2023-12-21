import ProTableComponent from "meta/JLayouts/ProTable";
import AppPageMetadata from "meta/core/AppPageMetadata";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { JEInfo } from "./Codes";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Table, Tooltip } from "antd";
import getColumnSearchProps from "meta/Reusable/getColumnSearchProps";
import getColumnSearchPropsCustom from "meta/Reusable/getColumnSearchPropsCustom";
import { generate } from "@ant-design/colors";
export default function ListTable() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get("status");
  const columns = [
    {
      title: "ID",
      width: "3%",
      key: "cuId",
      fixed: "left",
      valueType: "string",
      dataIndex: "id",
    },
    {
      title: "Partner",
      key: "contact",
      render: (_, r) => r.contact.title,
      ...getColumnSearchPropsCustom("contact", true),
      width: "12%",
    },
    {
      title: "Account",
      key: "account",
      render: (_, r) => r.accountId?.code + "-" + r.accountId?.name,
      width: "12%",
    },
    {
      title: "Reference",
      key: "reference",
      dataIndex: "reference",
      width: "10%",
      ...getColumnSearchProps("reference", false),
    },
    {
      title: "Credit",
      key: "credit",
      dataIndex: "credit",
      width: "6%",

      valueType: "digit",
    },
    {
      title: "Debit",
      key: "debit",
      width: "6%",
      dataIndex: "debit",
      valueType: "digit",
    },
    {
      title: "Notes",
      key: "notes",
      dataIndex: "notes",
      width: "12%",
      ellipsis: true,
      ...getColumnSearchProps("notes", false),
    },
  ];

  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  console.log(tableData);
  function getRowClassName(record, index) {
    const cuIdGroups = {};
    let groupIndex = 1;
    tableData?.data?.forEach((r, i) => {
      if (!cuIdGroups[r.reference]) {
        cuIdGroups[r.reference] = groupIndex;
        groupIndex += 1;
      }
    });
    groupIndex = cuIdGroups[record.reference];
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
  return (
    <>
      <AppPageMetadata title={JEInfo.metaData} />
      <ProTableComponent
        codes={JEInfo}
        newPageSize={50}
        columns={columns}
        search={search}
        setSearch={setSearch}
        setTableData={setTableData}
        menu={true}
        status={"status"}
        otherParams={{ status: status }}
        customId={true}
        other={{
          summary: () => (
            <Table.Summary fixed={"top"}>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4}></Table.Summary.Cell>
                <Table.Summary.Cell index={10}>
                  {" "}
                  {tableData?.totalCredit}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={11}>
                  {" "}
                  {tableData?.totalDebit}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2} colSpan={3}></Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          ),
          sticky: true,
          groupColors: groupColors,
          rowClassName: getRowClassName,
        }}
      />
    </>
  );
}
