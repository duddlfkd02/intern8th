import { useEffect } from "react";
import { getUser } from "../api/auth";
import useUserStore from "../store/authStore";
import { redirect } from "react-router-dom";

const Mypage = () => {
  const { user, accessToken, setUser } = useUserStore();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUser(accessToken);
        setUser(userData);
      } catch (error) {
        console.error("사용자 데이터 불러오기 실패");
      }
    };

    if (accessToken) {
      fetchUserInfo();
    }
  }, [accessToken, setUser]);

  if (!user) {
    redirect("/login");
    return <div>로그인 해주세요!</div>;
  }

  return (
    <div>
      <h1>마이페이지</h1>
      <p>아이디 : {user.id}</p>
      <p>{user.nickname}</p>
      <p>프로필 이미지 : {user.avatar ? <img src={user.avatar} alt={user.nickname} /> : "이미지가 없습니다."}</p>
    </div>
  );
};

export default Mypage;
