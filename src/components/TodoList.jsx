import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/todos";

const TodoList = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ["todos"], queryFn: fetchTodos });

  if (isLoading) return <div>로딩 중 입니다.</div>;
  if (error) return <div>오류 발생했습니다 {error.message}</div>;

  return (
    <div>
      <h1>Todo List</h1>
      {Array.isArray(data) ? (
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>
              {todo.id}. {todo.title} - {todo.completed ? "완료" : "미완료"}
            </li>
          ))}
        </ul>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default TodoList;
