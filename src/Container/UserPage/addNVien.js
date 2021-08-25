import { Button, Form, Input, message, Select } from "antd";
import admin from 'API_Call/Api_admin/admin';
import city from 'API_Call/Api_city/city';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";

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
const AddNV = (props) => {
    const token = localStorage.getItem("token");
    const [form] = Form.useForm();
    const history = useHistory();


    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+84</Option>
            </Select>
        </Form.Item>
    );

    //API Thành Phố
    const [listCity, setlistCity] = useState([]);
    useEffect(() => {
        city.getAll().then((res) => {
            setlistCity(res.data.city);
        })
    }, []);

    //API Quận - Huyện
    const [listDistrict, setlistDistrict] = useState([]);
    let idCity = "";
    const onChangeCity = (e) => {
        idCity = e;
        city.getCityDistrict(idCity).then((res) => {
            setlistDistrict(res.data.district);
        })
    };
    
    //API Phường - Xã
    const [listWard, setlistWard] = useState([]);
    let idDistrict = "";
    const onChangeDistrict = (e) => {
        idDistrict = e;
        city.getDistrictWard(idDistrict).then((res) => {
            setlistWard(res.data.ward);
        })
    };

    const register = (values) => {
        console.log(values);
        admin.register(values, token).then((res) => {
            if (res.data.status ==="Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/danh-sach-admin');
                }, 2000)
            }
            else{
                message.error(res.data.message)
            }
        })
            .catch(err => {
                message.error(`Thêm nhân viên thất bại !\n ${err.response.data.message}`)
            })
    };

    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}>THÊM NHÂN VIÊN</h2>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={register}
                initialValues={{
                    residence: ["zhejiang", "hangzhou", "xihu"],
                    prefix: "86",
                }}
                scrollToFirstError
                className="register-form"
            >
                <Form.Item
                    name="email"
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
                    <Input />
                </Form.Item>
                <Form.Item
                    name="name"
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
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="city"
                    id="city"
                    label="Thành phố"
                >
                    <Select onChange={onChangeCity}>
                        {listCity.map((item) => {
                            return (
                                <>
                                    <Option value={item.ID}>{item.Title}</Option>
                                </>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="district"
                    id="district"
                    label="Quận - Huyện"
                >
                    <Select onChange={onChangeDistrict}>
                        {listDistrict.map((item) => {
                            return (
                                <>
                                    <Option value={item.ID}>{item.Title}</Option>
                                </>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="ward"
                    id="ward"
                    label="Phường - Xã"
                >
                    <Select>
                        {listWard.map((item) => {
                            return (
                                <>
                                    <Option value={item.ID}>{item.Title}</Option>
                                </>
                            )
                        })}
                    </Select>
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
                    name="phone"
                    id="phone"
                    label="Phone Number"
                    rules={[{
                        required: true,
                        message: 'Vui lòng nhập số điện thoại !'
                    }]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="permission"
                    id="permission"
                    label="Mã quyền"
                >
                    <Select>
                        <Option value="QLCH">Quản lý cửa hàng</Option>
                        <Option value="NVBH">Nhân viên bán hàng</Option>
                        <Option value="NVGH">Nhân viên giao hàng</Option>
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
                        Đăng kí
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddNV;