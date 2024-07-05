import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import {
  Home,
  Register,
  ForgotPass,
  Login,
  ResetPass,
  Profile,
  Places,
  SingleCIty,
  CityActivity,
  CityHighlights,
  Trips,
  ReservePage,
  TripStatus,
  Payment,
  Mytrips,
  UserParticipants,
  GuidesAdmin,
  ActivitiesAdmin,
  HighlightsAdmin,
  TripsAdmin,
  CitiesAdmin,
  GuidAdminUpProf,
  GuideAdminAdd,
  CityAdminAdd,
  HighlightAdminAdd,
  CityAdminUpdate,
  HighlightAdminUp,
  ActivityAdminAdd,
  ActivityAdminUp,
  TripAdminAdd,
  LocationAdminAdd,
  PathAdmin,
  PaidTrips,
  FriendsInTrip,
} from "./Pages";
import CityReviews from "./Pages/CityReviews";
import CityParent from "./Components/CityParent/CityParent";
import SingleTrip from "./Pages/SingleTrip";
import GuideLine from "./Pages/GuideLine";

import GuideLineDetails from "./Pages/GuideLineDetails";
import GuideLineProfile from "./Pages/GuideLineProfile";
import Admin from "./Pages/Admin";
import { About, SideBar } from "./Components";
import ProfileAdmin from "./Pages/ProfileAdmin";
import TripAdminup from "./Pages/TripAdminup";
import LocationsAdmin from "./Pages/LocationsAdmin";
import LocationAdminUp from "./Pages/LocationAdminUp";
import PathAdminAdd from "./Pages/PathAdminAdd";
import UsersAdminParticipate from "./Pages/UsersAdminParticipate";
import Likes from "./Pages/Likes";
import ExpiredTrips from "./Pages/ExpiredTrips";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {" "}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpass" element={<ForgotPass />} />
          <Route path="/resetpass" element={<ResetPass />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Places" element={<Places />} />
          <Route element={<CityParent />}>
            <Route path="/places/:CityId" element={<SingleCIty />} />
            <Route path="/cityactivity/:id" element={<CityActivity />} />
            <Route path="/cityhighlights/:id" element={<CityHighlights />} />
            <Route path="/cityreviews/:id" element={<CityReviews />} />
          </Route>
          <Route path="/sidebar/:id" element={<SideBar />} />
          <Route path="/trips/:id" element={<Trips />} />
          <Route path="/singletrip/:id/:name" element={<SingleTrip />} />
          <Route path="/reservation/:tripid" element={<ReservePage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/mytrips" element={<Mytrips />} />
          <Route element={<GuideLine />}>
            <Route path={"/guidelineprofile"} element={<GuideLineProfile />} />
            <Route path={"/guidelinedetails"} element={<GuideLineDetails />} />
            <Route
              path={"/userparticipants/:id"}
              element={<UserParticipants />}
            />
            <Route path={"/tripstatus"} element={<TripStatus />} />
          </Route>
          <Route element={<Admin />}>
            <Route path={"/admin"} element={<ProfileAdmin />} />
            <Route path={"/guides"} element={<GuidesAdmin />} />
            <Route path={"/activities"} element={<ActivitiesAdmin />} />
            <Route path={"/highlights"} element={<HighlightsAdmin />} />
            <Route
              path={"/adminguideprofile/:username"}
              element={<GuidAdminUpProf />}
            />

            <Route path={"/cities"} element={<CitiesAdmin />} />
            <Route path={"/trips"} element={<TripsAdmin />} />
            <Route path={"/guideadminadd"} element={<GuideAdminAdd />} />
            <Route path={"/cityadminadd"} element={<CityAdminAdd />} />
            <Route
              path={"/highlightadminadd"}
              element={<HighlightAdminAdd />}
            />
            <Route
              path={"/cityadminupdate/:id"}
              element={<CityAdminUpdate />}
            />
            <Route
              path={"/highlightadminup/:id"}
              element={<HighlightAdminUp />}
            />
            <Route path={"/activityadminadd"} element={<ActivityAdminAdd />} />
            <Route
              path={"/activityadminup/:id"}
              element={<ActivityAdminUp />}
            />
            <Route path={"/tripadminadd"} element={<TripAdminAdd />} />
            <Route path={"/tripadminup/:id"} element={<TripAdminup />} />
            <Route path="/locations" element={<LocationsAdmin />} />
            <Route path={"/locationadminadd"} element={<LocationAdminAdd />} />
            <Route
              path={"/locationadminup/:id"}
              element={<LocationAdminUp />}
            />
            <Route path="/#about" element={<About />} />
            <Route path="/path" element={<PathAdmin />} />
            <Route path="/pathadminadd" element={<PathAdminAdd />} />

            <Route
              path="/usersadminparticipate/:id"
              element={<UsersAdminParticipate />}
            />
          </Route>
          <Route path="/paidpay" element={<PaidTrips />} />
          <Route path="/friends/:id" element={<FriendsInTrip />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/expiredtrips" element={<ExpiredTrips />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
