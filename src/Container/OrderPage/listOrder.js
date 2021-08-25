import React, { useState, useEffect } from 'react';
import { Image, Row, Col, Input, Button, message, Select, Table, Form, Modal } from 'antd';
import Meta from "antd/lib/card/Meta";
import moment from 'moment';
import { useHistory, Link } from "react-router-dom";
import "Container/scss/addpro.scss";
import order from 'API_Call/Api_order/order';
import ghn from 'API_Call/Api_city/city';

const { TextArea } = Input;
const { Option } = Select;
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
const ListOrder = (props) => {
    const [form] = Form.useForm();
    const link = useHistory();
    const [ListOrder, setListOrder] = useState([]);
    const [a, setA] = useState([]);
    const [wordSearch, setWordSearch] = useState([]);
    const [pickUp, setPickUp] = useState([]);
    //API List Order:
    useEffect(() => {
        order.getAll().then((res) => {
            setListOrder(res.data.data);
            setWordSearch(res.data.data);
            console.log(res.data.data);
        })
        ghn.getAll_pickShiftGHN().then((res) => {
            setPickUp(res.data.pickShift);
        })
    }, []);


    //Redirect sua-san-pham 
    const loadDetail = (e) => {
        let id = e.currentTarget.dataset.id;
        order.getOrderID(id).then((res) => {
            if (res.data.status === "Success") {
                localStorage.setItem('order', JSON.stringify(res.data.data));
                setTimeout(() => {
                    link.push('/danh-sach-don-hang/chi-tiet');
                }, 100)
            }
        })
    }
    const loadEdit = (e) => {
        let id = e.currentTarget.dataset.id;
        order.getOrderID(id).then((res) => {
            if (res.data.status === "Success") {
                localStorage.setItem('order', JSON.stringify(res.data.data));
                setTimeout(() => {
                    link.push('/danh-sach-don-hang/sua-don-hang');
                }, 100)
            }
        })
    }

    //Tìm kiếm
    function removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
    function filterItems(arr, query) {
        return arr.filter(function (el) {
            if (removeAccents(el.tenkh.toLowerCase()).indexOf(removeAccents(query.toLowerCase())) !== -1) {
                return el;
            } else {
                return "";
            }

        });
    }
    let demo = ListOrder;
    function onChange(e) {
        if (e.target.value !== "") {
            let filter = filterItems(ListOrder, e.target.value);
            if (filter !== "") {
                demo = filter;
                setWordSearch(demo);
            } else {
                demo = ListOrder;
                setWordSearch(demo);
            }
        } else {
            demo = ListOrder;
            setWordSearch(demo);
        }
        console.log(demo);
    }
    const [pageSize, setPageSize] = useState(4);
    const size = [
        {
            key: 1,
            PSize: 4,

        },
        {
            key: 2,
            PSize: 6,
        },
        {
            key: 3,
            PSize: 8,
        },
        {
            key: 3,
            PSize: 10,
        }
    ];
    const ChangeSize = (e) => {
        setPageSize(e);
    };

    const [visible, setVisible] = useState(false);
    const [oderDetail, setOderDetail] = useState([]);
    const [service, setService] = useState([]);
    const TurnOn_GHN = (e) => {
        let id = e.currentTarget.dataset.id;
        order.getOrderID(id).then((res) => {
            if (res.data.status === "Success") {
                setOderDetail(res.data.data);
                console.log(res.data.data);
                let disID = JSON.parse(res.data.data.chitiet);
                ghn.getAll_ServiceGHN(disID.DistrictID).then((res) => {
                    setService(res.data.service);
                })
            }
            setVisible(true)
        });
    }

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'madonhang',
            key: 'madonhang',
        },
        {
            title: 'Mã GHN',
            dataIndex: 'code_GHN',
            key: 'code_GHN',
            render: code_GHN => {
                return (
                    code_GHN === null ? ("") : (code_GHN)
                );
            }
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'tenkh',
            key: 'tenkh',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'sodienthoai',
            key: 'sodienthoai',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'tongtien',
            key: 'tongtien',
            render: tongtien => {
                return (
                    tongtien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                );
            }
        },
        {
            title: 'Hình thức',
            dataIndex: 'hinhthuc',
            key: 'hinhthuc',
        },
        {
            title: 'Vận chuyển',
            dataIndex: 'vanchuyen',
            key: 'vanchuyen',

        },
        {
            title: 'Ngày đặt',
            dataIndex: 'ngaydat',
            key: 'ngaydat',
            render: ngaydat => {
                return (
                    moment(ngaydat).format('DD/MM/YYYY')
                );
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'tentt',
            key: 'tentt',
        },
        user.permission !== "NVGH" ? (
            {
                dataIndex: "madonhang",
                key: "madonhang",
                render: (madonhang, stt) => (stt.trangthai === 4 ? ("") : (<div className="btn-box fix"><Button data-id={madonhang} onClick={loadEdit} type="primary">Sửa</Button></div>))
            }) : {},
        {
            dataIndex: "madonhang",
            key: "madonhang",
            render: madonhang => (<div className="btn-box"><Button data-id={madonhang} onClick={loadDetail} type="primary">Chi tiết</Button></div>)
        },
        user.permission !== "NVGH" ? (
            {
                dataIndex: 'madonhang',
                key: 'madonhang',
                render: (madonhang, code) => (code.vanchuyen !== "GHN" ? ("") : (<div className="btn-box fix"><Button data-id={madonhang} key={madonhang} type="primary" onClick={TurnOn_GHN}> GHN </Button></div>))
            }
        ) : {}
    ];

    const giohang = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'tensp',
            key: 'tensp',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Màu',
            dataIndex: 'mau',
            key: 'mau',
        },
        {
            title: 'Giá',
            dataIndex: 'gia',
            key: 'gia',
        },
        {
            title: 'Số lượng',
            dataIndex: 'soluong',
            key: 'soluong',
        },
        {
            title: 'Thành tiền',
            dataIndex: 'thanhtien',
            key: 'thanhtien',
        },
    ];


    const Create_GHN = (values) => {
        service.map((item) => {
            if (item.service_id === values.dichvuID) {
                values["service_type_id"] = item.service_type_id;
            }
        });
        values["madonhang"] = oderDetail.madonhang;
        values["makm"] = oderDetail.makm;
        values["giohang"] = oderDetail.chitietDH;
        values["chitiet"] = oderDetail.chitiet;
        values["tongtien"] = oderDetail.tongtien;
        console.log(values);
        setVisible(false);
        order.createOrderGHN(values).then(async (res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message);
            } else {
                message.error("Tạo đơn hàng trên GHN thất bại !");
            }
        })
            .catch((err) => {
                message.error(`\n ${err.response.data.message}`);
            });
    }


    return (
        <>
            <div className="product-wrapper" >
                <h2 style={{ textAlign: 'center', marginTop: "20px", marginBottom: "20px" }}>DANH SÁCH ĐƠN HÀNG</h2>
                <div className="View-layout">
                    <div>
                        <span>Đơn hàng hiển thị: </span>
                        <Select defaultValue="4" Option style={{ width: 70 }} onChange={e => ChangeSize(e)}>
                            {size.map((item) => {
                                return (
                                    <>
                                        <Option value={item.PSize}>{item.PSize}</Option>
                                    </>
                                )
                            })}
                        </Select>
                    </div>
                    {/* <div className="btn-wrapper" >
                    <Button type="primary">
                        Đơn hàng GHTK
                    </Button>
                </div> */}
                    <div className="search-box">
                        <span>Tìm kiếm: </span>
                        <input placeholder='Nhập tên voucher' style={{ width: 300 }} onChange={e => onChange(e)} />
                    </div>
                </div>
                <Table className="proItem" dataSource={wordSearch} columns={columns} pagination={{ pageSize: `${pageSize}` }} size="middle" />
                {/* <Link to={'/Themnhanvien'}><p className="ant-btn ant-btn-primary" type="primary">Thêm nhân viên</p></Link> */}
            </div>
            <Modal
                centered
                title="TẠO ĐƠN GIAO HÀNG NHANH"
                visible={visible}
                closable={false}
                onCancel={() => setVisible(false)}
                width={700}
            >
                <Form
                    form={form}
                    name="addProductType"
                    onFinish={Create_GHN}
                    scrollToFirstError
                    className="order-box"
                    initialValues={{
                        tenkh: `${oderDetail.tenkh}`,
                        sodienthoai: `${oderDetail.sodienthoai}`,
                        diachi: `${oderDetail.diachi}`,
                        ghichu: oderDetail.ghichu === "" ? ("không có ghi chú") : (`${oderDetail.ghichu}`),
                    }}
                >
                    <Form.Item
                        name="tenkh"
                        label="Tên khách hàng"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="sodienthoai"
                        label="Số điện thoại"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="diachi"
                        label="Địa chỉ"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="ghichu"
                        label="Ghi chú"
                    >
                        <TextArea rows={3} />
                    </Form.Item>
                    <Col style={{ display: "flex", marginRight: 20 }}>
                        {/* <Form.Item
                            label="Quận - Huyện"
                        >
                            <Input value={oderDetail.chitietDH.DistrictID} style={{ width: 150 }}/>
                        </Form.Item>
                        <Form.Item
                            label="Phường - Xã"
                        >
                            <Input value={oderDetail.chitietDH.WardCode} style={{ width: 150 }}/>
                        </Form.Item> */}
                    </Col>
                    <Form.Item>
                        <Table className="item" dataSource={oderDetail.chitietDH} rowKey="uid" columns={giohang} pagination={{ pageSize: `5` }} style={{ padding: 10 }} size="middle" />
                    </Form.Item>
                    <Col style={{ display: "flex", justifyContent: "space-between" }}>
                        <Form.Item
                            name="rong"
                            label="Rộng"
                        >
                            <Input style={{ width: 80 }} suffix="cm" />
                        </Form.Item>
                        <Form.Item
                            name="cao"
                            label="Cao"
                        >
                            <Input style={{ width: 80 }} suffix="cm" />
                        </Form.Item>
                        <Form.Item
                            name="dai"
                            label="Dài"
                        >
                            <Input style={{ width: 80 }} suffix="cm" />
                        </Form.Item>
                        <Form.Item
                            name="trongluong"
                            label="Trọng lượng"
                        >
                            <Input style={{ width: 80 }} suffix="g" />
                        </Form.Item>
                    </Col>
                    <Form.Item
                        name="dichvuID"
                        label="Dịch vụ"
                    >
                        <Select>
                            {service.map((item) => {
                                return (
                                    <>
                                        <Option value={item.service_id}>{item.short_name}</Option>
                                    </>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="ca"
                        label="Ca lấy hàng"
                    >
                        <Select>
                            {pickUp.map((item) => {
                                return (
                                    <>
                                        <Option value={item.id}>{item.title}</Option>
                                    </>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                            Xác nhận
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default ListOrder;
