import React from 'react';
import { Router } from '@reach/router';
import type { HeadFC } from 'gatsby';
import 'animate.css';

import useSiteStore from '../stores/UseSiteStore';
import Landing from '../views/Landing';
import Work from '../views/Work';
import WorkSamples from '../views/WorkSamples';

/*
    apparently, for client only routes to work in gatsby, the 'index' file needs to be named '[...]'. i feel like the docs made this about as clear as mud, but, there you go. a gift for future me. love, past me.
    https://www.gatsbyjs.com/docs/how-to/routing/client-only-routes-and-user-authentication/
*/

const IndexPage = () => {
    // TODO: type unknown?
    // @ts-ignore
    const currentView = useSiteStore((state) => state.currentView);

    return (
        <Router basepath="/">
            {/* https://blog.shahednasser.com/how-to-animate-components-entrance-and-exit-in-react/#using-csstransition */}

            <Landing path="/" />

            <Work path="/work" />

            <WorkSamples path="/samples" />
        </Router>
    );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
