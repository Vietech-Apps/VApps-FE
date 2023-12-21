import {
  Button,
  Collapse,
  Dropdown,
  Form,
  Space,
  Spin,
  Switch,
  Tooltip,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import FormLayout from "meta/JLayouts/Layout";
import AddPanel from "./Components/AddPanel";
import AddPrices from "./Components/Prices";
import { getIconByName } from "meta/common/AppIcons";
import LogDrawer from "./EstTable/LogDrawer";
import Main from "./Components/Main";
import moment from "moment";
import jwtAxios from "meta/services/auth/jwt-api";
import errorHandler from "meta/services/auth/errorHandler";
import FooterTab from "meta/JLayouts/FooterComponent/FooterTab";
import CustomerComponent from "meta/JLayouts/CustomerComponent";
import ComposeEmail from "meta/JLayouts/ComposeEmail/ComposeEmail";
import { useGetData } from "meta/services/auth/ezAPI";
import { useAuthUser } from "meta/utility/AuthHooks";
import PanelTechs from "../pdf/PanelTechs";
import { getStatusTag } from "meta/common/status";
import { AiOutlineSave } from "react-icons/ai";
import { ReloadOutlined, RestOutlined } from "@ant-design/icons";
import PanelQuote from "../pdf/PanelQuote";
import { MdOutlineCancelScheduleSend } from "react-icons/md";
import { FaTrashRestore } from "react-icons/fa";
import { dataInfo } from "./code";
const Estimation = () => {
  const [form] = Form.useForm();
  const { user } = useAuthUser();
  const [selectedCustomer, setSelectedCustomer] = useState();
  const { id } = useParams();
  const [
    { apiData: estimation, loading: newLoading },
    { setData: setEstimation, setRefreshing },
  ] = useGetData(`erp/Enquiry/read/${id}`, []);
  const [
    { apiData: panels, loading: panelLoading },
    { setData: setPanels, setRefreshing: setPanelsRefreshing },
  ] = useGetData(`erp/panel/readall/${id}`, []);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState();
  const [whatClick, setWhatClick] = useState();

  const panelSave = async (p) => {
    try {
      const response = await jwtAxios.put(`erp/panel/update/${p?._id}`, p);
      setPanels((prevPanels) => {
        const updatedPanels = prevPanels.map((panel) => {
          if (panel._id === p._id) {
            return response.data.result;
          }
          return panel;
        });
        return updatedPanels;
      });
    } catch (error) {
      errorHandler(error);
    }
  };
  const saveRevision = async () => {
    try {
      const response = await jwtAxios.post(`erp/Estimation/revision/${id}`, {});
      if (response.data.success == true) {
        setRefreshing(true);
        message.success("New Revision created successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const activeRevision = async (revisionId) => {
    try {
      const response = await jwtAxios.post(`erp/Estimation/actRevision/${id}`, {
        revisionId,
      });
      if (response.data.success == true) {
        setRefreshing(true);
        setPanelsRefreshing(true);
        message.success("Successfully changed the version");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const UpdatePanels = () => {
    panels?.map((p) => {
      if (p.save) panelSave(p);
    });
  };

  const handleComplete = async (status) => {
    setLoading(true);
    setWhatClick(status);
    const values = form.getFieldsValue();

    try {
      const response = await jwtAxios.put(
        `${dataInfo.dataRoute}/update/${id}`,
        {
          estimationStatus: status,
          isComplete:
            status == "Quotation Sent"
              ? true
              : status === "Sale Order"
              ? true
              : false,

          isSO: status == "Sale Order" ? true : false,
          soStatus: status == "Sale Order" ? status : "",
          soDate: status == "Sale Order" ? dayjs().format("DD-MM-YYYY") : "",
          soBy: status == "Sale Order" ? user?._id : null,
          ...values,
        }
      );
      setEstimation(response.data.result);
      setLoading(false);
      UpdatePanels();
      setChecked(response.data.result.isComplete);
      // navigate("/sales/Estimation");
    } catch (error) {
      errorHandler(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setSelectedCustomer(estimation?.customer);
    form.setFieldsValue({
      clientName: estimation?.customer?.title,
      billingAddress: estimation?.billingAddress,
      orderDate: estimation?.orderDate
        ? dayjs(estimation?.orderDate, "YYYY-MM-DD")
        : moment(),
      expectedShipmentDate: estimation?.expectedShipmentDate
        ? dayjs(estimation?.expectedShipmentDate, "YYYY-MM-DD")
        : moment(),
      expirationDate: estimation?.expirationDate
        ? dayjs(estimation?.expirationDate, "YYYY-MM-DD")
        : moment(),
      ReferenceNo: estimation?.ReferenceNo,
    });
    setChecked(estimation?.isComplete);
  }, [estimation]);

  const items = estimation?.revisions?.map((revision) => ({
    label: `Open Revision {${revision.revisionId}}`,
    key: revision.revisionId,
    onClick: () => activeRevision(revision.revisionId),
    icon: <AiOutlineSave />,
  }));
  if (newLoading || panelLoading) {
    return <Spin />;
  } else {
    return (
      <>
        <FormLayout
          codes={dataInfo}
          revision={estimation?.currentRevision}
          docData={estimation}
          extra={
            <Dropdown.Button
              // type="primary"
              onClick={() => saveRevision()}
              menu={{
                items,
              }}
            >
              Mark As Revision
            </Dropdown.Button>
          }
          extraStep={[
            <Space.Compact block key={"j"}>
              {estimation?.isComplete && (
                <Switch
                  disabled={!estimation?.isComplete}
                  checked={checked}
                  loading={whatClick == "Estimation" && loading}
                  onChange={(e) => handleComplete("Estimation")}
                  checkedChildren="Edit"
                />
              )}
              <Tooltip title="Refresh">
                <Button
                  onClick={() => {
                    setRefreshing(true);
                    setPanelsRefreshing(true);
                  }}
                  icon={<ReloadOutlined />}
                ></Button>
              </Tooltip>
              <AddPrices
                panels={panels}
                disabled={estimation?.estimationStatus == "Cancelled"}
                setPanels={setPanels}
                estimation={estimation}
                setEstimation={setEstimation}
              />
              {estimation?.loCuPrice && (
                <AddPanel
                  panels={panels}
                  disabled={estimation?.estimationStatus == "Cancelled"}
                  setPanels={setPanels}
                  isCreate={true}
                  estimation={estimation}
                />
              )}

              {panels?.length > 0 && (
                <>
                  <Tooltip title={`Save`} placement="bottomRight">
                    <Button
                      type="primary"
                      hidden={estimation?.estimationStatus == "Cancelled"}
                      icon={<AiOutlineSave />}
                      onClick={() =>
                        handleComplete(estimation?.estimationStatus)
                      }
                      loading={
                        whatClick == estimation?.estimationStatus && loading
                      }
                    />
                  </Tooltip>

                  <Tooltip title="Analytics">
                    <Button
                      onClick={() => {
                        navigate(`/sales/analytic/${id}`);
                      }}
                      icon={getIconByName("analytic")}
                    />
                  </Tooltip>
                  <PanelTechs
                    panels={panels}
                    disabled={estimation?.estimationStatus == "Cancelled"}
                    handleComplete={handleComplete}
                    estimation={estimation}
                  />
                  <PanelQuote
                    panels={panels}
                    disabled={estimation?.estimationStatus == "Cancelled"}
                    title={
                      estimation?.estimationStatus == "Sale Order"
                        ? "Sale Order"
                        : "Quotation"
                    }
                    handleComplete={handleComplete}
                    estimation={estimation}
                  />
                  <Tooltip
                    title={`Convert to Sale Order`}
                    placement="bottomRight"
                  >
                    <Button
                      hidden={
                        estimation?.estimationStatus == "Sale Order" ||
                        estimation?.estimationStatus == "Cancelled"
                      }
                      onClick={() => handleComplete("Sale Order")}
                      loading={whatClick == "Sale Order" && loading}
                    >
                      Confirm
                    </Button>
                  </Tooltip>
                  {estimation?.estimationStatus !== "Cancelled" && (
                    <ComposeEmail
                      data={estimation}
                      handleSubmit={handleComplete}
                    />
                  )}
                </>
              )}

              <Tooltip title={`Cancel`} placement="bottomRight">
                <Button
                  hidden={estimation?.estimationStatus == "Cancelled"}
                  icon={<MdOutlineCancelScheduleSend />}
                  onClick={() => handleComplete("Cancelled")}
                  loading={whatClick == "Cancelled" && loading}
                />
              </Tooltip>
              <Tooltip title={`Restore to Estimation`} placement="bottomRight">
                <Button
                  hidden={estimation?.estimationStatus !== "Cancelled"}
                  icon={<FaTrashRestore />}
                  onClick={() => handleComplete("Estimation")}
                  loading={whatClick == "Estimation" && loading}
                />
              </Tooltip>
              <LogDrawer key="activity" name={panels.map((p) => p._id)} />
            </Space.Compact>,
          ]}
        >
          <Collapse bordered={false} size="small" defaultActiveKey={["2"]}>
            <Collapse.Panel
              key={"1"}
              header={
                <span>
                  Customer: {selectedCustomer?.title}
                  {selectedCustomer?.email
                    ? `Email: ${selectedCustomer?.email}`
                    : ""}
                  {selectedCustomer?.phone
                    ? `Phone: ${selectedCustomer?.phone}`
                    : ""}
                </span>
              }
              // extra={
              //   <Space>
              //     <Typography.Text>Credit Limit:123 </Typography.Text>
              //     <Typography.Text>Balance:123 </Typography.Text>
              //   </Space>
              // }
            >
              <CustomerComponent
                form={form}
                data={estimation}
                selectedCustomer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
              />
            </Collapse.Panel>
          </Collapse>
          <Main
            form={form}
            panels={panels}
            setPanels={setPanels}
            estimation={estimation}
            setEstimation={setEstimation}
          />
        </FormLayout>
      </>
    );
  }
};

export default Estimation;
