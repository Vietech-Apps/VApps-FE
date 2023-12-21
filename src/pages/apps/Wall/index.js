import React from "react";
import VideoCall from "./VideoCall";
import FriendRequests from "./FriendRequests";
import Photos from "./Photos";
import RecentNews from "./RecentNews";
import WhoToFollow from "./WhoToFollow";
import Suggestions from "./Suggestions";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";
import AppsContainer from "meta/core/AppsContainer";
import { useIntl } from "react-intl";
import AppPageMetadata from "meta/core/AppPageMetadata";
import Stories from "./Stories";
import About from "./About";
import WhatsHappen from "./WhatsHappen";
import SuggestTeam from "./SuggestTeam";
import {
  StyledAppRowContainer,
  StyledWallLeftSidebar,
  StyledWallMainContent,
  StyledWallRightSidebar,
  StyledWallScrollBar,
} from "./index.styled";
import { useGetDataApi } from "meta/utility/APIHooks";

const Wall = () => {
  const [{ apiData: wallData }] = useGetDataApi("/wall", undefined);
  const [{ apiData: postList }, { setData: setPostList }] = useGetDataApi(
    "/wall/posts",
    []
  );
  const { messages } = useIntl();

  return (
    <AppsContainer
      title={messages["sidebar.apps.wall"]}
      cardStyle={{ backgroundColor: "transparent", boxShadow: "none" }}
      fullView
    >
      <AppPageMetadata title="Wall App" />
      {wallData && (
        <StyledAppRowContainer
          style={{
            height: "calc(100% - 32px)",
            padding: 8,
          }}
        >
          <StyledWallLeftSidebar xs={24} md={6} xl={6} xxl={6}>
            <StyledWallScrollBar>
              <div>
                <VideoCall data={wallData?.videoCall} />
                <About about={wallData?.about} />
                <SuggestTeam data={wallData?.suggestTeam} />
                <Photos photos={wallData?.photos} />
                <Suggestions suggestions={wallData?.suggestions} />
              </div>
            </StyledWallScrollBar>
          </StyledWallLeftSidebar>
          <StyledWallMainContent xs={24} md={12} xl={12} xxl={12}>
            <StyledWallScrollBar style={{ height: "100%" }}>
              <div>
                <CreatePost wallData={wallData} setPostList={setPostList} />
                <PostsList
                  wallData={wallData}
                  postList={postList}
                  setPostList={setPostList}
                />
              </div>
            </StyledWallScrollBar>
          </StyledWallMainContent>
          <StyledWallRightSidebar xs={24} md={6} xl={6} xxl={6}>
            <StyledWallScrollBar style={{ height: "100%" }}>
              <div>
                <Stories stories={wallData?.stories} />
                <WhatsHappen whatsHappen={wallData?.whatsHappen} />
                <WhoToFollow whoToFollow={wallData?.whoToFollow} />
                <FriendRequests friendRequests={wallData?.friendRequests} />
                <RecentNews recentNews={wallData?.recentNews} />
              </div>
            </StyledWallScrollBar>
          </StyledWallRightSidebar>
        </StyledAppRowContainer>
      )}
    </AppsContainer>
  );
};

export default Wall;
