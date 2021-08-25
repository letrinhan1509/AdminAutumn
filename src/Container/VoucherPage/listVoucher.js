import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, message, Table, Tag, Select, Modal } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import "Container/scss/addpro.scss";
import { storage } from 'Container/Firebase/firebase';
import voucher from 'API_Call/Api_discount/discount';

const { Option } = Select;
const ListVoucher = (props) => {
    const token = localStorage.getItem("token");
    const { confirm } = Modal;
    const [listVoucher, setListVoucher] = useState([]);
    const history = useHistory();
    let user = JSON.parse(localStorage.getItem('user'));
    const [ok, setOk] = useState(false);
    //API List Voucher:
    useEffect(() => {
        voucher.getAllVoucher().then((res) => {
            setListVoucher(res.data.voucher);
            setWordSearch(res.data.voucher);
        })
    }, [ok]);
    // Sửa voucher:
    const loadEdit = (e) => {
        let id = e.currentTarget.dataset.id;
        voucher.getSaleID(id).then((res) => {
            if (res.data.status === "Success") {
                localStorage.setItem('voucherID', JSON.stringify(res.data.detailPromotion));
                setTimeout(() => {
                    history.push('/danh-sach-voucher/sua-voucher');
                }, 100)
            }
        });
    }
    // Chi tiết voucher:
    const detail = (e) => {
        let id = e.currentTarget.dataset.id;
        voucher.getVoucherID(id).then((res) => {
            if (res.data.status === "Success") {
                localStorage.setItem('voucherID', JSON.stringify(res.data.voucher));
                setTimeout(() => {
                    history.push('/danh-sach-voucher/chi-tiet');
                }, 100)
            }
        });
    }

    //xóa voucher
    const deleteVoucher = (e) => {
        let id = e.currentTarget.dataset.id;
        let vouchers = [];
        voucher.getVoucherID(id).then((res) => {
        if (res.data.status === "Success") {
            vouchers = res.data.voucher;
        }
        });
        confirm({
        title: 'Bạn có thật sự muốn xóa khuyến mãi này?',
        okText: 'Xóa',
        okType: 'danger',
        cancelText: 'Không',
        onOk() {
            voucher.deleteVoucher(id, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                const del = storage.ref(`ProductType_Img/${voucher.tenhinh}`);
                del.delete().then((res) => {
                message.success("Đã xóa ảnh!");
                }).catch((error) => {
                console.log(error);
                });
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
            title: 'Mã voucher',
            dataIndex: 'voucher',
            key: 'voucher',
        },
        {
            title: 'Điều kiện',
            dataIndex: 'dieukien',
            key: 'dieukien',
            render: dieukien => {
                return (
                    dieukien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                );
            }
        },
        {
            title: 'Giá giảm',
            dataIndex: 'giagiam',
            key: 'giagiam',
            render: giagiam => {
                return (
                    giagiam.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                );
            }
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
        user.permission !== 'NVBH' ? {
            dataIndex: "makm",
            key: "makm",
            render: makm => (<div className="btn-box fix"><Button data-id={makm} onClick={loadEdit} type="primary">Sửa</Button></div>)
        } : {
            dataIndex: "voucher",
            key: "voucher",
            render: voucher => (<div className="btn-box fix"><Button data-id={voucher} onClick={detail} type="primary">Chi tiết</Button></div>)
        },
        user.permission === "Admin" || user.permission === "QLCH" ? 
        {
            dataIndex: "makm",
            key: "makm",
            render: makm => (<div className="btn-box delete"><Button data-id={makm} onClick={deleteVoucher} type="danger"> Xoá </Button></div>)
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
    const [wordSearch, setWordSearch] = useState([]);
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
                <h2 style={{ textAlign: 'center', marginTop: "50px" }}>DANH SÁCH VOUCHER</h2>
                <div className="View-layout">
                    <div className="View-layout-left">
                        <div>
                            <span>Voucher hiển thị: </span>
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
                        {user.permission === 'Admin' || user.permission === 'QLCH' ? (
                            <div className="btn-wrapper">
                                <Link to={'/them-voucher'}>
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

export default ListVoucher;