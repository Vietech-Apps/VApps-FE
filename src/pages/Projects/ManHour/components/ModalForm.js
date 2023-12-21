import React, {useEffect, useState, useRef} from 'react';
import {
  Modal,
  Form,
  Input,
  Switch,
  Col,
  Select,
  Row,
  InputNumber,
  message,
  DatePicker,
  TimePicker,
} from 'antd';

import {useAuthUser} from 'meta/utility/AuthHooks';
import jwtAxios from 'meta/services/auth/jwt-api';
//import UploaodDoc from 'shared/Upload';
import moment from 'moment';
const CollectionCreateForm = ({
  visible,
  user,
  onCreate,
  onCancel,
  titleForm,
  confirmLoading,
  selectedData,
  vehicles,
  drivers,
  list2,
  list1,
  fileLink,
  setFileLink,
  fileList,
  setFileList,
  projects,
}) => {
  const [form] = Form.useForm();
  const {Option} = Select;
  const {team, teamLead, to, from, description, task, progress} = selectedData
    ? selectedData
    : {};
console.log(selectedData?selectedData:{});
  React.useEffect(() => {
    form.setFieldsValue({
      team: team ? team.map((p) => p._id) : null,
      teamLead: teamLead ? teamLead._id : user._id,
      progress,
      description,
      task: task ? task._id : null,
      to: to ? moment(to, 'h:mm a') : '',
      from: from ? moment(from, 'h:mm a') : '',
    });
  }, [selectedData]);

  const [disabled, setDisabled] = useState(false);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);

  const onStart = (_event, uiData) => {
    const {clientWidth, clientHeight} = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();

    if (!targetRect) {
      return;
    }

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };
  return (
    <Modal
      open={visible}
      title={
        <div
          style={{
            width: '90%',
            cursor: 'move',
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
          onFocus={() => {}}
          onBlur={() => {}} // end
        >
          {titleForm}
        </div>
      }
      okText={!selectedData ? 'Create' : 'Update'}
      cancelText='Cancel'
      width={900}
      style={{
        top: 10,
      }}
      confirmLoading={confirmLoading}
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
      }}
      >
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        autoComplete='off'>
        <Row gutter='24'>
          <Col xs={24} md={24}>
            <Form.Item
              name='task'
              rules={[
                {
                  required: true,
                  message: `Please select tasks!`,
                },
              ]}>
              <Select
                showSearch
                placeholder='Please select tasks'
                optionFilterProp='children'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }>
                {list2?.map((p) => (
                  <Option key={p._id} value={p._id}>
                    {`${p.Id} ${p.title} `}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label='Team Lead'
              name='teamLead'
              rules={[
                {
                  required: true,
                  message: `Please select team lead!`,
                },
              ]}>
              <Select
                showSearch
                placeholder='Please select team lead'
                optionFilterProp='children'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }>
                {list1?.map((p) => (
                  <Option key={p._id} value={p._id}>
                    {`${p.process?.title} ${p.name} ${
                      p.whatsappNumber ? p.whatsappNumber : ''
                    }`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label='Team'
              name='team'
              rules={[
                {
                  required: true,
                  message: `Please select team !`,
                },
              ]}>
              <Select
                showSearch
                placeholder='Please select team'
                optionFilterProp='children'
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }>
                {list1?.map((p) => (
                  <Option key={p._id} value={p._id}>
                    {`${p.process?.title} ${p.name} ${
                      p.whatsappNumber ? p.whatsappNumber : ''
                    }`}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Form.Item
              className='form-field'
              name='from'
              label='From (Time)'
              rules={[
                {
                  required: true,
                  message: `Please input the from !`,
                },
              ]}>
              <TimePicker use12Hours format='h:mm a' />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <Form.Item
              className='form-field'
              name='to'
              label='To (Time)'
              rules={[
                {
                  required: true,
                  message: `Please input the to date!`,
                },
              ]}>
              <TimePicker use12Hours format='h:mm a' />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name='description' label='Description'>
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name='progress'
              label='Status'
              rules={[
                {
                  required: true,
                  message: `Please select status!`,
                },
              ]}>
              <Select>
                <Option value='Completed'>Completed</Option>
                <Option value='In Process'>In Process</Option>
                <Option value='On Hold'>On Hold</Option>
                <Option value='Submitted'>Submitted</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

const ModalForm = ({
  visible,
  setVisible,
  titleForm,
  selectedData,
  setListData,
  listData,
  fileList,
  setFileList,
  vehicles,
  drivers,
  inquery,
  setInquery,
  list1,
  list2,
  projects,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const {user} = useAuthUser();

  const [fileLink, setFileLink] = useState();

  const onCreate = async (values) => {
    values.createdby = user._id;
    values.date = moment().format('DD-MM-YYYY');
    values.to = moment(values.to, 'h:mm a').format('h:mm a');
    values.from = moment(values.from, 'h:mm a').format('h:mm a');
    setConfirmLoading(true);
    try {
      const {data} = await jwtAxios.post('scrum/manhour/create', values);
      if (data.success === true) {
        message.success(data.message);
        // setListData([...listData, data.result]);
        setInquery(inquery + 1);
        setVisible(false);
        setConfirmLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      message.error(error.response.data);
      setVisible(false);
      setConfirmLoading(false);
    }
  };
  const onUpdate = async (values) => {
    values.date = moment().format('DD-MM-YYYY');
    values.to = moment(values.to, 'h:mm a').format('h:mm a');
    values.from = moment(values.from, 'h:mm a').format('h:mm a');
    setConfirmLoading(true);
    try {
      const {data} = await jwtAxios.patch(
        `scrum/manhour/update/${selectedData._id}`,
        values,
      );
      if (data.success === true) {
        message.success(data.message);
        setInquery(inquery + 1);
        setVisible(false);
        setConfirmLoading(false);
      }
    } catch (error) {
      console.log('error', error);
      message.error(error.response.data);
    }
  };
  return (
    <div>
      <CollectionCreateForm
        visible={visible}
        onCreate={!selectedData ? onCreate : onUpdate}
        onCancel={() => {
          setVisible(false);
        }}
        titleForm={titleForm}
        confirmLoading={confirmLoading}
        selectedData={selectedData}
        vehicles={vehicles}
        list1={list1}
        list2={list2}
        drivers={drivers}
        setFileLink={setFileLink}
        fileList={fileList}
        setFileList={setFileList}
        fileLink={fileLink}
        projects={projects}
        user={user}
      />
    </div>
  );
};

export default ModalForm;
