import { useQuery } from "@tanstack/react-query";
import { fetchTodo } from "../api/todos";
import { useParams } from "react-router-dom";

const TodoDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => fetchTodo(id)
  });

  if (isLoading) return <div>로딩 중 입니다.</div>;
  if (error) return <div>오류 발생했습니다 {error.message}</div>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Todo Detail</h1>
        <div className="space-y-4">
          <p className="text-lg text-gray-800">
            <span className="font-bold text-gray-600">아이디:</span> {data.id}
          </p>
          <p className="text-lg text-gray-800">
            <span className="font-bold text-gray-600">할 일:</span> {data.title}
          </p>
          <p className="text-lg text-gray-800">
            <span className="font-bold text-gray-600">상태:</span>{" "}
            <span className={`rounded-lg px-3 py-1 font-semibold ${data.completed ? "text-blue-800" : "text-red-800"}`}>
              {data.completed ? "완료" : "미완료"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
