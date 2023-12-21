import React, {useEffect} from 'react';
import IntlMessages from 'meta/utility/IntlMessages';
import CardAttachments from './CardAttachments';
import CardCheckedList from './CardCheckedList';
import CardComments from './CardComments';
import {useIntl} from 'react-intl';
import moment from 'moment';
import {
  Avatar,
  Badge,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Select,
} from 'antd';
import AppRowContainer from 'meta/core/AppRowContainer';
import {useDispatch, useSelector} from 'react-redux';
import {
  onEditCardDetails,
  onGetScrumLabelList,
  onGetMemberList,
} from 'redux/actions/Projects/Projects';
import AppScrollbar from 'meta/core/AppScrollbar';
import midString from '../SCRUM/ordering/ordering';
import {
  createNewCard,
  updateCardById,
} from 'redux/actions/Projects/cardActions';
import {createNewActivity} from 'redux/actions/Projects/activityActions';
const {Option} = Select;
const {TextArea} = Input;
const labelList = [
  {id: 301, name: 'High Priority', type: 1, color: 'red'},
  {id: 302, name: 'Important', type: 2, color: 'green'},
  {id: 303, name: 'Urgent', type: 3, color: 'blue'},
  {id: 304, name: 'Work Place', type: 4, color: 'yellow'},
];
const AddCardForm = (props) => {
  const {
    board,
    list,
    cards,
    checkedList,
    setCheckedList,
    comments,
    setComments,
    authUser,
    attachments,
    setAttachments,
    selectedMembers,
    setMembersList,
    selectedCard,
    onCloseAddCard,
    isSubmitting,
  } = props;
  console.log(cards, selectedCard);
  const dispatch = useDispatch();
  const {messages} = useIntl();

  useEffect(() => {
    dispatch(onGetMemberList());
  }, []);

  // const memberList = useSelector(({scrumboardApp}) => scrumboardApp.memberList);

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

  const onDeleteAttachment = (id) => {
    const updatedAttachments = attachments.filter(
      (attachment) => attachment.id !== id,
    );
    setAttachments(updatedAttachments);
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const onFinish = (values) => {
    if (selectedCard) {
      const editedCard = {
        ...selectedCard,
        comments: comments,
        ...values,
        attachments: attachments,
        members: selectedMembers,
        label: values.label,
        checkedList: checkedList.filter((item) => item.title !== ''),
      };
      dispatch(updateCardById(selectedCard._id, editedCard));
      //dispatch(onEditCardDetails(board, list, editedCard));
      dispatch(
        createNewActivity({
          text: `${authUser.name} added ${values.name} to ${list.name}`,
          boardId: list.boardId,
        }),
      );
      onCloseAddCard(false);
    } else {
      const totalCards = cards.length;
      const newCard = {
        boardId: list.boardId,
        listId: list._id,
        order:
          totalCards === 0 ? 'n' : midString(cards[totalCards - 1].order, ''),
        attachments: attachments,
        checkedList: [],
        comments: comments,
        ...values,
        label: values.label,
        members: selectedMembers,
      };

      dispatch(createNewCard(newCard));
      dispatch(
        createNewActivity({
          text: `${authUser.name} added ${values.name} to ${list.name}`,
          boardId: list.boardId,
        }),
      );
      onCloseAddCard(false);
    }
  };

  return (
    <Form
      className='scrum-board-add-card-form'
      autoComplete='off'
      initialValues={{
        name: selectedCard?.name,
        desc: selectedCard?.desc,
        date:
          selectedCard && selectedCard.date
            ? moment(selectedCard.date, 'DD-MM-YYYY')
            : '',
        //label: selectedCard?.label.map((data) => data),
        members: selectedCard?.members.map((data) => data._id),
      }}
      onFinish={onFinish}>
      <AppScrollbar className='scrum-board-add-card-form-scroll'>
        <div className='scrum-board-add-card-form-content'>
          <AppRowContainer>
            <Col xs={24} md={16}>
              <Form.Item name='name'>
                <Input placeholder={messages['common.title']} />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item name='date'>
                <DatePicker className='scrum-board-date-picker' />
              </Form.Item>
            </Col>
          </AppRowContainer>

          <Form.Item name='desc'>
            <TextArea
              autoSize={{minRows: 3, maxRows: 5}}
              placeholder={messages['common.description']}
            />
          </Form.Item>

          <AppRowContainer>
            <Col xs={24} lg={12}>
              <Form.Item name='label'>
                <Select
                  mode='multiple'
                  allowClear
                  maxTagCount={3}
                  style={{width: '100%'}}
                  placeholder='Please select Label'
                  onChange={handleChange}>
                  {labelList?.map((label) => (
                    <Option key={label.id} value={label.id}>
                      <div className='d-flex align-items-center'>
                        <Badge color={label.color} />
                        <span>{label.name}</span>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item name='members'>
                <Select
                  mode='multiple'
                  maxTagCount={2}
                  placeholder='Please select Members'
                  onChange={(value) => setMembersList(value)}>
                  {board?.members.map((member) => (
                    <Option key={member._id} value={member._id}>
                      <div className='multiple-select'>
                        {member.avatar ? (
                          <Avatar src={member.avatar} />
                        ) : (
                          <Avatar>{member.name}</Avatar>
                        )}
                        <span className='multiple-select-name'>
                          {member.name}
                        </span>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </AppRowContainer>

          <CardAttachments
            attachments={attachments}
            onDeleteAttachment={onDeleteAttachment}
          />

          {selectedCard ? (
            <CardCheckedList
              onAddNewCheckedItem={onAddNewCheckedItem}
              checkedList={checkedList}
              onDeleteCheckedItem={onDeleteCheckedItem}
              onSetCheckedItemText={onSetCheckedItemText}
            />
          ) : null}

          <CardComments comments={comments} onAddNewComment={onAddNewComment} />
        </div>
      </AppScrollbar>
      <div className='scrum-board-add-card-form-footer'>
        <Button type='primary' ghost onClick={onCloseAddCard}>
          <IntlMessages id='common.cancel' />
        </Button>
        <Button className='todo-modal-btn' type='primary' htmlType='submit'>
          <IntlMessages id='common.save' />
        </Button>
      </div>
    </Form>
  );
};

export default AddCardForm;
