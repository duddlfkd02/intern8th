import { render, screen, fireEvent } from "@testing-library/react";
import Mypage from "../pages/Mypage";
import useUserStore from "../store/authStore";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(() => jest.fn())
}));

jest.mock("../store/authStore", () => ({
  useUserStore: jest.fn()
}));

describe("Mypage 컴포넌트 테스트", () => {
  it("유저 데이터가 잘 가져와진다.", () => {
    useUserStore.mockReturnValue({
      user: { id: "test_user", nickname: "test nickname", avatar: "test_avatar_url" },
      accessToken: "test_token",
      setUser: jest.fn(),
      clearUser: jest.fn()
    });
  });

  render(<Mypage />);
  expect(screen.getByText("마이페이지")).toBeInTheDocument();
  expect(screen.getByText("테스트 유저")).toBeInTheDocument();
});
