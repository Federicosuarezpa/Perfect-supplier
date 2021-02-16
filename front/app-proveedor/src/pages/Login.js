import LoginForm from '../components/Login';
import useAuth from '../shared/hooks/useAuth';
import '../stylesPages/LoginRegister.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  const { signIn } = useAuth();
  return (
    <div>
      <Header></Header>
      <div className="background">
        <div className="recuadro">
          <div className="login">
            <LoginForm onSubmit={signIn}></LoginForm>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
