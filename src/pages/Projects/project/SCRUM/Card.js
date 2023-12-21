import React, {useState} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {Paper, makeStyles, IconButton} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
  updateCardById,
  deleteCardById,
} from 'redux/actions/Projects/cardActions';
import {createNewActivity} from 'redux/actions/Projects/activityActions';
import {useAuthUser} from 'meta/utility/AuthHooks';
import AddCard from 'pages/Projects/project/AddCard';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),
    width: '230px',
    wordWrap: 'break-word',
    zIndex: '-100',
    '&:hover': {
      backgroundColor: '#EBECF0',
    },
  },
  delete: {
    position: 'absolute',
    right: 0,
    zIndex: 1000,
    top: 0,
    backgroundColor: '#EBECF0',
  },
}));

export default function Card({list, board, cards, task, index}) {
  const {user} = useAuthUser();
  const [editable, setEditable] = useState(false);
  const [selectedCard, setSelectedCard] = useState(task);
  const [title, setTitle] = useState(task.name);
  const [card, setCard] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const closeButton = () => {
    setEditable(false);
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          {card && (
            <Paper
              className={classes.card}
              onMouseEnter={() => setShowDelete(true)}
              onMouseLeave={() => setShowDelete(false)}
              onClick={() => {
                setEditable(true);
              }}>
              {editable ? (
                <AddCard
                  isModalVisible={editable}
                  handleCancel={closeButton}
                  list={list}
                  setEditable={setEditable}
                  board={board}
                  cards={cards}
                  selectedCard={selectedCard}
                  setSelectedCard={setSelectedCard}
                />
              ) : (
                <div style={{position: 'relative'}}>
                  <div>{task.name}</div>
                  {showDelete && (
                    <IconButton
                      className={classes.delete}
                      size='small'
                      onClick={() => {
                        setCard(false);
                        dispatch(deleteCardById(task._id));
                        const text = `${user.name} deleted card ${task.name}`;
                        dispatch(
                          createNewActivity({text, boardId: task.boardId}),
                        );
                      }}>
                      <DeleteForeverIcon
                        fontSize='small'
                        style={{backgroundColor: '#EBECF0'}}
                      />
                    </IconButton>
                  )}
                </div>
              )}
            </Paper>
          )}
        </div>
      )}
    </Draggable>
  );
}
