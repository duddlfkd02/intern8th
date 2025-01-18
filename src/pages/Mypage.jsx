import { useEffect, useState } from "react";
import { changeProfile, getUser } from "../api/auth.js";
import useUserStore from "../store/authStore";
import { Navigate } from "react-router-dom";

const Mypage = () => {
  const { user, accessToken, setUser } = useUserStore();
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 사용자 정보 확인
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUser(accessToken);
        setUser(userData);
      } catch (error) {
        console.error("사용자 데이터 불러오기 실패");
      } finally {
        setIsLoading(false);
      }
    };

    if (accessToken) {
      fetchUserInfo();
    }
  }, [accessToken, setUser]);

  // 프로필 변경 로직
  const handleProfileChange = async () => {
    const formData = new FormData();
    if (avatar) formData.append("avatar", avatar);
    if (nickname) formData.append("nickname", nickname);

    try {
      const response = await changeProfile(accessToken, formData);
      alert(response.message);
      setUser({ ...user, avatar: response.avatar, nickname: response.nickname });
    } catch (error) {
      console.error("프로필 변경 실패", error.message);
      alert("프로필 변경 중 문제가 발생했습니다.");
    }
  };

  // 사용자 정보 로드 중 조건부 렌더링
  if (isLoading) {
    return <div>사용자 정보 불러오는 중 입니다.</div>;
  }

  if (!user) {
    return <div>사용자 정보가 없습니다.</div>;
  }

  return (
    <div>
      <h1>마이페이지</h1>
      <p>아이디 : {user.id}</p>
      <p>{user.nickname}</p>
      <p>프로필 이미지 : {user.avatar ? <img src={user.avatar} alt={user.nickname} /> : "이미지가 없습니다."}</p>

      {/* 프로필 변경 */}
      <div>
        <h2>프로필 변경</h2>
        <div>
          <label>새 닉네임</label>
          <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </div>
        <div>
          <label>새 프로필 이미지</label>
          <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} />
        </div>
        <button onClick={handleProfileChange}>변경하기</button>
      </div>
    </div>
  );
};

export default Mypage;
