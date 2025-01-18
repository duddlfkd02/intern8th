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
    <div>
      <h1>Todo Detail</h1>
      <p>아이디 : {data.id}</p>
      <p>할 일 : {data.title}</p>
      <p>상태 : {data.completed ? "완료" : "미완료"}</p>
    </div>
  );
};

export default TodoDetail;
