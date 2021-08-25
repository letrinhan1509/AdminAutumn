import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, message, Table, Tag, Select, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "Container/scss/addpro.scss";
import admin from 'API_Call/Api_admin/admin';

const { Option } = Select;
const ListUserAdmin = () => {
  const token = localStorage.getItem("token");
  const link = useHistory();
  const [ListAdmin, setListAdmin] = useState([]);
  const [ok, setOk] = useState(false);
  //API ListAdmin
  useEffect(() => {
    admin.getAll().then((res) => {
      setListAdmin(res.data.data);
      setWordSearch(res.data.data);
    })
  }, [ok]);

  const openNotification = (mess) => {
    notification.open({
      message: 'Notification Title',
      description: 'mess',
    });
  };

  //Redirect sua thong tin tai khoan
  const linkto = (e) => {
    let id = e.currentTarget.dataset.id
    admin.getID(id).then((res) => {
      if (res.data.status === "Success") {
        console.log(res.data.data);
        localStorage.setItem('admin', JSON.stringify(res.data.data))
        setTimeout(() => {
          link.push('/danh-sach-admin/sua-thong-tin-tai-khoan');
        }, 100)
      }
    });

  }

  let result = JSON.parse(localStorage.getItem('user'));

  //Cập nhật trạng thái admin
  const unlock = (e) => {
    let id = e.currentTarget.dataset.id;
    console.log("Id:", id);
    let values = {
      "adminId": id,
      "stt": 1
    };
    admin.updateStatus(values, token).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message)
        setOk(!ok);
      }
      else {
        message.error("Mở khoá tài khoản thất bại")
      }
    })
      .catch(err => {
        console.log(err.response);
        message.error(`${err.response.data.message}`)
      })
  }
  const lock = (e) => {
    let id = e.currentTarget.dataset.id;
    console.log("Id:", id);
    let values = {
      "adminId": id,
      "stt": 0
    };
    admin.updateStatus(values, token).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message)
        setOk(!ok);
      }
      else {
        message.error("Khoá tài khoản thất bại!")
      }
    })
      .catch(err => {
        console.log(err.response);
        message.error(`Lỗi...! Khoá tài khoản thất bại! \n ${err.response.data.message}`)
      })
  };

  // Xoá tài khoản admin:
  const deleteAdmin = (e) => {
    let id = e.currentTarget.dataset.id
    admin.deleteAdmin(id, token).then((res) => {
      if (res.data.status === "Success") {
        //setWordSearch(res.data.listAdmins);
        setTimeout(() => {
          link.push('/danh-sach-admin');
        }, 100)
      }
    }).catch(err => {
      message.error(`${err.response.data.message}`)
    });
  }

  //xét trạng thái ADmin
  ListAdmin.forEach(element => {
    if (element.trangthai === 1) {
      element.trangthai = [];
      element.trangthai.stt = ["Hoạt động"];
      element.trangthai.id = element.manv;
    }
    if (element.trangthai === 0) {
      element.trangthai = [];
      element.trangthai.stt = ["Khoá"];
      element.trangthai.id = element.manv;
    }
  })


  //DataTable
  const columns = [
    {
      title: 'Mã nhân viên',
      dataIndex: 'manv',
      key: 'manv',
    },
    {
      title: 'Gmail',
      dataIndex: 'admin',
      key: 'admin',
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'tennv',
      key: 'tennv',
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
      width: 300,
    },
    {
      title: 'Chức vụ',
      dataIndex: 'quyen',
      key: 'quyen',
      filters: [
        { text: 'Admin', value: 'Admin' },
      ],
      onFilter: (value, record) => record.quyen.includes(value),
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
    result.permission === 'Admin' || result.permission === 'QLNS' ?
      {
        title: 'Trạng thái',
        dataIndex: 'trangthai',
        key: 'trangthai',
        render: (trangthai, admin) =>
        (
          <>{console.log(admin.manv)}
          {admin.manv === result.manv ? ("") : (
            trangthai.stt.map(tragth => {
              if (tragth === 'Khoá') {
                return (
                  <div className="btn-box lock"><Button data-id={trangthai.id} type="primary" icon={<UnlockOutlined />} onClick={unlock}> Mở khoá </Button></div>
                );
              } else {
                return (
                  <div className="btn-box lock"><Button data-id={trangthai.id} type="danger" icon={<LockOutlined />} onClick={lock}> Khoá </Button></div>
                )
              }
            })
          )}
            
          </>
        ),
        filters: [
          { text: "Khoá", value: "Khoá" },
          { text: "Hoạt động", value: "Hoạt động" },
        ],
        onFilter: (value, record) => record.trangthai.stt.includes(value),
      } : (<> </>),
    result.permission === 'Admin' || result.permission === 'QLNS' ?
      {
        title: 'Hành động',
        dataIndex: 'manv',
        key: 'manv',
        render: manv => (<div className="btn-box fix">{result.manv === manv ? ("") : (<Button data-id={manv} key={manv} type="primary" onClick={linkto}>Sửa</Button>)}</div>)
      } : (<> </>),
    result.permission === 'Admin' || result.permission === 'QLNS' ?
      {
        title: 'Hành động',
        dataIndex: 'manv',
        key: 'manv',
        render: manv => (<div className="btn-box delete">{result.manv === manv ? ("") : (<Button data-id={manv} key={manv} type="danger" onClick={deleteAdmin}> Xoá </Button>)}</div>)
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
      if (removeAccents(el.tennv.toLowerCase()).indexOf(removeAccents(query.toLowerCase())) !== -1) {
        return el;
      } else {
        return "";
      }

    });
  }
  let demo = ListAdmin;
  const [wordSearch, setWordSearch] = useState([]);
  function onChange(e) {
    if (e.target.value !== "") {
      let filter = filterItems(ListAdmin, e.target.value);
      if (filter !== "") {
        demo = filter;
        setWordSearch(demo);
      } else {
        demo = ListAdmin;
        setWordSearch(demo);
      }
    } else {
      demo = ListAdmin;
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
      <div className="product-wrapper" >
        <h2 style={{ textAlign: 'center', marginTop: "20px", marginBottom: "20px" }}>DANH SÁCH TÀI KHOẢN NHÂN VIÊN</h2>
        <div className="View-layout">
          <div className="View-layout-left">
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
            {result.permission === 'Admin' || result.permission === 'QLNS' ? (
              <div className="btn-wrapper" >
                <Link to={'/them-nhan-vien'}>
                  <Button type="primary">
                    Thêm tài khoản nhân viên
                  </Button>
                </Link>
              </div>
            ) : ("")}
          </div>
          <div className="search-box">
            <span>Tìm kiếm: </span>
            <input placeholder='Nhập tên nhân viên' style={{ width: 300 }} onChange={e => onChange(e)} />
          </div>
        </div>
        <Table className="proItem" dataSource={wordSearch} columns={columns} pagination={{ pageSize: `${pageSize}` }} size="middle" />

        {/* <Link to={'/Themnhanvien'}><p className="ant-btn ant-btn-primary" type="primary">Thêm nhân viên</p></Link> */}
      </div>
    </>
  );
}

export default ListUserAdmin;