import React, { useState, useEffect } from 'react';
import { Table, Image, Button, message, Tabs, List, Form, Comment, Input, Avatar, Row, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useHistory, Link } from "react-router-dom";
import comment from 'API_Call/Api_comment/comment';
import "Container/scss/addpro.scss"
import moment from 'moment';

const Reply = (props) => {
  const { TabPane } = Tabs;
  const { TextArea } = Input;
  const token = localStorage.getItem("token");
  const User = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  const [ok, setOk] = useState(false);
  let detailComment = JSON.parse(localStorage.getItem('detailComment'));
  let traloi = [];
  if (detailComment[0].traLoiBL.length > 0) {
    traloi = [...detailComment[0].traLoiBL];
  }
  useEffect(() => {
    detailComment = JSON.parse(localStorage.getItem('detailComment'));
    if (detailComment[0].traLoiBL.length > 0) {
      traloi = [...detailComment[0].traLoiBL];
    }
  }, [ok])
  console.log("traloi", traloi);

  let values = '';
  const [submitting, setSubmitting] = useState(false);
  const addComs = (value) => {
    comment.replyComment(value, token).then((res) => {
        if (res.data.status === "Success") {
            message.success(res.data.message);
            localStorage.setItem('detailComment', JSON.stringify(res.data.comment));
            setOk(!ok);
        } else {
            message.error(res.data.message)
        }
    })
        .catch(err => {
            console.log(err.response);
            message.error(`ERROR !\n ${err.response.data.message}`)
            console.log(err.response.data);
        })
  };

  const editComs = (value) => {
    comment.updateDeComment(value, token).then((res) => {
        if (res.data.status === "Success") {
            message.success(res.data.message);
            localStorage.setItem('detailComment', JSON.stringify(res.data.comment));
            setOk(!ok);
        } else {
            message.error(res.data.message)
        }
    })
        .catch(err => {
            console.log(err.response);
            message.error(`ERROR !\n ${err.response.data.message}`)
        })
  };

  const handleChange = (e) => {
    values = e.target.value;
  };

  const delComment = (e) => {
    let mact = e.mact;
    comment.deleteCommentDe(mact, token).then((res) => {
        if (res.data.status === "Success") {
            message.success(res.data.message);
            localStorage.setItem('detailComment', JSON.stringify(res.data.comment));
            setOk(!ok);
        } else {
            message.error(res.data.message)
        }
    })
        .catch(err => {
            console.log(err.response);
            message.error(`ERROR !\n ${err.response.data.message}`)
        })
  }

  const Editor = () => (
    <>
      <Form
        onFinish={addComs}
        id="cmt"
        initialValues={{
          manv: `${User.manv}`,
          tennv: `${User.tennv}`,
          mabl: `${detailComment[0].mabl}`,
        }}
      >
        <Form.Item
          name="manv"
          hidden
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="tennv"
          hidden
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mabl"
          hidden
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="noidung"
        >
          <TextArea placeholder="Nhập đánh giá của bạn" rows={4} onChange={handleChange} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Phản hồi
          </Button>
        </Form.Item>
      </Form>
    </>
  );

  const TabsProduct = () => {
    const [fix, setFix] = useState(false)
    const Edit = () => {
      setFix(!fix);
    }
    const Customer = ({ children }) => (
      <Comment
        author={detailComment[0].tenkh}
        avatar={detailComment[0].hinh}
        content={[detailComment[0].noidung]}
        datetime={detailComment[0].giobl + "  " + moment(detailComment[0].ngaybl).format('DD-MM-YYYY')}
      >
        {children}
      </Comment>
    );
    const Staff = ({ children }) => (
      traloi.length > 0 ? (
        <Comment
          actions={[
            fix === true ? ("") : (<a key="comment-list-reply-to-0" onClick={() => delComment(traloi[0])}>Xóa</a>)
          ]}
          author={traloi[0].ten}
          avatar={
            <Avatar
              src={traloi[0].hinhnv}
              alt={traloi[0].ten}
              width="40"
            />
          }
          content={[
            fix === true ? (
              <Form
                onFinish={editComs}
                id="cmt"
                initialValues={{
                  mact: `${traloi[0].mact}`,
                  mabl: `${detailComment[0].mabl}`,
                }}
              >
                <Form.Item
                  name="mabl"
                  hidden
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="mact"
                  hidden
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="noidung"
                >
                  <TextArea placeholder="Nhập phản hồi của bạn" rows={4} onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                  <Button onClick={Edit} type="dashed">
                    Hủy
                  </Button>
                  <Button htmlType="submit" type="primary" style={{ marginLeft: 30 }}>
                    Chỉnh sửa
                  </Button>
                </Form.Item>
              </Form>
            ) : (traloi[0].noidung), fix === true ? ("") : (<a key="comment-list-reply-to-0" onClick={Edit}><EditOutlined style={{ marginLeft: 10 }} /></a>)
          ]}
          datetime={traloi[0].ngaybl}
        >
          {children}
        </Comment>
      ) : (
        <Comment
          avatar={
            <Avatar
              src={User.hinh}
              alt={User.username}
              width="40"
            />
          }
          author={User.username}
          content={
            <Editor
              onChange={handleChange}
              onSubmit={addComs}
              submitting={submitting}
              value={values}
            />
          }
        >
          {children}
        </Comment>
      )
    );
    return (
      <Tabs style={{ width: 700 }}>
        <TabPane forceRender={true}>
          <Customer>
            <Staff />
          </Customer>
        </TabPane>
      </Tabs>
    );
  };
  const { confirm } = Modal;
  const back = () => {
    confirm({
      title: 'Bạn muốn trở về trang danh sách khuyến mãi?',
      okText: 'Trở về',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        localStorage.removeItem("detailComment");
        history.push('/danh-sach-binh-luan');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <>
      <div className="form-wrapper">
        <h2 style={{ textAlign: 'center', marginTop: "20px", marginBottom: "5px" }}>PHẢN HỒI BÌNH LUẬN</h2>
        <Row style={{ display: "flex", justifyContent: 'center' }}>
          <TabsProduct />
        </Row>
        <Row style={{ display: "flex", justifyContent: 'flex-end', marginRight: 20, marginBottom: 20 }}>
          <Button className="ant-btn ant-btn-dashed" style={{ boxShadow: '0px 5px 10px rgba(54, 45, 45, 0.2)' }} onClick={back}>
            Trở về
          </Button>
        </Row>
      </div>
    </>
  );
}

export default Reply;