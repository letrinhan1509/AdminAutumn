import React from 'react';
import { Button, Tabs, Comment, Row, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import "Container/scss/addpro.scss"
import moment from 'moment';

const DetailComment = () => {
    const { TabPane } = Tabs;
    const User = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();
    const detailComment = JSON.parse(localStorage.getItem('detailComment'));
    let traloi = [];
    if (detailComment[0].traLoiBL !== "") {
        traloi = [...detailComment[0].traLoiBL];
        console.log(traloi);
    }

    const TabsProduct = () => {
        const Customer = ({ children }) => (
            <Comment
                author={detailComment[0].tenkh}
                avatar={detailComment[0].hinh}
                content={[detailComment[0].noidung]}
                datetime={detailComment[0].giobl + "  " + detailComment[0].ngaybl}
            >
                {children}
            </Comment>
        );
        const Staff = ({ children }) => (
            traloi.length !== 0 ? (
                <Comment
                    author={traloi[0].ten}
                    avatar={traloi.hinh}
                    content={traloi[0].noidung}
                    datetime={traloi[0].ngaybl}
                >
                    {children}
                </Comment>
            ) : ("")
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
                <h2 style={{ textAlign: 'center', marginTop: "20px", marginBottom: "5px" }}>CHI TIẾT BÌNH LUẬN</h2>
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

export default DetailComment;