import { Button, Modal } from "antd";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler2 from "meta/services/auth/successHandle2";
import { useState } from "react";
import AlternativeTable from "./AlternativeTable";
const ConfirmAlternativeModal = ({
  open,
  setOpen,
  setReqData,
  data,
  setAlternative,
  alternative,
  handleSubmit,
}) => {
  const [loading, setLoading] = useState(false);

  const handleOk = async (status, isAlternative) => {
    setLoading(true);
    try {
      const response = await jwtAxios.put(`erp/RFQ/bulk/update`, {
        ids: alternative?.map((p) => p._id),
        data: { rfqStatus: status, isAlternative },
      });
      setAlternative((prevState) => {
        const updatedAlternative = prevState?.map((item) => {
          if (alternative?.some((p) => p._id === item._id)) {
            return {
              ...item,
              rfqStatus: status,
              isAlternative,
              isKeep: isAlternative,
            };
          }
          return item;
        });
        return updatedAlternative;
      });
      handleSubmit("PO");
      setLoading(false);
      successHandler2(response);
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  // console.log(alternative);
  return (
    <>
      <Modal
        width={1100}
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => handleOk("RFQ", true)}
          >
            Keep Alternatives
          </Button>,
          <Button
            key="link"
            type="primary"
            loading={loading}
            onClick={() => handleOk("Cancelled", false)}
          >
            Cancel Alternatives
          </Button>,
        ]}
      >
        <AlternativeTable
          setReqData={setReqData}
          data={data}
          isModal={false}
          setAlternative={setAlternative}
          alternative={alternative?.filter(
            (p) => p.rfqStatus !== "Cancelled" && p.isKeep == false
          )}
        />
      </Modal>
    </>
  );
};
export default ConfirmAlternativeModal;
