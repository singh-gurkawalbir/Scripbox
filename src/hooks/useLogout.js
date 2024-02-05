import { useAuthContext } from './useAuthContext';
// firebase imports
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: 'LOGOUT' });
      })
      .catch((err) => {
        console.log('error');
      });
  };

  return { logout };
};

export default useLogout;
