import React, { useState } from "react";
import PropTypes from "prop-types";
import { SmileOutlined } from "@ant-design/icons";
import AppIconButton from "meta/core/AppIconButton";
import { MdOutlineAttachFile } from "react-icons/md";
import {
  StyledAddComment,
  StyledAddCommentInput,
  StyledAddCommentUser,
  StyledAddCommentUserInfo,
  StyledAddSuffixAction,
  StyledPostItemAvatar,
} from "../index.styled";
import { useInfoViewActionsContext } from "meta/utility/AppContextProvider/InfoViewContextProvider";
import { postDataApi } from "meta/utility/APIHooks";

const AddComment = ({ postId, wallData, setPostList }) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [comment, setComment] = useState("");

  const submitComment = (event) => {
    if (event.key === "Enter") {
      const newComment = {
        author: {
          name: wallData.name,
          profilePic: wallData.profilePic,
          id: wallData.id,
        },
        comment,
      };
      postDataApi("/wall/posts/comments", infoViewActionsContext, {
        postId,
        comment: newComment,
      })
        .then((data) => {
          setPostList(data);
          infoViewActionsContext.showMessage("Comment Added Successfully!");
        })
        .catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });
      setComment("");
    }
  };

  return (
    <StyledAddComment>
      <StyledPostItemAvatar src={wallData.profilePic} />
      <StyledAddCommentUser>
        <StyledAddCommentUserInfo>
          <StyledAddCommentInput
            placeholder="Write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={submitComment}
            suffix={
              <StyledAddSuffixAction>
                <AppIconButton icon={<SmileOutlined />} />
                <AppIconButton icon={<MdOutlineAttachFile />} />
              </StyledAddSuffixAction>
            }
          />
        </StyledAddCommentUserInfo>
      </StyledAddCommentUser>
    </StyledAddComment>
  );
};

export default AddComment;

AddComment.propTypes = {
  postId: PropTypes.number,
  wallData: PropTypes.object,
  setPostList: PropTypes.func,
};
