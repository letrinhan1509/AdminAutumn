import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Input, Button, message, Select, DatePicker } from 'antd';
import Meta from "antd/lib/card/Meta";
import { Link, useHistory } from "react-router-dom";
import "Container/scss/addpro.scss";
import orders from 'API_Call/Api_order/order';
import admin from 'API_Call/Api_admin/admin';
import moment from 'moment';

const { TextArea } = Input;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 22,
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
const ListOrder = (props) => {
    const token = localStorage.getItem("token");
    const [form] = Form.useForm();
    const history = useHistory();
    const { Option } = Select;
    const ORDER = JSON.parse(localStorage.getItem("order"));

    const back = () => {
        localStorage.removeItem("order");
    }


    const [dateEnd, setDateEnd] = useState("");
    function endChange(date) {
        if(ORDER !== null){
            setDateEnd(date._d);
        }
    }
    /* const [select, setSelect] = useState("");
    function titleChange(e) {
        setSelect(e);
    } */
    const [title, setTitle] = useState([]);
    useEffect(() => {
        admin.getTitle(token).then((res) => {
            if (res.data.status === "Success") {
                setTitle(res.data.data);
            }
        })
    }, [])
    const update = (values) => {
        if (dateEnd.length === 0) {
            values["ngaygiao"] = "";
        } else {
            values["ngaygiao"] = moment(dateEnd).format('YYYY-MM-DD');
        }
        values["madonhang"] = ORDER.madonhang;
        console.log(values);
        orders.updateStatus(values, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                localStorage.removeItem("order");
                setTimeout(() => {
                    history.push('/danh-sach-don-hang');
                }, 2000)
            }
        })
        .catch(err => {
                message.error(`${err.response.data.message}\n C???p nh???t ????n ha??ng th???t b???i! `);
        })
    };
    const cancel = (values) => {
        let id = ORDER.madonhang;
        console.log(id);
        orders.cancelOrder(id, token).then((res) => {
            if (res.data.status === "Success") {
                message.success(res.data.message)
                localStorage.removeItem("order");
                setTimeout(() => {
                    history.push('/danh-sach-don-hang');
                }, 2000)
            }
        })
        .catch(err => {
                message.error(`${err.response.data.message}\n C???p nh???t ????n ha??ng th???t b???i! `);
        })
    };

    return (
        <div className="wrapper" >
            <Form
                {...formItemLayout}
                form={form}
                name="update"
                onFinish={update}
                scrollToFirstError
                className="register-form"
                initialValues={ORDER === null ? ("") : (
                    {
                        trangthai: `${ORDER.tentt}`,
                    }
                )}
            >
                <Form.Item >
                    <div className="btn-box-edit">                        
                        <Button onClick={back} className="pay" type="primary">
                            <Link to="/danh-sach-don-hang">Tr??? v???</Link>
                        </Button>
                        {ORDER.trangthai == 4 ? ("") : (
                            <>
                                <Button className="pay" value="submit" type="primary" htmlType="submit">
                                    C????p nh????t
                                </Button>
                                <Button className="pays" onClick={cancel} type="danger">
                                    Hu??? ????n
                                </Button>
                            </>
                        )}
                    </div>
                </Form.Item>
                <Row className="box">
                    <Col className="col-one">
                        <h1>S????a tra??ng tha??i ????n ha??ng</h1>
                        <ul>
                            {/* <li>Ma?? Kha??ch ha??ng: {ORDER.makh}</li> */}
                            <li><span>M?? ????n h??ng: </span>{ORDER.madonhang}</li>
                            <li><span>T??n kha??ch ha??ng: </span>{ORDER.tenkh}</li>
                            <li><span>??i????n thoa??i: </span>{ORDER.sodienthoai}</li>
                            <li><span>Email: </span>{ORDER.email}</li>
                            <li><span>??i??a chi??: </span>{ORDER.diachi}</li>
                            <li><span>Hi??nh th????c thanh toa??n: </span>{ORDER.hinhthuc}</li>
                            {ORDER.ghichu === "" ? ("") : (<li><span>Ghi chu??: </span>{ORDER.ghichu}</li>)}
                            {/* {ORDER.makm === null ? ("") : (<li><span>M?? khuy???n m??i: </span>{ORDER.makm}</li>)} */}
                            <li><span>Nga??y ??????t: </span>{moment(ORDER.ngaydat).format('DD/MM/YYYY')}</li>
                            <li><span>Nga??y giao: </span><DatePicker onChange={endChange} /></li>
                            <li><span>Phi?? v????n chuy????n: </span>{ORDER.tienship}</li>
                            <li><span>T????ng ho??a ????n: </span>{ORDER.tongtien}</li>
                            {ORDER.ngaygiao === null ? ("") : (<li><span>Nga??y giao h??ng: </span></li>)}
                            <li>
                                <Form.Item
                                    name="trangthai"
                                    id="trangthai"
                                    label="Tr???ng th??i ????n h??ng: "
                                >
                                    {ORDER.trangthai === 4 ? (
                                        <Select disabled className="tentt" style={{ width: 300 }}>
                                            {title.map((item) => {
                                                return (
                                                    <>
                                                        <Option className="tentt" value={item.trangthai}>{item.tentt}</Option>
                                                    </>
                                                )
                                            })}
                                        </Select>
                                    ) : (
                                        <Select className="tentt" style={{ width: 300 }}>
                                            {title.map((item) => {
                                                return (
                                                    <>
                                                        <Option className="tentt" value={item.trangthai}>{item.tentt}</Option>
                                                    </>
                                                )
                                            })}
                                        </Select>
                                    )}
                                    
                                </Form.Item>
                            </li>
                        </ul>
                    </Col>
                    <Col className="col-two">
                        <h3>Chi ti????t ????n ha??ng</h3>
                        <ul>
                            {ORDER.chitietDH.map((item) => (
                                <li className="number">
                                    <ul>
                                        <li><span>T??n sa??n ph????m: </span>{item.tensp}</li>
                                        <li><span>S???? l??????ng: </span>{item.soluong}</li>
                                        <li><span>Gia??: </span>{item.gia}??</li>
                                        {Number(item.giagiam) === 0 ? ("") : (<li><span>Gia??m gia??: </span>{item.giagiam}</li>)}
                                        <li><span>Tha??nh ti????n: </span>{item.thanhtien}??</li>
                                    </ul>
                                </li>
                            ))}
                        </ul>

                    </Col>
                </Row>
                
            </Form>
        </div>
    );
}

export default ListOrder;
