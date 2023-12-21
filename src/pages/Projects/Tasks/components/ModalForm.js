import React, {useState} from 'react';
import {Modal, Form, Input, Switch, Row, Col, Select, DatePicker} from 'antd';
import {useAuthUser} from 'meta/utility/AuthHooks';
import jwtAxios from 'meta/services/auth/jwt-api';
import {AppRowContainer} from 'meta';
import moment from 'moment';
import {useIntl} from 'react-intl';
import CardCheckedList from './CardCheckedList';
import CardComments from './CardComments';

const CollectionCreateForm = ({
  visible,
  onCreate,
  ProcessList,
  onCancel,
  titleForm,
  confirmLoading,
  selectedData,
  list1,
  checkedList,
  setCheckedList,
  comments,
  setComments,
  authUser,
}) => {
  const [form] = Form.useForm();
  const {Option} = Select;
  const {messages} = useIntl();
  const {title, enabled} = selectedData;

  const onDeleteCheckedItem = (id) => {
    const updatedList = checkedList.filter((item) => item.id !== id);
    setCheckedList(updatedList);
  };

  const onAddNewCheckedItem = () => {
    const item = {
      id: Math.floor(Math.random() * 1000),
      title: '',
    };
    const updatedList = checkedList.concat(item);
    setCheckedList(updatedList);
  };

  const onSetCheckedItemText = (title, id) => {
    const updatedList = checkedList.map((item) => {
      if (item.id === id) {
        item.title = title;
        return item;
      } else {
        return item;
      }
    });
    setCheckedList(updatedList);
  };

  const onAddNewComment = (comment) => {
    setComments(
      comments.concat({
        comment: comment,
        sender: {
          id: authUser._id,
          name: authUser.name,
          image: authUser.name,
        },
      }),
    );
  };

  React.useEffect(() => {
    form.setFieldsValue({
      title: title,
      enabled: enabled,
    });
  }, [selectedData]);
  return (
    <Modal
      open={visible}
      title={titleForm}
      okText={title == undefined ? 'Create' : 'Update'}
      cancelText='Cancel'
      width={1000}
      //centered
      style={{
        top: 20,
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
      }}>
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        initialValues={{
          modifier: 'public',
        }}>
        <Form.Item
          name='title'
          rules={[
            {
              required: true,
              message: 'Please input the title of the Task!',
            },
          ]}>
          <Input placeholder='*Title' />
        </Form.Item>
        <AppRowContainer>
          <Col xs={24} sm={10} md={10}>
            <Form.Item
              name='assignTo'
              className='form-field'
              label='Assign To'
              rules={[{required: true, message: 'Please assign task!'}]}>
              <Select
                rules={[
                  {required: true, message: 'Please select priority type!'},
                ]}
                allowClear
                placeholder={'Please select!'}>
                {list1?.map((staff) => {
                  return (
                    <Option value={staff._id} key={staff._id}>
                      {`${staff.process?.title} ${staff.name} `}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={14} md={14}>
            <Form.Item name='ccList' className='form-field' label='cc'>
              <Select mode='multiple' allowClear placeholder={'Please select!'}>
                {list1?.map((staff) => {
                  return (
                    <Option value={staff._id} key={staff._id}>
                      {`${staff.process?.title} ${staff.name} `}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={6} md={6}>
            <Form.Item
              className='form-field'
              name='dueDate'
              label='Due Date'
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
          <Col xs={24} sm={8} md={8}>
            <Form.Item
              className='form-field'
              name='priority'
              label='Priority'
              rules={[{required: true, message: 'Please select priority'}]}>
              <Select placeholder={messages['common.priority']}>
                <Option value='High'>High</Option>
                <Option value='Medium'>Medium</Option>
                <Option value='Low'>Low</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={10} md={10}>
            <Form.Item
              className='form-field'
              name='process'
              rules={[
                {required: true, message: 'Please select related process!'},
              ]}
              label='Process'>
              <Select placeholder='Select related process'>
                {ProcessList?.map((process) => {
                  return (
                    <Option value={process._id} key={process._id}>
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
          name='desc'
          rules={[{required: true, message: 'Please description!'}]}>
          <Input.TextArea
            placeholder={`*${messages['common.description']}`}
            autoSize={{minRows: 3, maxRows: 5}}
            showCount
          />
        </Form.Item>
        {selectedData ? (
          <>
            <CardCheckedList
              onAddNewCheckedItem={onAddNewCheckedItem}
              checkedList={checkedList}
              onDeleteCheckedItem={onDeleteCheckedItem}
              onSetCheckedItemText={onSetCheckedItemText}
            />
            <CardComments
              comments={comments}
              onAddNewComment={onAddNewComment}
            />
          </>
        ) : null}
      </Form>
    </Modal>
  );
};

const ModalForm = ({
  visible,
  setVisible,
  titleForm,
  ProcessList,
  createPath,
  updatePath,
  selectedData,
  setListData,
  listData,
  list1,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [checkedList, setCheckedList] = useState(() =>
    selectedData?.checkedList ? selectedData.checkedList : [],
  );

  const [comments, setComments] = useState(() =>
    selectedData?.comments ? selectedData.comments : [],
  );
  const {user} = useAuthUser();
  //console.log(user);
  const onCreate = async (values) => {
    values.createdBy = user._id;
    setConfirmLoading(true);
    try {
      const {data} = await jwtAxios.post(createPath, values);
      //  console.log(data.result);
      setConfirmLoading(false);
      setListData([...listData, data.result]);
      setVisible(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  const onUpdate = async (values) => {
    //  console.log('Received values of form: ', values);
    setConfirmLoading(true);
    try {
      const {data} = await jwtAxios.patch(
        `${updatePath}/${selectedData._id}`,
        values,
      );
      //  console.log(data);
      setConfirmLoading(false);
      const filterData = listData.filter((p) => p._id !== selectedData._id);
      setListData(filterData);
      setListData((d) => [...d, data.result]);
      setVisible(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <div>
      <CollectionCreateForm
        visible={visible}
        onCreate={selectedData.title == undefined ? onCreate : onUpdate}
        onCancel={() => {
          setVisible(false);
        }}
        list1={list1}
        titleForm={titleForm}
        confirmLoading={confirmLoading}
        ProcessList={ProcessList}
        selectedData={selectedData}
        checkedList={checkedList}
        setCheckedList={setCheckedList}
        comments={comments}
        setComments={setComments}
        authUser={user}
      />
    </div>
  );
};

export default ModalForm;
