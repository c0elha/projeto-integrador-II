import Header from './Header';
import Footer from './Footer';
import React from 'react';

const Layout = ({ children, ...props }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Header/>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
