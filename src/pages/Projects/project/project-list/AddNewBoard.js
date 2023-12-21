import React, {useEffect, useState} from 'react';
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Modal,
  Form,
  Input,
  Select,
} from 'antd';
import IntlMessages from 'meta/utility/IntlMessages';
import AppCard from 'meta/core/AppCard';
import AppRowContainer from 'meta/core/AppRowContainer';
import {useIntl} from 'react-intl';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {onGetProcessList, onGetStaffList} from 'redux/actions';
import jwtAxios from 'meta/services/auth/jwt-api';

const AddNewBoard = ({
  isModalVisible,
  handleCancel,
  onAddBoard,
  selectedBoard,
  handleOk,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [processList, setProcessList] = React.useState([]);

  React.useEffect(function () {
    async function getArticles() {
      try {
        const response = await jwtAxios.get('meta/process/list');
        setProcessList(response.data.result);
      } catch (error) {
        console.log('error', error);
      }
    }
    getArticles();
  }, []);

  const staffList = useSelector(({ScrumboardApp}) => ScrumboardApp.memberList);

  const {messages} = useIntl();
  const {Option} = Select;
  console.log('Processlist', processList);

  return (
    <Modal
      open={isModalVisible}
      title={messages['scrumboard.addNewBoard']}
      okText='Create'
      width={900}
      //centered
      style={{
        top: 10,
      }}
      cancelText='Cancel'
      onCancel={handleCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onAddBoard(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}>
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        initialValues={{
          modifier: 'public',
        }}>
        <Form.Item
          name='name'
          label='Project Title'
          rules={[
            {
              required: true,
              message: 'Please input the title of the Project!',
            },
          ]}>
          <Input />
        </Form.Item>
        <AppRowContainer>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              name='members'
              className='form-field'
              label='Team'
              rules={[{required: true, message: 'Please select Team'}]}>
              <Select
                mode='multiple'
                allowClear
                placeholder={messages['common.staff']}>
                {staffList?.map((staff) => {
                  return (
                    <Option value={staff._id} key={staff._id}>
                      {`${staff.process?.title} ${staff.name} `}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              className='form-field'
              name='targetDate'
              label='Start Date'
              rules={[
                {required: true, message: 'Please select schedule date!'},
              ]}>
              <DatePicker
                className='add-task-form-date'
                disabledDate={(current) => {
                  return moment().add(-1, 'days') >= current;
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Form.Item
              className='form-field'
              name='targetDate'
              label='Planned Target Date'
              rules={[
                {required: true, message: 'Please select schedule date!'},
              ]}>
              <DatePicker
                className='add-task-form-date'
                disabledDate={(current) => {
                  return moment().add(-1, 'days') >= current;
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12}>
            <Form.Item
              className='form-field'
              name='category'
              rules={[
                {required: true, message: 'Please select related process!'},
              ]}
              label='Process'>
              <Select placeholder='Select related process'>
                {processList?.map((process) => {
                  return (
                    <Option value={process.title} key={process._id}>
                      {process.title}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </AppRowContainer>
        <Form.Item
          className='form-field'
          name='description'
          rules={[{required: true, message: 'Please description!'}]}
          label='Description'>
          <Input.TextArea
            placeholder={messages['common.description']}
            autoSize={{minRows: 3, maxRows: 5}}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewBoard;
