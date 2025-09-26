const _env = import.meta.env;

export const env = {
  CURRENT: _env.VITE_APPLIED_ENV,

  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  LOCAL: 'local',

  API_BASE_URL: _env.VITE_API_BASE_URL || 'http://localhost:3003',
};

export const links = {
  BACKEND:
    env.CURRENT === env.LOCAL
      ? 'local-backend'
      : env.CURRENT === env.DEVELOPMENT
        ? 'development-backend'
        : 'production-backend',
  FRONTEND:
    env.CURRENT === env.LOCAL
      ? 'local-frontend'
      : env.CURRENT === env.DEVELOPMENT
        ? 'development-frontend'
        : 'production-frontend',
};

export const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};
