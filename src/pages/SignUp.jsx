import { useForm } from "react-hook-form";
import useUserStore from "../store/authStore";
import { register } from "../api/auth";
import axios from "axios";
const SignUp = () => {
  const { register: formRegister, handleSubmit, reset } = useForm();
  const setUser = useUserStore((state) => state.setUser);

  // const testConnection = async () => {
  //   try {
  //     const response = await axios.post("https://moneyfulpublicpolicy.co.kr/register", {
  //       id: "testuser",
  //       password: "testpassword",
  //       nickname: "testnickname"
  //     });
  //     console.log("응답 성공:", response.data);
  //   } catch (error) {
  //     console.error("서버 연결 테스트 실패:", error.message);
  //   }
  // };

  // testConnection();

  const onSubmit = async (data) => {
    try {
      const response = await register(data);

      if (response.success) {
        alert(response.message);
        setUser(data);
        reset();
      } else {
        alert("회원가입 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 오류 발생", error);
      alert("회원가입 중 오류 발생");
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>아이디</label>
          <input type="text" {...formRegister("id", { required: true })} />
        </div>
        <div>
          <label>비밀번호</label>
          <input type="text" {...formRegister("password", { required: true })} />
        </div>
        <div>
          <label>닉네임</label>
          <input type="text" {...formRegister("nickname", { required: true })} />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUp;
