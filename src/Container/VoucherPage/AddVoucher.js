import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Row, Form, Input, Button, Select, Radio, DatePicker, Modal, message, Upload, Col, Image, InputNumber } from 'antd';
import { useHistory, Link } from "react-router-dom"
import "Container/scss/addpro.scss";
import moment from 'moment';
import discount from 'API_Call/Api_discount/discount';
import { storage } from 'Container/Firebase/firebase';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;
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


const AddVoucher = (props) => {
    const token = localStorage.getItem("token");
    const [form] = Form.useForm();
    const history = useHistory();

    const [datestart, setDatestart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    var now = new Date();
    function startChange(date) {
        if (date !== null) {
            setDatestart(date._d);

        }
    }
    function endChange(date) {
        if (date !== null) {
            setDateEnd(date._d);
        }
    }
    const [title, setTitle] = useState("Hiện");
    const selectTitle = (e) => {
        setTitle(e.target.value);
        console.log(title);
    };


    const [fileList, setFileList] = useState([]);
    const [imageName, setImageName] = useState("");
    const [link, setLink] = useState("");
    const beforeUpload = file => {
        setFileList(fileList.concat(file));
        return false;
    }
    const handleChange = file => {
        if (file.fileList.length !== 0) {
            const upload = storage.ref(`Voucher_img/${fileList[0].name}`).put(fileList[0]);
            upload.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref("Voucher_img")
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
        const del = storage.ref(`Voucher_img/${imageName.name}`);
        del.delete().then((res) => {
            setLink("");
            message.success("Đã xóa ảnh!");
        }).catch((error) => {
            console.log(error);
        });
    };

    const back = () => {
        confirm({
            title: 'Bạn muốn trở về trang danh sách voucher?',
            okText: 'Trở về',
            okType: 'danger',
            cancelText: 'Không',
            onOk() {
                if (link !== "") {
                    const del = storage.ref(`Voucher_img/${imageName.name}`);
                    del.delete().then((res) => {
                        history.push('/danh-sach-voucher');
                    }).catch((error) => {
                        console.log(error);
                    });
                }else{
                    history.push('/danh-sach-voucher');
                }
                
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const addVoucher = (values) => {
        //console.log(datestart.toLocaleDateString());
        values["ngaybd"] = moment(datestart).format('YYYY-MM-DD');
        values["ngaykt"] = moment(dateEnd).format('YYYY-MM-DD');
        values["trangthai"] = title;
        values['img'] = link;
        values['imgName'] = imageName.name;
        console.log(values);
        discount.addVoucher(values, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                setTimeout(() => {
                    history.push('/danh-sach-voucher');
                }, 1000)
            } else
                message.error(res.data.message);
        })
            .catch(err => {
                console.log(err.response);
                message.error(`Tạo voucher thất bại !\n ${err.response.data.message}`)
            });
    };
    const [listProduct, setlistProduct] = useState([]);


    const options = [
        { label: '0', value: '0' },
        { label: '1', value: '1' },
    ];

    return (
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center' }}> Nhập thông tin voucher</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={addVoucher}
                    scrollToFirstError
                >
                    {/* <Form.Item
                        name="makm"
                        label="Mã khuyến mãi"
                        rules={[
                            {
                                type: 'string',
                                message: 'Mã khuyến mãi không được để trống!',
                            },
                            {
                                //required: true,
                                message: 'Điền mã khuyến mãi',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item> */}
                    <Form.Item
                        name="tenkm"
                        label="Tên khuyến mãi"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên khuyến mãi!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="voucher"
                        label="Mã Voucher"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mã Voucher!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="dieukien"
                        label="Điều kiện"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập điều kiện !',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="giagiam"
                        label="Giá giảm"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập giá được giảm!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="soluong"
                        label="Số lượng"
                        /* rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập số lượng voucher!',
                            },
                        ]} */
                    >
                        <InputNumber min="1" max="200" defaultValue="1"/>
                    </Form.Item>
                    <Form.Item
                        name="ghichu"
                        label="Ghi chú"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập ghi chú cho khuyến mãi này !',
                            },
                        ]}
                    >
                        <TextArea rows={3} />
                    </Form.Item>
                    <Form.Item
                        name="hinh"
                        label="Ảnh sản phẩm"
                    >
                        {link !== "" ? (
                            <Image src={link} width={120} />
                        ) : (<span>Chưa có ảnh voucher !</span>)}
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
                        label="Ngày bắt đầu"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn ngày bắt đầu!',
                            },
                        ]}
                    >
                        <DatePicker onChange={startChange} />
                    </Form.Item>
                    <Form.Item
                        label="Ngày kết thúc"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn ngày kết thúc!',
                            },
                        ]}
                    >
                        <DatePicker onChange={endChange} />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button className="ant-btn ant-btn-dashed" onClick={back} style={{ marginLeft: -30 }}>
                            Trở về
                        </Button>
                        {link === "" ? (
                            <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }} disabled>
                                Thêm voucher
                            </Button>
                        ) : (
                            <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>
                                Thêm voucher
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default AddVoucher;
