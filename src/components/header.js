import React from 'react';
import {Link} from 'gatsby';


export const Header = ({siteTitle, siteDescription}) => (
    <Link to="/">
        <h1 className="site_title">{siteTitle}</h1>
        <p className="site_description">{siteDescription}</p>
    </Link>
);
