import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/todos";
import { Link } from "react-router-dom";

const TodoList = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ["todos"], queryFn: fetchTodos });

  if (isLoading) return <div>로딩 중 입니다.</div>;
  if (error) return <div>오류 발생했습니다 {error.message}</div>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Todo List</h1>
        {Array.isArray(data) && data.length > 0 ? (
          <ul className="space-y-4">
            {data.map((todo) => (
              <li key={todo.id} className="flex items-center justify-between rounded-lg bg-gray-100 p-4 shadow-sm">
                <Link to={`/todos/${todo.id}`} className="text-lg font-medium hover:underline">
                  {todo.id}. {todo.title}
                </Link>
                <span
                  className={`rounded-lg px-2 py-1 text-sm font-bold ${
                    todo.completed ? "bg-blue-200 text-blue-800" : "bg-red-200 text-red-800"
                  }`}
                >
                  {todo.completed ? "완료" : "미완료"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">데이터가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
