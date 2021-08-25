import React from 'react';
import { Form, Input, Button, Modal, Table } from 'antd';
import { useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";


const { TextArea } = Input;
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
            offset: 11,
        },
    },
};
const DetailSale = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const { confirm } = Modal;
    const saleID = JSON.parse(localStorage.getItem("saleID"));
    var dateBD = new Date(saleID.ngaybd);
    var dateKT = new Date(saleID.ngaykt);

    const back = () => {
        confirm({
            title: 'Bạn muốn trở về trang danh sách Khuyến mãi?',
            okText: 'Trở về',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                localStorage.removeItem("saleID");
                history.push('/danh-sach-khuyen-mai');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    const columns = [
        {
            title: 'Mã khuyến mãi',
            dataIndex: 'makm',
            key: 'makm',
        },
        {
            title: 'Chiết khấu',
            dataIndex: 'chietkhau',
            key: 'chietkhau',
        },
        {
            title: 'Mã sản phẩm',
            dataIndex: 'masp',
            key: 'masp',
        },
        {
            title: 'Giá khuyến mãi',
            dataIndex: 'giakm',
            key: 'giakm'
        },
    ];

    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}>thông tin chi tiết Khuyến mãi</h2>
            <Form
                {...formItemLayout}
                form={form}
                name="update"
                scrollToFirstError
                className="register-form"
                initialValues={{
                    makm: `${saleID.makm}`,
                    tenkm: `${saleID.tenkm}`,
                    ghichu: `${saleID.ghichu}`,
                }}
            >
                <Form.Item
                    name="makm"
                    label="Mã khuyến mãi"
                >
                    <Input disabled style={{ fontWeight: 600, color: 'black' }} />
                </Form.Item>
                <Form.Item
                    name="tenkm"
                    label="Tên khuyến mãi"
                >
                    <Input disabled style={{ fontWeight: 600, color: 'black' }} />
                </Form.Item>
                <Form.Item
                    name="ghichu"
                    label="Ghi chú"
                >
                    <TextArea rows={3} disabled style={{ fontWeight: 600, color: 'black' }} />
                </Form.Item>
                <Form.Item
                    label="Ngày bắt đầu"
                >
                    <Input value={dateBD.toLocaleDateString()} disabled style={{ fontWeight: 600, color: 'black' }} />
                </Form.Item>
                <Form.Item
                    label="Ngày kết thúc"
                >
                    <Input value={dateKT.toLocaleDateString()} disabled style={{ fontWeight: 600, color: 'black' }} />
                </Form.Item>
                <Form.Item
                    label="Trạng thái"
                >
                    {saleID.trangthai === 1 ? (
                        <Input value="Hiện" disabled style={{ fontWeight: 600, color: 'black' }}/>
                    ) : (
                        <Input value="Ẩn" disabled style={{ fontWeight: 600, color: 'black' }}/>
                    )}
                </Form.Item>
                <Table className="item" dataSource={saleID.chitietKM} rowKey="uid" columns={columns} pagination={{ pageSize: `5` }} style={{ padding: 10 }} size="middle" />
                <Form.Item {...tailFormItemLayout}>
                    <Button className="ant-btn ant-btn-primary" onClick={back}>
                        Trở về
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default DetailSale;
