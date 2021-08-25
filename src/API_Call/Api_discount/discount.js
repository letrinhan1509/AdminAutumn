import AxiosDiscount from "./AxiosDiscount"

const discount = {
    getAll: () => {
        const url = "/";
        return AxiosDiscount.get(url);
    },
    //(Danh sách tất cả các khuyến mãi theo sản phẩm)
    getAllSale: () => {
        const url = "/san-pham";
        return AxiosDiscount.get(url);
    },
    //(Danh sách tất cả các khuyến mãi là voucher)
    getAllVoucher: () => {
        const url = "/voucher";
        return AxiosDiscount.get(url);
    },
    //(Chi tiết của 1 khuyến mãi theo mã khuyến mãi)
    getSaleID: (id, token) => {
        const url = `/${id}`;
        return AxiosDiscount.get(url, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Chi tiết của 1 voucher theo mã voucher)
    getVoucherID: (id, token) => {
        const url = `/voucher/${id}`;
        return AxiosDiscount.get(url, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Thêm 1 khuyến mãi theo sản phẩm)
    addSale: (values, token) => {
        const url = "/san-pham";
        return AxiosDiscount.post(url ,values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Thêm 1 khuyến mãi là voucher)
    addVoucher: (values, token) => {
        const url = "/voucher";
        return AxiosDiscount.post(url ,values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Cập nhật chương trình khuyến mãi theo sản phẩm)
    updateSale: (values, token) => {
        const url = "/san-pham";
        return AxiosDiscount.put(url ,values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Cập nhật chương trình khuyến mãi là voucher)
    updateVoucher: (values, token) => {
        const url = "/voucher";
        return AxiosDiscount.put(url ,values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Cập nhật trạng thái chương trình khuyến mãi)
    updateStatus: (values, token) => {
        const url = "/";
        return AxiosDiscount.put(url ,values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Xoá chương trình khuyến mãi theo sản phẩm)
    deleteSale: (id, token) => {
        const url = `/${id}`;
        return AxiosDiscount.delete(url, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Xoá khuyến mãi voucher)
    deleteVoucher: (id, token) => {
        const url = `/${id}`;
        return AxiosDiscount.delete(url, {
            headers: {
                Token: `${token}`,
            },
        });
    },
};

export default discount;