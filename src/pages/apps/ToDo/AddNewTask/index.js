import React from 'react';
import AddTaskForm from './AddTaskForm';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import {StyledTodoModal, StyledTodoModalScrollbar} from './index.styled';

const AddNewTask = ({
  isAddTaskOpen,
  selectedDate,
  onCloseAddTask,
  reCallAPI,
}) => {
  const {messages} = useIntl();

  return (
    <StyledTodoModal
      width={900}
      title={messages['todo.addNewTask']}
      open={isAddTaskOpen}
      footer={false}
      onOk={isAddTaskOpen}
      onCancel={() => onCloseAddTask(false)}>
      <StyledTodoModalScrollbar>
        <AddTaskForm
          onCloseAddTask={onCloseAddTask}
          selectedDate={selectedDate}
          reCallAPI={reCallAPI}
        />
      </StyledTodoModalScrollbar>
    </StyledTodoModal>
  );
};

export default AddNewTask;
