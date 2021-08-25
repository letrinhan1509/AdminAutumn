import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Form, Input, Button, Select, Checkbox, DatePicker, Space, message, Table, Modal, Radio } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory, Link } from "react-router-dom"
import "Container/scss/addSale.scss";
import moment from 'moment';
import product from 'API_Call/Api_product/product';
import catalog from 'API_Call/Api_catalog/catalog';
import discount from 'API_Call/Api_discount/discount';

const { Option } = Select;
const { TextArea } = Input;
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
            offset: 8,
        },
    },
};


const EditSale = (props) => {
    const token = localStorage.getItem("token");
    const saleID = JSON.parse(localStorage.getItem('saleID'));
    //const chitietKM = JSON.parse(saleID.chitietKM);
    console.log(saleID);
    const valueOption = useRef(null);
    const [form] = Form.useForm();
    const history = useHistory();
    const DETAIL = useRef(null);

    const [dateEnd, setDateEnd] = useState("");
    function endChange(date) {
        if (date !== null) {
            setDateEnd(date._d);
        }
    }
    const [title, setTitle] = useState("Hiện");
    const selectTitle = (e) => {
        setTitle(e.target.value);
        console.log(title);
    };

    const update = (values) => {
        //values["ngaybd"] = moment(saleID.ngaybd).format('YYYY-MM-DD');
        values['makm'] = saleID.makm;
        if (dateEnd !== "") {
            values["ngaykt"] = moment(dateEnd).format('YYYY-MM-DD');
        } else {
            values["ngaykt"] = moment(saleID.ngaykt).format('YYYY-MM-DD');
        }
        values["deleteMact"] = delSale;
        console.log(values);
        discount.updateSale(values, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                localStorage.removeItem("saleID");
                setTimeout(() => {
                    history.push('/danh-sach-khuyen-mai');
                }, 2000)
            }
        })
            .catch(err => {
                message.error(`${err.response.data.message}`);
            })
    };

    const [listTypes, setListTypes] = useState([]);
    const [listPro, setlistPro] = useState([]);
    useEffect(() => {
        catalog.getAllType().then((res) => {
            setListTypes(res.data.data);
        })
    }, []);
    //Hiển thị loại theo danh mục
    const getSP = (e) => {
        let id = "";
        id = e;
        console.log(id);
        product.getLoai(id).then((res) => {
            setlistPro(res.data.data);
            console.log(res.data.data);

        })
        console.log(listPro);
    };
    const ctKM = saleID.chitietKM;
    const [add, setAdd] = useState(ctKM);
    const [delSale, setDelSale] = useState([]);
    
    const { confirm } = Modal;
    function showDeleteSale(item) {
        console.log(item);
        confirm({
            title: 'Bạn thật sự muốn xóa khuyến mãi này?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                setDelSale([...delSale, item.mact]);
                setAdd(
                    add.filter((x) => x.mact !== item.mact)
                );
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const back = () => {
        confirm({
            title: 'Bạn muốn trở về trang danh sách khuyến mãi?',
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
    };

    const [hide, setHide] = useState(false);
    const changeNgaykt = () => {
        setHide(!hide);
    }

    return (
        <>
            <div className="sale-wrapper">
                <h2 style={{ textAlign: 'center' }}> Cập nhật thông tin chương trình khuyến mãi</h2>
                <div className="col-box">
                    <div className="col-one">
                        <Form
                            {...formItemLayout}
                            form={form}
                            name="register"
                            onFinish={update}
                            scrollToFirstError
                            initialValues={{
                                tenkm: `${saleID.tenkm}`,
                                ghichu: `${saleID.ghichu}`,
                                ngaykt: `${saleID.ngaykt}`,
                            }}
                        >
                            <Form.Item
                                name="tenkm"
                                label="Tên chương trình"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên chương trình khuyến mãi!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="ghichu"
                                label="Ghi chú"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập ghi chú cho khuyến mãi này !',
                                    },
                                ]}
                            >
                                <TextArea rows={3} />
                            </Form.Item>
                            <Form.Item
                                label="Ngày bắt đầu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn ngày bắt đầu!',
                                    },
                                ]}
                            >
                                <Input value={moment(saleID.ngaybd).format('DD-MM-YYYY')} disabled style={{ width: 150, color: 'black' }} />
                            </Form.Item>
                            <Form.Item
                                label="Ngày kết thúc"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng chọn ngày kết thúc!',
                                    },
                                ]}
                            >
                                {hide === false ? (
                                    <>
                                        <Input value={moment(saleID.ngaykt).format('DD-MM-YYYY')} disabled style={{ width: 150, color: 'black' }} />
                                        <Button type="primary" onClick={changeNgaykt}>Đổi</Button>
                                    </>
                                ) : (
                                    <>
                                        <DatePicker onChange={endChange} />
                                        <Button type="primary" onClick={changeNgaykt}>Đổi</Button>
                                    </>
                                )}
                            </Form.Item>
                            {/* <Form.Item
                                label="Trạng thái"
                            >
                                <Radio.Group onChange={selectTitle} value={title}>
                                    <Radio value="Hiện">Hiện</Radio>
                                    <Radio value="Ẩn">Ẩn</Radio>
                                </Radio.Group>
                            </Form.Item> */}
                            <Form.Item {...tailFormItemLayout}>
                                <Button className="ant-btn ant-btn-dashed " onClick={back} style={{ marginLeft: -30 }}>
                                    Trở về
                                </Button>
                                {add.length !== 0 ? (
                                    <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                                        Cập nhật
                                    </Button>
                                ) : (
                                    <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }} disabled>
                                        Cập nhật
                                    </Button>
                                )}
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="col-two">
                        <Row className="add-sale">
                            {
                                add.length !== 0 ? (
                                    <>
                                        <h1 >CHƯƠNG TRÌNH KHUYẾN MÃI</h1>
                                        {add.map((item) => {
                                            const chitiet_km = JSON.parse(item.chitiet_km);
                                            return (
                                                <>
                                                    <Col className="box-selected">
                                                        {/* <p>{item.id}</p> */}
                                                        <Row className="title">
                                                            <Col>
                                                                {add.length === 1 ? (
                                                                    <Button onClick={() => showDeleteSale(item)} size="small" type="primary" danger disabled>
                                                                        <CloseOutlined />
                                                                    </Button>
                                                                ) : (
                                                                    <Button onClick={() => showDeleteSale(item)} size="small" type="primary" danger>
                                                                        <CloseOutlined />
                                                                    </Button>
                                                                )}
                                                            </Col>
                                                            <Col><span>Chiết khấu: </span>{item.chietkhau}</Col>
                                                        </Row>
                                                        <Row className="product-inf" style={{ margin: 0 }}>
                                                            <Col><span>Mã: </span>{item.masp}</Col>
                                                            <Col><span>Tên: </span>{item.tensp}</Col>
                                                            <Col><span>Giá: </span>{item.giakm}</Col>
                                                        </Row>
                                                        {chitiet_km.map((sp) => {
                                                            return (
                                                                <>

                                                                    <ul className="product-detail" style={{ marginLeft: 25 }}>
                                                                        <li style={{ marginTop: 10 }}>
                                                                            <span>Size: {sp.size}</span>
                                                                            <span style={{ marginLeft: 50 }}>Màu: {sp.mau}</span>
                                                                            <span style={{ marginLeft: 50 }}>Số lượng: {sp.soluong}</span>
                                                                        </li>
                                                                    </ul>
                                                                </>
                                                            );
                                                        })}
                                                    </Col>
                                                </>
                                            );
                                        })}
                                    </>
                                ) : ("")
                            }
                        </Row>
                    </div>
                </div>
            </div>
        </>
    );
};
export default EditSale;
