import "Container/scss/addpro.scss";
import { Button, Form, Input, message, Select, Modal } from "antd";
import React from 'react';
import { useHistory } from "react-router-dom";
import SttOrder from 'API_Call/Api_admin/admin';

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

const EditStatus = (props) => {
    const token = localStorage.getItem("token");
    const [form] = Form.useForm();
    const statusOrder = JSON.parse(localStorage.getItem("statusOrder"))
    const history = useHistory();
    const { confirm } = Modal;
    
    const editSttOrder = (values) => {
        console.log(values)
        SttOrder.updateSTTorder(values, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/danh-sach-trang-thai');
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

    const back = () => {
        confirm({
            title: 'Bạn muốn trở về trang danh sách trạng thái?',
            okText: 'Trở về',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                localStorage.removeItem("size");
                history.push('/danh-sach-trang-thai');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center', marginTop: "10px", marginBottom: "30px" }}>SỬA THÔNG TIN SIZE QUẦN ÁO</h2>

            <Form
                {...formItemLayout}
                form={form}
                name="editSttOrder"
                onFinish={editSttOrder}
                initialValues={{
                    trangthai: `${statusOrder.trangthai}`,
                    tentt: `${statusOrder.tentt}`,
                }}
                scrollToFirstError
                className="register-form"
            >

                <Form.Item
                    name="trangthai"
                    id="trangthai"
                    label="Mã trạng thái"

                >
                    <Input style={{ width: 200 }} disabled />
                </Form.Item>
                <Form.Item
                    name="tentt"
                    id="tentt"
                    label="Tên trạng thái"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập chiều cao!',
                        },
                    ]}
                >
                    <Input style={{ width: 200 }} placeholder="Nhập tên trạng thái" />
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

export default EditStatus;