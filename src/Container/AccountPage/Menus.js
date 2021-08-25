import React, { useState } from 'react';
import { Menu } from 'antd';
import { EditOutlined, ProfileOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import "Container/scss/account.scss";


const Menus = (props) => {
    const history = useHistory();

    const [current, setCurrent] = useState("thong-tin-tai-khoan");
    const handClick = (e) => {
        history.push(`/${e.key}`);
    }

    return (
        <Menu
            onClick={handClick}
            selectedKeys={props.url}
        >
            <Menu.Item key="tai-khoan" icon={<ProfileOutlined />}>
                Thông tin tài khoản
            </Menu.Item>
            <Menu.Item key="tai-khoan/chinh-sua-tai-khoan" icon={<EditOutlined />}>
                Chỉnh sửa thông tin
            </Menu.Item>
            <Menu.Item key="tai-khoan/doi-mat-khau" icon={<EditOutlined />}>
                Đổi mật khẩu
            </Menu.Item>
        </Menu>

    );
}

export default Menus;
