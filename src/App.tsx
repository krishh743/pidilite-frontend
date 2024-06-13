// App.js
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import routes from "./routes/Routes";
import AppLayout from "./components/layout/AppLayout";
import Login from "./pages/auth/LoginPage";
import SignUp from "./pages/auth/Signup";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          <Route element={<AppLayout />}>
            {routes.map(({ path, component: Component, protectedRoute: ProtectedRoute }) => (
              <Route 
                key={path} 
                path={path} 
                element={
                  ProtectedRoute 
                    ? <ProtectedRoute><Component /></ProtectedRoute> 
                    : <Component />
                } 
              />
            ))}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
