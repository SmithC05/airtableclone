import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function LogoutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);
}
export default LogoutPage;
