import "Container/scss/addpro.scss";
import { Button, Form, Input, message, Select, Row, Col, Image, Upload, Modal } from "antd";
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import catalog from 'API_Call/Api_catalog/catalog';
import { storage } from 'Container/Firebase/firebase';

const { Option } = Select;
const { confirm } = Modal;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 20,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 20,
        },
        sm: {
            span: 15,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 9,
        },
    },
};

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

const EditProductType = (props) => {
    const token = localStorage.getItem("token");
    const [form] = Form.useForm();
    const history = useHistory();
    const Type = JSON.parse(localStorage.getItem("type"))
    const [imageName, setImageName] = useState("");
    const [fileList, setFileList] = useState([]);
    const [link, setLink] = useState("");
    const [ImgEdit, setImgEdit] = useState(Type.hinh);

    //nút trở vè
    const back = () => {
        confirm({
            title: 'Bạn muốn trở về trang danh sách loại sản phẩm?',
            okText: 'Trở về',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                if (link !== "") {
                    localStorage.removeItem("type");
                    const del = storage.ref(`ProductType_Img/${imageName.name}`);
                    del.delete().then((res) => {
                        history.push('/danh-sach-loai');
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    localStorage.removeItem("type");
                    history.push('/danh-sach-loai');
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const [listCategory, setlistCategory] = useState([]);
    useEffect(() => {
        catalog.getAll().then((res) => {
            setlistCategory(res.data.listCategorys)
        })
    }, []);

    const update = (values) => {
        var temp = {};
        if (imageName !== "") {
            values['imgName'] = imageName.name;
        } else {
            values['imgName'] = Type.tenhinh;
        }
        if (link !== "") {
            values['img'] = link;
        } else {
            values['img'] = Type.hinh;
        }
        values['hinh'] = "";
        console.log(values)
        
        catalog.updateProtype(values, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                if (link !== "") {
                    const del = storage.ref(`ProductType_Img/${Type.tenhinh}`);
                    del.delete().then((res) => {
                        message.success("Đã xóa ảnh!");
                    }).catch((error) => {
                        console.log(error);
                    });
                }
                localStorage.removeItem("type");
                setTimeout(() => {
                    history.push('/danh-sach-loai');
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

    //upload ảnh lên firebase
    const beforeUpload = file => {
        setFileList(fileList.concat(file));
        return false;
    }
    const handleChange = file => {
        if (file.fileList.length !== 0) {
            const upload = storage.ref(`ProductType_Img/${fileList[0].name}`).put(fileList[0]);
            upload.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("ProductType_Img")
                        .child(fileList[0].name)
                        .getDownloadURL()
                        .then(url => {
                            console.log("ulr:", url);
                            setLink(url);
                            setImgEdit(url);
                            setImageName(fileList[0]);
                            setFileList([]);
                        });
                    message.success("Tải ảnh thành công!");
                }
            );
        }
    };
    //xóa ảnh trên firebase
    const onRemove = file => {      
        const del = storage.ref(`ProductType_Img/${imageName.name}`);
        del.delete().then((res) => {
            setLink("");
            setImageName("");
            message.success("Đã xóa ảnh!");
        }).catch((error) => {
            console.log(error);
        });
    };

    //xóa ảnh hiện tại để có thể tải ảnh mới lên firebase
    const deleteImg = () => {
        setImgEdit("");
    }

    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}>SỬA THÔNG TIN LOẠI SẢN PHẨM</h2>

            <Form
                {...formItemLayout}
                form={form}
                name="update"
                onFinish={update}
                initialValues={{
                    maloai: `${Type.maloai}`,
                    tenloai: `${Type.tenloai}`,
                    madm: `${Type.madm}`,
                }}
                scrollToFirstError
                className="register-form"
            >

                <Form.Item
                    name="maloai"
                    id="maloai"
                    label="Mã loại"

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="tenloai"
                    label="Tên loại"
                    
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Ảnh loại sản phẩm"
                    rules={[{ required: false }]}
                >
                    <Row>
                        <Col>
                            {link !== "" ? (
                                <Image src={link} width={120} />
                            ) : (ImgEdit === "" ? (<span>Chưa có ảnh loại sản phẩm !</span>) : (<Image src={ImgEdit} width={120} />))}

                        </Col>
                        <Col className="del-img">{link !== "" ? ("") : (ImgEdit === "" ? ("") : (<Button onClick={deleteImg} type="primary" danger><DeleteOutlined /></Button>))}</Col>
                    </Row>
                </Form.Item>
                <Form.Item
                    name="hinh"
                    label="Tải ảnh mới"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        listType="picture"
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
                    name="madm"
                    id="madm"
                    label="Mã danh mục"
                >
                    <Select>
                        {listCategory.map((item) => {
                            return (
                                <>
                                    <Option value={item.madm}>{item.tendm}</Option>
                                </>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button className="ant-btn ant-btn-dashed" onClick={back} style={{ marginLeft: -30 }}>
                        Trở về
                    </Button>
                    {
                        link === "" && ImgEdit === "" ? (
                            <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }} disabled>Xác nhận</Button>
                        ) : (
                            <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>Xác nhận</Button>
                        )
                    }
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditProductType;