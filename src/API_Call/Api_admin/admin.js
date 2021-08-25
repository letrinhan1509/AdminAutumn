import AxiosAdmin from "./AxiosAdmin"

const admin = {
    getAll: (token) => {
        const url = "/";
        return AxiosAdmin.get(url, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    /* getAlls: (token) => {
        const url = "/";
        return AxiosAdmin.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }, */
    getID: (id) => {
        const url = `/${id}`;
        return AxiosAdmin.get(url);
    },
    getTitle: (token) => {
        const url = "/trang-thai-don-hang";
        return AxiosAdmin.get(url, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    getTitleID: (id) => {
        const url = `/trang-thai-don-hang/${id}`;
        return AxiosAdmin.get(url);
    },
    //thêm trạng thái đơn hàng
    addSTTorder: (values, token) => {
        const url = "/trang-thai-don-hang";
        return AxiosAdmin.post(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    register: (values, token) => {
        const url = "/";
        return AxiosAdmin.post(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    login: (values) => {
        const url = "/dev-dang-nhap";
        return AxiosAdmin.post(url, values);
    },
    updateInfo: (values, token) => {
        const url = "/";
        return AxiosAdmin.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    updateStatus: (values, token) => {
        const url = "/cap-nhat-trang-thai";
        return AxiosAdmin.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    updateSTTorder: (values, token) => {
        const url = "/trang-thai-don-hang";
        return AxiosAdmin.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    updatePassword: (values, token) => {
        const url = "/doi-mat-khau";
        return AxiosAdmin.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    deleteAdmin: (id, token) => {
        const url = `/${id}`;
        return AxiosAdmin.delete(url, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    deleteStatusOrder: (id, token) => {
        const url = `/trang-thai-don-hang/${id}`;
        return AxiosAdmin.delete(url, {
            headers: {
                Token: `${token}`,
            },
        });
    }
};

export default admin;