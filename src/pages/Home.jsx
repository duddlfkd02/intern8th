import { Link } from "react-router-dom";
import { useEffect } from "react";

const HOME_INFO = {
  title: "한 달 인턴 8기 개인과제",
  name: "김하영",
  field: "프론트엔드"
};

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-800">
      <header className="mb-8 text-center">
        <h1 className="mb-4 text-3xl font-bold">{HOME_INFO.title}</h1>
        <p className="mb-2 text-lg">이름 : {HOME_INFO.name}</p>
        <p className="text-lg">지원분야 : {HOME_INFO.field}</p>
      </header>
      <nav className="flex space-x-4">
        <Link
          to="/login"
          className="rounded-full bg-gray-500 px-6 py-4 text-white shadow-md transition hover:bg-gray-600"
        >
          인증/인가 과제
        </Link>
        <Link
          to="/todos"
          className="rounded-full bg-gray-500 px-6 py-4 text-white shadow-md transition hover:bg-gray-600"
        >
          Todo List 과제
        </Link>
      </nav>
    </main>
  );
};

export default Home;
