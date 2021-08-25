import { Button, message, Table, Modal, Form, Input, Select } from 'antd';
//import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "Container/scss/addpro.scss";
import size from 'API_Call/Api_size/size';


const ListSize = () => {
    const token = localStorage.getItem('token');
    const link = useHistory();
    let result = JSON.parse(localStorage.getItem('user'));
    //API Size
    const [click, setClick] = useState(false);
    const [listSize, setListSize] = useState([]);
    const [ok, setOk] = useState(false);

    //Redirect sửa size theo masize
    const [sizeDetail, setSizeDetail] = useState([]);
    useEffect(() => {
        console.log(token);
        size.getAllSize(token).then((res) => {
            console.log(res.data.listSize);
            setListSize(res.data.listSize);
        }).catch(err => {
            console.log(err.response);
            message.error(`${err.response.data.message}`);
        })
    }, [ok]);
    const edit = (e) => {
        let id = e.currentTarget.dataset.id
        size.getSizeId(id, token).then((res) => {
            if (res.data.status === "Success") {
                localStorage.setItem('sizeDetail', JSON.stringify(res.data.size))
                setSizeDetail(res.data.size);
                console.log(res.data.size);
                setTimeout(() => {
                    link.push('/bang-size/sua-size');
                }, 100)
            }
        });
    }

    //Xóa size
    const deleteSize = (e) => {
        let id = e.currentTarget.dataset.id;
        size.deleteSize(id, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setOk(!ok);
            }
        })
            .catch(err => {
                message.error(`${err.response.data.message}`);
            })
    }

    const columns = [
        {
            title: 'Mã size',
            dataIndex: 'masize',
            key: 'masize',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            filters: [
                { text: 'S', value: 'S' },
                { text: 'M', value: 'M' },
                { text: 'L', value: 'L' },
            ],
            onFilter: (value, record) => record.size.includes(value),
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioitinh',
            key: 'gioitinh',
            filters: [
                { text: 'Nam', value: 'Nam' },
                { text: 'Nữ', value: 'Nữ' },
            ],
            onFilter: (value, record) => record.gioitinh.includes(value),
        },
        {
            title: `Cân nặng từ`,
            dataIndex: 'cannangtu',
            key: 'cannangtu',
        },
        {
            title: 'Cân nặng đến',
            dataIndex: 'cannangden',
            key: 'cannangden',
        },
        {
            title: 'Chiều cao từ',
            dataIndex: 'chieucaotu',
            key: 'chieucaotu',
        },
        {
            title: 'Chiều cao đến',
            dataIndex: 'chieucaoden',
            key: 'chieucaoden',
        },
        result.permission === 'Admin' || result.permission === 'QLCH' ?
            {
                title: 'Cập nhật',
                dataIndex: 'masize',
                key: 'masize',
                render: masize => (<div className="btn-box fix"><Button data-id={masize} type="primary" key={masize} onClick={edit}> Sửa </Button></div>)
            } : (<></>),
        result.permission === 'Admin' || result.permission === 'QLCH' ?
            {
                title: 'Hành động',
                dataIndex: 'masize',
                key: 'masize',
                render: masize => (<div className="btn-box delete"><Button data-id={masize} key={masize} type="danger" onClick={deleteSize}> Xoá </Button></div>)
            } : (<></>)

    ];

    return (
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center', marginTop: "30px" }}>BẢNG SIZE QUẦN ÁO THEO CHIỀU CAO - CÂN NẶNG</h2>
                {result.permission === 'Admin' || result.permission === 'QLCH' ? (
                    <div className="btn-wrapper">
                        <Link to={'/bang-size/them-size'}>
                            <Button type="primary">
                                Thêm size
                            </Button>
                        </Link>
                    </div>
                ) : ("")}
                <Table className="item" dataSource={listSize} columns={columns} pagination={{ pageSize: 6 }} style={{ padding: 10 }} size="middle" />
            </div>
        </>
    );
}

export default ListSize;