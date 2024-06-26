import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
} from 'react-router-dom';
import { Navbar } from './Components/Navbar/Navbar';
import { Home } from './Components/Home/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import { useAuth0 } from '@auth0/auth0-react';
import Snippet from './Components/NewSnippet/Snippet';
import './App.css';
import Layout from './Components/Collaborative/Layout';
import SnippetDetail from './Components/NewSnippet/SnippetDetail';
import Faqs from './Components/Faqs/Faqs';
import About from './Components/About/About';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  return isAuthenticated ? <Component {...rest} /> : loginWithRedirect();
};

export default function App() {
  const location = useLocation();
  const collabPageRegex = /^\/collab\/[^/]+$/;

  const hideNavbarAndFooter = collabPageRegex.test(location.pathname);

  return (
    <div className="relative over">
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute component={Dashboard} />}
        />
        <Route path="/snippet" element={<Snippet />} />
        <Route path="/snippet/:id" element={<SnippetDetail />} />
        <Route path="/collab/:id" element={<Layout />} />
      </Routes>

      {!hideNavbarAndFooter && (
        <div className="absolute bottom-0 z-50 w-full text-center py-2">
          <span className="text-white/65">Made with </span>❤️
          <span className="text-white/65">
            {' '}
            by{' '}
            <Link
              className="hover:text-white/85 transition-all ease-in-out"
              to="https://github.com/tanmaymene21"
              target="_blank"
            >
              Tanmay
            </Link>
          </span>
        </div>
      )}
    </div>
  );
}
