import ProfileInfo from '../components/Profile';
import useAuth from '../shared/hooks/useAuth';
import '../stylesPages/Profile.css';

export default function Login() {
  const { updateInfoUser } = useAuth();
  //console.log(window.location.pathname.split('/')[2]);
  return <ProfileInfo onSubmit={updateInfoUser}></ProfileInfo>;
}
