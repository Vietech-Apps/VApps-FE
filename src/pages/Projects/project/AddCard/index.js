import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { onDeleteSelectedCard } from "redux/actions";
import AppConfirmationModal from "meta/core/AppConfirmationModal";
import IntlMessages from "meta/utility/IntlMessages";
import CardHeader from "./CardHeader";
import AddCardForm from "./AddCardForm";
import "./index.style.less";
import { useAuthUser } from "meta/utility/AuthHooks";
import { Drawer } from "antd";

const AddCard = (props) => {
  const { isModalVisible, handleCancel, board, list, cards, selectedCard } =
    props;
  const dispatch = useDispatch();

  const { user } = useAuthUser();

  const [checkedList, setCheckedList] = useState(() =>
    selectedCard ? selectedCard.checkedList : []
  );

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedMembers, setMembersList] = useState(() =>
    selectedCard ? selectedCard.members : []
  );

  const [comments, setComments] = useState(() =>
    selectedCard ? selectedCard.comments : []
  );
  const [selectedLabels, setSelectedLabels] = useState(() =>
    selectedCard ? selectedCard.label : []
  );

  const [attachments, setAttachments] = useState(() =>
    selectedCard ? selectedCard.attachments : []
  );

  const onAddAttachments = (files) => {
    setAttachments([...attachments, ...files]);
  };

  const onDeleteCard = () => {
    const boardId = list.boardId;
    const listId = list._id;
    const cardId = selectedCard.id;
    dispatch(onDeleteSelectedCard(boardId, listId, cardId));
    setDeleteDialogOpen(false);
    handleCancel();
  };

  const onClickDeleteIcon = () => {
    if (selectedCard) {
      setDeleteDialogOpen(true);
    } else {
      handleCancel();
    }
  };
  return (
    <Drawer
      className="add-card-drawer"
      open={isModalVisible}
      // onOk={handleOk}
      title={
        <CardHeader
          onAddAttachments={onAddAttachments}
          onClickDeleteIcon={onClickDeleteIcon}
          handleCancel={handleCancel}
          list={list}
        />
      }
      onClose={handleCancel}
    >
      <AddCardForm
        board={board}
        list={list}
        cards={cards}
        checkedList={checkedList}
        handleCancel={handleCancel}
        setCheckedList={setCheckedList}
        comments={comments}
        setComments={setComments}
        authUser={user}
        attachments={attachments}
        setAttachments={setAttachments}
        selectedLabels={selectedLabels}
        setSelectedLabels={setSelectedLabels}
        selectedMembers={selectedMembers}
        setMembersList={setMembersList}
        selectedCard={selectedCard}
        onCloseAddCard={handleCancel}
      />

      {isDeleteDialogOpen ? (
        <AppConfirmationModal
          open={isDeleteDialogOpen}
          onDeny={setDeleteDialogOpen}
          onConfirm={onDeleteCard}
          title={<IntlMessages id="scrumboard.deleteCard" />}
          dialogTitle={<IntlMessages id="common.deleteItem" />}
        />
      ) : null}
    </Drawer>
  );
};

export default AddCard;
