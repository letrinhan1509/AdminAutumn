import { Button, Form, Input, message, Modal } from "antd";
import React from 'react';
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
import producers from 'API_Call/Api_producer/producer';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 22,
        },
        sm: {
            span: 6,
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

const EditProducer = (props) => {
    const token = localStorage.getItem("token");
    const [form] = Form.useForm();
    const history = useHistory();
    const { confirm } = Modal;
    const Producer = JSON.parse(localStorage.getItem("producer"))

    const back = () => {
        confirm({
            title: 'Bạn muốn trở về trang danh sách nhà sản xuất?',
            okText: 'Trở về',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                localStorage.removeItem("producer");
                history.push('/danh-sach-nha-sx');
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    }

    const update = (values) => {
        console.log(values)
        producers.updateProducer(values, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                localStorage.removeItem("producer");
                setTimeout(() => {
                    history.push('/danh-sach-nha-sx');
                }, 2000)
            }
        })
            .catch(err => {
                message.error(`${err.response.data.message}`);
            })
    };

    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}>SỬA THÔNG TIN NHÀ SẢN XUẤT</h2>
            <Form
                {...formItemLayout}
                form={form}
                name="update"
                onFinish={update}
                initialValues={{
                    mansx: `${Producer.mansx}`,
                    tennsx: `${Producer.tennsx}`,
                    xuatxu: `${Producer.xuatxu}`,
                }}
                scrollToFirstError
                className="register-form"
            >
                <Form.Item
                    name="mansx"
                    id="mansx"
                    label="Mã nhà sản xuất"

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="tennsx"
                    id="tennsx"
                    label="Tên nhà sản xuất"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên nhà sản xuất !!!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="xuatxu"
                    id="xuatxu"
                    label="Xuất xứ"

                >
                    <Input />
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

export default EditProducer;