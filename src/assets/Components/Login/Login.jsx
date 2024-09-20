import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  return (
    <div>
      <div className="Container">
        <form>
          <h1>Login</h1>
          <div>
            <input type="email" placeholder="E-mail" />
            <FaUser className="icon"></FaUser>
          </div>
          <div>
            <input type="password" placeholder="Senha" />
            <FaLock className="icon"></FaLock>
          </div>

          <div className="recall-forget"></div>

          <button>Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
