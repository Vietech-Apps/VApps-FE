import { Avatar, List, Tooltip, Upload } from "antd";
import moment from "moment";
import { CloudDownloadOutlined } from "@ant-design/icons";
import jwtAxios from "meta/services/auth/jwt-api";
import React from "react";
import { Comment } from "@ant-design/compatible";
import { useState } from "react";
import SimpleModal from "meta/common/Modal/SimpleModal";

const CommentListing = ({ comments }) => {
  const handleDownlaod = (info) => {
    const url = window.URL.createObjectURL(new Blob([info.name]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", `${info.name}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  const onRemove = (info, item) => {
    async function getArticles() {
      try {
        const params = {
          path: info.path,
          id: item,
          Id: info?._id,
        };
        await jwtAxios.delete(`comments/deleteAttachments`, {
          params,
        });
      } catch (error) {
        console.log("error", error);
      }
    }
    getArticles();
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  return (
    <div style={{ margin: "3px", padding: "2px" }}>
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(item) => (
          <React.Fragment key={item._id}>
            <Comment
              size="small"
              author={item.createdBy?.name}
              avatar={
                <Avatar src={item.createdBy?.picture[0]?.url} alt="Han Solo" />
              }
              content={
                <>
                  {item.description}
                  {item.attachments?.length > 0 && (
                    <span key="comment-list-reply-to-0">
                      <Upload
                        onPreview={handlePreview}
                        onDownload={handleDownlaod}
                        onRemove={(info) => onRemove(info, item._id)}
                        showUploadList={{
                          showDownloadIcon: true,
                          downloadIcon: <CloudDownloadOutlined />,
                          showRemoveIcon: true,
                        }}
                        key={item._id}
                        listType="picture"
                        defaultFileList={item.attachments}
                        className="upload-list-inline"
                      ></Upload>
                      {/* )} */}
                    </span>
                  )}
                </>
              }
              // datetime={
              //   <Tooltip title={moment(item.createdAt).fromNow()}>
              //     <span>{moment(item.createdAt).fromNow()}</span>
              //   </Tooltip>
              // }
            />
          </React.Fragment>
        )}
      />
      <SimpleModal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        setOpen={setPreviewOpen}
        body={
          <img
            alt="example"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        }
      />
    </div>
  );
};

export default CommentListing;
