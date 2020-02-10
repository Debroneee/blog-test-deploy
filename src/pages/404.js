import React from 'react';
import {Link} from 'gatsby';
import {isIE} from 'react-device-detect';


export default () => {
    if (isIE)
        return (
            <main>
                <h1>IE is not supported.</h1>
                <p>
                    Please use a modern browser, download Firefox, Chrome or
                    Edge
                </p>
            </main>
        );
    return (
        <>
        <main>
            <h1>That's a nope!</h1>
            <p>You've come to a page that doesn't exist, pls go{' '}
                <Link to="/">home.</Link></p>
        </main>
        </>
    );
};
