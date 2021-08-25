import { Button, Form, Input, message, Select } from "antd";
import axios from "axios";
import React from 'react';
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
import admin from "API_Call/Api_admin/admin";

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

const EditNV = (props) => {
    const token = localStorage.getItem("token");
    const [form] = Form.useForm();
    const history = useHistory();
    const Admin = JSON.parse(localStorage.getItem("admin"));
    console.log(Admin);

    const back = ()=>{
        localStorage.removeItem("admin");
        history.goBack();
    }
    
    const update = (values) => {
        console.log(values)
        let a = JSON.stringify({ admin: "adas@gmail.com" });
        console.log(a);
        admin.updateInfo(values, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                localStorage.removeItem("admin");
                setTimeout(() => {
                    history.push('/danh-sach-admin');
                }, 2000)
            } else {
                message.error(res.data.message)
            }
        })
        .catch(err => {
                console.log(err.response);
                message.error(`ERROR !\n ${err.response.data.message}`)
        })
    };

    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}>SỬA THÔNG TIN NHÂN VIÊN</h2>

            <Form
                {...formItemLayout}
                form={form}
                name="update"
                onFinish={update}
                initialValues={{
                    adminId: `${Admin.manv}`,
                    prefix: "86",
                    email: `${Admin.admin}`,

                    name: `${Admin.tennv}`,
                    pass: `${Admin.matkhau}`,
                    pass1: `${Admin.matkhau}`,
                    phone: `${Admin.sodienthoai}`,
                    address: `${Admin.diachi}`,
                    permission: `${Admin.quyen}`
                }}
                scrollToFirstError
                className="register-form"
            >

                <Form.Item
                    name="adminId"
                    id="adminId"
                    label="Mã nhân viên"

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="email"
                    id="admin"
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
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="name"

                    label="Tên nhân viên"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên tài khoản !!!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
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
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item

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
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="phone"
                    id="phone"
                    label="Phone Number"
                    rules={[{
                        required: true,
                        message: 'Vui lòng nhập số điện thoại !'
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address"
                    id="address"
                    label="Địa chỉ"
                    rules={[{
                        required: true,
                        message: 'Vui lòng nhập địa chỉ !'
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="permission"
                    label="Phân quyền"
                >
                    <Select>
                        <Option value="Admin">Admin</Option>
                        <Option value="NVBH">Nhân viên bán hàng</Option>
                        <Option value="NVGH">Nhân viên giao hàng</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="set"
                    hidden='true'
                >
                    <Input value="123" id={"123"} defaultValue={"123"} />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Link onClick={back} ><p style={{ marginRight: "20px", }} className="ant-btn ant-btn-dashed ">Trở về</p></Link>
                    <Button value="submit" type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditNV;