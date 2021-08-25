import AxiosProduct from "./AxiosProduct"

const product = {
    getAll: () => {
        const url = "/";
        return AxiosProduct.get(url);
    },
    //(Sản phẩm theo id)
    getid: (id) => {
        const url = `/${id}`;
        return AxiosProduct.get(url);
    },
    //(DSách sản phẩm theo mã loại)
    getLoai: (id) => {
        const url = `/loai/${id}`;
        return AxiosProduct.get(url);
    },
    //(DSách sản phẩm theo mã danh mục)
    getDM: (id) => {
        const url = `/danh-muc/${id}`;
        return AxiosProduct.get(url);
    },
    //(DSách sản phẩm theo mã nhà sản xuất)
    getNSX: (id) => {
        const url = `/nha-san-xuat/${id}`;
        return AxiosProduct.get(url);
    },
    addproduct: (values, token) => {
        const url = "/";
        return AxiosProduct.post(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    updatePro: (values, token) => {
        const url = "/cap-nhat-san-pham";
        return AxiosProduct.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    updateStatus: (values, token) => {
        const url = "/cap-nhat-trang-thai";
        return AxiosProduct.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    deletePro: (id, token) => {
        const url = `/${id}`;
        return AxiosProduct.delete(url, {
            headers: {
                Token: `${token}`,
            },
        });
    },
};

export default product;