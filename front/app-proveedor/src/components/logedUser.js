import { AuthContext } from '../shared/context/authContext';
export default function UserLogged({ children }) {
  const { isUserLogged } = AuthContext;

  return <>{isUserLogged ? children : null}</>;
}
