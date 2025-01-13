import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import TopBar from './TopBar'; // Import the TopBar component
import { RootState } from '../store';
import { Layout } from 'antd';

const { Content } = Layout;

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? (
    <Layout style={{ minHeight: '100vh' }}>
      <TopBar />
      <Layout>
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
