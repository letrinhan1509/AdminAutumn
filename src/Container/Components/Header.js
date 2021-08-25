import { Row, Col, Menu, Avatar, Image } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import React from "react";
/* import {  LoginOutlined } from '@ant-design/icons'; */
import { BrowserRouter as Router } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../Components/scss/Header.scss"
import { Layout } from 'antd';
//import { getAdminId } from '../../../api/models/model_admin';
const { Header } = Layout;

const HeaderPage = () => {
    let history = useHistory();
    let link = useHistory();
    const linkto = (e) => {
        link.push((`/${e.key}`));
    }
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        history.push('/');
        window.location.reload();
    }
    const admin = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Header className="header">
                <Row>
                    <Router>
                        <Col className="logo">
                            <p>Autumn</p>
                        </Col>
                        <Col className="col-right" span={20} offset={1}>
                            <Menu mode="horizontal">
                                <Menu.Item onClick={linkto} key="tai-khoan">
                                    <Row className="name-box">
                                        <Col className="box1"><img src={admin.hinh} width={50} /></Col>
                                        <Col className="box2">{admin.tennv}</Col>
                                    </Row>
                                    
                                </Menu.Item>
                                <Menu.Item onClick={logout} key="item" icon={<LogoutOutlined />}>
                                    Đăng xuất
                                </Menu.Item>
                            </Menu>
                        </Col>

                    </Router>
                </Row>
            </Header>
        </>
    );
};
export default HeaderPage;