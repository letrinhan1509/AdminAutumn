import AxiosSize from "./AxiosSize"

const size = {
    getAllSize: (token) => {
        const url = "/";
        return AxiosSize.get(url, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Size theo id)
    getSizeId: (id, token) => {
        const url = `/${id}`;
        return AxiosSize.get(url, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    addSize: (values, token) => {
        const url = "/";
        return AxiosSize.post(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    updateSize: (values, token) => {
        const url = "/";
        return AxiosSize.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    deleteSize: (id, token) => {
        const url = `/${id}`;
        return AxiosSize.delete(url, {
            headers: {
                Token: `${token}`,
            },
        });
    }
};

export default size;