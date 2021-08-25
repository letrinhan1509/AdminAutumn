import { Button, Form, Input, message, Select, Modal } from 'antd';
import React from 'react';
import { useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
import Status from 'API_Call/Api_admin/admin';

const formItemLayout = {
    labelCol: {
        xs: { span: 22 },
        sm: { span: 9 },
    },
    wrapperCol: {
        xs: { span: 20 },
        sm: { span: 15 },
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
            offset: 10,
        },
    },
};


const AddStatus = (props) => {
    const token = localStorage.getItem("token");
    const [form] = Form.useForm();
    const { Option } = Select;
    const { confirm } = Modal;
    const history = useHistory();
    const addStatus = (values) => {
        console.log(values);
        Status.addSTTorder(values, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message);
                setTimeout(() => {
                    history.push('/danh-sach-trang-thai');
                }, 2000)
            }
        }).catch(err => {
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
                history.push('/danh-sach-trang-thai');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    return (
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center', marginTop: "10px", marginBottom: "30px" }}> Nhập thông tin của trạng thái</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="addProductType"
                    onFinish={addStatus}
                    scrollToFirstError
                >
                    <Form.Item
                        name="trangthai"
                        label="Mã trạng thái"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mã trạng thái!',
                            },
                        ]}
                    >
                        <Input style={{ width: 200 }} placeholder="Nhập mã trạng thái" />
                    </Form.Item>
                    <Form.Item
                        name="tentt"
                        label="Tên trạng thái"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên trạng thái!',
                            },
                        ]}
                    >
                        <Input style={{ width: 200 }} placeholder="Nhập thên trạng thái" />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button className="ant-btn ant-btn-dashed " onClick={back} style={{ marginLeft: -30 }}>
                            Trở về
                        </Button>
                        <Button type="primary" htmlType="submit"  style={{ marginLeft: 30 }}>
                            Thêm trạng thái
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default AddStatus;