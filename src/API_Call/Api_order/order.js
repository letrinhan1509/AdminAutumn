import AxiosOrder from "./AxiosOrder"

const order = {
    getAll: () => {
        const url = "/";
        return AxiosOrder.get(url);
    },
    //(Chi tiết 1 đơn hàng theo mã đơn hàng)
    getOrderID: (id) => {
        const url = `/${id}`;
        return AxiosOrder.get(url);
    },
    //(Danh sách chi tiết của 1 đơn hàng theo mã đơn hàng)
    getDetailID: (id) => {
        const url = `/${id}/chi-tiet-dhang`;
        return AxiosOrder.get(url);
    },
    //(Danh sách đơn hàng theo mã khách hàng)
    getUserID: (id) => {
        const url = `/khach-hang/${id}`;
        return AxiosOrder.get(url);
    },
    // Tạo đơn hàng GHN:
    createOrderGHN: (values, token) => {
        const url = "/GHN/create";
        return AxiosOrder.post(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Thống kê đơn hàng)
    getStatistical_Oder: (values, token) => {
        const url = `/thong-ke-don-hang`;
        return AxiosOrder.post(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Cập nhật trạng thái đơn hàng)
    updateStatus: (values, token) => {
        const url = "/";
        return AxiosOrder.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Huỷ đơn hàng)
    cancelOrder: (id, token) => {
        const url = `/${id}`;
        return AxiosOrder.delete(url, {
            headers: {
                Token: `${token}`,
            },
        });
    },
};

export default order;