import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("nexion_user"));

  const handleLogout = () => {
    localStorage.removeItem("nexion_token");
    localStorage.removeItem("nexion_user");
    navigate("/login");
  };

  //pega a primeira letra do nome, para o avatar do usuário
  const inicial = usuario?.nome ? usuario.nome.charAt(0).toUpperCase() : "?";

  return (
    <aside className="sidebar">
      {" "}
      {/*o aside = conteúdo lateral*/}
      <div className="sidebar-brand">
        <h1>Nexion</h1>
      </div>
      <div className="sidebar-user">
        <div className="sidebar-avatar">{inicial}</div>
        <span className="sidebar-nome">{usuario?.nome}</span>
      </div>
      <nav className="sidebar-nav">
        <Link to="/dashboard" className="nav-item">
          <i className="pi pi-home" />
          <span>Dashboard</span>
        </Link>

        {/*ainda vai ser feito*/}
        <div className="nav-item">
          <i className="pi pi-wallet" />
          <span>Transações</span>
        </div>
        <div className="nav-item">
          <i className="pi pi-tags" />
          <span>Categorias</span>
        </div>

        <Link to="/app/perfil/senha" className="nav-item">
          <i className="pi pi-lock" />
          <span>Alterar senha</span>
        </Link>
      </nav>
      <button className="sidebar-logout" onClick={handleLogout}>
        <i className="pi pi-sign-out" />
        <span>Sair</span>
      </button>
    </aside>
  );
};

export default Sidebar;
