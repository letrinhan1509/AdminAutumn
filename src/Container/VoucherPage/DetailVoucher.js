import React from 'react';
import { Form, Input, Button, Image, Modal } from 'antd';
import { useHistory } from "react-router-dom"
import "Container/scss/addpro.scss";

const { TextArea } = Input;
const { confirm } = Modal;
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
            offset: 11,
        },
    },
};


const DetailVoucher = (props) => {

    const [form] = Form.useForm();
    const history = useHistory();
    let voucherID = JSON.parse(localStorage.getItem('voucherID'));
    var dateBD = new Date(voucherID.ngaybd);
    var dateKT = new Date(voucherID.ngaykt);

    const back = () => {
        confirm({
            title: 'Bạn muốn trở về trang danh sách voucher?',
            okText: 'Trở về',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                localStorage.removeItem("voucherID");
                history.push('/danh-sach-voucher');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };


    return (
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center' }}>THÔNG TIN CHI TIẾT VOUCHER</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    scrollToFirstError
                    initialValues={{
                        makm: `${voucherID.makm}`,
                        tenkm: `${voucherID.tenkm}`,
                        voucher: `${voucherID.voucher}`,
                        dieukien: `${voucherID.dieukien}`,
                        giagiam: `${voucherID.giagiam}`,
                        ghichu: `${voucherID.ghichu}`,
                        hinh: `${voucherID.hinh}`,
                    }}
                >
                    <Form.Item
                        name="makm"
                        label="Mã khuyến mãi"
                    >
                        <Input disabled style={{fontWeight: 600, color: 'black'}}/>
                    </Form.Item>
                    <Form.Item
                        name="tenkm"
                        label="Tên khuyến mãi"
                    >
                        <Input disabled style={{fontWeight: 600, color: 'black'}}/>
                    </Form.Item>
                    <Form.Item
                        name="voucher"
                        label="Mã Voucher"
                    >
                        <Input disabled style={{fontWeight: 600, color: 'black'}}/>
                    </Form.Item>
                    <Form.Item
                        name="dieukien"
                        label="Điều kiện"
                    >
                        <Input disabled style={{fontWeight: 600, color: 'black'}}/>
                    </Form.Item>
                    <Form.Item
                        name="giagiam"
                        label="Giá giảm"
                    >
                        <Input disabled style={{fontWeight: 600, color: 'black'}}/>
                    </Form.Item>
                    <Form.Item
                        name="ghichu"
                        label="Ghi chú"
                    >
                        <TextArea rows={3} disabled style={{fontWeight: 600, color: 'black'}}/>
                    </Form.Item>
                    <Form.Item
                        label="Ảnh sản phẩm"
                    >
                        <Image src={voucherID.hinh} width={120} />
                    </Form.Item>
                    <Form.Item
                        label="Ngày bắt đầu"
                    >
                        <Input value={dateBD.toLocaleDateString()} disabled style={{fontWeight: 600, color: 'black'}}/>
                    </Form.Item>
                    <Form.Item
                        label="Ngày kết thúc"
                    >
                        <Input value={dateKT.toLocaleDateString()} disabled style={{fontWeight: 600, color: 'black'}}/>
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                    >
                        {voucherID.trangthai === 1 ? (
                            <Input value="Hiện" disabled style={{fontWeight: 600, color: 'black'}}/>
                        ) : (
                            <Input value="Ẩn" disabled style={{fontWeight: 600, color: 'black'}}/>
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button className="ant-btn ant-btn-primary" onClick={back}>
                            Trở về
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default DetailVoucher;
