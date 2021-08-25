import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useHistory } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import admin from 'API_Call/Api_admin/admin';
import "Container/scss/login.scss";


const formItemLayout = {
  labelCol: {
      xs: { span: 22 },
      sm: { span: 6 },
  },
  wrapperCol: {
      xs: { span: 20 },
      sm: { span: 15 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 22,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 10,
    },
  },
};


const Login = () => {
  const [form] = Form.useForm();
  let history = useHistory()


  const login = (values) => {
    console.log('Received values of form: ', values);
    admin.login(values)
      .then(async (res) => {
        console.log(res.data.message);
        if (res.data.status === "LoginSuccess") {
          message.success(`Đăng nhập thành công, Xin chào ${res.data.admin.username}`)
          console.log(res.data.admin)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.admin))
          setTimeout(() => {
            history.push("/")
            window.location.reload()
          }, 2000)
        }
        if (res.data.status === "lockUser") {
          message.error(res.data.message)
        }
        if (res.data.status === "LoginFail") {
          message.error(res.data.message)
        }
      })
      .catch((err) => {
        if(err.response == undefined) {
          message.error("Sai tài khoản hoặc mật khẩu. Đăng nhập thất bại !!!");
        } else {
          message.error(`Sai tài khoản hoặc mật khẩu !!!`);
        }
      })
  };
  
  return (
    <>
      <div className="login-wrapper">
        <h2 style={{ textAlign: 'center', fontSize: '30px' }}>Đăng nhập</h2>
        <Form
          {...formItemLayout}
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={login}
        >
          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: 'Chưa nhập Email bạn êiii !!!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: 'Nhập mật khẩu đi bạn !!!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>


    </>
  );
}

export default Login;