import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, ProjectOutlined , UserOutlined, CrownOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<ProjectOutlined />}>
            Projects
          </Menu.Item>
          <Menu.Item key="2" icon={<CrownOutlined />}>
            Clients
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            User
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

const mountNode = document.getElementById('root');
ReactDOM.render(<Dashboard />, mountNode);

export default Dashboard;