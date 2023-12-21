import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import AntdImgCrop from "antd-img-crop";
import jwtAxios from "meta/services/auth/jwt-api";

import { error, success } from "../fns";
const ImageUpload = ({ name, folder, ...props }) => {
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
    imgWindow?.document?.write(image.outerHTML);
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
    // <AntdImgCrop>
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
    // </AntdImgCrop>
  );
};

export default ImageUpload;
