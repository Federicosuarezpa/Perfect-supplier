import useAuth from '../shared/hooks/useAuth';
export default function UserNotLogged({ children }) {
  const { isUserLogged } = useAuth();
  const { userData } = useAuth;

  return <>{!isUserLogged ? children : null}</>;
}
