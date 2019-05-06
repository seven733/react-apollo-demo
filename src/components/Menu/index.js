import React from 'react';
import styles from './Menu.module.scss';
import { Link } from "react-router-dom";

function Menu (props) {
  const menus= [
    {
      name: '主页',
      path: "/",
    },
    {
      name: '热榜',
      path: "/hot",
    },
    {
      name: '最新',
      path: "/new",
    }
  ];

  return (
    <div className={styles.menu}>
     { menus.map(o => (<Link to={o.path} className={styles.menuItem} key={o.path}>{ o.name }</Link>)) }
    </div>
  );
}

export default Menu;