import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../store/auth-context';
import { useState, useContext } from 'react';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { createUser } from '../utils/auth';
import { Alert } from 'react-native';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function SignupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    }
    catch (error) {
      Alert.alert('サインアップに失敗しました', error.message);
      setIsAuthenticating(false);
    }

  }
  if (isAuthenticating) {
    return <LoadingOverlay />;
  }

  return <AuthContent onAuthenticate={SignupHandler}/>;
}

export default SignupScreen;