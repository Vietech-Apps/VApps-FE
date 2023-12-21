import AppPageMetadata from "meta/core/AppPageMetadata";
import { reconcileInfo, route2 } from "./Codes";
import { Col, Row, Dropdown, Space } from "antd";
import {
  StyledAccountStatement,
  StyledMetaForm,
  StyledTabs,
} from "meta/common/FormFeilds/index.styled";
import FormLayout from "meta/JLayouts/Layout";
import BankStatements from "./BankStatements";
import Reconcile from "./Reconcile";
import Transactions from "./Transactions";
import PrintCheck from "./Check/Check";
import { useGetData } from "meta/services/auth/ezAPI";
import { DownOutlined } from "@ant-design/icons";
import { getData } from "meta/common/Apis";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dataInfo } from "../BankAccounts/Codes";
import UploadStatement from "./UploadStatement";
import { StyledDropDown } from "../index.styled";
export default function Main() {
  const { id } = useParams();

  const [selected, setSelected] = useState();
  useEffect(() => {
    if (id) getData(`${dataInfo.dataRoute}/read/${id}`, setSelected);
  }, [id]);

  const [{ apiData: transactions }] = useGetData(`${route2}/filteredData`, [], {
    bankAcc: id,
    status: "Unreconciled",
  });
  const items = [
    {
      label: `Reconcile (${transactions?.length})`,
      key: 1,
      children: (
        <>
          <Reconcile id={id} transactions={transactions} />
        </>
      ),
    },
    // {
    //   label: "Bank Statements",
    //   key: 3,
    //   children: (
    //     <>
    //       <BankStatements id={id} transactions={transactions} />
    //     </>
    //   ),
    // },
    // {
    //   label: "Transactions",
    //   key: 5,
    //   children: <Transactions />,
    // },
    {
      label: "Import Statement",
      key: 4,
      children: <UploadStatement id={id} />,
    },
    {
      label: "Cheque Printing",
      key: 2,
      children: <PrintCheck id={id} />,
    },
  ];

  return (
    <>
      <AppPageMetadata title={reconcileInfo.metaData} />
      <FormLayout
        codes={reconcileInfo}
        footerComponent={false}
        tabItems={items}
      >
        <StyledMetaForm>
          <StyledAccountStatement>
            <Row gutter={24} className="mb-5">
              <Col xs={24} sm={12}>
                <div className="font-bold ">Bank Accounts</div>
                <div className="flex items-start">
                  <StyledDropDown
                    menu={{
                      transactions,
                    }}
                    disabled
                    trigger={["click"]}
                  >
                    <a onClick={(e) => e.preventDefault()} className="text-xl">
                      <Space className="  font-bold text-blue-500">
                        {selected?.accountHolderName}
                        <DownOutlined />
                      </Space>
                    </a>
                  </StyledDropDown>
                  <div className="font-bold text pl-3 mt-2">
                    {selected?.accountNumber}
                  </div>
                </div>
              </Col>
              <Col
                xs={24}
                sm={12}
                className="flex gap-5"
                style={{ gap: "6rem" }}
              >
                <div>
                  <div className="font-bold">Balance in Software</div>
                  <div className="text-green-500 text-2xl font-bold">
                    $32323
                  </div>
                </div>
                <div className="">
                  <div className="font-bold">Statement Balance</div>
                  <div className="text-blue-500 text-2xl font-bold">$8315</div>
                </div>
              </Col>
            </Row>
            <Row></Row>
          </StyledAccountStatement>
        </StyledMetaForm>
      </FormLayout>
    </>
  );
}
