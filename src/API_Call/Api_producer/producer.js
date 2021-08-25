import AxiosProducer from "./AxiosProducer"

const producer = {
    getAll: () => {
        const url = "/";
        return AxiosProducer.get(url);
    },
    //(Nhà sản xuất theo id)
    getid: (id) => {
        const url = `/${id}`;
        return AxiosProducer.get(url);
    },
    //(Thêm mới 1 nhà sản xuất)
    addProducer: (values, token) => {
        const url = "/";
        return AxiosProducer.post(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Cập nhật thông tin nhà sản xuất theo id)
    updateProducer: (values, token) => {
        const url = "/";
        return AxiosProducer.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Cập nhật trạng thái nhà sản xuất theo id)
    updateStatus: (values, token) => {
        const url = `/cap-nhat-trang-thai`;
        return AxiosProducer.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Xoá 1 nhà sản xuất theo id)
    deleteProducer: (id, token) => {
        const url = `/${id}`;
        return AxiosProducer.delete(url, {
            headers: {
                Token: `${token}`,
            },
        });
    },
};

export default producer;