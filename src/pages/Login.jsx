import { useForm } from "react-hook-form";
import { login } from "../api/auth";
import useUserStore from "../store/authStore";
import { Link } from "react-router-dom";

const Login = () => {
  const { register: formRegister, handleSubmit, reset } = useForm();
  const setUser = useUserStore((state) => state.setUser);

  const onSubmit = async (data) => {
    try {
      const response = await login(data);

      if (data.success) {
        alert(response.message);
        setUser(response);
        reset();
      } else {
        alert("로그인 실패!", response.data.message);
      }
    } catch (error) {
      console.error("로그인 오류 발생", error.message);
      alert("로그인 중 오류 발생!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">로그인</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-2 block text-gray-600">아이디</label>
            <input
              type="text"
              {...formRegister("id", { required: true })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-gray-600">비밀번호</label>
            <input
              type="password"
              {...formRegister("password", { required: true })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          >
            로그인
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          아직 회원이 아니신가요?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
