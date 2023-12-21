import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import AppVerticalMenu from '../components/AppVerticalNav';
import {useSidebarContext} from '../../../utility/AppContextProvider/SidebarContextProvider';
import {
  StyledUserHeaderSidebar,
  StyledUserSidebarScrollbar,
} from './index.styled';

const AppSidebar = ({isCollapsed}) => {
  const {isSidebarBgImage} = useSidebarContext();

  return (
    <StyledUserHeaderSidebar
      className={clsx({
        'userHeader-sidebar-img-background': isSidebarBgImage,
      })}
      collapsible
      breakpoint='xl'
      collapsed={isCollapsed}>
      <StyledUserSidebarScrollbar scrollToTop={false}>
        <AppVerticalMenu />
      </StyledUserSidebarScrollbar>
    </StyledUserHeaderSidebar>
  );
};

export default AppSidebar;

AppSidebar.propTypes = {
  isCollapsed: PropTypes.bool,
};
