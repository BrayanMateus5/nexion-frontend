import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import AlterarSenha from "./pages/UpdatePassword/UpdatePassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transacoes from "./pages/Transactions/Transactions";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recuperar-senha" element={<ForgotPassword />} />
        <Route path="/redefinir-senha/:token" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/perfil/senha"
          element={
            <ProtectedRoute>
              <AlterarSenha />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transacoes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
