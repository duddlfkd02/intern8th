import { useEffect, useState } from "react";
import { changeProfile, getUser } from "../api/auth.js";
import useUserStore from "../store/authStore";
import { Navigate, useNavigate } from "react-router-dom";

const Mypage = () => {
  const { user, accessToken, setUser, clearUser } = useUserStore();
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  //Mockdata
  useEffect(() => {
    const fetchMockUserInfo = async () => {
      try {
        const mockUserData = {
          id: "테스트 유저",
          nickname: "테스트 유저",
          avatar: null
        };
        setUser(mockUserData);
      } catch (error) {
        console.error("Mock 사용자 데이터 설정 오류", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMockUserInfo();
  }, [setUser]);

  // 프로필 변경 로직 - Mock
  const handleMockProfilechange = async () => {
    try {
      const mockResponse = {
        message: "프로필 변경 성공",
        avatar: URL.createObjectURL(avatar),
        nickname
      };
      alert(mockResponse.message);
      setUser({ ...user, avatar: mockResponse.avatar, nickname: mockResponse.nickname });
    } catch (error) {
      console.log("Mock 프로필 변경 실패", error.message);
    }
  };

  // 로그아웃 로직
  const handleLogout = () => {
    clearUser();
    navigate("/login");
    alert("로그아웃 되었습니다.");
  };

  // 사용자 정보 확인
  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     try {
  //       const userData = await getUser(accessToken);
  //       setUser(userData);
  //     } catch (error) {
  //       console.error("사용자 데이터 불러오기 실패");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   if (accessToken) {
  //     fetchUserInfo();
  //   }
  // }, [accessToken, setUser]);

  // 프로필 변경 로직
  // const handleProfileChange = async () => {
  //   const formData = new FormData();
  //   if (avatar) formData.append("avatar", avatar);
  //   if (nickname) formData.append("nickname", nickname);

  //   try {
  //     const response = await changeProfile(accessToken, formData);
  //     alert(response.message);
  //     setUser({ ...user, avatar: response.avatar, nickname: response.nickname });
  //   } catch (error) {
  //     console.error("프로필 변경 실패", error.message);
  //     alert("프로필 변경 중 문제가 발생했습니다.");
  //   }
  // };

  // 사용자 정보 로드 중 조건부 렌더링
  if (isLoading) {
    return <div>사용자 정보 불러오는 중 입니다.</div>;
  }

  if (!user) {
    return <div>사용자 정보가 없습니다.</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">마이페이지</h1>

        <div className="mb-6">
          {user.avatar ? (
            <img src={user.avatar} alt="프로필 이미지" className="mx-auto h-24 w-24 rounded-full" />
          ) : (
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gray-300">
              이미지 없음
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-lg text-gray-600">현재 닉네임: {user.nickname}</p>
            <label className="mb-2 block text-gray-600">새 닉네임</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-gray-600">새 프로필 이미지</label>
            <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} className="w-full" />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleMockProfilechange}
              className="flex-1 rounded-full bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
            >
              변경하기
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 rounded-full bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600"
            >
              로그아웃하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
