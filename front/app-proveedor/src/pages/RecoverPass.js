import Recover from '../components/RecoverPass';
import useAuth from '../shared/hooks/useAuth';
import '../stylesPages/LoginRegister.css';

export default function Login() {
  const { recoverPass } = useAuth();
  return <Recover onSubmit={recoverPass}></Recover>;
}
