import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, message, Table, Tag, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
import user from 'API_Call/Api_user/user';

const { Option } = Select;
const ListUserKH = (props) => {
  const token = localStorage.getItem("token");
  const [ListUser, setListUser] = useState([]);
  const [ok, setOk] = useState(false);
  //API ListUser
  useEffect(() => {
    user.getAll().then((res) => {
      setListUser(res.data.data);
      setWordSearch(res.data.data);
    })
  }, [ok]);

  //Cập nhật trạng thái User
  const unlock = (e) => {
    let id = e.currentTarget.dataset.id;
    let unLock = 1;
    console.log("Id:", id);
    let values = {
      "userId": id,
      "stt": unLock
    };
    user.updateStatus(values, token).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message)
        setOk(!ok);
      }
      else {
        message.error("Cập nhật trạng thái thất bại")
      }
    })
      .catch(err => {
        console.log(err.response);
        message.error(`Lỗi...! Mở khoá tài khoản thất bại!\n ${err.response.data}`)
      })

  }
  const lock = (e) => {
    let id = e.currentTarget.dataset.id;
    let shutdown = 0;
    console.log("Id:", id);
    let values = {
      "userId": id,
      "stt": shutdown
    };
    user.updateStatus(values, token).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message)
        setOk(!ok);
      }
      else {
        message.error("Cập nhật trạng thái thất bại")
      }
    })
      .catch(err => {
        console.log(err.response);
        message.error(`Lỗi...! Khoá tài khoản thất bại!\n ${err.response.data}`)
      })
      
  };

  const deleteCus = (e) => {
    let id = e.currentTarget.dataset.id
    user.delete_Customer(id, token).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message)
        setOk(!ok);
      }
    }).catch(err => {
      console.log(err.response.data.message);
      message.error(`${err.response.data.message}`)
    });
  }

  let result = JSON.parse(localStorage.getItem('user'));

  //Setup trạng thái cho datatable
  ListUser.forEach(element => {
    if (element.trangthai === 1) {
      element.trangthai = [];
      element.trangthai.stt = ["Hoạt động"];
      element.trangthai.id = element.makh;
    }
    if (element.trangthai === 0) {
      element.trangthai = [];
      element.trangthai.stt = ["Khoá"];
      element.trangthai.id = element.makh;
    }
  })

  const columns = [
    {
      title: 'Mã khách hàng',
      dataIndex: 'makh',
      key: 'makh',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'tenkh',
      key: 'tenkh',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'sodienthoai',
      key: 'sodienthoai',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diachi',
      key: 'diachi',
    },
    /* {
      title: 'Trạng thái',
      dataIndex: 'trangthai',
      key: 'trangthai',
      render: (trangthai) => (
        <>
          {trangthai.stt.map(tragth => {
            let color = 'green';
            if (tragth === 'Khoá') {
              color = 'red';
            }
            return (
              <Tag color={color} key={tragth}>
                {tragth.toUpperCase()}
              </Tag>
            );
          })}

        </>
      ),
      filters: [
        { text: "Khoá", value: "Khoá" },
        { text: "Hoạt động", value: "Hoạt động" },
      ],
      onFilter: (value, record) => record.trangthai.stt.includes(value),
    }, */

    result.permission === 'Admin' || result.permission === 'QLNS' ? (
      {
        title: 'Trạng thái',
        dataIndex: 'trangthai',
        data: 'makh',
        key: 'trangthai',
        render: (trangthai) => //(<Button data-id={text} type="primary" icon={<LockOutlined />} /* onClick={linkto} */></Button>)
        (
          <>
            {trangthai.stt.map(tragth => {
              if (tragth === 'Khoá') {
                return (
                  <div className="btn-box lock"><Button data-id={trangthai.id} type="primary" icon={<UnlockOutlined />} onClick={unlock}> Mở khoá </Button></div>
                );
              } else {
                return (
                  <div className="btn-box lock"><Button data-id={trangthai.id} type="primary" icon={<LockOutlined />} onClick={lock}> Khoá </Button></div>
                )
              }
            })}
          </>
        )
      }) : (<> </>),
    result.permission === 'Admin' || result.permission === 'QLNS' ?
      {
        title: 'Hành động',
        dataIndex: 'makh',
        key: 'makh',
        render: makh => (<div className="btn-box delete"><Button data-id={makh} key={makh} type="danger" onClick={deleteCus}> Xoá </Button></div>)
      } : (<> </>)
  ];


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
  let demo = ListUser;
  const [wordSearch, setWordSearch] = useState([]);
  console.log(wordSearch);
  function onChange(e) {
    if (e.target.value !== "") {
      let filter = filterItems(ListUser, e.target.value);
      if (filter !== "") {
        demo = filter;
        setWordSearch(demo);
      } else {
        demo = ListUser;
        setWordSearch(demo);
      }
    } else {
      demo = ListUser;
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
        <h2 style={{ textAlign: 'center', marginTop: "50px" }}>DANH SÁCH TÀI KHOẢN KHÁCH HÀNG</h2>
        <div className="View-layout">
          <div>
            <span>Sản phẩm hiển thị: </span>
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
          <div className="search-box">
            <span>Tìm kiếm: </span>
            <input placeholder='Nhập tên nhân viên' style={{ width: 300 }} onChange={e => onChange(e)} />
          </div>
        </div>
        <Table className="proItem" dataSource={wordSearch} columns={columns} pagination={{ pageSize: `${pageSize}` }} size="middle" />
      </div>

      {/* <a className="ant-btn ant-btn-primary" href='/Themsanpham'  type="primary">Thêm sản phẩm</a> */}
    </>
  );
}

export default ListUserKH;