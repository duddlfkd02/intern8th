import { useForm } from "react-hook-form";
import useUserStore from "../store/authStore";
import { register } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { register: formRegister, handleSubmit, reset } = useForm();
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await register(data);

      if (response.success) {
        alert(response.message);
        setUser(data);
        reset();
        navigate("/login");
      } else {
        alert("회원가입 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 오류 발생", error);
      alert("회원가입 중 오류 발생");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">회원가입</h1>
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
          <div>
            <label className="mb-2 block text-gray-600">닉네임</label>
            <input
              type="text"
              {...formRegister("nickname", { required: true })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          >
            회원가입
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          이미 회원이신가요?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
