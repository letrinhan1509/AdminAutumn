import React, { useState, useEffect } from 'react';
import { Image, Input, Button, message, Form, Upload, Spin, Row, Col } from 'antd';
import { UploadOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { storage } from 'Container/Firebase/firebase';
import Menus from "./Menus";
import { useHistory, Link } from "react-router-dom";
import "Container/scss/account.scss";
import admin from 'API_Call/Api_admin/admin';

const { TextArea } = Input;
const EditAccount = (props) => {
    const history = useHistory();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ImgEdit, setImgEdit] = useState("");
    useEffect(() => {
        setTimeout(() => {
            setUser(JSON.parse(localStorage.getItem("user")));
            if (user !== null) {
                setLoading(true);
                setImgEdit(user.hinh);
            }
        }, 1000);
    }, [])
    var url = window.location.toString();
    url = url.replace("http://localhost:3000/", '');


    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const [imageName, setImageName] = useState("");
    const [fileList, setFileList] = useState([]);
    const [link, setLink] = useState("");

    const beforeUpload = file => {
        setFileList(fileList.concat(file));
        return false;
    }
    const handleChange = file => {
        if (file.fileList.length !== 0) {
            const upload = storage.ref(`User_Img/${fileList[0].name}`).put(fileList[0]);
            upload.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("User_Img")
                        .child(fileList[0].name)
                        .getDownloadURL()
                        .then(url => {
                            console.log("ulr:", url);
                            setLink(url);
                            setImageName(fileList[0]);
                            setFileList([]);
                        });
                    message.success("Tải ảnh thành công!");
                }
            );
        }
    };

    const onRemove = file => {       
        const del = storage.ref(`User_Img/${imageName.name}`);
        del.delete().then((res) => {
            setLink("");
            setImageName("");
            message.success("Đã xóa ảnh!");
        }).catch((error) => {
            console.log(error);
        });
    };
    //xóa ảnh đã có để tải ảnh mới lên firebase
    const deleteImg = () => {
        setImgEdit("");
    }
    const update = (values) => {
        values['manv'] = user.manv;
        if (imageName !== "") {
            values['imgName'] = imageName.name;
        } else {
            values['imgName'] = user.tenhinh;
        }
        if (link !== "") {
            values['img'] = link;
        } else {
            values['img'] = user.hinh;
        }
        console.log(values);
        admin.updateInfo(values).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                if (link !== "") {
                    const del = storage.ref(`User_Img/${user.tenhinh}`);
                    del.delete().then((res) => {
                        message.success("Đã xóa ảnh!");
                    }).catch((error) => {
                        console.log(error);
                    });
                }
                localStorage.removeItem("user");
                localStorage.setItem('user', JSON.stringify(res.data.admin));
                setTimeout(() => {
                    history.push('/tai-khoan');
                    window.location.reload();
                }, 2000)
            }
            else {
                //message.error("Sửa thông tin thất bại")
                message.error(res.data.message)
            }
        })
            .catch(err => {
                console.log(err.response);
                message.error(`${err.response.data.message}`)
            })
    };

    return (
        <div>
            <Row className="col-wrapper">
                <Col className="col-one">
                    <Menus url={url} />
                </Col>
                <Col className="col-two">
                    <Row className="account-box">
                        <Col className="form">
                            {loading === false ? (
                                <Row className="spin-wrapper">
                                    <Spin className="spin" size="large" />
                                </Row>
                            ) : (
                                <>

                                    <Row className="title-box">
                                        <h1 className="user-title">Chỉnh sửa thông tin</h1>
                                        <Col className="img-box">
                                            {link !== "" ? (
                                                <Image
                                                    src={link}
                                                />
                                            ) : (ImgEdit === "" ? (<span>Tài khoản chưa có ảnh !</span>) : (<Image src={user.hinh} />)
                                            )}
                                        </Col>
                                        {link !== "" ? ("") : (ImgEdit === "" ? ("") : (<Button type="danger" onClick={deleteImg}>Xóa ảnh</Button>))}
                                        
                                    </Row>
                                    <Form
                                        name="update"
                                        onFinish={update}
                                        initialValues={{
                                            tennv: `${user.tennv}`,
                                            email: `${user.admin}`,
                                            phone: `${user.sodienthoai}`,
                                            diachi: `${user.diachi}`,
                                            permission: `${user.quyen}`,
                                        }}
                                        scrollToFirstError
                                    >
                                        <Form.Item
                                            name="hinh"
                                            label="Ảnh nhân viên"
                                            valuePropName="fileList"
                                            getValueFromEvent={normFile}
                                            className="load-img"
                                        >
                                            <Upload
                                                listType="picture"
                                                name='hinh'
                                                multiple='true'
                                                beforeUpload={beforeUpload}
                                                onChange={handleChange}
                                                onRemove={onRemove}
                                                fileList
                                            >
                                                {link !== "" || ImgEdit !== "" ? (
                                                    <Button disabled icon={<UploadOutlined />} >Tải ảnh lên</Button>
                                                ) : (<Button icon={<UploadOutlined />} >Tải ảnh lên</Button>)}
                                            </Upload>
                                        </Form.Item>
                                        <Form.Item
                                            name="tennv"
                                            id="tennv"
                                            label="Tên nhân viên"
                                        >
                                            <Input placeholder="User name" />
                                        </Form.Item>
                                        <Form.Item
                                            name="email"
                                            id="email"
                                            label="Email"
                                        >
                                            <Input placeholder="email" disabled />
                                        </Form.Item>
                                        <Form.Item
                                            name="phone"
                                            id="phone"
                                            label="Số điện thoại"
                                        >
                                            <Input placeholder="Số điện thoại" />
                                        </Form.Item>
                                        <Form.Item
                                            name="diachi"
                                            id="diachi"
                                            label="Địa chỉ"
                                        >
                                            <Input placeholder="Địa chỉ" />
                                        </Form.Item>
                                        <Form.Item
                                            name="permission"
                                            id="permission"
                                            label="Quyền hạn"
                                        >
                                            <Input placeholder="Quyền hạn" disabled />
                                        </Form.Item>
                                        { link === "" && ImgEdit === "" ? (
                                            <Button value="submit" type="primary" htmlType="submit" disabled>Cập nhật</Button>
                                        ) : (
                                            <Button value="submit" type="primary" htmlType="submit">Cập nhật</Button>
                                        )}
                                        
                                    </Form>
                                </>
                            )}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    );
}

export default EditAccount;
