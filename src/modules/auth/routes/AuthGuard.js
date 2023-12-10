import { userAuthStore } from '../../../store/auth/authUser';

const isAuthenticatedGuard = (to, from, next) => {

  
  const { status } =  userAuthStore();

  if ( status === 'authenticated' ) next()
  else next({ name: 'login' })
}

export default isAuthenticatedGuard