import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...props }) {
  //изменен на HOC
  return props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />;
}