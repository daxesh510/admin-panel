import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import EditEstimates from './components/Estimation/EditEstimates';
import TranslationButton from './components/TranslationButton';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const { Content } = Layout;

const Dashboard = React.lazy(() => import('./components/Dashboard'));
const Project = React.lazy(() => import('./components/Projects'));
const Estimation = React.lazy(() => import('./components/Estimation'));

function App() {
   const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          <Content style={{ marginTop: 64 }}>
           {!isAuthenticated&& <TranslationButton classNames="translation-button"/>}
            <Routes>
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/" element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Project />} />
                <Route path="/estimation" element={<Estimation />} />
                <Route path="/edit-estimates" element={<EditEstimates />} />
              </Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
