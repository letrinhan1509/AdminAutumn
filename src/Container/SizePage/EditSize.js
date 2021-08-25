import "Container/scss/addpro.scss";
import { Button, Form, Input, message, Select, Modal } from "antd";
import React, {useEffect, useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import SIZE from 'API_Call/Api_size/size';

const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 22,
        },
        sm: {
            span: 9,
        },
    },
    wrapperCol: {
        xs: {
            span: 20,
        },
        sm: {
            span: 15,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 9,
        },
    },
};

const EditSize = (props) => {
    const token = localStorage.getItem("token");
    const sizeDetail = JSON.parse(localStorage.getItem('sizeDetail'));
    const [form] = Form.useForm();
    const history = useHistory();
    const { confirm } = Modal;

    const editsize = (values) => {
        
        console.log(values)
        SIZE.updateSize(values, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                localStorage.removeItem("size");
                setTimeout(() => {
                    history.push('/bang-size');
                }, 2000)
            }
            else {
                message.error(res.data.message)
            }
        })
            .catch(err => {
                message.error(`${err.response.data.message}`)
            })
    };

    const size = [
        {
            key: 1,
            masize: 'S',
            tensize: 'S',
        },
        {
            key: 2,
            masize: 'M',
            tensize: 'M',
        },
        {
            key: 3,
            masize: 'L',
            tensize: 'L',
        },
        {
            key: 4,
            masize: 'XL',
            tensize: 'XL',
        }
    ];

    const gioitinh = [
        {
            key: 1,
            ma: 'Nam',
            ten: 'Nam',
        },
        {
            key: 2,
            ma: 'Nữ',
            ten: 'Nữ',
        }
    ];

    const back = () => {
        confirm({
            title: 'Bạn muốn trở về trang danh sách bảng size?',
            okText: 'Trở về',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                localStorage.removeItem("size");
                history.push('/bang-size');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center', marginTop: "10px", marginBottom: "30px"  }}>SỬA THÔNG TIN SIZE QUẦN ÁO</h2>
            {console.log("test" ,props.sizeDetail)}
            <Form
                {...formItemLayout}
                name="editsize"
                onFinish={editsize}
                initialValues={{
                    masize: `${sizeDetail.masize}`,
                    size: `${sizeDetail.size}`,
                    gioitinh: `${sizeDetail.gioitinh}`,
                    cannangtu: `${sizeDetail.cannangtu}`,
                    cannangden: `${sizeDetail.cannangden}`,
                    chieucaotu: `${sizeDetail.chieucaotu}`,
                    chieucaoden: `${sizeDetail.chieucaoden}`
                }}
                scrollToFirstError
                className="register-form"
            >

                <Form.Item
                    name="masize"
                    label="Mã size"

                >
                    <Input style={{ width: 200 }} disabled />
                </Form.Item>
                <Form.Item
                    name="size"
                    label="Size"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên loại !!!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Select style={{ width: 200 }}>
                        {size.map((item) => {
                            return (
                                <>
                                    <Option value={item.masize}>{item.tensize}</Option>
                                </>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="gioitinh"
                    label="Giới tính"
                >
                    <Select style={{ width: 200 }}>
                        {gioitinh.map((item) => {
                            return (
                                <>
                                    <Option value={item.ma}>{item.ten}</Option>
                                </>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="cannangtu"
                    label="Cân nặng từ"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập cân nặng!',
                        },
                    ]}
                >
                    <Input style={{ width: 200 }} placeholder="Nhập số cân nặng" />
                </Form.Item>
                <Form.Item
                    name="cannangden"
                    label="Cân nặng đến"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập cân nặng!',
                        },
                    ]}
                >
                    <Input style={{ width: 200 }} placeholder="Nhập số cân nặng" />
                </Form.Item>
                <Form.Item
                    name="chieucaotu"
                    label="Chiều cao từ"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập chiều cao!',
                        },
                    ]}
                >
                    <Input style={{ width: 200 }} placeholder="Nhập chiều cao" />
                </Form.Item>
                <Form.Item
                    name="chieucaoden"
                    label="Chiều cao đến"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập chiều cao!',
                        },
                    ]}
                >
                    <Input style={{ width: 200 }} placeholder="Nhập chiều cao" />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button className="ant-btn ant-btn-dashed " onClick={back} style={{ marginLeft: -30 }}>
                        Trở về
                    </Button>
                    <Button value="submit" type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditSize;