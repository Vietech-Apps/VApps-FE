import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Space,
  Typography,
} from "antd";
import dayjs from "dayjs";
import WebCam from "meta/common/Components/Webcam";
import errorHandler from "meta/services/auth/errorHandler";
import jwtAxios from "meta/services/auth/jwt-api";
import SelectSearch from "meta/JLayouts/SelectSearch/TableDisplay";
import React, { useState } from "react";
import { useEffect } from "react";

const CollectionCreateForm = ({
  open,
  onCreate,
  onCancel,
  s,
  setImgSrcs,
  imgSrcs,
  selectedCheck,
  setSelectedCheck,
  setIsDefected,
  isDefected,
}) => {
  const [form] = Form.useForm();

  const handleSelect = (e, option) => {
    const filterd = option?.find((d) => d._id == e);
    setSelectedCheck(filterd);
  };

  const [isIn, setIsIn] = useState();
  useEffect(() => {
    form.setFieldsValue(
      selectedCheck
        ? {
            instruction: selectedCheck?.instruction,
            ifPassFail: selectedCheck?.ifPassFail,
            notes: selectedCheck?.notes,
          }
        : {}
    );
    let x = selectedCheck?.product.find((d) => d == s.productId);
    setIsIn(x);
  }, [selectedCheck]);
  const handleOk = (status) => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values, status);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  let formProps = {
    style: { marginBottom: 0 },
    extra: (
      <Typography.Text mark>
        {!isIn && selectedCheck && "Selected Product not in Quality Point"}
      </Typography.Text>
    ),
  };
  const onChange = (e) => {
    setIsDefected(e);
  };

  return (
    <Modal
      open={open}
      width={700}
      title={s?.name}
      // okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      // onOk={() => {
      //   form
      //     .validateFields()
      //     .then((values) => {
      //       form.resetFields();
      //       onCreate(values);
      //     })
      //     .catch((info) => {
      //       console.log("Validate Failed:", info);
      //     });
      // }}
      footer={
        <Space>
          <Button key="back" onClick={onCancel}>
            Cancel
          </Button>

          <Button
            key="submit"
            type="primary"
            disabled={!selectedCheck}
            // loading={loading}
            onClick={() =>
              handleOk(
                isDefected
                  ? isDefected > s?.qty / 2
                    ? "Fail"
                    : isDefected === 0
                    ? "Pass"
                    : "Partial"
                  : "Pass"
              )
            }
          >
            {isDefected
              ? isDefected > s?.qty / 2
                ? "Fail"
                : isDefected === 0
                ? "Pass"
                : "Partial"
              : "Pass"}
          </Button>

          {!isDefected && (
            <Button
              key="submit2"
              type="primary"
              disabled={!selectedCheck}
              // loading={loading}
              onClick={() => handleOk("Fail")}
            >
              Fail
            </Button>
          )}
        </Space>
      }
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <SelectSearch
          fields={"title"}
          route={`erp/Quality/ControlPoints/dsearch`}
          label={"ControlPoints"}
          name={"controlPoints"}
          columns={[
            { label: "Control Point", size: 2, field: "title" },
            { label: "Type", size: 2, field: "type" },
            {
              label: "Team",
              size: 3,
              accessor: (data) => data.team?.title,
            },
          ]}
          placeholder="Search quality control points"
          handleSelect={handleSelect}
          formProps={formProps}
        />
        <Form.Item
          style={{ marginBottom: 0 }}
          className="form-field"
          name="defectedQty"
          label="Defected Qty (Leave Empty if not any defected peice)"
        >
          <InputNumber
            placeholder={"quantity"}
            style={{ marginBottom: 0, width: "100%" }}
            onChange={onChange}
            min={0}
            max={s?.qty}
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 0 }}
          className="form-field"
          name="instruction"
          label="Instruction"
        >
          <Input.TextArea
            placeholder={"Instruction"}
            autoSize={{ minRows: 2, maxRows: 5 }}
            showCount
          />
        </Form.Item>

        {selectedCheck?.type == "Picture" && (
          <Space>
            <Form.Item style={{ marginBottom: 0 }}>
              <WebCam form={form} imgSrcs={imgSrcs} setImgSrcs={setImgSrcs} />
            </Form.Item>
            {imgSrcs?.map((imgSrc, index) => (
              <Image
                src={imgSrc}
                key={index}
                style={{ width: "100px", height: "100px", marginRight: "10px" }}
              />
            ))}
          </Space>
        )}
        {selectedCheck?.type == "Pass Fail" && (
          <Form.Item
            style={{ marginBottom: 0 }}
            className="form-field"
            name="ifPassFail"
            label="IfPassFail"
          >
            <Input.TextArea
              placeholder={"ifPassFail"}
              autoSize={{ minRows: 2, maxRows: 5 }}
              showCount
            />
          </Form.Item>
        )}
        {selectedCheck?.type == "Measure" && (
          <Form.Item
            style={{ marginBottom: 0 }}
            className="form-field"
            name="measure"
            label="Measure"
            extra={
              <span>
                Norm {selectedCheck?.norm?.from} {selectedCheck?.norm?.to} &
                Tolerance From {selectedCheck?.tolerance?.from} to{" "}
                {selectedCheck?.tolerance?.to}
              </span>
            }
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        )}
        <Form.Item
          style={{ marginBottom: 0 }}
          className="form-field"
          name="notes"
          label="Notes"
        >
          <Input.TextArea
            placeholder={"notes"}
            autoSize={{ minRows: 2, maxRows: 5 }}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const PassFialModal = ({
  open,
  setOpen,
  s,
  d,
  setD,
  dataSource,

  setDataSource,
}) => {
  const [selectedCheck, setSelectedCheck] = useState();
  const [imgSrcs, setImgSrcs] = useState([]);
  const [isDefected, setIsDefected] = useState();
  const onCreate = async (values, status) => {
    values.qualityCheckDate = dayjs();
    const updatedDataSource = dataSource?.map((product) => {
      const matchingProduct = s._id === product._id;
      if (matchingProduct) {
        return {
          ...product,
          qualityCheckStatus: status,
          notes: values.notes,
          defectedQty: values.defectedQty,
          measure: values.measure,
          instruction: values.instruction,
          qType: selectedCheck?.type,
          picture: imgSrcs,
          po: d?.po?._id,
          save: true,
        };
      } else {
        return product;
      }
    });

    setDataSource(updatedDataSource);
    setOpen(false);
    setImgSrcs([]);
    setIsDefected();
    setSelectedCheck();
  };

  return (
    <>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        s={s}
        setImgSrcs={setImgSrcs}
        imgSrcs={imgSrcs}
        selectedCheck={selectedCheck}
        setSelectedCheck={setSelectedCheck}
        setIsDefected={setIsDefected}
        isDefected={isDefected}
      />
    </>
  );
};
export default PassFialModal;
