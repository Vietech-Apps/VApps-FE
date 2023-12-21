import { Avatar, Button, Form, Input, Row, Col, Upload } from "antd";
import { Comment } from "@ant-design/compatible";
import jwtAxios from "meta/services/auth/jwt-api";
import { useAuthUser } from "meta/utility/AuthHooks";
import React, { useState } from "react";
import { getUserAvatar } from "meta/common/MyFns";
import { normFile } from "meta/common/fns";
import FileUpload from "meta/common/FormFeilds/FileUpload";
import errorHandler from "meta/services/auth/errorHandler";
import { StyledMetaForm } from "meta/common/FormFeilds/index.styled";

const { TextArea } = Input;

const FooterComments = ({
  task,
  setTask,
  folder,
  id,
  handleSubmit,
  setTaskId,
}) => {
  const [submitting, setSubmitting] = useState(false);

  const [form] = Form.useForm();
  const handleSubmits = async (values, respon) => {
    setSubmitting(true);
    try {
      values.createdBy = user?._id;
      values.id = id || respon?._id;
      values.module = folder;
      values.type = "comments";
      const response = await jwtAxios.post(`meta/Logs/create`, values);
      if (response.data.success == true) {
        setTask([response.data.result, ...task]);
        form.resetFields();
        setSubmitting(false);
      }
    } catch (error) {
      setSubmitting(false);
      errorHandler(error);
    }
  };

  const { user } = useAuthUser();
  const handleButtonClick = async (values) => {
    if (!id) {
      setSubmitting(true);
      const response = await handleSubmit();
      console.log(response);
      if (response !== null) {
        setTaskId(response._id);
        await handleSubmits(values, response);
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    } else {
      await handleSubmits(values);
    }
  };
  return (
    <>
      <Comment
        content={
          <StyledMetaForm onFinish={handleButtonClick} form={form}>
            <Row gutter={24}>
              <Col md={18}>
                <Col md={24}>
                  {user?.picture?.length > 0 ? (
                    <Avatar src={user.picture[0]?.url} />
                  ) : (
                    <Avatar> {getUserAvatar(user)}</Avatar>
                  )}
                  <Form.Item name="message">
                    <TextArea rows={3} />
                  </Form.Item>
                </Col>
                <Col md={24}>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      loading={submitting}
                      type="primary"
                    >
                      Add Comment
                    </Button>
                  </Form.Item>
                </Col>
              </Col>
              <Col md={6} className="flex gap-2">
                <Form.Item
                  name={"attachments"}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  className="ml-3"
                >
                  <FileUpload folder={folder} />
                </Form.Item>
              </Col>
            </Row>
          </StyledMetaForm>
        }
      />
    </>
  );
};
export default FooterComments;
