import RegisterForm from '../components/Register';
import useAuth from '../shared/hooks/useAuth';

import '../stylesPages/LoginRegister.css';

export default function Login() {
  const { signUp } = useAuth();
  return <RegisterForm onSubmit={signUp}></RegisterForm>;
}
