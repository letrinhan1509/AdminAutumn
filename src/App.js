import './App.css';
import "antd/dist/antd.css";
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Col, Row } from "antd";
import Layout from "antd/lib/layout/layout";
import Content from 'antd/lib/layout/layout';
import Login from "./Container/UserPage/Login";
import HeaderPage from "./Container/Components/Header";
import Dashboard from "./Container/MainPage/Dashboard";
import Statis from "./Container/MainPage/Statis";
import Navigation from "./Container/Components/Navigation";
import Footer from "./Container/Components/Footer";
import ListUserKH from "./Container/UserPage/listUserKH";
import ListUserAdmin from "./Container/UserPage/listUserAdmin";
import EditAdmin from "./Container/UserPage/editAdmin";
import AddNVien from "./Container/UserPage/addNVien";
import AddProduct from "./Container/ProductPage/AddProduct";
import AllProduct from "./Container/ProductPage/AllProduct";
import DetailProduct from "./Container/ProductPage/DetailProduct";
import AddProductType from "./Container/ProtypePage/AddProductType";
import AddProducer from "./Container/ProducerPage/AddProducer";
import AddCategory from "./Container/CatalogPage/AddCategory";
import AddVoucher from "./Container/VoucherPage/AddVoucher";
import ListProductType from "./Container/ProtypePage/ListProductType";
import EditProductType from "./Container/ProtypePage/EditProductType";
import ListCatalog from "./Container/CatalogPage/listCatalog";
import ListProducer from "./Container/ProducerPage/listProducer";
import EditProducer from "./Container/ProducerPage/editProducer";
import EditCatalog from "./Container/CatalogPage/editCategory";
import ListComment from "./Container/CommentPage/listComment";
import Reply from "./Container/CommentPage/Reply";
import DetailComment from "./Container/CommentPage/DetailComment";
import EditProduct from "./Container/ProductPage/editProduct";
import ListOrder from "./Container/OrderPage/listOrder";
import OrderDetail from "./Container/OrderPage/OrderDetail";
import EditOrder from "./Container/OrderPage/editOrder";
import ListVoucher from "./Container/VoucherPage/listVoucher";
import EditVoucher from "./Container/VoucherPage/EditVoucher";
import DetailVoucher from "./Container/VoucherPage/DetailVoucher";
import ListSale from "./Container/SalePage/listSale";
import AddSale from "./Container/SalePage/AddSale";
import EditSale from "./Container/SalePage/EditSale";
import DetailSale from "./Container/SalePage/DetailSale";
import AccountInfo from "./Container/AccountPage/AccountInfo";
import EditAccount from "./Container/AccountPage/EditAccount";
import ChangePass from "./Container/AccountPage/ChangePass";
import ListSize from "./Container/SizePage/ListSize";
import AddSize from "./Container/SizePage/AddSize";
import EditSize from "./Container/SizePage/EditSize";
import ListStatusOrder from "./Container/StatusOrderPage/listStatusOrder";
import AddStatus from "./Container/StatusOrderPage/AddStatus";
import EditStatus from "./Container/StatusOrderPage/EditStatus";

