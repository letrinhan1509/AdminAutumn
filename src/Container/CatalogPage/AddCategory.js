import { Button, Form, Input, message, Modal, Image, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import catalog from 'API_Call/Api_catalog/catalog';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
import { storage } from 'Container/Firebase/firebase';

const formItemLayout = {
    labelCol: {
        xs: { span: 22 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 20 },
        sm: { span: 15 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 22,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 10,
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

const AddCategory = (props) => {
    const token = localStorage.getItem("token");
    const [imageName, setImageName] = useState("");
    const [form] = Form.useForm();
    const history = useHistory();
    const [fileList, setFileList] = useState([]);
    const [link, setLink] = useState("");
    const { confirm } = Modal;

    //upload ảnh lên firebase
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
                    const del = storage.ref(`Catalog_Img/${imageName.name}`);
                    del.delete().then((res) => {
                        history.push('/danh-muc-san-pham');
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    history.push('/danh-muc-san-pham');
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const addCatalog = (values) => {
        values['img'] = link;
        values['imageName'] = imageName.name;
        console.log(values);
        catalog.addCatalog(values, token).then((res) => {
            message.success(res.data.message)
            setTimeout(() => {
                history.push('/danh-muc-san-pham');
            }, 2000)
        })
            .catch(err => {
                console.log(err.response);
                message.error(`${err.response.data.message}`)
            })
    };

    return (
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center' }}> Nhập thông tin danh mục</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="addCatalog"
                    onFinish={addCatalog}
                    scrollToFirstError
                >
                    <Form.Item
                        name="madm"
                        label="Mã danh mục"
                        rules={[
                            {
                                type: 'string',
                                message: 'Mã danh mục không được để trống!',
                            },
                            {
                                required: true,
                                message: 'Điền mã danh mục',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="tendm"
                        label="Tên danh mục"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập tên danh mục!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ảnh sản phẩm"
                    >
                        {link !== "" ? (
                            <Image src={link} width={120} />
                        ) : (<span>Chưa có ảnh danh mục sản phẩm !</span>)}
                    </Form.Item>
                    <Form.Item
                        name=" "
                        label=" "
                        valuePropName="fileList"
                        getValueFromEvent={normFile}

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
                            {link !== "" ? (
                                <Button disabled icon={<UploadOutlined />} >Tải ảnh lên</Button>
                            ) : (<Button icon={<UploadOutlined />} >Tải ảnh lên</Button>)}
                        </Upload>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button className="ant-btn ant-btn-dashed" onClick={back} style={{ marginLeft: -30 }}>
                            Trở về
                        </Button>
                        {link !== "" ? (
                            <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                                Thêm danh mục
                            </Button>) : (
                            <Button disabled type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                                Thêm danh mục
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default AddCategory;
