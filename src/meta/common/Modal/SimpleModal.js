import {Modal} from 'antd';
import React from 'react';

const SimpleModal = ({open, setOpen, title, body, width, top}) => {
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      width={width}
      style={{top: top}}>
      {body}
    </Modal>
  );
};

export default SimpleModal;
