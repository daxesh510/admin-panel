import { ConfigProvider } from 'antd';
import React from 'react';

const lightTheme = {
  token: {
    colorBgBase: '#f4f6fc',
    colorTextBase: '#000000',
  },
};

const darkTheme = {
  token: {
    colorBgBase: '#121212',
    colorTextBase: '#ffffff',
  },
};

export const ThemeWrapper: React.FC<{ isDarkMode: boolean; children: React.ReactNode }> = ({ isDarkMode, children }) => {
  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <ConfigProvider theme={theme}>
      {children}
    </ConfigProvider>
  );
};
