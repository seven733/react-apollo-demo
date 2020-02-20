
import React, { useState } from 'react';
import styles from './Login.module.scss';
import { Input, Button, message } from 'antd';
import * as Api from '@/api';
import { useActions } from 'easy-peasy';

function Modal ({ onClose }) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const setUser = useActions(actions => actions.user.set);

  async function login() {
    const res = await Api.login({ username, password });
    if (res.success) {
      onClose();
      message.success('登录成功');
      setUser(res.user);
    }
  }

  async function register() {
    let res = await Api.register({ username, password });
    if (res.success) {
      onClose();
      message.success('注册成功');
    }
  }

  return (
    <div className={ styles.Login }>
      <div>
        账号：
        <Input placeholder="input username" className={ styles.LoginInput } onChange={ e => setUsername(e.target.value) }/>
      </div>
      <div>
        密码：
        <Input.Password placeholder="input password" className={ styles.LoginInput } onChange={ e => setPassword(e.target.value) }/>
      </div>

      <Button onClick={() => login()}>登录</Button>
      <Button onClick={() => register()}>注册</Button>

    </div>
  )
}

export default Modal;