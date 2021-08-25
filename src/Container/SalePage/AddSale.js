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


const AddSale = (props) => {
    const token = localStorage.getItem("token");
    const valueOption = useRef(null);
    const [form] = Form.useForm();
    const history = useHistory();
    const DETAIL = useRef(null);
    const [datestart, setDatestart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    //let a = "";
    function startChange(date) {
        if (date !== null) {
            setDatestart(date._d);

        }
    }
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

    const addSale = (values) => {
        console.log(moment(datestart).format('YYYY-MM-DD'));

        values["ngaybd"] = moment(datestart).format('YYYY-MM-DD');
        values["ngaykt"] = moment(dateEnd).format('YYYY-MM-DD');
        values["trangthai"] = title;
        values["sanphamCK"] = add;
        console.log(values);

        discount.addSale(values, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/danh-sach-khuyen-mai');
                }, 1000)
            } else
                message.error(res.data.message);
        })
            .catch(err => {
                console.log(err.response);
                message.error(`${err.response.data.message}\n Tạo khuyến mãi sản phẩm thất bại !`);
            });
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
    const [add, setAdd] = useState([]);

    const [chitiets, setChitiets] = useState("");
    function ChangeDetail(value) {
        setChitiets(value);
    }
    const [proTemp, setProTemp] = useState([]);
    const addTemp = (e) => {
        let ma = e.currentTarget.dataset.id;
        product.getid(ma).then((res) => {
            if (res.data.status === "Success") {
                const ct = JSON.parse(res.data.dataSpham.chitiet);
                let newArr = [];
                let arrChiTiet = [];
                if (proTemp.length > 0) {
                    newArr = [...proTemp];
                }
                const existMa = proTemp.find((x) => x.masp === res.data.dataSpham.masp)
                if (!existMa) {
                    arrChiTiet.push({
                        ...ct.find(x => x.id === chitiets)
                    })
                    newArr.push({
                        ...res.data.dataSpham,
                        chitiet: arrChiTiet
                    });
                    setProTemp(newArr)
                }
                else {
                    if (proTemp.length > 0) {
                        arrChiTiet = [...existMa.chitiet];
                    }
                    const tam = ct.find((x) => x.id === chitiets);
                    const existChiTiet = existMa.chitiet.find((x) => x.id === chitiets && x.mau === tam.mau && x.size === tam.size);
                    if (!existChiTiet) {
                        arrChiTiet.push({
                            ...ct.find(x => x.id === chitiets)
                        })
                        const replaceIndex = newArr.findIndex((x) => x.masp === res.data.dataSpham.masp);
                        newArr.splice(replaceIndex, 1, {
                            ...res.data.dataSpham,
                            chitiet: arrChiTiet
                        })
                        setProTemp(newArr)
                    }
                    else {
                        message.error("Sản phẩm đã được thêm!");
                    }
                }
            }
        })
    }

    const columns = [
        {
            title: 'Mã',
            dataIndex: 'masp',
            key: 'masp',
        },
        {
            title: 'Tên',
            dataIndex: 'tensp',
            key: 'tensp',
        },
        {
            title: 'Giá',
            dataIndex: 'gia',
            key: 'gia',
        },
        {
            title: 'Chi tiết KM',
            dataIndex: 'chitiet',
            key: 'chitiet',
            render: (size, pro) => {
                let chitiet = JSON.parse(pro.chitiet);
                console.log(chitiet);
                return (
                    <Select ref={DETAIL} onChange={ChangeDetail} style={{ width: 250 }}>
                        {chitiet.map((item) => {
                            return (
                                <>
                                    <Option value={item.id}>size: {item.size} - Màu: {item.mau} - Số lượng: {item.soluong}</Option>
                                </>
                            )
                        })}
                    </Select>
                );
            }
        },
        {
            dataIndex: "masp",
            key: "masp",
            render: masp => (<div className="btn-box"><Button data-id={masp} onClick={addTemp} type="primary"><PlusOutlined /></Button></div>)
        }
    ];

    //const demo = [];
    const [lenght, setLenght] = useState(0);
    const [id, setID] = useState(0);
    //let id = 0;

    const thempro = () => {
        console.log(proTemp);
        //proTemp !== ""
        let chietkhau = valueOption.current.props.value;
        if (proTemp !== "" && chietkhau !== "") {
            let tam = id + 1;
            let value = []
            value['id'] = tam;
            value['sanpham'] = proTemp;
            value['chietkhau'] = chietkhau;
            console.log(value);
            setAdd([...add, { ...value }]);
            setID(tam);
            setProTemp([]);
        } else {
            message.error("Bạn chưa thêm sản phẩm hoặc chiết khấu !");
        }

        //setlistPro([]);
        //document.getElementById("P").value = "";
    };

    const { confirm } = Modal;
    function showDeleteProduct(item) {
        confirm({
            title: 'Bạn thật sự muốn xóa khuyến mãi này?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                setProTemp(
                    proTemp.filter((x) => x.masp !== item.masp)
                );
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    function showDeleteSale(item) {
        confirm({
            title: 'Bạn thật sự muốn xóa khuyến mãi này?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                setAdd(
                    add.filter((x) => x.id !== item.id)
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
                history.push('/danh-sach-khuyen-mai');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };


    return (
        <>
            <div className="sale-wrapper">
                <h2 style={{ textAlign: 'center' }}> Nhập thông tin chương trình khuyến mãi</h2>
                <div className="col-box">
                    <div className="col-one">
                        <Form
                            {...formItemLayout}
                            form={form}
                            name="register"
                            onFinish={addSale}
                            scrollToFirstError
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
                                <DatePicker onChange={startChange} />
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
                                <DatePicker onChange={endChange} />
                            </Form.Item>
                            <Form.Item
                                label="Trạng thái"
                            >
                                <Radio.Group onChange={selectTitle} value={title}>
                                    <Radio value="Hiện">Hiện</Radio>
                                    <Radio value="Ẩn">Ẩn</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button className="ant-btn ant-btn-dashed " onClick={back} style={{ marginLeft: -30 }}>
                                    Trở về
                                </Button>
                                {add.length !== 0 ? (
                                    <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                                        Tạo chương trình
                                    </Button>
                                ) : (
                                    <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }} disabled>
                                        Tạo chương trình
                                    </Button>
                                )}

                            </Form.Item>
                        </Form>
                    </div>
                    <div className="col-two">
                        <Form
                            onFinish={thempro}
                            id="themproduct"
                        >

                            <Row style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Form.Item
                                    label="Loại sản phẩm"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn loại sản phẩm!',
                                        },
                                    ]}
                                >
                                    <Select onChange={getSP} style={{ width: 150 }}>
                                        {listTypes.map((item) => {
                                            return (
                                                <>
                                                    <Option value={item.maloai}>{item.tenloai}</Option>
                                                </>
                                            )
                                        })}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="chietkhau"
                                    id="persen"
                                    label="Chiết khấu"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn chiết khấu!',
                                        },
                                    ]}
                                >
                                    {/* <Select onChange={plusID}>
                                    {chietkhau.map((item) => {
                                        return (
                                            <>
                                                <Option ref={valueOption} value={item.key}>{item.persen}</Option>
                                            </>
                                        )
                                    })}
                                </Select> */}
                                    <Input ref={valueOption} style={{ width: 150 }} />
                                </Form.Item>
                            </Row>
                            <Row className="add-sale">
                                {
                                    proTemp !== "" ? (
                                        <>
                                            {proTemp.map((item) => {
                                                return (
                                                    <>
                                                        {/* <Col>
                                                            <Button onClick={() => showDeleteProduct(item)} type="primary" danger>
                                                                <CloseOutlined />
                                                            </Button>
                                                        </Col> */}
                                                        <Col className="box-selected">
                                                            {/* <p>{item.id}</p> */}
                                                            <Row className="title">

                                                            </Row>
                                                            <Row className="product-inf">
                                                                <Col><span>Mã: </span>{item.masp}</Col>
                                                                <Col><span>Tên: </span>{item.tensp}</Col>
                                                                <Col><span>Giá: </span>{item.gia}</Col>
                                                                <Col>
                                                                    <Button onClick={() => showDeleteProduct(item)} size="small" type="primary" danger>
                                                                        <CloseOutlined />
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                            <ul className="product-detail">
                                                                {item.chitiet.map((ct) => (
                                                                    <li style={{ marginTop: 10 }}>
                                                                        <span>Size: {ct.size}</span>
                                                                        <span style={{ marginLeft: 50 }}>Màu: {ct.mau}</span>
                                                                        <span style={{ marginLeft: 50 }}>Số lượng: {ct.soluong}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </Col>
                                                    </>
                                                );
                                            })}
                                        </>
                                    ) : ("")
                                }
                            </Row>
                            <Table /*rowSelection={rowSelection}*/ rowKey={listPro => listPro.masp} dataSource={listPro} columns={columns} pagination={{ pageSize: 5 }} />
                            <Button onClick={thempro} >Thêm chương trình</Button>
                            {/* <Row className="sale-title">
                                <h1 >CHƯƠNG TRÌNH ĐÃ THÊM</h1>
                            </Row> */}
                            <Row className="add-sale">
                                {
                                    add.length !== 0 ? (
                                        <>
                                            <h1 >CHƯƠNG TRÌNH ĐÃ THÊM</h1>
                                            {add.map((item) => {
                                                return (
                                                    <>

                                                        <Col className="box-selected">
                                                            {/* <p>{item.id}</p> */}
                                                            <Row className="title">
                                                                <Col>
                                                                    <Button onClick={() => showDeleteSale(item)} size="small" type="primary" danger>
                                                                        <CloseOutlined />
                                                                    </Button>
                                                                </Col>
                                                                <Col><span>Chiết khấu: </span>{item.chietkhau}</Col>
                                                            </Row>
                                                            {item.sanpham.map((sp) => {
                                                                return (
                                                                    <>
                                                                        <Row className="product-inf" style={{margin: 0}}>
                                                                            <Col><span>Mã: </span>{sp.masp}</Col>
                                                                            <Col><span>Tên: </span>{sp.tensp}</Col>
                                                                            <Col><span>Giá: </span>{sp.gia}</Col>
                                                                        </Row>
                                                                        <ul className="product-detail" style={{marginLeft: 25}}>
                                                                            {sp.chitiet.map((ct) => (
                                                                                <li style={{ marginTop: 10 }}>
                                                                                    <span>Size: {ct.size}</span>
                                                                                    <span style={{ marginLeft: 50 }}>Màu: {ct.mau}</span>
                                                                                    <span style={{ marginLeft: 50 }}>Số lượng: {ct.soluong}</span>
                                                                                </li>
                                                                            ))}
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
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AddSale;
