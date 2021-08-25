import { Button, Form, Input, message, Upload, Image, Col, Row, Modal } from "antd";
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
import catalog from "API_Call/Api_catalog/catalog";
import { storage } from 'Container/Firebase/firebase';

const formItemLayout = {
    labelCol: {
        xs: { span: 22 },
        sm: {
            span: 6
        },
    },
    wrapperCol: {
        xs: { span: 20 },
        sm: { span: 15 },
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

const EditCategory = (props) => {
    const token = localStorage.getItem("token");
    const [form] = Form.useForm();
    const { confirm } = Modal;
    const history = useHistory();
    const Category = JSON.parse(localStorage.getItem("category"))
    const [ImgEdit, setImgEdit] = useState(Category.hinh);
    const [imageName, setImageName] = useState("");
    const [fileList, setFileList] = useState([]);
    const [link, setLink] = useState("");

    //Upload ảnh lên firebase
    const beforeUpload = file => {
        setFileList(fileList.concat(file));
        return false;
    }
    const handleChange = file => {
        if (file.fileList.length !== 0) {
            const upload = storage.ref(`Catalog_Img/${fileList[0].name}`).put(fileList[0]);
            upload.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("Catalog_Img")
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

    //Xóa ảnh trên firebase
    const onRemove = file => {      
        const del = storage.ref(`Catalog_Img/${imageName.name}`);
        del.delete().then((res) => {
            setLink("");
            message.success("Đã xóa ảnh!");
        }).catch((error) => {
            console.log(error);
        });
    };

    //nút trở về
    const back = () => {
        confirm({
            title: 'Bạn muốn trở về trang danh sách danh mục?',
            okText: 'Trở về',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                if (link !== "") {
                    localStorage.removeItem("category");
                    const del = storage.ref(`Catalog_Img/${imageName.name}`);
                    del.delete().then((res) => {
                        history.push('/danh-muc-san-pham');
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    localStorage.removeItem("category");
                    history.push('/danh-muc-san-pham');
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    //xóa ảnh đã có để tải ảnh mới lên firebase
    const deleteImg = () => {
        setImgEdit("");
    }

    const update = (values) => {
        if (imageName !== "") {
            values['imgName'] = imageName.name;
        } else {
            values['imgName'] = Category.tenhinh;
        }
        if (link !== "") {
            values['img'] = link;
        } else {
            values['img'] = Category.hinh;
        }
        console.log(values)
        catalog.updateCatalog(values, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                if (link !== "") {
                    const del = storage.ref(`Catalog_Img/${Category.tenhinh}`);
                    del.delete().then((res) => {
                        message.success("Đã xóa ảnh!");
                    }).catch((error) => {
                        console.log(error);
                    });
                }
                localStorage.removeItem("category");
                setTimeout(() => {
                    history.push('/danh-muc-san-pham');
                }, 2000)
            }
        })
            .catch(err => {
                message.error(`${err.response.data.message}`);
            })
    };

    return (
        <div className="form-wrapper">
            <h2 style={{ textAlign: 'center' }}>SỬA THÔNG TIN DANH MỤC</h2>

            <Form
                {...formItemLayout}
                form={form}
                name="update"
                onFinish={update}
                initialValues={{
                    madm: `${Category.madm}`,
                    tendm: `${Category.tendm}`
                }}
                scrollToFirstError
                className="register-form"
            >
                <Form.Item
                    name="madm"
                    id="madm"
                    label="Mã danh mục"

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name="tendm"
                    id="tendm"
                    label="Tên danh mục"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên danh mục !!!",
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name=" "
                    label="Ảnh danh mục"
                    rules={[{ required: false }]}
                >
                    <Row>
                        <Col>
                            {link !== "" ? (
                                <Image src={link} width={120} />
                            ) : (ImgEdit === "" ? (<span>Chưa có ảnh danh mục !</span>) : (<Image src={ImgEdit} width={120} />))}

                        </Col>
                        <Col className="del-img">{link !== "" ? ("") : (ImgEdit === "" ? ("") : (<Button onClick={deleteImg} type="primary" danger><DeleteOutlined /></Button>))}</Col>
                    </Row>
                </Form.Item>
                <Form.Item
                    label="Tải ảnh mới"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    name=" "
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

export default EditCategory;