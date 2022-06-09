import type { NextPage } from 'next';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';

const Layout = ({ children, ...props }) => {
  
  return (
    <>
      <Header/>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
