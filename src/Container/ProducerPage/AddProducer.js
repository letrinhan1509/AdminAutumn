import { Button, Form, Input, message, Modal } from 'antd';
import producer from 'API_Call/Api_producer/producer';
import React from 'react';
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";

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

const AddProducer = (props) => {
    const token = localStorage.getItem("token");
    const [form] = Form.useForm();
    const history = useHistory();
    const { confirm } = Modal;
    const addProducer = (values) => {
        console.log(values);
        producer.addProducer(values, token).then((res) => {
            message.success(res.data.message)
            setTimeout(() => {
                history.push('/danh-sach-nha-sx');
            }, 2000)
        })
            .catch(err => {
                console.log(err.response);
                message.error(`${err.response.data.message}`)
            })
    };
    const back = () => {
        confirm({
            title: 'Bạn muốn trở về trang danh sách nhà sản xuất?',
            okText: 'Trở về',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                history.push('/danh-sach-nha-sx');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center' }}> Nhập thông tin nhà sản xuất</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="addProducer"
                    onFinish={addProducer}
                    scrollToFirstError
                >
                    <Form.Item
                        name="mansx"
                        label="Mã nhà sản xuất"
                        rules={[
                            {
                                type: 'string',
                                message: 'Mã nhà sản xuất không được để trống!',
                            },
                            {
                                required: true,
                                message: 'Điền mã nhà sản xuất',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="tennsx"
                        label="Tên nhà sản xuất"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập tên nhà sản xuất!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="xuatxu"
                        label="Xuất xứ"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập xuất xứ!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button className="ant-btn ant-btn-dashed " onClick={back} style={{ marginLeft: -30 }}>
                            Trở về
                        </Button>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                            Thêm nhà sản xuất
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default AddProducer;
