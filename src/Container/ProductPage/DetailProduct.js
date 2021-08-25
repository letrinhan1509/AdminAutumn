import { Button, Form, Input, Select, Image, Modal } from "antd";
import React from 'react';
import { useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";

const { Option } = Select;
const { confirm } = Modal;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 22,
        },
        sm: {
            span: 7,
        },
    },
    wrapperCol: {
        xs: {
            span: 20,
        },
        sm: {
            span: 12,
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
            offset: 11,
        },
    },
};


const DetailProduct = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const ProductEdit = JSON.parse(localStorage.getItem("product"))

    //nút trở về
    const back = () => {
        confirm({
            title: 'Bạn muốn trở về trang danh sách sản phẩm?',
            okText: 'Trở về',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                localStorage.removeItem("product");
                history.push('/tat-ca-san-pham');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}>THÔNG TIN CHI TIẾT SẢN PHẨM</h2>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                initialValues={{
                    masp: `${ProductEdit.masp}`,
                    code: `${ProductEdit.code}`,
                    tensp: `${ProductEdit.tensp}`,
                    soluong: `${ProductEdit.soluong}`,
                    size: `${ProductEdit.size}`,
                    mau: `${ProductEdit.mau}`,
                    gia: `${ProductEdit.gia}`,
                    mota: `${ProductEdit.mota}`,
                    trangthai: `${ProductEdit.trangthai}`,
                    mansx: `${ProductEdit.tennsx}`,
                    madm: `${ProductEdit.tendm}`,
                    maloai: `${ProductEdit.tenloai}`,
                }}
                scrollToFirstError
                className="register-form"
            >
                <Form.Item
                    name="masp"
                    label="masp"
                >
                    <Input disabled style={{fontWeight: 600, color: 'black'}}/>
                </Form.Item>
                <Form.Item
                    name="code"
                    label="Code"
                >
                    <Input disabled style={{fontWeight: 600, color: 'black'}}/>
                </Form.Item>
                <Form.Item
                    name="tensp"
                    label="Tên sản phẩm"
                >
                    <Input disabled style={{fontWeight: 600, color: 'black'}}/>
                </Form.Item>
                <Form.Item
                    name="soluong"
                    label="Số lượng"
                >
                    <Input disabled style={{fontWeight: 600, color: 'black'}}/>
                </Form.Item>
                <Form.Item
                    name="size"
                    label="Size"
                >
                    <Input disabled style={{fontWeight: 600, color: 'black'}}/>
                </Form.Item>
                <Form.Item
                    name="mau"
                    label="Màu"
                >
                    <Input disabled style={{fontWeight: 600, color: 'black'}}/>
                </Form.Item>
                <Form.Item
                    name="gia"
                    label="Giá"
                >
                    <Input disabled style={{fontWeight: 600, color: 'black'}}/>
                </Form.Item>
                <Form.Item
                    label="Ảnh sản phẩm"
                >
                    <Image src={ProductEdit.hinh} width={120} />
                </Form.Item>
                <Form.Item
                    name="mota"
                    label="Mô tả"
                >
                    <Input disabled style={{fontWeight: 600, color: 'black'}}/>
                </Form.Item>
                <Form.Item
                    label="Trạng thái"
                >
                    {ProductEdit.trangthai === 1 ? (
                        <Input value="Hiện" disabled style={{fontWeight: 600, color: 'black'}}/>
                    ) : (
                        <Input value="Ẩn" disabled style={{fontWeight: 600, color: 'black'}}/>
                    )}
                </Form.Item>
                <Form.Item name="mansx"
                    label="Nhà sản xuất"
                //rules={[{ required: true, message: 'Chọn nhà sản xuất!' }]}
                >
                    <Input disabled style={{fontWeight: 600, color: 'black'}}/>
                </Form.Item>
                <Form.Item
                    name="madm"
                    label="Danh mục"
                //rules={[{ required: true, message: 'Chọn mã loại!' }]}
                >
                    <Input disabled style={{fontWeight: 600, color: 'black'}}/>
                </Form.Item>
                <Form.Item
                    name="maloai"
                    label="Loại sản phẩm"
                //rules={[{ required: true, message: 'Chọn mã loại!' }]}
                >
                    <Input disabled style={{fontWeight: 600, color: 'black'}}/>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button className="ant-btn ant-btn-primary" onClick={back}>
                        Trở về
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default DetailProduct;