function App() {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      localStorage.getItem('user') !== null
        ? <Dashboard />
        : <Login />
      /* ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} /> */
    )} />
  )
  const [kqToken, setKqToken] = useState([]);
  const TokenData = function (data) {
    setKqToken(data);
  }
  const [isAuth, setIsAuth] = useState(true);
  //localStorage.getItem('user') === null ? setIsAuth(false) : setIsAuth(true)
  const admin = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      {admin === null ? (
        <Layout>
          <Content className="login-box">
            <Router path="/dang-nhap">
              <Login />
            </Router>
          </Content>
        </Layout>
      ) : (
        admin.permission === "NVGH" ? (
          <>
            <Router>
              <Layout>
                <HeaderPage />
                <Row className="content-box" style={{ minHeight: 800 }, { marginTop: 64 }}>
                  <Col className="aa" offset={2} span={18} push={1} width={'100%'}>
                    <Content className="content-wrapper">
                      <Route exact path="/">
                        <Redirect to="/danh-sach-don-hang" />
                      </Route>
                      <Route exact path="/danh-sach-don-hang">
                        <ListOrder />
                      </Route>
                      <Route exact path="/danh-sach-don-hang/chi-tiet">
                        <OrderDetail />
                      </Route>
                    </Content>
                  </Col>
                </Row>
                <Footer />
              </Layout>
            </Router>
          </>
        ) : (<Router>
          <Layout>
            <HeaderPage />
            <Row className="content-box" style={{ minHeight: 900 }, { marginTop: 64 }}>
              <Col>
                <Navigation />
              </Col>
              <Col className="aa" span={18} push={1} width={'100%'}>
                <Content className="content-wrapper">
                  <Route exact path="/">
                    <Dashboard />
                  </Route>
                  <Route exact path="/danh-sach-thong-ke">
                    <Statis />
                  </Route>
                  <Route exact path="/danh-sach-khach-hang">
                    <ListUserKH />
                  </Route>
                  <Route exact path="/danh-sach-admin">
                    <ListUserAdmin />
                  </Route>
                  <Route exact path="/them-nhan-vien">
                    <AddNVien />
                  </Route>
                  <Route exact path="/danh-sach-admin/sua-thong-tin-tai-khoan">
                    <EditAdmin />
                  </Route>
                  <Route exact path="/them-san-pham">
                    <AddProduct />
                  </Route>
                  <Route exact path="/tat-ca-san-pham">
                    <AllProduct />
                  </Route>
                  <Route exact path="/tat-ca-san-pham/sua-san-pham">
                    <EditProduct />
                  </Route>
                  <Route exact path="/tat-ca-san-pham/chi-tiet">
                    <DetailProduct />
                  </Route>
                  <Route exact path="/danh-sach-loai">
                    <ListProductType />
                  </Route>
                  <Route exact path="/them-loai-san-pham">
                    <AddProductType />
                  </Route>
                  <Route exact path="/danh-sach-loai/sua-loai">
                    <EditProductType />
                  </Route>
                  <Route exact path="/them-nha-san-xuat">
                    <AddProducer />
                  </Route>
                  <Route exact path="/danh-sach-nha-sx">
                    <ListProducer />
                  </Route>
                  <Route exact path="/danh-sach-nha-sx/sua-nha-sx">
                    <EditProducer />
                  </Route>
                  <Route exact path="/them-danh-muc">
                    <AddCategory />
                  </Route>
                  <Route exact path="/danh-muc-san-pham">
                    <ListCatalog />
                  </Route>
                  <Route exact path="/danh-muc-san-pham/sua-danh-muc">
                    <EditCatalog />
                  </Route>
                  <Route exact path="/them-khuyen-mai">
                    <AddSale />
                  </Route>
                  <Route exact path="/danh-sach-khuyen-mai">
                    <ListSale />
                  </Route>
                  <Route exact path="/danh-sach-khuyen-mai/sua-khuyen-mai">
                    <EditSale />
                  </Route>
                  <Route exact path="/danh-sach-khuyen-mai/chi-tiet">
                    <DetailSale />
                  </Route>
                  <Route exact path="/them-voucher">
                    <AddVoucher />
                  </Route>
                  <Route exact path="/danh-sach-binh-luan">
                    <ListComment />
                  </Route>
                  <Route exact path="/danh-sach-binh-luan/phan-hoi">
                    <Reply />
                  </Route>
                  <Route exact path="/danh-sach-binh-luan/chi-tiet">
                    <DetailComment />
                  </Route>
                  <Route exact path="/danh-sach-don-hang">
                    <ListOrder />
                  </Route>
                  <Route exact path="/danh-sach-don-hang/sua-don-hang">
                    <EditOrder />
                  </Route>
                  <Route exact path="/danh-sach-don-hang/chi-tiet">
                    <OrderDetail />
                  </Route>
                  <Route exact path="/danh-sach-voucher">
                    <ListVoucher />
                  </Route>
                  <Route exact path="/danh-sach-voucher/sua-voucher">
                    <EditVoucher />
                  </Route>
                  <Route exact path="/danh-sach-voucher/chi-tiet">
                    <DetailVoucher />
                  </Route>
                  <Route exact path="/tai-khoan">
                    <AccountInfo />
                  </Route>
                  <Route exact path="/tai-khoan/chinh-sua-tai-khoan">
                    <EditAccount />
                  </Route>
                  <Route exact path="/tai-khoan/doi-mat-khau">
                    <ChangePass />
                  </Route>
                  <Route exact path="/bang-size">
                    <ListSize />
                  </Route>
                  <Route exact path="/bang-size/them-size">
                    <AddSize />
                  </Route>
                  <Route exact path="/bang-size/sua-size">
                    <EditSize />
                  </Route>
                  <Route exact path="/danh-sach-trang-thai">
                    <ListStatusOrder />
                  </Route>
                  <Route exact path="/danh-sach-trang-thai/them-trang-thai">
                    <AddStatus />
                  </Route>
                  <Route exact path="/danh-sach-trang-thai/sua-trang-thai">
                    <EditStatus />
                  </Route>
                </Content>
              </Col>
            </Row>
            <Footer />
          </Layout>
        </Router>)

      )}
    </>
  );
}



export default App;