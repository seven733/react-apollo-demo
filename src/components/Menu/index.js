import React, { useState } from 'react';
import styles from './Menu.module.scss';
import { Link } from "react-router-dom";
import { useStore } from 'easy-peasy';
import Login from 'components/Login';

function Menu (props) {
  const [ show, updateShow ] = useState(false);
  const user = useStore(state => state.user.data);
  const menus= [
    { name: '主页', path: "/", },
    { name: '热榜', path: "/hot" },
    { name: '最新', path: "/new" }
  ];

  return (
    <div className={ styles.menu }>
     { menus.map(o => (<Link to={o.path} className={styles.menuItem} key={o.path}>{ o.name }</Link>)) }
     <div className={ styles.menuUser }>
      {
        user ?
          <>
            <span>{ user.name}</span>
            <i className={ "iconfont" }>&#xe601;</i>
          </> :
          <>
            <span onClick={() => updateShow(true)}>登录</span>
            { show && <Login className={ styles.menuLogin } onClose={() => updateShow(false)}></Login> }
          </>
      }
     </div>
    </div>
  );
}

export default Menu;