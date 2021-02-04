import { AuthContext } from '../shared/context/authContext';
export default function UserNotLogged({ children }) {
  const { isUserLogged } = AuthContext;

  return <>{!isUserLogged ? children : null}</>;
}
