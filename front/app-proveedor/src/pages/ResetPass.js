import Reset from '../components/ResetPass';
import useAuth from '../shared/hooks/useAuth';
import '../stylesPages/LoginRegister.css';

export default function Login() {
  const { resetPassword } = useAuth();
  return <Reset onSubmit={resetPassword}></Reset>;
}
