import AxiosUser from "./AxiosUser";

const user = {
    getAll: (token) => {
        const url = '/';
        return AxiosUser.get(url, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    getID: (id) => {
        const url = `/${id}`;
        return AxiosUser.get(url);
    },
    register: (values) => {
        const url = "/dang-ky";
        return AxiosUser.post(url, values);
    },
    login: (values) => {
        const url = "/dang-nhap";
        return AxiosUser.post(url, values);
    },
    changePass: (values) => {
        const url = "/doi-mat-khau";
        return AxiosUser.post(url, values);
    },
    forgotPass: (values) => {
        const url = "/quen-mat-khau";
        return AxiosUser.post(url, values);
    },
    updateInfo: (values) => {
        const url = "/cap-nhat-tai-khoan";
        return AxiosUser.put(url, values);
    },
    updateStatus: (values, token) => {
        const url = "/cap-nhat-trang-thai";
        return AxiosUser.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    delete_Customer: (id, token) => {
        const url = `/${id}`;
        return AxiosUser.delete(url, {
            headers: {
                Token: `${token}`,
            },
        });
    },
};

export default user;