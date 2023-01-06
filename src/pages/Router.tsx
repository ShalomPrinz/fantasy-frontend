import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

import { NavBar } from "../components";

import {
  CreateLeague,
  Home,
  InviteMembers,
  League,
  Leagues,
  Login,
  Register,
  UserTeam,
} from "./";

const Header = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="team" element={<UserTeam />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="leagues" element={<Leagues />} />
      <Route path="leagues/:leagueId" element={<League />} />
      <Route path="leagues/:leagueId/invite" element={<InviteMembers />} />
      <Route path="new-league" element={<CreateLeague />} />
    </Route>
  )
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
