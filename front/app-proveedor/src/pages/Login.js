import LoginForm from '../components/Login';
import useAuth from '../shared/hooks/useAuth';
import '../stylesPages/LoginRegister.css';

export default function Login() {
  const { signIn } = useAuth();
  console.log(window.location.pathname.split('/')[2]);
  return <LoginForm onSubmit={signIn}></LoginForm>;
}
