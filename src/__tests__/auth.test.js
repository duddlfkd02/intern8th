import axios from "axios";
import { getUser, changeProfile } from "../api/auth";

jest.mock("axios");

describe("Auth api test", () => {
  it("getUser : 사용자 정보 확인 후 반환하기", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        id: "test_user",
        nickname: "테스트 유저",
        avatar: "https://via.placeholder.com/150"
      }
    });

    const user = await getUser("mock_access_token");
    expect(user.id).toBe("test_user");
    expect(user.nickname).toBe("테스트 유저");
    expect(user.avatar).toBe("https://via.placeholder.com/150");
  });

  it("changeProfile : 사용자 프로필 변경", async () => {
    const updates = {
      nickname: "변경된 유저",
      avatar: "https://via.placeholder.com/150"
    };

    axios.patch.mockResolvedValueOnce({
      data: {
        ...updates,
        message: "프로필 변경 성공"
      }
    });

    const response = await changeProfile("mock_access_token", updates);
    expect(response.nickname).toBe("변경된 유저");
    expect(response.avatar).toBe("https://via.placeholder.com/150");
    expect(response.message).toBe("프로필 변경 성공");
  });
});
