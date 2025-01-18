import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Mypage from "../pages/Mypage";
import ProtectedRoute from "../components/ProtectedRoute";
import TodoList from "../components/TodoList";
import TodoDetail from "../components/TodoDetail";
import Layout from "../components/Layout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* todo page route */}
        <Route path="/todos" element={<TodoList />} />
        <Route path="/todos/:id" element={<TodoDetail />} />
        {/* 로그인 한 User만 마이페이지 들어가기 가능 */}
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <Layout>
                <Mypage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
