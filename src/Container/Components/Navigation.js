import React from "react";
import { Menu } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined , SettingOutlined, DashboardOutlined, IdcardOutlined,TagsOutlined, MessageOutlined, 
    ProfileOutlined, DollarCircleOutlined, LogoutOutlined, SkinOutlined  } from '@ant-design/icons';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import "../Components/scss/nav.scss"


const { SubMenu } = Menu;
const Navigation = () => {
    let history = useHistory()
    const link = useHistory();
    const linkto = (e) => {
        link.push(`/${e.key}`);
    }
    const logout = () => {
        //localStorage.removeItem("token")
        localStorage.removeItem("user")
        history.push('/');
        window.location.reload();
    }
    let result = JSON.parse(localStorage.getItem('user'))
    console.log(result);
    return (
        <>
            <Menu
                /* onClick={this.handleClick} */
                style={{ width: 256, minHeight: 300 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={result.permission === "QLNS" ? (['sub8', 'sub2']) : (['sub3', 'sub4'])}
                mode="inline"
                onClick={linkto}
                className="nav"
                forceSubMenuRender="true">
                <Menu.Item key="" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
                {result.permission === "QLNS" || result.permission === "Admin" ? (
                    <SubMenu key="sub2" icon={<IdcardOutlined />} title=" Quản lý tài khoản">
                        <Menu.Item key="danh-sach-khach-hang" icon={<ProfileOutlined />}>Khách hàng</Menu.Item>
                        <Menu.Item key="danh-sach-admin" icon={<ProfileOutlined />}>Nhân viên</Menu.Item>
                    </SubMenu>
                ) : ("")}
                {result.permission === "QLCH" || result.permission === "Admin" || result.permission === "NVBH" ? (
                    <>
                        <SubMenu key="sub3" icon={<AppstoreOutlined />} title="Quản lý danh mục">
                            <Menu.Item key="tat-ca-san-pham" icon={<UnorderedListOutlined />} >Danh sách sản phẩm</Menu.Item>
                            {result.permission !== "NVBH" ? (
                                <>
                                    <Menu.Item key="danh-sach-loai" icon={<UnorderedListOutlined />} >Danh sách loại</Menu.Item>
                                    <Menu.Item key="danh-sach-nha-sx" icon={<UnorderedListOutlined />} >Danh sách nhà sản xuất</Menu.Item>
                                    <Menu.Item key="danh-muc-san-pham" icon={<UnorderedListOutlined />}>Danh mục sản phẩm</Menu.Item>
                                </>
                            ) : ("")}
                        </SubMenu>
                        <SubMenu key="sub4" icon={<DollarCircleOutlined />} title="Quản lý kinh doanh">
                            <Menu.Item key="danh-sach-thong-ke" icon={<UnorderedListOutlined />} >Danh sách thống kê</Menu.Item>
                            <Menu.Item key="danh-sach-don-hang" icon={<UnorderedListOutlined />} >Danh sách đơn hàng</Menu.Item>
                            <Menu.Item key="danh-sach-trang-thai" icon={<UnorderedListOutlined />} >Danh sách trạng thái</Menu.Item>
                            <SubMenu key="sub5" icon={<TagsOutlined />} title="Quản lý khuyến mãi">
                                <Menu.Item key="danh-sach-voucher" icon={<UnorderedListOutlined />}>Danh sách voucher</Menu.Item>
                                <Menu.Item key="danh-sach-khuyen-mai" icon={<UnorderedListOutlined />}>Danh sách khuyến mãi</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <SubMenu key="sub6" icon={<MessageOutlined />} title="Quản lý bình luận">
                            <Menu.Item key="danh-sach-binh-luan" icon={<UnorderedListOutlined />}>Danh sách các bình luận</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="bang-size" icon={<SkinOutlined />}>Bảng size quần áo</Menu.Item>
                    </>
                ) : ("")}

                <SubMenu key="sub8" icon={<SettingOutlined />} title="Cài đặt">
                    <Menu.Item key="tai-khoan" icon={<ProfileOutlined />}>Thông tin tài khoản</Menu.Item>
                    <Menu.Item onClick={logout} icon={<LogoutOutlined />}>Đăng xuất</Menu.Item>
                </SubMenu>
            </Menu>
        </>
    )
}

export default Navigation;