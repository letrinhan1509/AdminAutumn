import React, { useState, useEffect } from 'react';
import axios from "axios"
import { Row, Form, Input, Button, Select, Radio, DatePicker, Col, message, Upload, Image, Modal, InputNumber } from 'antd';
import { DownloadOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useHistory, Link } from "react-router-dom"
import "Container/scss/addpro.scss";
import moment from 'moment';
import { storage } from 'Container/Firebase/firebase';
import voucher from "API_Call/Api_discount/discount";

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
const EditVoucher = (props) => {
    const token = localStorage.getItem("token");
    const [form] = Form.useForm();
    const history = useHistory();
    let voucherID = JSON.parse(localStorage.getItem('voucherID'));
    const [ImgEdit, setImgEdit] = useState(voucherID.hinh);
    var dateBD = new Date(voucherID.ngaybd);
    var dateKT = new Date(voucherID.ngaykt);
    const [datestart, setDatestart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    //let a = "";
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
    const [title, setTitle] = useState(voucherID.trangthai);
    const selectTitle = (e) => {
        setTitle(e.target.value);
        console.log(title);
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
                            setImgEdit(url);
                            setImageName(fileList[0]);
                            setFileList([]);
                        });
                    message.success("Ta??i a??nh tha??nh c??ng!");
                }
            );
        }
    };
    const onRemove = file => {       
        const del = storage.ref(`Voucher_img/${imageName.name}`);
        del.delete().then((res) => {
            setLink("");
            setImageName("");
            message.success("??a?? xo??a a??nh!");
        }).catch((error) => {
            console.log(error);
        });
    };

    const deleteImg = () => {
        setImgEdit("");
    }

    const back = () => {
        confirm({
            title: 'Ba??n mu????n tr???? v???? trang danh sa??ch voucher?',
            okText: 'Tr???? v????',
            okType: 'danger',
            cancelText: 'Kh??ng',
            onOk() {
                if (link !== "") {
                    const del = storage.ref(`Voucher_img/${imageName.name}`);
                    del.delete().then((res) => {
                        localStorage.removeItem("voucherID");
                        history.push('/danh-sach-voucher');
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    localStorage.removeItem("voucherID");
                    history.push('/danh-sach-voucher');
                }

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const editvoucher = (values) => {
        if (datestart !== "" && dateEnd !== "") {
            values["ngaybd"] = moment(datestart).format('YYYY-MM-DD');
            values["ngaykt"] = moment(dateEnd).format('YYYY-MM-DD');
        } else {
            if(datestart !== "") {
                values["ngaybd"] = moment(datestart).format('YYYY-MM-DD');
                values["ngaykt"] = moment(voucherID.ngaykt).format('YYYY-MM-DD');
            } else if(dateEnd !== "") {
                values["ngaybd"] = moment(voucherID.ngaybd).format('YYYY-MM-DD');
                values["ngaykt"] = moment(dateEnd).format('YYYY-MM-DD');
            } else {
                values["ngaybd"] = moment(voucherID.ngaybd).format('YYYY-MM-DD');
                values["ngaykt"] = moment(voucherID.ngaykt).format('YYYY-MM-DD');
            }
        }
        values["trangthai"] = title;
        if (imageName !== "") {
            values['imgName'] = imageName.name;
        } else {
            values['imgName'] = voucherID.tenhinh;
        }
        if (link !== "") {
            values['img'] = link;
        } else {
            values['img'] = voucherID.hinh;
        }
        console.log(values);
        voucher.updateVoucher(values, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                if (link !== "") {
                    const del = storage.ref(`Voucher_img/${voucherID.tenhinh}`);
                    del.delete().then((res) => {
                        message.success("??a?? xo??a a??nh!");
                    }).catch((error) => {
                        console.log(error);
                    });
                }
                setTimeout(() => {
                    history.push('/danh-sach-voucher');
                }, 1000)
            } else
                message.error(res.data.message);
        })
            .catch(err => {
                message.error(`${err.response.data.message}`);
            });
    };

    const [datePickers, setDatePickers] = useState(false);
    const changeDate = () => {
        if (datestart !== "" || dateEnd !== "") {
            setDatestart("");
            setDateEnd("");
        }
        setDatePickers(!datePickers);
    };

    return (
        <>
            <div className="form-wrapper">
                <h2 style={{ textAlign: 'center' }}> Chi??nh s????a th??ng tin voucher</h2>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={editvoucher}
                    scrollToFirstError
                    initialValues={{
                        makm: `${voucherID.makm}`,
                        tenkm: `${voucherID.tenkm}`,
                        voucher: `${voucherID.voucher}`,
                        dieukien: `${voucherID.dieukien}`,
                        giagiam: `${voucherID.giagiam}`,
                        ghichu: `${voucherID.ghichu}`,
                        hinh: `${voucherID.hinh}`,
                        soluong: `${voucherID.soluong}`,
                    }}
                >
                    <Form.Item
                        name="makm"
                        label="M?? khuy????n ma??i"
                        rules={[
                            {
                                type: 'string',
                                message: 'M?? khuy????n ma??i kh??ng ???????c ????? tr???ng!',
                            },
                            {
                                //required: true,
                                message: '??i???n m?? khuy????n ma??i',
                            },
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        name="tenkm"
                        label="T??n khuy????n ma??i"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng nh???p t??n khuy????n ma??i!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="voucher"
                        label="M?? Voucher"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng nh???p m?? Voucher!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="dieukien"
                        label="??i????u ki????n"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng nh???p ??i????u ki????n !',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="giagiam"
                        label="Gi?? gi???m"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng nh???p gi?? ???????c gi???m!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="soluong"
                        label="S??? l?????ng"
                        
                    >
                        <InputNumber min="1" max="200"/>
                    </Form.Item>
                    <Form.Item
                        name="ghichu"
                        label="Ghi ch??"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng nh???p ghi ch?? cho khuy???n m??i n??y !',
                            },
                        ]}
                    >
                        <TextArea rows={3} />
                    </Form.Item>
                    <Form.Item
                        name="hinh"
                        label="A??nh sa??n ph????m"
                        rules={[{ required: false }]}
                    >
                        <Row>
                            <Col>
                                {link !== "" ? (
                                    <Image src={link} width={120} />
                                ) : (ImgEdit === "" ? (<span>Ch??a co?? a??nh sa??n ph????m !</span>) : (<Image src={ImgEdit} width={120} />))}

                            </Col>
                            <Col className="del-img">{link !== "" ? ("") : (ImgEdit === "" ? ("") : (<Button onClick={deleteImg} type="primary" danger><DeleteOutlined /></Button>))}</Col>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        name=" "
                        label="Up load a??nh m????i"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}

                    >
                        <Upload
                            listType="picture"

                            name=' '
                            multiple='true'
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            onRemove={onRemove}
                            fileList
                        >
                            {link !== "" || ImgEdit !== "" ? (
                                <Button disabled icon={<UploadOutlined />} >Ta??i a??nh l??n</Button>
                            ) : (<Button icon={<UploadOutlined />} >Ta??i a??nh l??n</Button>)}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Nga??y b????t ??????u"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng cho??n nga??y b????t ??????u!',
                            },
                        ]}
                    >
                        {datePickers === false ? (<span>{moment(voucherID.ngaybd).format('DD/MM/YYYY')}</span>) : (<DatePicker onChange={startChange} />)}
                        <Button type="primary" onClick={changeDate} style={{ marginLeft: 10 }}>??????i</Button>
                    </Form.Item>
                    <Form.Item
                        label="Nga??y k????t thu??c"
                        rules={[
                            {
                                required: true,
                                message: 'Vui l??ng cho??n nga??y k???t thu??c!',
                            },
                        ]}
                    >
                        {datePickers === false ? (<span>{moment(voucherID.ngaykt).format('DD/MM/YYYY')}</span>) : (<DatePicker onChange={endChange} />)}
                    </Form.Item>
                    {/* <Form.Item
                        label="Tra??ng tha??i"
                    >
                        <Radio.Group onChange={selectTitle} value={title}>
                            <Radio value={1}>Hi????n</Radio>
                            <Radio value={0}>????n</Radio>
                        </Radio.Group>
                    </Form.Item> */}
                    <Form.Item {...tailFormItemLayout}>
                        <Button className="ant-btn ant-btn-dashed" onClick={back} style={{ marginLeft: -30 }}>
                            Tr???? v????
                        </Button>
                        {
                            link === "" && ImgEdit === "" ? (
                                <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }} disabled>X??c nh???n</Button>
                            ) : (
                                <Button type="primary" htmlType="submit" style={{ marginLeft: 30 }}>X??c nh???n</Button>
                            )
                        }
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default EditVoucher;
