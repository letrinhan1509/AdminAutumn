import React, { useEffect, useState } from 'react';
import { Row, Col, Image } from 'antd';
import "Container/scss/dashboard.scss";
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import statis from 'API_Call/Api_city/city';

const admin = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');
console.log(admin);
const Dashboard = () => {

    const [ListProduct, setListProduct] = useState([]);
    const [ListAdmin, setListAdmin] = useState([]);
    const [ListUser, setListUser] = useState([]);
    const [ListVoucher, setListVoucher] = useState([]);
    const [statistical, setStatistical] = useState([]);
    useEffect(() => {
        statis.getStatistical(token).then((res) => {
            // Trả về tất cả thống kê:
            console.log(res.data);
            setListAdmin(res.data.listAdmins);
            setListUser(res.data.listUsers);
            setListProduct(res.data.listProducts);
            setStatistical(res.data.revenueStatistics);
            setListVoucher(res.data.listVouchers);
        })
    }, []);

    return (
        <>
            <div className="char">
            <div>
                    <Bar
                        data={{
                            labels: statistical.map((item) => {
                                return (
                                    item.ngaydat
                                );
                            }),
                            datasets: [
                                {
                                    label: 'Doanh thu bán hàng',
                                    data: statistical.map((item) => {
                                        return (
                                            item.tongdoanhthu
                                        );
                                    }),
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1,
                                }
                            ]
                        }}
                        height={300}
                        width={500}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                x: {
                                    labelString: 'Ngày',
                                    display: true,
                                    scaleLabel: {

                                    }
                                }
                                ,
                                y: {
                                    beginAtZero: true,
                                }
                            }
                        }}
                    />
                </div>
                <div>
                    <Bar
                        data={{
                            labels: statistical.map((item) => {
                                return (
                                    item.ngaydat
                                );
                            }),
                            datasets: [
                                {
                                    label: 'Tổng đơn hàng',
                                    data: statistical.map((item) => {
                                        return (
                                            item.tongdonhang
                                        );
                                    }),
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)'
                                    ],
                                    borderWidth: 1
                                }
                            ]
                        }}
                        height={300}
                        width={500}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </div>
            </div>
            <div className="data-wrapper">
                <h1>Thống kê dữ liệu</h1>
                <Row className="box1">
                    <Link to={'/danh-sach-admin'}>
                        <div className="img-box">
                            <Image
                                className="sale_img"
                                src="https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Dashbroad%2FAdmin.jpg?alt=media&token=3ba6f182-2191-4c7a-b763-b15d676fef69"
                                preview={{
                                    visible: false,
                                    /* onVisibleChange: () => { onClick() }, */
                                    mask: <div className="link_product">

                                        <span>
                                            ADMIN: {ListAdmin}
                                        </span>
                                    </div>
                                }}
                            />
                        </div>
                    </Link>
                    <Link to={'/danh-sach-khach-hang'}>
                        <div className="img-box">
                            <Image
                                className="sale_img"
                                src="https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Dashbroad%2Fcustomer.jpg?alt=media&token=add0dfdf-93c6-4002-88c1-393f3a242c68"
                                preview={{
                                    visible: false,
                                    /* onVisibleChange: () => { onClick() }, */
                                    mask: <div className="link_product">

                                        <span>
                                            USER: {ListUser}
                                        </span>
                                    </div>
                                }}
                            />
                        </div>
                    </Link>
                    <Link to={'/tat-ca-san-pham'}>
                        <div className="img-box">
                            <Image
                                className="sale_img"
                                src="https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Dashbroad%2Fstore.jpg?alt=media&token=c125bffd-d255-4db2-b8d6-23f5ece4f5fd"
                                preview={{
                                    visible: false,
                                    /* onVisibleChange: () => { onClick() }, */
                                    mask: <div className="link_product">

                                        <span>
                                            PRODUCT: {ListProduct}
                                        </span>
                                    </div>
                                }}
                            />
                        </div>
                    </Link>
                    <Link to={'/danh-sach-voucher'}>
                        <div className="img-box">
                            <Image
                                className="sale_img"
                                src="https://firebasestorage.googleapis.com/v0/b/fashionshop-c6610.appspot.com/o/Dashbroad%2Fvoucher.jpg?alt=media&token=56f2e798-cd68-4f4a-b11a-a3fa56ece214"
                                preview={{
                                    visible: false,
                                    /* onVisibleChange: () => { onClick() }, */
                                    mask: <div className="link_product">

                                        <span>
                                            VOUCHER: {ListVoucher}
                                        </span>
                                    </div>
                                }}
                            />
                        </div>
                    </Link>
                </Row>
            </div>
        </>
    );
}

export default Dashboard;