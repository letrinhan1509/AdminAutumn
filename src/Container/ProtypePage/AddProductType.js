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
                    message.success("Ta??i a??nh tha??nh c??ng!");
                }
            );
        }
    };

    const onRemove = file => {
        
        const del = storage.ref(`ProductType_Img/${imageName.name}`);
        del.delete().then((res) => {
            setLink("");
            message.success("??a?? xo??a a??nh!");
        }).catch((error) => {
            console.log(error);
        });
    };

    const back = () => {
        confirm({
            title: 'Ba??n mu????n tr???? v???? trang danh sa??ch loa??i sa??n ph????m?',
            okText: 'Tr???? v????',
            okType: 'danger',
            cancelText: 'Kh??ng',
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
                <h2 style={{ textAlign: 'center' }}> Nh???p th??ng tin loa??i s???n ph???m</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="addProductType"
                    onFinish={addProductType}
                    scrollToFirstError
                >
                    <Form.Item
                        name="maloai"
                        label="M?? loa??i s???n ph???m"
                        rules={[
                            {
                                type: 'string',
                                message: 'M?? loa??i s???n ph???m kh??ng ???????c ????? tr???ng!',
                            },
                            {
                                required: true,
                                message: '??i???n m?? loa??i s???m ph???m',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="tenloai"
                        label="T??n loa??i sa??n pha??m"
                        rules={[
                            {
                                required: true,
                                message: 'Nh???p t??n loa??i sa??n ph????m!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="hinh"
                        label="???nh loa??i s???n ph???m"
                    >
                        {link !== "" ? (
                            <Image src={link} width={120} />
                        ) : (<span>Ch??a co?? a??nh loa??i sa??n ph????m !</span>)}
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
                            {link !== "" ? (<Button disabled icon={<UploadOutlined />} >Ta??i a??nh l??n</Button>) : (<Button icon={<UploadOutlined />} >Ta??i a??nh l??n</Button>)}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="madm"
                        label="Danh mu??c"
                    //rules={[{ required: true, message: 'Cho??n m?? lo???i!' }]}
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
                            Tr???? v????
                        </Button>
                        {link !== "" ? (<Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                            Th??m loa??i s???m ph???m
                        </Button>) : (
                            <Button disabled type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                                Th??m loa??i s???m ph???m
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default AddProductType;
