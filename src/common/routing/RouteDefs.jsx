import App from 'App';
import {
  Footer,
  Header,
  Home,
  PlayMeta,
  DefMeta,
  PlayIdeas,
  CreatePlay,
  PlayCreated,
  TechStack
} from 'common';
import PlayList from 'common/playlists/PlayList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NhostClient, NhostReactProvider } from '@nhost/react';
import { UserProfile } from "common/contributor_profile";
import { EditProfile } from "common/edit-contributor_profile";

const nhost = new NhostClient({
  backendUrl: process.env.REACT_APP_NHOST_BACKEND_URL || ''
});

const RouteDefs = () => {
  // Array of paths used for changing the title of the website dynamically.
  const routes = [
    {
      path: '/',
      title: 'ReactPlay - One app to learn, create, and share ReactJS projects.'
    },
    { path: '/plays', title: 'ReactPlay - Plays' },
    { path: '/ideas', title: 'ReactPlay - Ideas' },
    { path: '/tech-stacks', title: 'ReactPlay - Tech Stacks' },
    { path: '/plays/create', title: 'ReactPlay - Create Play' }
  ];

  return (
    <NhostReactProvider nhost={nhost}>
      <BrowserRouter>
        <Header />
        <DefMeta routes={routes} />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<TechStack />} path="/tech-stacks" />
          <Route element={<CreatePlay />} path="/editplay/:username/:playname" />
          <Route element={<App />} path="/plays">
            <Route index element={<PlayList />} />
            <Route exact element={<CreatePlay />} path="create" />
            {process.env.NODE_ENV === 'development' && (
              <Route exact element={<PlayCreated />} path="created/:playid" />
            )}
            <Route exact idex element={<PlayMeta />} path=":username">
              <Route exact element={<PlayMeta />} path=":playname">
                <Route exact element={<PlayMeta />} path=":param1">
                  <Route exact element={<PlayMeta />} path=":param2" />
                </Route>
              </Route>
            </Route>

            {/* <Route exact path=":playid" element= {<PlayMeta />}>
                    <Route exact path=":param1" element= {<PlayMeta />}>
                      <Route exact path=":param2" element= {<PlayMeta />}/>
                      </Route>
                  </Route> */}
          </Route>
          <Route element={<App />} path="/play">
            <Route index element={<PlayList />} />
          </Route>
          <Route path="/ideas" element={<PlayIdeas />} />
          <Route path="/contributor/:id" element={<App />}>
            <Route index element={<UserProfile />} />
            <Route exact path="edit" element={<EditProfile />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </NhostReactProvider>
  );
};

export default RouteDefs;
