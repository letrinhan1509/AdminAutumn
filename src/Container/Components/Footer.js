import { Row, Divider } from 'antd';
import { Footer } from 'antd/lib/layout/layout';
import React from 'react';
import "../Components/scss/Footer.scss"

const footer = () => {
    return (
        <Footer className="footer" >
            <Divider className="driver" />
            <Row> 
                <p>
                    Autumn Shop - Địa chỉ: 180 Cao Lỗ, Phường 4, Quận 8, Tp.HCM
                </p>
            </Row>


        </Footer>
    );

};
export default footer;