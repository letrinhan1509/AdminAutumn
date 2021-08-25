import React, { useState, useEffect } from 'react';
import { Table, Image, Button, message, Tag } from 'antd';
import { useHistory, Link } from "react-router-dom";
import COMMENTS from 'API_Call/Api_comment/comment';
import "Container/scss/addpro.scss"
import moment from 'moment';

const ListComment = (props) => {
  const token = localStorage.getItem("token");
  const history = useHistory();
  let result = JSON.parse(localStorage.getItem('user'));
  const [listComment, setListComment] = useState([]);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    COMMENTS.getAll().then((res) => {
      setListComment(res.data.listComments);
    })
  }, [ok]);

  const unlockCmt = (e) => {
    let id = e.currentTarget.dataset.id;
    let values = {
      "mabl": id,
      "trangthai": 1
    };
    
    COMMENTS.hideCommet(values, token).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message)
        setOk(!ok);
      }
    })
      .catch(err => {
        console.log(err.response);
        message.error(`${err.response.data.message}`)
      })

  }
  const lockCmt = (e) => {
    let id = e.currentTarget.dataset.id;
    let values = {
      "mabl": id,
      "trangthai": 0
    };
    COMMENTS.hideCommet(values, token).then((res) => {
      if (res.data.status === "Success") {
        message.success(res.data.message)
        setOk(!ok);
      }
    })
      .catch(err => {
        message.error(`${err.response.data.message}`)
      })
  };


  const detail = (e) => {
    let id = e.currentTarget.dataset.id
    COMMENTS.getid(id).then((res) => {
    if (res.data.status === "Success") {
        localStorage.setItem('detailComment', JSON.stringify(res.data.comment));
        setTimeout(() => {
          history.push('/danh-sach-binh-luan/chi-tiet');
        }, 100)
    }
    });
}
const reply = (e) => {
  let id = e.currentTarget.dataset.id
  COMMENTS.getid(id).then((res) => {
  if (res.data.status === "Success") {
      console.log(res.data.comment);
      localStorage.setItem('detailComment', JSON.stringify(res.data.comment));
      setTimeout(() => {
        history.push('/danh-sach-binh-luan/phan-hoi');
      }, 100)
  }
  });
}


  if (listComment != null) {
    listComment.forEach(element => {
      if (element.trangthai === 1) {
        element.trangthai = [];
        element.trangthai.stt = ["Hiện"];
        element.trangthai.id = element.mabl;
      }
      if (element.trangthai === 0) {
        element.trangthai = [];
        element.trangthai.stt = ["Ẩn"];
        element.trangthai.id = element.mabl;
      }
    });
  };

  const columns = [
    {
      title: 'Mã',
      dataIndex: 'mabl',
      key: 'mabl',
    },
    {
      title: 'Mã SP',
      dataIndex: 'masp',
      key: 'masp',
    },
    {
      title: 'Mã KH',
      dataIndex: 'makh',
      key: 'makh',
    },
    {
      title: 'Nội dung',
      dataIndex: 'noidung',
      key: 'noidung',
      width: 400
    },
    {
      title: 'Ngày bình luận',
      dataIndex: 'ngaybl',
      key: 'ngaybl',
      
    },
    result.permission === 'Admin' ? (
      {
        title: 'Trạng thái',
        dataIndex: 'trangthai',
        data: 'makh',
        key: 'trangthai',
        render: (trangthai) => //(<Button data-id={text} type="primary" icon={<LockOutlined />} /* onClick={linkto} */></Button>)
        (
          <>
            {trangthai.stt.map(tragth => {
              if (tragth === 'Ẩn') {
                return (
                  <div className="btn-box lock"><Button data-id={trangthai.id} type="primary" onClick={unlockCmt}>Hiện</Button></div>
                );
              } else {
                return (
                  <div className="btn-box lock"><Button data-id={trangthai.id} type="danger" onClick={lockCmt}>Ẩn</Button></div>
                )
              }
            })}
          </>
        )
      }) : (<> </>),
      {
        dataIndex: 'mabl',
        key: 'mabl',
        render: (mabl) => <Button className="detail-btn" data-id={mabl} type="primary" onClick={reply}>Phản hồi</Button>
      },
      {
        dataIndex: 'mabl',
        key: 'mabl',
        render: (mabl) => <Button className="detail-btn" data-id={mabl} type="primary" onClick={detail}>Chi tiết</Button>
      },

  ];

  return (
    <>
      <div className="product-wrapper">
        <h2 style={{ textAlign: 'center', marginTop: "20px", marginBottom: "20px" }}>DANH SÁCH TẤT CẢ BÌNH LUẬN</h2>
        <Table className="proItem" dataSource={listComment} columns={columns} pagination={{ pageSize: 8 }} size="small" />

        {/* <a className="ant-btn ant-btn-primary" href='/Themsanpham'  type="primary">Thêm sản phẩm</a> */}
      </div>
    </>
  );
}

export default ListComment;