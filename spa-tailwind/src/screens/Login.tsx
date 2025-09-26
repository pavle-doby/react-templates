import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegistering) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      navigate('/home');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await loginWithGoogle();
      navigate('/home');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{isRegistering ? 'Register' : 'Login'}</h1>

      {error && <div className="text-error mb-1">{error}</div>}

      <form
        className="flex max-w-[256px] flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email:</label>
          <input
            className="rounded-md border border-gray-300"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password:</label>
          <input
            className="rounded-md border border-gray-300"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button
          className="bg-primary rounded-md px-4 py-2 text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading...' : isRegistering ? 'Register' : 'Login'}
        </button>
      </form>

      <div className="mt-4 max-w-[256px]">
        <button
          className="bg-secondary w-full rounded-md px-4 py-2 text-white"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          Sign in with Google
        </button>
      </div>

      <p>
        {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          disabled={loading}
          className="cursor-pointer text-blue-500 underline"
        >
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default Login;
