import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Tooltip } from "antd";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import successHandler2 from "meta/services/auth/successHandle2";
import { BsForward } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const ProceedNext = ({
  route,
  refreshTable = () => {},
  move,
  goto,
  isTitle,
  data,
  isNext = false,
}) => {
  const navigate = useNavigate();
  const handleForward = async () => {
    const confirmed = await confirm({
      title: `Proceed to ${move}?`,
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to proceed to the ${move} stage?`,
      onOk: async () => {
        try {
          const response = await jwtAxios.put(route, data);
          refreshTable();
          if (isNext) {
            navigate(`${goto}/${response.data.quotationResult?._id}`);
          }
          successHandler2(response);
        } catch (error) {
          errorHandler(error);
        }
      },
      onCancel: () => {},
    });
  };

  return (
    <Tooltip title={`Proceed to ${move}?`} color="cyan">
      <Button
        onClick={handleForward}
        key={"forward"}
        icon={isTitle ? "" : <BsForward />}
      >
        {isTitle && `Proceed to ${move}?`}
      </Button>
    </Tooltip>
  );
};

export default ProceedNext;
