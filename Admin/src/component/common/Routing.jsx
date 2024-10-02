import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import Dashboard from "../../page/Dashboard";
import Login from "../../page/Login";
import ManageCountry from "../../page/ManageCountry";
import ManageLeauge from "../../page/ManageLeauge";
import ManageTeam from "../../page/ManageTeam";
import ManageSports from "../../page/ManageSports";
import ManageSportsPosition from "../../page/ManageSportsPosition";
import ManagePlayerTag from "../../page/ManagePlayerTag";
import ManagePlayer from "../../page/ManagePlayer";
import ManageSession from "../../page/ManageSession";
import ManageMatch from "../../page/ManageMatch";
import MatchList from "../../page/MatchList";
import OverUpdateBallByBall from "../../page/OverUpdateBallByBall";
import ManageTeamWisePlayer from "../../page/ManageTeamWisePlayer";
import ManageWinningPoint from "../../page/ManageWinningPoint";
import ManageContest from "../../page/ManageContest";
import MinuteUpdateFootball from "../../page/MinuteUpdateFootball";
import UpdateHotel from "../../page/UpdateHotel";
import HomeScreen from "../../page/HomeScreen";
import AppModule from "../../page/AppModule";
import ElementType from "../../page/ElementType";
import ElementFieldType from "../../page/ElementFieldType";
import Element from "../../page/Element";
import ProfessionMapping from "../../page/ProfessionMapping";
import AppDetails from "../../page/AppDetails";

const Routing = () => {
  function PrivateRoute({ children }) {
    let token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== "" && token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  }

  const PublicRoutes = [
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const PrivateRoutes = [
    {
      path: "/",
      element: <Dashboard />,
    },

    {
      path: "/manage/country",
      element: <ManageCountry />,
    },
    {
      path: "/manage/leauge",
      element: <ManageLeauge />,
    },
    {
      path: "/manage/booking",
      element: <UpdateHotel />,
    },
    {
      path: "/manage/home-screen",
      element: <HomeScreen />,
    },
    {
      path: "/manage/app-details",
      element: <AppDetails />,
    },
    {
      path: "/manage/app-module",
      element: <AppModule />,
    },
    {
      path: "/manage/element-type",
      element: <ElementType />,
    },
    {
      path: "/manage/element-field-type",
      element: <ElementFieldType />,
    },
    {
      path: "/manage/element",
      element: <Element />,
    },
    {
      path: "/manage/profession-mapping",
      element: <ProfessionMapping />,
    },

    {
      path: "/update/hotel",
      element: <UpdateHotel />,
    },
    {
      path: "/manage/sports",
      element: <ManageSports />,
    },
    {
      path: "/manage/sportspositions",
      element: <ManageSportsPosition />,
    },
    {
      path: "/manage/playertag",
      element: <ManagePlayerTag />,
    },
    {
      path: "/manage/player",
      element: <ManagePlayer />,
    },
    {
      path: "/manage/session",
      element: <ManageSession />,
    },
    {
      path: "/manage/match",
      element: <ManageMatch />,
    },
    {
      path: "/manage/matchlist",
      element: <MatchList />,
    },
    {
      path: "/overupdate/:match/:overs",
      element: <OverUpdateBallByBall />,
    },
    {
      path: "/manage/teamwiseplayer",
      element: <ManageTeamWisePlayer />,
    },
    {
      path: "/manage/winningpoint",
      element: <ManageWinningPoint />,
    },
    {
      path: "/manage/contest",
      element: <ManageContest />,
    },
    {
      path: "/minuteupdate/football/:match",
      element: <MinuteUpdateFootball />,
    },
  ];

  return (
    <>
      <Router>
        <Routes>
          {PublicRoutes?.map((item) => {
            return (
              <>
                <Route path={item.path} element={item.element} />
              </>
            );
          })}
          {PrivateRoutes?.map((item) => {
            return (
              <>
                <Route
                  path={item.path}
                  element={<PrivateRoute>{item.element}</PrivateRoute>}
                />
              </>
            );
          })}
        </Routes>
      </Router>
    </>
  );
};

export default Routing;
