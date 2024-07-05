import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import GuideSideBar from "../Components/GuideSideBar/GuideSideBar";
import { AuthContext } from "../Context/authContext";

function GuideLine() {
  const { currentUser } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(currentUser, "user");
    if (!currentUser) setLoading(true);
    else if (currentUser.user.Role != 1)
      return navigate("/", { replace: true });
    else setLoading(false);
  }, [currentUser]);

  if (loading) return;
  return (
    <div className="flex gap-3 flex-col md:flex-row ">
      <GuideSideBar />
      <Outlet />
    </div>
  );
}

export default GuideLine;
