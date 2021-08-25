import { Button, Form, Input, message, Select } from "antd";
import axios from "axios";
import React from 'react';
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
import admin from 'API_Call/Api_admin/admin';

const { Option } = Select;
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
const user = JSON.parse(localStorage.getItem("user"));
const UserInf = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+84</Option>
            </Select>
        </Form.Item>
    );

    const update = (values) => {
        console.log(values)
        let a = JSON.stringify({ admin: "adas@gmail.com" });
        admin.updateInfo(values).then((res) => {
            if (res.data.status ==="Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/');
                }, 2000)
            }
            else{
                //message.error("Thêm nhân viên thất bại!")
                message.error(res.data.message)
            }
        })
            .catch(err => {
                console.log(err.response);
                message.error(`Login fail!\n ${err.response.data}`)
            })
    };

    /*  const loadpage= ()=>{
         props.handleCreateUser();
     } */
    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}>thông tin NHÂN VIÊN</h2>
            <Form
                {...formItemLayout}
                form={form}
                name="update"
                onFinish={update}
                className="register-form"
            >
                <Form.Item
                    //name="email"
                    id="email"
                    label="E-mail"
                    rules={[
                        {
                            type: "email",
                            message: "Vui lòng nhập đúng E-mail!",
                        },
                        {
                            required: true,
                            message: "Bạn chưa nhập E-mail !",
                        },
                    ]}
                >
                    <Input value={user.email}/>
                </Form.Item>
                <Form.Item
                    //name="name"
                    id="name"
                    label="Tên nhân viên"
                    tooltip="Đây là tên đăng nhập của bạn."
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên tài khoảng !!!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input value={user.username}/>
                </Form.Item>
                <Form.Item
                    id="pass"
                    name="pass"
                    label="Mật khẩu"
                    rules={[
                        {
                            required: true,
                            message: "Bạn chưa nhập mật khẩu!",
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    id="pass1"
                    name="pass1"
                    label="Xác nhận mật khẩu"
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: "Bạn phải xác nhận mật khẩu!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("pass") === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(
                                    new Error(
                                        "Hai mật khẩu phải giống nhau!"
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    //name="address"
                    id="address"
                    label="Địa chỉ"

                >
                    <Input  value={user.address}/>
                </Form.Item>
                <Form.Item
                    //name="phone"
                    id="phone"
                    label="Phone Number"
                    rules={[{
                        required: true,
                        message: 'Vui lòng nhập số điện thoại !'
                    }]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} value={user.phone}/>
                </Form.Item>
                <Form.Item
                    //name="permission"
                    id="permission"
                    label="Mã quyền"
                >
                    <Select value={user.permission}>
                        <Option value="1">Admin</Option>
                        <Option value="2">Nhân viên bán hàng</Option>
                        <Option value="3">Nhân viên giao hàng</Option>
                    </Select>
                </Form.Item>
                {/* <Form.Item
                        name="set"
                        hidden='true'
                    >
                        <Input value={"123"} id={"123"} defaultValue={"123"} />
                    </Form.Item> */}
                <Form.Item {...tailFormItemLayout}>
                    <Link to={'/danh-sach-admin'} ><p style={{ marginRight: "20px", }} className="ant-btn ant-btn-dashed ">Trở về</p></Link>
                    <Button value="submit" type="primary" htmlType="submit">
                        Chỉnh sửa
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UserInf;