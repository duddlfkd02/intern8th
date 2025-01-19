export default {
  testEnvironment: "jest-environment-jsdom", //Jest 28 버전부터 jest-environment-jsdom이 Jest 기본 패키지에서 분리됨
  transform: {
    "^.+\\.jsx?$": "babel-jest" // Babel을 사용한 코드 변환
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
};
