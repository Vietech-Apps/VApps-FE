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
      title: 'Task',
      render: (elm) => (
        <Typography.Paragraph copyable>
          {elm.task?.Id} {elm.task?.title}
        </Typography.Paragraph>
      ),
      key: 'task',
    },
    {
      title: 'Team Leader',
      render: (elm) => (
        <Typography.Paragraph copyable>{elm.teamLead?.name}</Typography.Paragraph>
      ),
      key: 'teamLead',
    },
    {
      title: 'Team',
      render: (elm) => (
        <Avatar.Group
          maxCount={4}
          maxStyle={{
            color: '#f56a00',
            backgroundColor: '#fde3cf',
          }}>
          {elm.team.map((p) => (
            <Tooltip title={p.name} placement='top' key={p._id} color='cyan'>
              <Avatar src={p.avatar} size='small' />
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
      key: 'teamLead',
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
      title: 'Date',
      dataIndex: 'date',
      key: 'data',
    },
    {
      title: 'Status',
      dataIndex: '',
      key: 'status',
      render: (status) => <span className='badge'>{status.progress}</span>,
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
