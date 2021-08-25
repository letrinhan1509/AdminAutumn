import React, { useState, useEffect } from 'react';
import { Image, Input, Button, message, Form, Spin, Row, Col } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Menus from "./Menus";
import { useHistory, Link } from "react-router-dom";
import "Container/scss/account.scss";
import admin from 'API_Call/Api_admin/admin';

const { TextArea } = Input;
const ChangePass = (props) => {
    const history = useHistory();

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setUser(JSON.parse(localStorage.getItem("user")));
            if (user !== null) {
                setLoading(true);
            }
        }, 1000);
    }, [])

    const update = (values) => {
        admin.updatePassword(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/tai-khoan');
                }, 2000)
            }
            else {
                //message.error("Sửa thông tin thất bại")
                message.error(res.data.message)
            }
        })
            .catch(err => {
                console.log(err.response);
                message.error(`${err.response.data.message}`)
            })
    };

    var url = window.location.toString();
    url = url.replace("http://localhost:3000/", '');

    return (
        <div>
            <Row className="col-wrapper">
                <Col className="col-one">
                    <Menus url={url} />
                </Col>
                <Col className="col-two">
                    <Row className="account-box">
                        <Col className="form">
                            {loading === false ? (
                                <Row className="spin-wrapper">
                                    <Spin className="spin" size="large" />
                                </Row>
                            ) : (
                                <Form
                                    name="update"
                                    onFinish={update}
                                    scrollToFirstError
                                    initialValues={{
                                        email: `${user.admin}`
                                    }}
                                >
                                    <h1 className="user-title">Thay đổi mật khẩu</h1>
                                    <Form.Item
                                        name="email"
                                        id="email"
                                        label="Email"
                                    >
                                        <Input disabled placeholder="email" />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        id="password"
                                        label="Mật khẩu cũ"
                                    >
                                        <Input.Password placeholder="Nhập mật khẩu cũ" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                                    </Form.Item>
                                    <Form.Item
                                        name="newPassword"
                                        id="newPassword"
                                        label="Mật khẩu mới"
                                    >
                                        <Input.Password placeholder="Nhập mật khẩu mới" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                                    </Form.Item>
                                    <Form.Item
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        label="Nhập lại mật khẩu mới"
                                    >
                                        <Input.Password placeholder="Nhập lại mật khẩu mới" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                                    </Form.Item>
                                    <Button value="submit" type="primary" htmlType="submit">Cập nhật</Button>
                                </Form>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    );
}

export default ChangePass;
