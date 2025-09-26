import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { env } from './config';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components';
import { Home, Settings, Login } from './screens';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div>
            <p>Project is running in {env.CURRENT} environment</p>
            <Routes>
              {/* Protected Routes - Require Authentication */}
              <Route
                path="/home"
                element={
                  <ProtectedRoute requireAuth={true}>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute requireAuth={true}>
                    <Settings />
                  </ProtectedRoute>
                }
              />

              {/* Public Routes - Redirect to home if authenticated */}
              <Route
                path="/login"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Login />
                  </ProtectedRoute>
                }
              />

              {/* Default route - redirects to login if not authenticated */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Catch all other routes - fallback to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
