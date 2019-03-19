import React from 'react';
import { StoreContext } from 'redux-react-hook';
import { store } from '@/models';

export type BasicLayoutComponent<P> = React.FC<P>;

export interface BasicLayoutProps extends React.Props<any> {
  history?: History;
  location?: Location;
}

const BasicLayout: BasicLayoutComponent<BasicLayoutProps> = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export default BasicLayout;
