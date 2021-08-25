import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Select, Upload, Modal, Image, Divider, Table, Radio } from 'antd';
import product from 'API_Call/Api_product/product';
import catalog from 'API_Call/Api_catalog/catalog';
import producer from 'API_Call/Api_producer/producer';
import { storage } from 'Container/Firebase/firebase';
import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
import Title from 'antd/lib/skeleton/Title';

const { TextArea } = Input;
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 20 },
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

const AddProduct = (props) => {
    const token = localStorage.getItem("token");
    const SIZE = useRef(null);
    const MAU = useRef(null);
    const SOLUONG = useRef(null);
    const [imageName, setImageName] = useState("");
    const [form] = Form.useForm();
    const history = useHistory();
    const [fileList, setFileList] = useState([]);
    const [link, setLink] = useState("");
    const { confirm } = Modal;

    const [title, setTitle] = useState(1);
    const selectTitle = (e) => {
        setTitle(e.target.value);
    };

    //upload ảnh lên firebase
    const beforeUpload = file => {
        setFileList(fileList.concat(file));
        return false;
    }
    const handleChange = file => {
        if (file.fileList.length !== 0) {
            const upload = storage.ref(`Product_Img/${fileList[0].name}`).put(fileList[0]);
            upload.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("Product_Img")
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
        const del = storage.ref(`Product_Img/${imageName.name}`);
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
            title: 'Bạn muốn trở về trang danh sách sản phẩm?',
            okText: 'Trở về',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                if (link !== "") {
                    const del = storage.ref(`Product_Img/${imageName.name}`);
                    del.delete().then((res) => {
                        history.push('/tat-ca-san-pham');
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    history.push('/tat-ca-san-pham');
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const [fileDetail, setFileDetail] = useState([]);
    const [linkDe, setLinkDe] = useState([]);
    const [del, setDel] = useState([]);
    const beforeUploadDe = file => {
        setFileDetail(fileDetail.concat(file));
        return false;
    }
    const handleDetail = file => {
        console.log("file.file.name", file.file.name);
        console.log(fileDetail);
        const exist = del.find((x) => x.ten === file.file.name);
        if (file.fileList.length !== 0) {
            if (!exist) {
                const upload = storage.ref(`ProductDetail_Img/${fileDetail[0].name}`).put(fileDetail[0]);
                upload.on(
                    "state_changed",
                    snapshot => { },
                    error => {
                        console.log(error);
                    },
                    () => {
                        storage
                            .ref("ProductDetail_Img")
                            .child(fileDetail[0].name)
                            .getDownloadURL()
                            .then(url => {
                                console.log("ulr:", url);
                                console.log("namehinh:", fileDetail[0].name);
                                setLinkDe([...linkDe, { link: url, ten: fileDetail[0].name }]);
                                setDel([...linkDe, { link: url, ten: fileDetail[0].name }]);
                                setFileDetail([]);
                            });
                        message.success("Tải ảnh thành công!");
                    }
                );
            }
        }
    };
    const onRemoveDe = file => {
        console.log(file.name);
        const del = storage.ref(`ProductDetail_Img/${file.name}`);
        const nametemp = file.name;
        del.delete().then((res) => {
            setLinkDe(linkDe.filter((x) => x.ten !== nametemp));
            message.success("Đã xóa ảnh!");
        }).catch((error) => {
            console.log(error);
        });
    };
    const size = [
        {
            key: 1,
            masize: 'S',
            tensize: 'S',
        },
        {
            key: 2,
            masize: 'M',
            tensize: 'M',
        },
        {
            key: 3,
            masize: 'L',
            tensize: 'L',
        },
        {
            key: 4,
            masize: 'XL',
            tensize: 'XL',
        }
    ];
    const mau = [
        {
            key: 1,
            mamau: 'xanh',
            tenmau: 'Xanh',
        },
        {
            key: 2,
            mamau: 'đỏ',
            tenmau: 'Đỏ',
        },
        {
            key: 3,
            mamau: 'đen',
            tenmau: 'Đen',
        },
        {
            key: 4,
            mamau: 'trắng',
            tenmau: 'Trắng',
        }
    ];
    const columns = [
        /* {
            title: 'Stt',
            dataIndex: 'id',
            key: 'id',
        }, */
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Màu',
            dataIndex: 'mau',
            key: 'mau',
        },
        {
            title: 'Số lượng',
            dataIndex: 'soluong',
            key: 'soluong',
        },
        {
            dataIndex: 'id',
            key: 'id',
            render: id => (<div className="btn-box delete"><Button data-id={id} key={id} type="danger" onClick={showDeleteDetail}>Xóa</Button></div>)
        }
    ];

    const addProduct = (values) => {
        values["trangthai"] = title;
        values['img'] = link;
        values['imgName'] = imageName.name;
        values['hinhct'] = "";
        values['hinhchitiet'] = JSON.stringify(linkDe);
        values['chitiet'] = JSON.stringify(add); 
        values['hinh'] = "";
        console.log(values);
        product.addproduct(values, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/tat-ca-san-pham');
                }, 2000)
            };
        }).catch(err => {
            console.log(err.response);
            message.error(`Thêm thất bại!\n ${err.response.data.message}`)
        })
    };
    const [add, setAdd] = useState([]);
    const [id, setID] = useState(0);
    const addDetail = () => {
        let tam = id + 1;
        let detail = [];
        detail['id'] = tam;
        detail['size'] = SIZE.current.props.value;
        detail['mau'] = MAU.current.props.value;
        detail['soluong'] = parseInt(SOLUONG.current.ariaValueNow);
        detail['giagiam'] = 0;
        setAdd([...add, { ...detail }]);
        setID(tam);
    };
    function showDeleteDetail(item) {
        let IDdel = item.currentTarget.dataset.id;
        console.log(IDdel);
        confirm({
            title: 'Bạn thật sự muốn xóa chi tiết này?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                //add.filter((x) => console.log(x.id));
                setAdd(
                    add.filter((x) => x.id !== Number(IDdel))
                );
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    //API NSX - DM - Loại
    const [listProducer, setlistProducer] = useState([]);
    useEffect(() => {
        producer.getAll().then((res) => {
            setlistProducer(res.data.data)
        })
    }, []);

    const [listCategory, setlistCategory] = useState([]);
    useEffect(() => {
        catalog.getAll().then((res) => {
            setlistCategory(res.data.listCategorys);
        })
    }, []);

    const [listTypes, setlistTypes] = useState([]);
    useEffect(() => {
        catalog.getAllType().then((res) => {
            setlistTypes(res.data.data);
        })
    }, []);

    //Hiển thị loại theo danh mục
    const onChange = (e) => {
        let id = "";
        id = e;
        console.log(id);
        catalog.getTypeDanhmucID(id).then((res) => {
            setlistTypes(res.data.data);
        })
    };



    return (
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center' }}> Nhập thông tin sản phẩm</h2>

                <Form
                    {...formItemLayout}
                    form={form}
                    name="addProduct"
                    onFinish={addProduct}
                    scrollToFirstError
                //initialValues={{img: link}}
                >
                    {/* <Form.Item
                        name="code"
                        label="Code"
                        rules={[
                            {
                                //required: true,
                                message: 'Nhập Code!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item> */}
                    <Form.Item
                        name="ten"
                        label="Tên sản phẩm"
                        rules={[
                            {
                                //required: true,
                                message: 'Nhập tên sản phẩm!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="gia"
                        label="Giá"
                        rules={[
                            {
                                //required: true,
                                message: 'Nhập giá sản phẩm!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="hinh"
                        label="Ảnh sản phẩm"
                    >
                        {link !== "" ? (
                            <Image src={link} width={120} />
                        ) : (<span>Chưa có ảnh sản phẩm !</span>)}
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
                            {link !== "" ? (
                                <Button disabled icon={<UploadOutlined />} >Tải ảnh lên</Button>
                            ) : (<Button icon={<UploadOutlined />} >Tải ảnh lên</Button>)}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="hinhct"
                        label="Ảnh chi tiết"
                    >
                        {linkDe !== "" ? (
                            linkDe.map((item) => (
                                <Image src={item.link} width={120} />
                            ))
                        ) : (<span>Chưa có ảnh chi tiết !</span>)}
                    </Form.Item>
                    <Form.Item
                        name="hinhct"
                        label=" "
                        valuePropName="fileList"
                        getValueFromEvent={normFile}

                    >
                        <Upload
                            listType="picture"
                            name='hinhct'
                            multiple='true'
                            beforeUpload={beforeUploadDe}
                            onChange={handleDetail}
                            onRemove={onRemoveDe}
                            fileList
                        >
                            {linkDe.length === 3 ? (
                                <Button disabled icon={<UploadOutlined />} >Tải ảnh lên</Button>
                            ) : (<Button icon={<UploadOutlined />} >Tải ảnh lên</Button>)}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="mota"
                        label="Mô tả"
                        rules={[
                            {
                                //required: true,
                                message: 'Nhập mô tả sản phẩm!'
                            }
                        ]}
                    >
                        <TextArea rows={3} />
                    </Form.Item>
                    <Form.Item name="mansx"
                        label="Nhà sản xuất"
                    //rules={[{ required: true, message: 'Chọn nhà sản xuất!' }]}
                    >
                        <Select>
                            {listProducer.map((item) => {
                                return (
                                    <>
                                        <Option value={item.mansx}>{item.tennsx}</Option>
                                    </>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="madm"
                        label="Danh mục"
                    //rules={[{ required: true, message: 'Chọn mã loại!' }]}
                    >
                        <Select onChange={onChange}>
                            {listCategory.map((item) => {
                                return (
                                    <>
                                        <Option value={item.madm}>{item.tendm}</Option>
                                    </>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="maloai"
                        label="Loại sản phẩm"
                    //rules={[{ required: true, message: 'Chọn mã loại!' }]}
                    >
                        <Select>
                            {listTypes.map((item) => {
                                return (
                                    <>
                                        <Option value={item.maloai}>{item.tenloai}</Option>
                                    </>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                    >
                        <Radio.Group onChange={selectTitle} value={title}>
                            <Radio value={1}>Hiện</Radio>
                            <Radio value={0}>Ẩn</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Divider >Chi tiết sản phẩm</Divider>
                    <div>
                        <Form
                            name="addDetail"
                            className="detail"
                            initialValues={{
                                soluong: 1,
                            }}
                        >
                            <Form.Item
                                name="soluong"
                                label="Số lượng"
                            >
                                <InputNumber ref={SOLUONG} min={1} max={200} defaultValue={1} />
                            </Form.Item>
                            <Form.Item
                                name="size"
                                label="Size"
                            //rules={[{ required: false }]}
                            >
                                <Select ref={SIZE} style={{ width: 100 }}>
                                    {size.map((item) => {
                                        return (
                                            <>
                                                <Option value={item.masize}>{item.tensize}</Option>
                                            </>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="mau"
                                label="Màu"
                            //rules={[{ required: false }]}
                            >
                                {/* <Select ref={MAU} style={{ width: 100 }}>
                                    {mau.map((item) => {
                                        return (
                                            <>
                                                <Option value={item.mamau}>{item.tenmau}</Option>
                                            </>
                                        )
                                    })}
                                </Select> */}
                                <Input ref={MAU} style={{width: 100}}/>
                            </Form.Item>
                            <Button className="btn-detail" type="primary" onClick={addDetail}>Thêm chi tiết</Button>
                        </Form>
                        <Table className="proItem" style={{ padding: 10 }} dataSource={add} columns={columns} pagination={{ pageSize: 5 }} size="small" />
                    </div>
                    <Form.Item {...tailFormItemLayout}>
                        <Button className="ant-btn ant-btn-dashed" onClick={back} style={{ marginLeft: -30 }}>
                            Trở về
                        </Button>
                        {
                            link === "" ? (
                                <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }} disabled>Thêm sản phẩm</Button>
                            ) : (
                                <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>Thêm sản phẩm</Button>
                            )
                        }
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default AddProduct;
