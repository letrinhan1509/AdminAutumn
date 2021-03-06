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
            ma: 'N???',
            ten: 'N???',
        }
    ];

    const back = () => {
        confirm({
            title: 'Ba??n mu????n tr???? v???? trang danh sa??ch ba??ng size?',
            okText: 'Tr???? v????',
            okType: 'danger',
            cancelText: 'Kh??ng',
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
            <h2 style={{ textAlign: 'center', marginTop: "10px", marginBottom: "30px"  }}>S???A TH??NG TIN SIZE QU???N ??O</h2>
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
                    label="M?? size"

                >
                    <Input style={{ width: 200 }} disabled />
                </Form.Item>
                <Form.Item
                    name="size"
                    label="Size"
                    rules={[
                        {
                            required: true,
                            message: "Vui l??ng nh???p t??n lo???i !!!",
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
                    label="Gi???i t??nh"
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
                    label="C??n n???ng t???"
                    rules={[
                        {
                            required: true,
                            message: 'Vui l??ng nh???p c??n n???ng!',
                        },
                    ]}
                >
                    <Input style={{ width: 200 }} placeholder="Nh???p s??? c??n n???ng" />
                </Form.Item>
                <Form.Item
                    name="cannangden"
                    label="C??n n???ng ?????n"
                    rules={[
                        {
                            required: true,
                            message: 'Vui l??ng nh???p c??n n???ng!',
                        },
                    ]}
                >
                    <Input style={{ width: 200 }} placeholder="Nh???p s??? c??n n???ng" />
                </Form.Item>
                <Form.Item
                    name="chieucaotu"
                    label="Chi???u cao t???"
                    rules={[
                        {
                            required: true,
                            message: 'Vui l??ng nh???p chi???u cao!',
                        },
                    ]}
                >
                    <Input style={{ width: 200 }} placeholder="Nh???p chi???u cao" />
                </Form.Item>
                <Form.Item
                    name="chieucaoden"
                    label="Chi???u cao ?????n"
                    rules={[
                        {
                            required: true,
                            message: 'Vui l??ng nh???p chi???u cao!',
                        },
                    ]}
                >
                    <Input style={{ width: 200 }} placeholder="Nh???p chi???u cao" />
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button className="ant-btn ant-btn-dashed " onClick={back} style={{ marginLeft: -30 }}>
                        Tr???? v????
                    </Button>
                    <Button value="submit" type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                        X??c nh???n
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditSize;