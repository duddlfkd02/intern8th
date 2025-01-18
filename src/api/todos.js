import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

// 전체 리스트
export const fetchTodos = async () => {
  const response = await axios.get(`${BASE_URL}/todos`);
  return response.data;
};

// 단건 호출
export const fetchTodo = async (id) => {
  const response = await axios.get(`${BASE_URL}/todos/${id}`);
  console.log("detail data", response.data);
  return response.data;
};
