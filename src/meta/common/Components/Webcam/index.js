import React, { useRef, useState, useEffect } from "react";
import { Form, Modal, Button, Row, Select, Space } from "antd";
import Webcam from "react-webcam";
import { TbCameraPlus } from "react-icons/tb";

const WebCam = ({ form, imgSrcs, setImgSrcs }) => {
  const webcamRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [isCamOn, setIsCamOn] = useState(true);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setVideoDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    });

    return () => {
      if (webcamRef.current && webcamRef.current.stream) {
        webcamRef.current.stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrcs([...imgSrcs, imageSrc]);
  };

  const handleOk = (e) => {
    setIsCamOn(false);
    setVisible(false);
    const videoElem = document.querySelector("#webcam-video");
    if (videoElem && videoElem.srcObject) {
      videoElem.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const handleCancel = (e) => {
    setImgSrcs([]);
    setVisible(false);
    const videoElem = document.querySelector("#webcam-video");
    if (videoElem && videoElem.srcObject) {
      videoElem.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const handleDeviceChange = (deviceId) => {
    setSelectedDeviceId(deviceId);
  };

  return (
    <>
      <Button
        danger
        // type="primary"
        shape="round"
        icon={<TbCameraPlus />}
        onClick={() => setVisible(true)}
        size="large"
      >
        Take Photo
      </Button>
      <Modal
        title="Webcam Capture"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          style={{ width: "100%", marginBottom: "10px" }}
          onChange={handleDeviceChange}
          defaultValue={selectedDeviceId}
        >
          {videoDevices.map((device) => (
            <Select.Option key={device.deviceId} value={device.deviceId}>
              {device.label || `Camera ${videoDevices.indexOf(device) + 1}`}
            </Select.Option>
          ))}
        </Select>
        {isCamOn && (
          <Webcam
            id="webcam-video" // Add this line
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ deviceId: selectedDeviceId }}
            width={240}
            height={240}
          />
        )}
        <div style={{ marginTop: "10px" }}>
          <Space>
            <Button
              shape="round"
              danger={isCamOn}
              onClick={() => setIsCamOn(!isCamOn)}
              style={{ marginLeft: "10px" }}
            >
              {isCamOn ? "Stop Cam" : "Start Cam"}
            </Button>
            <Button shape="round" icon={<TbCameraPlus />} onClick={capture}>
              Capture
            </Button>
          </Space>
        </div>
        <Row>
          {imgSrcs.map((imgSrc, index) => (
            <img
              src={imgSrc}
              key={index}
              style={{ width: "100px", height: "100px", marginRight: "10px" }}
            />
          ))}
        </Row>
      </Modal>
    </>
  );
};
export default WebCam;
