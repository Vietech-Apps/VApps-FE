import React, {useState} from 'react';
import {CarOutlined, EditTwoTone} from '@ant-design/icons';
import {Button, Space, Typography, Modal, Tooltip} from 'antd';
import AppTableContainer from 'meta/core/AppTableContainer';
import {useAuthUser} from 'meta/utility/AuthHooks';
import moment from 'moment';
const Tables = ({listData, handleSelected, loading}) => {
  const {user} = useAuthUser();
  const handleCancel = () => setPreviewVisible(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const handleViewAvatar = async (key) => {
    setPreviewImage(key.file[0].thumbUrl);
    setPreviewVisible(true);
    setPreviewTitle('Vehicle Avatar');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case false: {
        return '#E2A72E';
      }
      case true: {
        return '#43C888';
      }
      default: {
        return '#E2A72E';
      }
    }
  };

  const columns = [
    {
      title: 'ID',
      key: '_id',
      render: (Id) => <span className='order-id'>{Id.Id}</span>,
    },
    {
      title: 'Type',
      key: 'type',
      render: (elm) => (
        <span
          className='text-capitalize bold'
          style={{
            color: '#520339',
          }}>
          {elm.title}
        </span>
      ),
    },

    {
      title: 'Alert',
      key: 'status',
      render: (status) => (
        <span
          style={{
            color: getStatusColor(status.alert),
            backgroundColor: getStatusColor(status.alert) + '44',
          }}
          className='badge'>
          {status.alert ? 'True' : 'False'}
        </span>
      ),
    },
    {
      title: 'Description',
      key: 'description',
      render: (elm) => (
        <span className='text-capitalize'>{elm.description}</span>
      ),
    },
    {
      title: 'Created',
      key: '_id',
      render: (elm) => (
        <span>{moment(elm.createdAt).format('MM-D-YYYY hh:mm a')}</span>
      ),
    },

    {
      title: 'Action',
      key: '_id',
      fixed: 'right',
      width: '1%',
      render: (key) => (
        <Space key={key._id}>
          {/* {user?.power.indexOf(code) > -1 && ( */}
          <Button
            onClick={() => handleSelected(key)}
            icon={<EditTwoTone />}
            size='small'></Button>
          {/* )} */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <AppTableContainer
        className='order-transaction-table'
        hoverColor
        data={listData}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
        size='small'
      />
      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <img
          alt='example'
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default Tables;
