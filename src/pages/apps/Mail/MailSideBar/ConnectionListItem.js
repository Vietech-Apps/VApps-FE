import React, {useState} from 'react';
import ChatWindow from './ChatWindow';
import PropTypes from 'prop-types';
import {
  StyledMailConnectionAvatar,
  StyledMailConnectionContent,
  StyledMailConnectionListItem,
  StyledMailConnectionTitle,
} from './index.styled';

const ConnectionListItem = (props) => {
  const {connection} = props;
  const [isOpenChat, setOpenChat] = useState(false);

  return (
    <>
      <StyledMailConnectionListItem
        onClick={() => setOpenChat(true)}
        key={connection.id}>
        <StyledMailConnectionAvatar alt='Remy Sharp' src={connection.image} />
        <StyledMailConnectionContent>
          <StyledMailConnectionTitle>
            {connection.name}
          </StyledMailConnectionTitle>
          <p>{connection.status}</p>
        </StyledMailConnectionContent>
      </StyledMailConnectionListItem>

      {isOpenChat ? (
        <ChatWindow
          setOpenChat={setOpenChat}
          isOpenChat={isOpenChat}
          connection={connection}
        />
      ) : null}
    </>
  );
};

export default ConnectionListItem;

ConnectionListItem.defaultProps = {
  connection: null,
};

ConnectionListItem.propTypes = {
  connection: PropTypes.object,
};
