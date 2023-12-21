import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {
  Col,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Typography,
  Upload,
  Space,
  Divider,
  Tabs
} from 'antd';
import {AppRowContainer} from 'meta';
import AppIconButton from 'meta/core/AppIconButton';
import AppScrollbar from 'meta/core/AppScrollbar';
import jwtAxios from 'meta/services/auth/jwt-api';

import React, {useState} from 'react';
import ContactAddress from './ContactsAddress';

const CollectionCreateForm = ({open, onCreate, onCancel, handleVisble}) => {
  const [form] = Form.useForm();
  const normFile = (info) => {
    console.log('Upload event:', info);

    // setFileList(info.fileList);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file?.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }

    return info.fileList?.map((person) => ({
      url: person.response ? person.response?.link : person.url,
      uid: person.uid,
      name: person.name,
      status: person.status,
      type: person.type,
    }));
  };
  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  function hasWhiteSpace(s) {
    return /\s/.test(s);
  }
  const beforeUpload = (file) => {
    const isSpace = hasWhiteSpace(file.name);
    if (isSpace) {
      message.error('Whitespace in filename not allowed');
    }
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return (isJpgOrPng && isLt2M && !isSpace) || Upload.LIST_IGNORE;
  };
  const onRemove = (info) => {
    async function getArticles() {
      // if (selectedData?._id) {
      //   try {
      //     const params = {
      //       path: info.url?.split('.com/')[1],
      //       objectId: selectedData?._id,
      //       fileId: info?._id,
      //     };
      //     const response = await jwtAxios.delete('vms/vehicle/link/dbs3delete', {
      //       params,
      //     });
      //     if (response.status == 200) {
      //       message.success(response.data);
      //     }
      //   } catch (error) {
      //     console.log('error', error);
      //   }
      // } else {
      try {
        const params = {
          path: info.url.split('.com/')[1],
        };
        const response = await jwtAxios.delete(`s3/link/s3delete`, {
          params,
        });

        message.success(response.data);
      } catch (error) {
        console.log('error', error);
        // messages.error(error.response.data)
        // }
      }
    }
    getArticles();
  };

  return (
    <Modal
      open={open}
      title='Create a new Customer'
      okText='Create'
      width={1100}
      style={{top: 20}}
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
          layout='horizantal'
          autoComplete='off'
          name='form_in_modal'
          initialValues={{
            type: 'individual',
            bank: [{}],
          }}
          labelCol={{
            span: 6,
          }}>
          <AppRowContainer>
            <Col md={6} xs={12}>
              <Form.Item name='type'>
                <Radio.Group>
                  <Radio value='individual'>Individual</Radio>
                  <Radio value='company'>Company</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              <Form.Item name='title' label='Customer'>
                <Input />
              </Form.Item>

              <Form.Item name='title' label='Company'>
                <Input />
              </Form.Item>
            </Col>
            <Col md={4} xs={12}>
              <Form.Item
                name='file'
                // label='Veh Image'
                valuePropName='fileList'
                getValueFromEvent={normFile}>
                <Upload
                  maxCount={4}
                  name='image'
                  action={`/api/s3/link/uploadimage?folder=customer`}
                  listType='picture-card'
                  onPreview={onPreview}
                  beforeUpload={beforeUpload}
                  onRemove={onRemove}>
                  <div>
                    <PlusOutlined />
                    <div
                      style={{
                        marginTop: 8,
                      }}>
                      Upload
                    </div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </AppRowContainer>
          <AppRowContainer style={{marginBottom: 0}}>
            <Col md={12} xs={12}>
              {' '}
              <Form.Item name='address' label='Address'>
                <Input />
              </Form.Item>
              <Form.Item name='city' label='City'>
                <Input />
              </Form.Item>
              <Form.Item name='country' label='Country'>
                <Input />
              </Form.Item>
              <Form.Item name='province' label='Province'>
                <Input />
              </Form.Item>
              <Form.Item name='modile' label='Modile'>
                <Input />
              </Form.Item>
              <Form.Item name='phone' label='Phone'>
                <Input />
              </Form.Item>
            </Col>
            <Col md={12} xs={12}>
              {' '}
              <Form.Item name='email' label='Email'>
                <Input />
              </Form.Item>
              <Form.Item name='taxId' label='Tax Id'>
                <Input />
              </Form.Item>
              <Form.Item name='jobPosition' label='JobPosition'>
                <Input placeholder='e.g sales Director' />
              </Form.Item>
              <Form.Item name='title' label='Title'>
                <Input />
              </Form.Item>
              <Form.Item name='tag' label='Tag'>
                <Input />
              </Form.Item>
              <Form.Item name='website' label='Website'>
                <Input />
              </Form.Item>
            </Col>
          </AppRowContainer>
          <AppRowContainer style={{marginBottom: 0}}>
            <Col md={24} xs={24}>
              <Tabs
                type='card'
                items={[
                  {
                    label: `Contacts & Addresss`,
                    key: '1',
                    children: (
                      <AppIconButton
                        type='primary'
                        onClick={handleVisble}
                        icon='create'
                        title='Add contacts & addresses'
                        name='Add'
                      />
                    ),
                  },
                  {
                    label: `Sale & Purchase`,
                    key: '2',
                    children: (
                      <AppRowContainer>
                        <Col md={10} xs={24}>
                          <Divider>
                            <Typography.Text mark>Sales</Typography.Text>
                          </Divider>
                          <Form.Item name='salePerson' label='SalePerson'>
                            <Input />
                          </Form.Item>{' '}
                          <Form.Item name='title' label='Payment terms'>
                            <Input />
                          </Form.Item>
                          <Typography.Text underline>
                            Fiscal Information
                          </Typography.Text>
                          <Form.Item name='title' label='Fiscal Position'>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col md={2} xs={4}></Col>

                        <Col md={10} xs={24}>
                          <Divider>
                            <Typography.Text mark>Purchase</Typography.Text>
                          </Divider>
                          <Form.Item name='title' label='Payment terms'>
                            <Input />
                          </Form.Item>

                          <Typography.Text underline>Misc</Typography.Text>
                          <Form.Item name='title' label='Reference'>
                            <Input />
                          </Form.Item>
                        </Col>
                      </AppRowContainer>
                    ),
                  },
                  {
                    label: `Invoicing`,
                    key: '3',
                    children: (
                      <AppRowContainer>
                        <Col md={12} xs={24}>
                          <Form.List name='bank'>
                            {(fields, {add, remove}) => (
                              <Space>
                                {fields.map(({key, name, ...restField}) => (
                                  <Space
                                    key={key}
                                    style={{
                                      display: 'flex',
                                      marginBottom: 8,
                                    }}
                                    align='baseline'>
                                    <Form.Item
                                      {...restField}
                                      name={[name, 'bank']}
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Missing bank name',
                                        },
                                      ]}>
                                      <Input placeholder='Bank Name' />
                                    </Form.Item>
                                    <Form.Item
                                      {...restField}
                                      name={[name, 'account']}
                                      rules={[
                                        {
                                          required: true,
                                          message: 'Missing account number',
                                        },
                                      ]}>
                                      <Input placeholder='Account number' />
                                    </Form.Item>
                                    <MinusCircleOutlined
                                      onClick={() => remove(name)}
                                    />
                                  </Space>
                                ))}
                                <Form.Item>
                                  <AppIconButton
                                    type='dashed'
                                    onClick={() => add()}
                                    icon={'create'}
                                    title='Add More'></AppIconButton>
                                </Form.Item>
                              </Space>
                            )}
                          </Form.List>
                        </Col>
                      </AppRowContainer>
                    ),
                  },
                  {
                    label: `Internal Notes`,
                    key: '4',
                    children: (
                      <Form.Item name='internalNotes' label='Internal Notes'>
                        <Input.TextArea rows={4} showCount />
                      </Form.Item>
                    ),
                  },
                ]}></Tabs>
            </Col>
          </AppRowContainer>
        </Form>
      </AppScrollbar>
    </Modal>
  );
};

const AddCustomer = ({open, setOpen}) => {
  const [visible, setVisible] = useState(false);
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };
  const handleVisble = () => {
    setVisible(true);
  };
  return (
    <div>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        handleVisble={handleVisble}
      />
      <ContactAddress open={visible} setOpen={setVisible} />
    </div>
  );
};

export default AddCustomer;
