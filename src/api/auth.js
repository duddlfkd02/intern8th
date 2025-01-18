import baseInstance from "../axiosinstance/join";

// 회원 가입
export const register = async (userData) => {
  const response = await baseInstance.post("/register", userData);
  console.log("회원가입", response.data);
  return response.data;
};

// 로그인
export const login = async (userData) => {
  const response = await baseInstance.post("/login", userData);
  console.log("로그인 데이터 확인", response.data);
  return response.data;
};

// 회원정보 확인
export const getUser = async (accessToken) => {
  try {
    const response = await baseInstance.get("/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log("회원정보 가져오기", response.data);
    return response.data;
  } catch (error) {
    console.error("회원정보 불러오기 실패", error.message);
    throw error;
  }
};

// 프로필 변경
export const changeProfile = async (accessToken, formData) => {
  try {
    const response = await baseInstance.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log("프로필 변경 데이터 확인", response.data);
    return response.data;
  } catch (error) {
    console.error("프로필 변경 중 오류 발생", error.message);
    throw error;
  }
};
