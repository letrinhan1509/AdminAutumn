import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, message, Table, Modal, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import "Container/scss/addpro.scss";
import { storage } from 'Container/Firebase/firebase';
import discount from 'API_Call/Api_discount/discount';
import moment from 'moment';

const { Option } = Select;
const ListSale = (props) => {
    const token = localStorage.getItem("token");
    const [listVoucher, setListVoucher] = useState([]);
    const history = useHistory();
    const { confirm } = Modal;
    let user = JSON.parse(localStorage.getItem('user'));
    const [wordSearch, setWordSearch] = useState([]);
    const [ok, setOk] = useState(false);
    //API List Sale:
    useEffect(() => {
        discount.getAllSale().then((res) => {
            setListVoucher(res.data.discount);
            setWordSearch(res.data.discount);
            console.log(res.data.discount);
        })
    }, [ok]);
    console.log(listVoucher);
    // Sửa voucher:
    const loadEdit = (e) => {
        let id = e.currentTarget.dataset.id;
        discount.getSaleID(id).then((res) => {
            if (res.data.status === "Success") {
                localStorage.setItem('saleID', JSON.stringify(res.data.detailPromotion));
                setTimeout(() => {
                    history.push('/danh-sach-khuyen-mai/sua-khuyen-mai');
                }, 100)
            }
        });
    }
    const loadDetail = (e) => {
        let id = e.currentTarget.dataset.id;
        discount.getSaleID(id).then((res) => {
            if (res.data.status === "Success") {
                localStorage.setItem('saleID', JSON.stringify(res.data.detailPromotion));
                setTimeout(() => {
                    history.push('/danh-sach-khuyen-mai/chi-tiet');
                }, 100)
            }
        });
    }


    //Cập nhật trạng thái Voucher:
    /* const unlock = (e) => {
        let id = e.currentTarget.dataset.id;
        //console.log("Id:", id);
        let values = { makm: id, trangthai: 1 };
        discount.updateStatus(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.go({ pathname: '/danh-sach-voucher' });
                }, 1000);
            }
            else {
                message.error(res.data.message);
            }
        })
            .catch(err => {
                console.log(err.response);
                message.error(`Lỗi...! Mở khoá tài khoản thất bại!\n ${err.response.data.message}`);
            });
    }
    const lock = (e) => {
        let id = e.currentTarget.dataset.id;
        //console.log("Id:", id);
        let values = { makm: id, trangthai: 0 };
        discount.updateStatus(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message);
                setTimeout(() => {
                    history.go('/danh-sach-voucher');
                }, 1000);
            }
            else {
                message.error(res.data.message);
            }
        })
            .catch(err => {
                console.log(err.response);
                message.error(`${err.response.data.message}`);
            });
    }; */

    const deleteSale = (e) => {
        let id = e.currentTarget.dataset.id;
        /* let sale = [];
        discount.getSaleID(id).then((res) => {
        if (res.data.status === "Success") {
            sale = res.data.voucher;
        }
        }); */
        confirm({
        title: 'Bạn có thật sự muốn xóa khuyến mãi này?',
        okText: 'Xóa',
        okType: 'danger',
        cancelText: 'Không',
        onOk() {
            discount.deleteSale(id, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                /* const del = storage.ref(`ProductType_Img/${sale.tenhinh}`);
                del.delete().then((res) => {
                message.success("Đã xóa ảnh!");
                }).catch((error) => {
                console.log(error);
                }); */
                setOk(!ok);
            }
            else {
                message.error(res.data.message)
            }
            })
            .catch(err => {
                console.log(err.response);
                message.error(`${err.response.data.message}`)
            })
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
            title: 'Tên khuyến mãi',
            dataIndex: 'tenkm',
            key: 'tenkm',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'ghichu',
            key: 'ghichu',
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'ngaybd',
            key: 'ngaybd',
            render: ngaybd => (<div className="btn-box fix">{moment(ngaybd).format('DD/MM/YYYY')}</div>)
        },
        {
            title: 'Ngày kết thúc',
            dataIndex: 'ngaykt',
            key: 'ngaykt',
            render: ngaykt => (<div className="btn-box fix">{moment(ngaykt).format('DD/MM/YYYY')}</div>)
        },
        user.permission !== 'NVBH' ? ({
            dataIndex: "makm",
            key: "makm",
            render: makm => (<div className="btn-box fix"><Button data-id={makm} onClick={loadEdit} type="primary">Sửa</Button></div>)
        }) : {
            dataIndex: "makm",
            key: "makm",
            render: makm => (<div className="btn-box"><Button data-id={makm} onClick={loadDetail} type="primary">Chi tiết</Button></div>)
        },
        user.permission === "Admin" || user.permission === "QLCH" ? 
        {
            dataIndex: "makm",
            key: "makm",
            render: makm => (<div className="btn-box delete"><Button data-id={makm} onClick={deleteSale} type="danger"> Xoá </Button></div>)
        } : (<></>)
    ];


    //Tìm kiếm
    function removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }
    function filterItems(arr, query) {
        return arr.filter(function (el) {
            if (removeAccents(el.tenkm.toLowerCase()).indexOf(removeAccents(query.toLowerCase())) !== -1) {
                return el;
            } else {
                return "";
            }

        });
    }

    let demo = listVoucher;
    function onChange(e) {
        if (e.target.value !== "") {
            let filter = filterItems(listVoucher, e.target.value);
            if (filter !== "") {
                demo = filter;
                setWordSearch(demo);
            } else {
                demo = listVoucher;
                setWordSearch(demo);
            }
        } else {
            demo = listVoucher;
            setWordSearch(demo);
        }
        console.log(demo);
    }
    const [pageSize, setPageSize] = useState(6);
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

    return (
        <>
            <div className="product-wrapper">
                <h2 style={{ textAlign: 'center', marginTop: "50px" }}>DANH SÁCH KHUYẾN MÃI</h2>
                <div className="View-layout">
                    <div className="View-layout-left">
                        <div>
                            <span>Khuyến mãi hiển thị: </span>
                            <Select defaultValue="6" Option style={{ width: 70 }} onChange={e => ChangeSize(e)}>
                                {size.map((item) => {
                                    return (
                                        <>
                                            <Option value={item.PSize}>{item.PSize}</Option>
                                        </>
                                    )
                                })}
                            </Select>
                        </div>
                        {user.permission === "Admin" || user.permission === 'QLCH' ? (
                            <div className="btn-wrapper">
                                <Link to={'/them-khuyen-mai'}>
                                    <Button type="primary">
                                        Thêm chương trình khuyến mãi
                                    </Button>
                                </Link>
                            </div>
                        ) : ("")}
                    </div>
                    <div className="search-box">
                        <span>Tìm kiếm: </span>
                        <input placeholder='Nhập tên voucher' style={{ width: 300 }} onChange={e => onChange(e)} />
                    </div>
                </div>
                <Table className="proItem" dataSource={wordSearch} columns={columns} pagination={{ pageSize: `${pageSize}` }} size="middle" />
            </div>
        </>
    );
}

export default ListSale;