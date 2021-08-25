import { Button, message, Table, Input, Modal, Col, Row, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "Container/scss/addpro.scss";
import catalog from 'API_Call/Api_catalog/catalog';
import { storage } from 'Container/Firebase/firebase';

const ListProductType = () => {
  const token = localStorage.getItem("token");
  const { confirm } = Modal;
  const link = useHistory();
  let result = JSON.parse(localStorage.getItem('user'));
  const [ok, setOk] = useState(false);
  const [ListType, setListType] = useState([]);
  useEffect(() => {
    catalog.getAllType().then((res) => {
      setListType(res.data.data);
    })
  }, [ok]);


  const linkto = (e) => {
    let id = e.currentTarget.dataset.id
    catalog.getTypeID(id).then((res) => {
      if (res.data.status === "Success") {
        localStorage.setItem('type', JSON.stringify(res.data.data));
        setTimeout(() => {
          link.push('/danh-sach-loai/sua-loai');
        }, 100)
      }
    });

  }

  const unlock = (e) => {
    let id = e.currentTarget.dataset.id;
    let values = { maloai: id, trangthai: 1 };
    catalog.updateStatusType(values, token).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message)
        setOk(!ok);
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
    let values = { maloai: id, trangthai: 0 };
    catalog.updateStatusType(values, token).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message);
        setOk(!ok);
      }
      else {
        message.error(res.data.message);
      }
    })
      .catch(err => {
        message.error(`${err.response.data.message}`);
      });
  };

  //xóa loại SP
  const deleteType = (e) => {
    let id = e.currentTarget.dataset.id;
    let type = [];
    catalog.getTypeID(id).then((res) => {
      if (res.data.status === "Success") {
        type = res.data.data;
      }
    });
    confirm({
      title: 'Bạn muốn xóa loại sản phẩm này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        catalog.deleteProtype(id, token).then((res) => {
          if (res.data.status === "Success") {
            message.success(res.data.message)
            const del = storage.ref(`ProductType_Img/${type.tenhinh}`);
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
  

  ListType.forEach(element => {
    if (element.trangthai === 1) {
      element.trangthai = [];
      element.trangthai.stt = ["Hiện"];
      element.trangthai.id = element.maloai;
    }
    if (element.trangthai === 0) {
      element.trangthai = [];
      element.trangthai.stt = ["Ẩn"];
      element.trangthai.id = element.maloai;
    }
  })

  const columns = [
    {
      title: 'Mã loại',
      dataIndex: 'maloai',
      key: 'maloai',
    },
    {
      title: 'Tên loại',
      dataIndex: 'tenloai',
      key: 'tenloai'
    },
    {
      title: 'Danh mục',
      dataIndex: 'madm',
      key: 'madm',
      filters: [
        { text: 'DMA', value: 'DMA' },
        { text: 'DMB', value: 'DMB' },
        { text: 'DMD', value: 'DMD' },
        { text: 'DMG', value: 'DMG' },
        { text: 'DMPK', value: 'DMPK' },
        { text: 'DMQ', value: 'DMQ' },
      ],
      onFilter: (value, record) => record.madm.includes(value),
    },
    /* {
      title: 'Trạng thái',
      dataIndex: 'trangthai',
      key: 'trangthai',
      render: (trangthai) => (
        <>
          {trangthai.stt.map(tragth => {
            let color = 'green';
            if (tragth === 'Ẩn') {
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
    result.permission === 'Admin' || result.permission === 'QLCH' ?
      {
        title: 'Trạng thái',
        dataIndex: 'trangthai',
        data: 'maloai',
        key: 'trangthai',
        render: (trangthai) => //(<Button data-id={text} type="primary" icon={<LockOutlined />} /* onClick={linkto} */></Button>)
        (
          <>
            {trangthai.stt.map(tragth => {
              if (tragth === 'Ẩn') {
                return (
                  <div className="btn-box lock"><Button data-id={trangthai.id} type="primary" onClick={unlock}> Hiện </Button></div>
                );
              } else {
                return (
                  <div className="btn-box lock"><Button data-id={trangthai.id} type="danger" onClick={lock}> Ẩn </Button></div>
                )
              }
            })}
          </>
        )
      } : (<> </>),
    result.permission === 'Admin' || result.permission === 'QLCH' ?
      {
        dataIndex: 'maloai',
        key: 'maloai',
        render: maloai => (<div className="btn-box fix"><Button data-id={maloai} key={maloai} type="primary" onClick={linkto}> Sửa </Button></div>)
      } : (<> </>),
    result.permission === 'Admin' || result.permission === 'QLCH' ?
      {

        dataIndex: 'maloai',
        key: 'maloai',
        render: maloai => (<div className="btn-box delete"><Button data-id={maloai} key={maloai} type="danger" onClick={deleteType}> Xoá </Button></div>)
      } : (<> </>),
  ];


  return (
    <>
      <div className="form-wrapper">
        <h2 style={{ textAlign: 'center', marginTop: "30px", marginBottom: "5px" }}>DANH SÁCH LOẠI SẢN PHẨM</h2>
        {
          result.permission === 'Admin' || result.permission === 'QLCH' ? (
            <div className="btn-wrapper">
              <Link to={'/them-loai-san-pham'}>
                <Button type="primary">
                  Thêm loại sản phẩm
                </Button>
              </Link>
            </div>
          ) : ("")
        }
        <Table className="item" dataSource={ListType} columns={columns} pagination={{ pageSize: 6 }} style={{ padding: 10 }} size="middle" />
      </div>
    </>
  );
}

export default ListProductType;