import { Avatar, Badge, Layout, List, Menu } from 'antd';
import {
  BarChart,
  Bell,
  ChevronsDown,
  Maximize,
  Minimize,
  Settings,
  ShoppingCart,
  User,
  Triangle
} from 'react-feather';
import DashHeader, { Notification } from './styles/Header';
import ModalLogin from '../demos/antd/login-form';
import ModalAll from '../demos/antd/login';

import Link from 'next/link';
import MockNotifications from '../demos/mock/notifications';
import { useAppState } from './shared/AppProvider';
import { useState } from 'react';

const { SubMenu } = Menu;
const { Header } = Layout;

const MainHeader = () => {
  const [state, dispatch] = useAppState();
  const [notifications] = useState(MockNotifications);
  return (
    <DashHeader>
      <Header>
        {state.mobile && (
          <a
            onClick={() => dispatch({ type: 'mobileDrawer' })}
            className="trigger"
          >
            <BarChart size={20} strokeWidth={1} />
          </a>

        )}
        <Link href="/homepage">
          <a className="brand">
            <Triangle size={24} strokeWidth={1} />
            <strong className="mx-1 text-black">{state.name}</strong>
          </a>
        </Link>

        <Menu mode="horizontal" className="menu-divider">
          {!state.mobile && (
            <Menu.Item>
              <Link href="">
                <a>ANASAYFA</a>
              </Link>
            </Menu.Item>
          )}

          {!state.mobile && (
            <Menu.Item>
              <Link href="">
                <a>ÜRÜNLERİMİZ</a>
              </Link>
            </Menu.Item>
          )}

          {!state.mobile && (
            <Menu.Item>
              <Link href="">
                <a>İLETİŞİM</a>
              </Link>
            </Menu.Item>
          )}

          {state.mobile && (
            <SubMenu title={<ChevronsDown size={20} strokeWidth={1} />}>
              <Menu.Item>Calendar</Menu.Item>
              <Menu.Item>Messages</Menu.Item>
              <Menu.Item>Social</Menu.Item>
            </SubMenu>
          )}
        </Menu>

        <span className="mr-auto" />


        <Menu mode="horizontal" className="menu-divider">
          {!state.mobile && (
            <Menu.Item>
              <Link href="/homepage">
                <User />
              </Link>
            </Menu.Item>
          )}

          {!state.mobile && (
              <Menu.Item>
              <Link href="/homepage">
                <ShoppingCart />
              </Link>
            </Menu.Item>
          )}
          {!state.mobile && (
          <Menu.Item><ModalLogin /></Menu.Item>
          )}
          {state.mobile && (
            <SubMenu title={<ChevronsDown size={20} strokeWidth={1} />}>
              <Menu.Item><User /></Menu.Item>
              <Menu.Item><ShoppingCart /></Menu.Item>
              <Menu.Item><ModalLogin /></Menu.Item>
            </SubMenu>
          )}
        </Menu>
      </Header>
    </DashHeader>
  );
};

export default MainHeader;
