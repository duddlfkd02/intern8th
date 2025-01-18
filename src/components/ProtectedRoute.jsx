import { Navigate } from "react-router-dom";
import useUserStore from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const { accessToken } = useUserStore();

  if (!accessToken) {
    alert("로그인이 필요합니다.");
    // return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
