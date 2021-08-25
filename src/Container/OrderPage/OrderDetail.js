import React, { useState, useEffect } from 'react';
import { Image, Row, Col, Input, Button, message, Select, Table } from 'antd';
import Meta from "antd/lib/card/Meta";
import { Link , useHistory} from "react-router-dom";
import "Container/scss/orderDetail.scss";
import moment from 'moment';

const { TextArea } = Input;

const OrderDetail = (props) => {
    let ORDER = JSON.parse(localStorage.getItem("order"));
    const orderStatis = JSON.parse(localStorage.getItem("orderStatis"));
    if(orderStatis !== null){
        ORDER = orderStatis;
    }
    const link = useHistory();

    const back = () => {
        if(orderStatis !== null){
            link.push('/danh-sach-thong-ke');
            localStorage.removeItem("orderStatis");
        }else{
            link.push('/danh-sach-don-hang');
            localStorage.removeItem("order");
        }
    }

    return (
        <div className="wrapper" >
            <Row className="btn-box">
                <Button onClick={back} className="pay" type="primary">
                    Trở về
                </Button>
            </Row>
            <Row className="box">
                <Col className="col-one">
                    <h1>Thông tin đơn hàng</h1>
                    <ul>
                        {/* <li>Mã Khách hàng: {ORDER.makh}</li> */}
                        <li><span>Mã đơn hàng: </span>{ORDER.madonhang}</li>
                        {ORDER.code_GHN === null ? ("") : (<li><span>Mã GHN: </span>{ORDER.code_GHN}</li>)}
                        <li><span>Tên khách hàng: </span>{ORDER.tenkh}</li>
                        <li><span>Điện thoại: </span>{ORDER.sodienthoai}</li>
                        <li><span>Email: </span>{ORDER.email}</li>
                        <li><span>Địa chỉ: </span>{ORDER.diachi}</li>
                        <li><span>Hình thức thanh toán: </span>{ORDER.hinhthuc}</li>
                        {ORDER.ghichu === "" ? ("") : (<li><span>Ghi chú: </span>{ORDER.ghichu}</li>)}
                        {/* {ORDER.makm === null ? ("") : (<li><span>Mã khuyến mãi: </span>{ORDER.makm}</li>)} */}
                        <li><span>Ngày đặt: </span>{moment(ORDER.ngaydat).format('DD/MM/YYYY')}</li>
                        <li><span>Phí vận chuyển: </span>{(ORDER.tienship).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</li>
                        <li><span>Tổng hóa đơn: </span>{(ORDER.tongtien).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</li>
                        {ORDER.ngaygiao === null ? ("") : (<li><span>Ngày giao hàng: </span>{moment(ORDER.ngaygiao).format('DD/MM/YYYY')}</li>)}
                        <li><span>Trạng thái đơn hàng: </span>{ORDER.tentt}</li>
                    </ul>
                </Col>
                <Col className="col-two">
                    <h3>Chi tiết đơn hàng</h3>
                    <ul>
                        {ORDER.chitietDH.map((item) => (
                            <li className="number">
                                <ul>
                                    <li><span>Tên sản phẩm: </span>{item.tensp}</li>
                                    <li><span>Số lượng: </span>{item.soluong}</li>
                                    <li><span>Giá: </span>{(item.gia).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</li>
                                    {Number(item.giagiam) === 0 ? ("") : (<li><span>Giảm giá: </span>{item.giagiam}</li>)}
                                    <li><span>Thành tiền: </span>{(item.thanhtien).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</li>
                                </ul>
                            </li>
                        ))}
                    </ul>

                </Col>
            </Row>

        </div>
    );
}

export default OrderDetail;
