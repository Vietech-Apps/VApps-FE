import React from 'react';

import "./index.style.less"

const Projects = React.lazy(() => import('./project'));
const ManHour = React.lazy(() => import('./ManHour'));
const ExcDiary = React.lazy(() => import('./ExcDiary'));
const Tasks = React.lazy(() => import('./Tasks'));

export const projectsConfig = [
  {
    path: ['/apps/projects/scrum-board/:id', '/apps/projects'],
    element: <Projects />,
  },
  {
    path: ['/apps/task-manager'],
    element: <Tasks />,
  },
  {
    path: ['/apps/daily-reports/man-hour'],
    element: <ManHour />,
  },
  {
    path: ['/apps/daily-reports/exective-diary'],
    element: <ExcDiary />,
  },
];
