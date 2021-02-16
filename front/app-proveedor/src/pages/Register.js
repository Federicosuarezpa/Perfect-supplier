import RegisterForm from '../components/Register';
import useAuth from '../shared/hooks/useAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../stylesPages/LoginRegister.css';

export default function Login() {
  const { signUp } = useAuth();
  return (
    <div>
      <Header></Header>
      <div className="background">
        <div className="recuadro">
          <div className="login">
            <RegisterForm onSubmit={signUp}></RegisterForm>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
