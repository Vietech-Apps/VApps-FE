import React from "react";
import { Modal, Button, Tooltip } from "antd";
import { BsForward } from "react-icons/bs";
import successHandler from "meta/services/auth/successHandler";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import moment from "moment";
import { useAuthUser } from "meta/utility/AuthHooks";

const CustomModal = ({ visible, onOk, onCancel, onThirdOption }) => {
  return (
    <Modal
      open={visible}
      title="Proceed to next stage"
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onOk} type="primary">
          Proceed to Estimation
        </Button>,
        <Button key="cancel" onClick={onThirdOption} type="primary">
          Proceed to Quotation
        </Button>,
        <Button key="submit" onClick={onCancel}>
          Cancel
        </Button>,
      ]}
    >
      <p>Please select the next stage you want to proceed to.</p>
    </Modal>
  );
};

const ForwardToNext = ({
  route,
  refreshTable,
  status,
  tooltipTitle,
  disabled = false,
}) => {
  const [visible, setVisible] = React.useState(false);
  const { user } = useAuthUser();
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    await jwtAxios
      .put(route, {
        status: "Estimation",
        current: 1,
        estimationDate: moment().format("YYYY-MM-DD"),
        isEstimation: true,
        estimationBy: user?._id,
      })
      .then((response) => {
        refreshTable();
        successHandler(response);
      })
      .catch((error) => {
        errorHandler(error);
      });
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleThirdOption = async () => {
    await jwtAxios
      .put(route, {
        status: "Quotation",
        current: 2,
        quotationDate: moment().format("YYYY-MM-DD"),
        isQuotation: true,
        quotationBy: user?._id,
      })
      .then((response) => {
        refreshTable();
        successHandler(response);
      })
      .catch((error) => {
        errorHandler(error);
      });
    setVisible(false);
  };

  return (
    <>
      <Tooltip title={tooltipTitle}>
        <Button
          disabled={disabled}
          onClick={showModal}
          key="forward"
          size="small"
          type="text"
          icon={<BsForward />}
        ></Button>
      </Tooltip>
      <CustomModal
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        onThirdOption={handleThirdOption}
      />
    </>
  );
};

export default ForwardToNext;
