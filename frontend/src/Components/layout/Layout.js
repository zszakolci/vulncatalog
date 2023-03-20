import React from 'react';
import { Helmet } from "react-helmet";
import Navmenu from '../menu/navmenu';


  
export const siteTitle = 'Liferay Vulnerability Catalog';

export default function Layout({ children }) {
    return (
      <div className='root-div'>
        <Helmet>
            <link rel="icon" href="/favicon.ico" />
            <title>{siteTitle}</title>
            <meta name="keywords" content="vulnerability,catalog,CVE" />
            <meta
                name="description"
                content="Simple catalog to gather known vulnerabilities and related Liferay tickets + the fixed libraries"
            />
        </Helmet>
  
            <Navmenu/>
        
        <main>{children}</main> 
    </div>
    );
  }