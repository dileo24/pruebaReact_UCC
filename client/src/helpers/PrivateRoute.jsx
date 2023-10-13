import { useNavigate } from "react-router-dom";

export default function PrivateRoute({ isLoggedIn, children }) {
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate("/error");
  }

  return children;
}
