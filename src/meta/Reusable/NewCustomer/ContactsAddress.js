import {Col, Form,Divider, Input, Modal, Radio} from 'antd';
import {AppRowContainer} from 'meta';
import AppScrollbar from 'meta/core/AppScrollbar';
import jwtAxios from 'meta/services/auth/jwt-api';
import React, {useState} from 'react';

const CollectionCreateForm = ({open, onCreate, onCancel}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      style={{height: 'calc(100vh - 200px)'}}
      bodyStyle={{overflowY: 'scroll'}}
      open={open}
      title='Contacts & Addresses'
      okText='Create'
      width={1200}
      // style={{top: 20}}
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}>
      <AppScrollbar>
        <Form
          form={form}
          labelCol={{
            span: 6,
          }}
          layout='horizantal'
          autoComplete='off'
          name='form_in_modal'
          initialValues={{
            type: 'individual',
          }}>
          <AppRowContainer>
            <Col md={24} xs={12}>
              <Form.Item name='type'>
                <Radio.Group>
                  <Radio value='Contact'>Contact</Radio>
                  <Radio value='Invoice Address'>Invoice Address</Radio>
                  <Radio value='Delivery Address'>Delivery Address</Radio>
                  <Radio value='Other Address'>Other Address</Radio>
                  <Radio value='Private Address'>Private Address</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </AppRowContainer>
          <Divider />
          <AppRowContainer>
            <Col md={12} xs={12}>
              {' '}
              <Form.Item name='name' label='Contact Name'>
                <Input />
              </Form.Item>
              <Form.Item
                name='address'
                label='Address'
                rules={[
                  {
                    required: true,
                    message: 'Please input the title of collection!',
                  },
                ]}>
                <Input />
              </Form.Item>
              <Form.Item name='city' label='City'>
                <Input />
              </Form.Item>
              <Form.Item name='title' label='Title'>
                <Input />
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              {' '}
              <Form.Item name='email' label='Email'>
                <Input />
              </Form.Item>
              <Form.Item name='phone' label='Phone'>
                <Input />
              </Form.Item>
              <Form.Item name='modile' label='Modile'>
                <Input />
              </Form.Item>
            </Col>
            <Col md={24} xs={24}>
              <Form.Item name='note' label='Notes'>
                <Input.TextArea rows={3} placeholder='internal notes..' />
              </Form.Item>
            </Col>
          </AppRowContainer>
        </Form>
      </AppScrollbar>
    </Modal>
  );
};

const ContactAddress = ({open, setOpen}) => {
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  return (
    <div>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default ContactAddress;
