import React from 'react';
import PropTypes from 'prop-types';
import UserInfo from '../components/UserInfo';
import clsx from 'clsx';
import AppVerticalMenu from '../components/AppVerticalNav';
import {useSidebarContext} from '../../../utility/AppContextProvider/SidebarContextProvider';
import {StyledAppMainSidebar, StyledAppSidebarScrollbar} from './index.styled';

const AppSidebar = ({isCollapsed}) => {
  const {isSidebarBgImage} = useSidebarContext();

  return (
    <StyledAppMainSidebar
      className={clsx({
        'sidebar-img-background': isSidebarBgImage,
      })}
      collapsible
      breakpoint='xl'
      collapsed={isCollapsed}>
      <UserInfo hasColor />
      <StyledAppSidebarScrollbar scrollToTop={false}>
        <AppVerticalMenu />
      </StyledAppSidebarScrollbar>
    </StyledAppMainSidebar>
  );
};

export default AppSidebar;

AppSidebar.propTypes = {
  isCollapsed: PropTypes.bool,
};
