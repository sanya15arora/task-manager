import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import UserProvider from './context/UserContext';
import Tasks from './pages/Dashboard/Tasks';
import { Toaster } from 'react-hot-toast';

interface PrivateRouteProps {
  component: FC;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

const Root: FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

const App: FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<PrivateRoute component={Home} />} />
          <Route path="/tasks" element={<PrivateRoute component={Tasks} />} />
        </Routes>
      </Router>
      <Toaster toastOptions={{ className: "", style: { fontSize: '13px' } }} />
    </UserProvider >
  );
};

export default App;
