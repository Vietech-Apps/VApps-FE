import React, {useState} from 'react';
import {CarOutlined, EditTwoTone} from '@ant-design/icons';
import {Avatar, Button, Modal, Space, Tooltip, Typography} from 'antd';
import AppTableContainer from 'meta/core/AppTableContainer';
import {useAuthUser} from 'meta/utility/AuthHooks';
import moment from 'moment';

const Tables = ({listData, handleSelected, loading}) => {
  const {user} = useAuthUser();

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case false: {
        return '#F84E4E';
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
      dataIndex: 'Id',
      key: '_id',
      render: (Id) => <span className='order-id'>{Id}</span>,
    },
    {
      title: 'Activity',
      render: (elm) => (
        <Typography.Paragraph>{elm.description}</Typography.Paragraph>
      ),
      key: 'description',
    },
    {
      title: 'By',
      render: (elm) => (
        <Typography.Paragraph>{elm.createdBy?.name}</Typography.Paragraph>
      ),
      key: 'description',
    },

    {
      title: 'From',
      dataIndex: 'from',

      key: 'from',
    },
    {
      title: 'To',
      dataIndex: 'to',

      key: 'to',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (elm) => (
        moment(elm).format("DD-MM-YYYY h:m a")
      ),
      key: 'createdAt',
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
    </>
  );
};

export default Tables;
