import { useNavigate } from "react-router-dom";

export function useGoBack() {
  const navigate = useNavigate();
  return () => navigate(-1);
}
