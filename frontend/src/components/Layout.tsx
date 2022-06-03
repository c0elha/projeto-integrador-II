import type { NextPage } from 'next';
import Header from './Header';
import Footer from './Footer';

const Layout: NextPage = ({ children }) => {
  return (
    <>
      <Header />
      <main className='container'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
