import { Button, Form, Input, message, Select, Image, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import catalog from 'API_Call/Api_catalog/catalog';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
import { storage } from 'Container/Firebase/firebase';

const { Option } = Select;
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

const AddProductType = (props) => {
    const token = localStorage.getItem("token");
    const [form] = Form.useForm();
    const history = useHistory();
    const [imageName, setImageName] = useState("");
    const [fileList, setFileList] = useState([]);
    const [link, setLink] = useState("");
    const { confirm } = Modal;

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
                            setImageName(fileList[0]);
                            setFileList([]);
                        });
                    message.success("Tải ảnh thành công!");
                }
            );
        }
    };

    const onRemove = file => {
        
        const del = storage.ref(`ProductType_Img/${imageName.name}`);
        del.delete().then((res) => {
            setLink("");
            message.success("Đã xóa ảnh!");
        }).catch((error) => {
            console.log(error);
        });
    };

    const back = () => {
        confirm({
            title: 'Bạn muốn trở về trang danh sách loại sản phẩm?',
            okText: 'Trở về',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                if (link !== "") {
                    const del = storage.ref(`ProductType_Img/${imageName.name}`);
                    del.delete().then((res) => {
                        history.push('/danh-sach-loai');
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    history.push('/danh-sach-loai');
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const addProductType = (values) => {
        values['img'] = link;
        values['imgName'] = imageName.name;
        values['hinh'] = "";
        console.log(values);
        catalog.addProtype(values, token).then((res) => {
            message.success(res.data.message)
            setTimeout(() => {
                history.push('/danh-sach-loai');
            }, 2000)
        })
            .catch(err => {
                console.log(err.response);
                message.error(`${err.response.data.message}`)
            })
    };
    const [listCategory, setlistCategory] = useState([]);
    useEffect(() => {
        catalog.getAll().then((res) => {
            setlistCategory(res.data.listCategorys)
        })
    }, []);

    return (
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center' }}> Nhập thông tin loại sản phẩm</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="addProductType"
                    onFinish={addProductType}
                    scrollToFirstError
                >
                    <Form.Item
                        name="maloai"
                        label="Mã loại sản phẩm"
                        rules={[
                            {
                                type: 'string',
                                message: 'Mã loại sản phẩm không được để trống!',
                            },
                            {
                                required: true,
                                message: 'Điền mã loại sảm phẩm',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="tenloai"
                        label="Tên loại sản phảm"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập tên loại sản phẩm!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="hinh"
                        label="Ảnh loại sản phẩm"
                    >
                        {link !== "" ? (
                            <Image src={link} width={120} />
                        ) : (<span>Chưa có ảnh loại sản phẩm !</span>)}
                    </Form.Item>
                    <Form.Item
                        name="hinh"
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
                            {link !== "" ? (<Button disabled icon={<UploadOutlined />} >Tải ảnh lên</Button>) : (<Button icon={<UploadOutlined />} >Tải ảnh lên</Button>)}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="madm"
                        label="Danh mục"
                    //rules={[{ required: true, message: 'Chọn mã loại!' }]}
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
                        <Button onClick={back} className="ant-btn ant-btn-dashed " style={{ marginLeft: -30 }}>
                            Trở về
                        </Button>
                        {link !== "" ? (<Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                            Thêm loại sảm phẩm
                        </Button>) : (
                            <Button disabled type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                                Thêm loại sảm phẩm
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default AddProductType;
