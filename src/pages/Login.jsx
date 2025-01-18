import { useForm } from "react-hook-form";
import { login } from "../api/auth";
import useUserStore from "../store/authStore";

const Login = () => {
  const { register: formRegister, handleSubmit, reset } = useForm();
  const setUser = useUserStore((state) => state.setUser); // zustand 정보

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
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>아이디</label>
          <input type="text" {...formRegister("id", { required: true })} className="border" />
        </div>
        <div>
          <label>비밀번호</label>
          <input type="text" {...formRegister("password", { required: true })} className="border" />
        </div>
        <button>로그인</button>
      </form>
    </div>
  );
};

export default Login;
