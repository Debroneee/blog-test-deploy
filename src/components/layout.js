import React from 'react';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { Header } from './header';


export const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <main>
      <Header siteTitle={title} siteDescription={description} />
      {children}
    </main>
  );
};
