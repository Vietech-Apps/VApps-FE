import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Radio, Tooltip } from "antd";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import IntlMessages from "meta/utility/IntlMessages";
import {
  StyledMailModalContent,
  StyledMailModalSuffix,
  StyledMailModalTextArea,
  StyledMailModalTo,
  StyledMainForm,
  StyledMainModalScrollbar,
} from "pages/apps/Mail/ComposeMail/index.styled";
import { useState } from "react";
import { RiMailSendLine } from "react-icons/ri";
import { useIntl } from "react-intl";
const CollectionCreateForm = ({ open, onCreate, onCancel, loading, data }) => {
  const [form] = Form.useForm();
  const [isShowBcc, onShowBcc] = useState(false);

  const [isShowCC, onShowCC] = useState(false);

  const { messages } = useIntl();
  console.log(data);
  return (
    <Modal
      open={open}
      title="Send By Email"
      okText="Send"
      width={800}
      cancelText="Cancel"
      onCancel={onCancel}
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <StyledMainModalScrollbar>
        <StyledMainForm
          name="basic"
          initialValues={{
            email: data?.email || data?.customer?.email || data?.vendor?.email,
          }}
          form={form}
        >
          <StyledMailModalContent>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please input email!",
                },
              ]}
            >
              <Input
                style={{ width: "100%" }}
                prefix={
                  <span className="mail-modal-prefix">
                    <IntlMessages id="common.to" />
                  </span>
                }
                suffix={
                  <StyledMailModalSuffix>
                    <span onClick={() => onShowCC(!isShowCC)}>
                      <IntlMessages id="common.cc" />
                    </span>

                    <span onClick={() => onShowBcc(!isShowBcc)}>
                      <IntlMessages id="common.bcc" />
                    </span>
                  </StyledMailModalSuffix>
                }
              />
            </Form.Item>

            {isShowCC ? (
              <Form.Item
                name="cc"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input your cc!",
                  },
                ]}
              >
                <Input placeholder={messages["common.cc"]} />
              </Form.Item>
            ) : null}

            {isShowBcc ? (
              <Form.Item
                name="bcc"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input your bcc!",
                  },
                ]}
              >
                <Input placeholder={messages["common.bcc"]} />
              </Form.Item>
            ) : null}
            <Form.Item
              name="subject"
              rules={[
                { required: true, message: "Please input your Subject!" },
              ]}
            >
              <Input placeholder={messages["common.subject"]} />
            </Form.Item>

            <Form.Item name="content">
              <StyledMailModalTextArea
                theme="snow"
                placeholder={messages["common.writeContent"]}
              />
            </Form.Item>
          </StyledMailModalContent>
        </StyledMainForm>
      </StyledMainModalScrollbar>
    </Modal>
  );
};
const ComposeEmail = ({ handleSubmit = () => {}, data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const onCreate = async (values) => {
    setLoading(true);

    try {
      values.module = data?._id;
      values.type = "email";
      const response = await jwtAxios.post(`pdf/send/quotation`, {
        ...values,
        id: data?._id,
      });
      const respon = await jwtAxios.post(`meta/ticket/create`, values);
      handleSubmit("Quotation Sent");
      setOpen(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  };
  return (
    <>
      <Tooltip title={`Send Email`} placement="bottomRight" color="cyan">
        <Button
          hidden={!data?._id || data?.rfqStatus == "Cancelled"}
          icon={<MailOutlined />}
          onClick={() => {
            setOpen(true);
          }}
        />
      </Tooltip>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
          setLoading(false);
        }}
        loading={loading}
        data={data}
      />
    </>
  );
};
export default ComposeEmail;
