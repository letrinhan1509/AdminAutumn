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

const Statis = (props) => {
    const token = localStorage.getItem("token");
    const [form] = Form.useForm();
    const link = useHistory();
    const [ListOrder, setListOrder] = useState([]);
    const [wordSearch, setWordSearch] = useState([]);
    //API List Order:



    //Redirect sua-san-pham 
    const loadDetail = (e) => {
        let id = e.currentTarget.dataset.id;
        order.getOrderID(id).then((res) => {
            if (res.data.status === "Success") {
                localStorage.setItem('orderStatis', JSON.stringify(res.data.data));
                setTimeout(() => {
                    link.push('/danh-sach-don-hang/chi-tiet');
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



    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'madonhang',
            key: 'madonhang',
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
        {
            dataIndex: "madonhang",
            key: "madonhang",
            render: madonhang => (<div className="btn-box"><Button data-id={madonhang} onClick={loadDetail} type="primary">Chi tiết</Button></div>)
        }
    ];

    const Months = [
        {
            key: 0,
            value: ""
        },
        {
            key: 1,
            value: "01"
        },
        {
            key: 2,
            value: "02"
        },
        {
            key: 3,
            value: "03"
        },
        {
            key: 4,
            value: "04"
        },
        {
            key: 5,
            value: "05"
        },
        {
            key: 6,
            value: "06"
        },
        {
            key: 7,
            value: "07"
        },
        {
            key: 8,
            value: "08"
        },
        {
            key: 9,
            value: "09"
        },
        {
            key: 10,
            value: "10"
        },
        {
            key: 11,
            value: "11"
        },
        {
            key: 12,
            value: "12"
        },
    ];

    const Years = [
        {
            key: 0,
            value: ""
        },
        {
            key: 1,
            value: "2019"
        },
        {
            key: 2,
            value: "2020"
        },
        {
            key: 3,
            value: "2021"
        },
        {
            key: 4,
            value: "2022"
        },
        {
            key: 5,
            value: "2023"
        },
        {
            key: 6,
            value: "2024"
        },
        {
            key: 7,
            value: "2025"
        },
        {
            key: 8,
            value: "2026"
        },
        {
            key: 9,
            value: "2027"
        },
        {
            key: 10,
            value: "2028"
        },
        {
            key: 11,
            value: "2029"
        },
        {
            key: 12,
            value: "2030"
        }
    ];

    const [months, setMonths] = useState([]);
    const changeMonths = (e) => {
        setMonths(e);
    }
    const [years, setYears] = useState("");
    const changeYears = (e) => {
        setYears(e);
    }
    const searchStatis = () => {
        let values = {
            month: months,
            year: years
        };
        console.log(values);
        order.getStatistical_Oder(values, token).then((res) => {
            if (res.data.status === "Success") {
                if (res.data.data.length !== 0) {
                    message.success(res.data.message)
                    setListOrder(res.data.data);
                    setWordSearch(res.data.data);
                    console.log(res.data);
                }else{
                    setWordSearch([]);
                    message.success('Không có dữ liệu thống kê, vui lòng chọn tháng và năm khác !')
                }
            }
        }).catch(err => {
            message.error(`${err.response.data.message}`);
        });
    }


    return (
        <>
            <div className="product-wrapper" >
                <h2 style={{ textAlign: 'center', marginTop: "20px", marginBottom: "20px" }}>DANH SÁCH THỐNG KÊ</h2>
                <div className="search-statis">
                    <div className="search1">
                        <span>Chọn tháng: </span>
                        <Select style={{ width: 70 }} onChange={changeMonths}>
                            {Months.map((item) => {
                                return (
                                    <>
                                        <Option value={item.value}>{item.value}</Option>
                                    </>
                                )
                            })}
                        </Select>
                    </div>
                    <div className="search2">
                        <span style={{ marginTop: 5}}>Chọn năm: </span>
                        <Select style={{ width: 100 }} onChange={changeYears}>
                            {Years.map((item) => {
                                return (
                                    <>
                                        <Option value={item.value}>{item.value}</Option>
                                    </>
                                )
                            })}
                        </Select>
                        {/* <Input type="number" maxLength="4" style={{ width: 100 }} onChange={changeYears} /> */}
                    </div>
                    <Button onClick={searchStatis} type="primary">Tìm</Button>
                    {/* <div className="search-box">
                        <span>Tìm kiếm: </span>
                        <input placeholder='Nhập tên voucher' style={{ width: 300 }} onChange={e => onChange(e)} />
                    </div> */}
                </div>
                <Table className="proItem" dataSource={wordSearch} columns={columns} pagination={{ pageSize: 6 }} size="middle" />
            </div>
        </>
    );
}

export default Statis;
