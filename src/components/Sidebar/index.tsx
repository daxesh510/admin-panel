import { useSelector } from 'react-redux';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, FolderOutlined, FileTextOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { RootState } from '../../store';

const { Sider } = Layout;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardOutlined />, path: '/dashboard' },
  { text: 'Projects', icon: <FolderOutlined />, path: '/projects' },
  { text: 'Estimates', icon: <FileTextOutlined />, path: '/estimation' },
];

const Sidebar = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Sider theme={isDarkMode ? 'dark' : 'light'} style={{ height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}>
      <div className="logo" style={{ padding: '20px', textAlign: 'center', background: isDarkMode ? "#001529" : "#fff" }}>
        <img src={logo} alt="logo" style={{ width: '80%', filter: isDarkMode ? 'dark' : 'light' }} />
      </div>
      <Menu theme={isDarkMode ? 'dark' : 'light'} mode="inline" selectedKeys={[location.pathname]}>
        {menuItems.map((item) => (
          <Menu.Item key={item.path} icon={item.icon} onClick={() => handleNavigation(item.path)} style={{ transition: 'background 0.3s', borderRadius: '8px' }}>
            {item.text}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
