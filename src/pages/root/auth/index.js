import React from 'react';

const Signin = React.lazy(() => import('./Signin'));

export const authRouteConfig = [
  {
    path: '/signin',
    element: <Signin />,
  },
];
