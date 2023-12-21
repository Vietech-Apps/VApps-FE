import React, { useRef, useState } from "react";
import { Form, Button } from "antd";
import SignatureCanvas from "react-signature-canvas";
import { StyledContentDiv } from "./index.style";

const DigitalSignature = ({ form }) => {
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const sigPad = useRef(null);

  const handleSave = () => {
    form.setFieldsValue({ signature: trimmedDataURL });
  };

  const handleClear = () => {
    sigPad.current.clear();
    setTrimmedDataURL(null);
  };

  return (
    <Form>
      <Form.Item label="Digital Signature">
        <StyledContentDiv>
          <SignatureCanvas
            penColor="green"
            canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
            ref={sigPad}
            onEnd={() =>
              setTrimmedDataURL(
                sigPad.current.getTrimmedCanvas().toDataURL("image/png")
              )
            }
          />
        </StyledContentDiv>
        <div>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClear} style={{ marginLeft: "10px" }}>
            Clear
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default DigitalSignature;
