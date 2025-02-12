import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from './authUtils';

const ProtectedRoute =  () => {
    const { accessToken  } = useAuth();
  if (!accessToken) {
    return <Navigate to="/123" replace />; 
  }

  try {
    const decodedToken =  jwtDecode(accessToken);
    
    if (decodedToken.isAdmin == true) {
        return <Outlet />; // Cho phép truy cập
      } else {
        return <Navigate to="/unauthorized" replace />; // Không có quyền
      }
  } catch (error) {
    console.error("Lỗi giải mã token:", accessToken);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
