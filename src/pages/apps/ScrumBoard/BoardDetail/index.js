import React, { useEffect } from "react";
import AppsContainer from "meta/core/AppsContainer";
import BoardDetailView from "./BoardDetailView";
import { useNavigate, useParams } from "react-router-dom";
import { StyledScrumBoardDetailTitle } from "./index.styled";
import { useGetDataApi } from "meta/utility/APIHooks";

const BoardDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [{ apiData: boardDetail }, { setData, setQueryParams }] = useGetDataApi(
    "/api/scrumboard/board/",
    undefined,
    { id: id },
    false
  );

  useEffect(() => {
    setQueryParams({ id });
    return () => {
      setQueryParams(null);
    };
  }, [id]);

  const onGoToBoardList = () => {
    navigate(-1);
  };

  if (!boardDetail) {
    return null;
  }

  return (
    <AppsContainer
      fullView
      noContentAnimation
      title={
        <>
          <StyledScrumBoardDetailTitle onClick={onGoToBoardList}>
            Scrum Board
          </StyledScrumBoardDetailTitle>
          &gt; {boardDetail?.name}
        </>
      }
    >
      <BoardDetailView boardDetail={boardDetail} setData={setData} />
    </AppsContainer>
  );
};

export default BoardDetail;
