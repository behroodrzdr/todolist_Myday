import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import PropTypes from 'prop-types';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BulbOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import './styles.css';
const { Header, Sider, Content } = Layout;

const { Item } = Menu;

const MainLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState(['1']);
  const toggleSideBar = () => setCollapsed(!collapsed);
  const changeMenu = (val) => setSelected(val);

  return (
    <Layout className="site-layout mainLayout_container">
      <Sider
        className="site-layout-background"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo">
          <div className="logo__icon"></div>
          {!collapsed && <span className="logo__slogan">Todo My Day</span>}
        </div>
        <Menu mode="inline" defaultSelectedKeys={selected}>
          <Item
            key="1"
            icon={<DashboardOutlined />}
            onClick={() => changeMenu(['1'])}
          >
            <a href="/">Dashboard</a>
          </Item>
          <Item
            key="2"
            icon={<BulbOutlined />}
            onClick={() => changeMenu(['2'])}
          >
            <a href="/lists">My Day</a>
          </Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggleSideBar,
            },
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {props?.children}
        </Content>
      </Layout>
    </Layout>
  );
};
MainLayout.propTypes = {
  children: PropTypes.node,
};
MainLayout.defaultProps = {
  children: null,
};
export default MainLayout;
