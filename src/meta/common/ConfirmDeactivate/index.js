import React from 'react';
import {Modal} from 'antd';

import PropTypes from 'prop-types';
import './index.style.less';

const AppConfirmationModal = ({
  open,
  onDeny,
  onConfirm,
  modalTitle,
  status,
}) => {
  return (
    <Modal
      title={modalTitle}
      open={open}
      onOk={onConfirm}
      onCancel={() => onDeny(false)}
    >
      <p className='para-text'> {`Are you sure you want to ${status}?`}</p>
    </Modal>
  );
};

AppConfirmationModal.propTypes = {
  modalTitle: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
  onDeny: PropTypes.func.isRequired,
  paragraph: PropTypes.any,
  onConfirm: PropTypes.func.isRequired,
  status: PropTypes.any.isRequired,
};

AppConfirmationModal.defaultProps = {
  paragraph: `Are you sure you want to ${status}?`,
};
export default AppConfirmationModal;
