import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";

import jwtAxios from "meta/services/auth/jwt-api";

import { error, success } from "../fns";
const FileUpload = ({ name, folder, ...props }) => {
  const onPreview = async (file) => {
    let src = file.url;
    if (file.type !== "application/pdf") {
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
    } else {
      const embed = `<iframe src="${src}" width="100%" height="500px" frameborder="0"></iframe>`;
      const embedWindow = window.open("");
      embedWindow?.document.write(embed);
    }
  };

  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 10;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const isAllowedType = allowedTypes.includes(file.type);

    if (!isAllowedType) {
      error("Only PDF, JPEG, PNG, and GIF files are allowed!");
    }

    if (!isLt2M) {
      error("File must be smaller than 10MB!");
    }

    return (isAllowedType && isLt2M) || Upload.LIST_IGNORE;
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
      listType="picture-card"
      className="avatar-uploader"
      onPreview={onPreview}
      beforeUpload={beforeUpload}
      onRemove={onRemove}
      {...props}
    >
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>{name}</div>
      </div>
    </Upload>
  );
};

export default FileUpload;
