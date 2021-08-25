import React from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const Login = () => {
  let history = useHistory()
  const login = (values) => {
    console.log('Received values of form: ', values);
    const url = "http://127.0.0.1:5000/api/dang-nhap";
    axios
      .post(url, values)
      .then(async (res) => {
        console.log(res.data.message);
        if (res.data.status === "Success") {
          message.success(`Đăng nhập thành công, Xin chào ${res.data.user.username}`)
          //console.log(res.data.admin)
          //localStorage.setItem('token', res.data.token)
          localStorage.setItem('admin', JSON.stringify(res.data.user))
          setTimeout(() => {
            history.push("/")
            window.location.reload()
        }, 2000)
        }
        if(res.data.status ==="lockUser") {
          message.error(res.data.message)
        }
        if(res.data.status ==="Fail") {
          message.error(res.data.message)
        }
      })
      .catch((err) => {
        message.error(`Sai tài khoản hoặc mật khẩu !!!`)
      })
  };
  return (
    <>
      <Row className="login-container">
        <Col style={{ height: '100vh', marginTop: '200px' }} className="login-form-wrapper" offset={7} span={10}>
          <h2 style={{ textAlign: 'center', fontSize: '30px' }}>Đăng nhập</h2>
          <Form

            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={login}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Chưa nhập Email bạn êiii !!!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Nhập mật khẩu đi bạn !!!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Đăng nhập
                </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

    </>
  );
}

export default Login;