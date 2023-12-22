import React, {PropsWithChildren} from 'react';
import Navbar from '../Navbar/Navbar';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header className="mb-5">
        <Navbar/>
      </header>
      <main className="container-md mx-auto">
        {children}
      </main>
    </>
  );
};

export default Layout;