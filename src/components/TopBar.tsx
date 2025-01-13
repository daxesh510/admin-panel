import { Layout, Input, Menu, Dropdown, Button, Tooltip } from "antd";
import { BellOutlined, SearchOutlined, UserOutlined, LogoutOutlined, SettingOutlined, SunOutlined, MoonOutlined } from "@ant-design/icons";
import TranslationButton from "./TranslationButton";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { toggleTheme } from "../store/themeSlice";

import { logout } from "../store/authSlice";

const { Header } = Layout;

const Topbar = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const username = useSelector((state: RootState) => state.auth?.user?.username);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ position: 'fixed', top: 0, zIndex: 1, width: 'calc(100% - 200px)', marginLeft: '200px', background: isDarkMode ? "#001529" : "#fff", color: isDarkMode ? "#fff" : "#000" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
      <Input
        placeholder="Search..."
        prefix={<SearchOutlined />}
        style={{ width: 300, borderRadius: '10px', background: isDarkMode ? "#235" : "#fff", color: isDarkMode ? "#fff" : "#000", border: 'none', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <BellOutlined />
        <TranslationButton />
        <Dropdown overlay={menu} trigger={['click']}>
        <Button type="text" icon={<UserOutlined />} style={{ color: isDarkMode ? "#fff" : "#000" }}>
          {`Hello, ${username}`}
        </Button>
        </Dropdown>
        <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
        <Button type="text" onClick={handleThemeToggle} icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />} style={{ color: isDarkMode ? "#fff" : "#000" }}>
        </Button>
        </Tooltip>
      </div>
      </div>
    </Header>
  );
};

export default Topbar;
