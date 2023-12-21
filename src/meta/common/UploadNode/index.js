import { CloudDownloadOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import jwtAxios from "meta/services/auth/jwt-api";
import { getIconByName } from "../AppIcons";
import { error, success } from "../fns";
const UploadNode = ({ folder, ...props }) => {
  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 5;

    if (!isLt2M) {
      error("Image must smaller than 5MB!");
    }

    return isLt2M || Upload.LIST_IGNORE;
  };
  const onRemove = (info) => {
    async function getArticles() {
      try {
        const params = {
          path: info.url.split(".com/")[1],
        };
        const response = await jwtAxios.delete(`s3/link/s3delete`, {
          params,
        });

        success(response.data);
      } catch (error) {
        console.log("error", error);
        // messages.error(error.response.data)
      }
    }
    // }
    getArticles();
  };
  return (
    <Upload
      name="image"
      action={`/api/s3/link/uploadimage?folder=${folder}`}
      listType="picture"
      onPreview={onPreview}
      beforeUpload={beforeUpload}
      onRemove={onRemove}
      {...props}
    >
      <Button icon={getIconByName("attachment")}>Attachments</Button>
    </Upload>
  );
};

export default UploadNode;
