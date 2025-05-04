import React from "react";
import { Route, Navigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

const AdminRoute = ({ element, ...rest }) => {
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const checkAdmin = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user && user.role === "admin") {
        setIsAdmin(true);
      }
    };
    checkAdmin();
  }, []);

  return (
    <Route
      {...rest}
      element={isAdmin ? element : <Navigate to="/login" />}
    />
  );
};

export default AdminRoute;
