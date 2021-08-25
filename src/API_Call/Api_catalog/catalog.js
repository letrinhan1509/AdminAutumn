import AxiosCatalog from "./AxiosCatalog"

const catalog = {
    getAll: () => {
        const url = "/";
        return AxiosCatalog.get(url);
    },
    //(Chi tiết 1 danh mục theo mã danh mục)
    getDanhmucID: (id) => {
        const url = `/${id}`;
        return AxiosCatalog.get(url);
    },
    //(Danh sách tất cả loại)
    getAllType: () => {
        const url = "/loai";
        return AxiosCatalog.get(url);
    },
    //(Tất cả loại sphẩm theo mã danh mục)
    getTypeDanhmucID: (id) => {
        const url = `/${id}/loai`;
        return AxiosCatalog.get(url);
    },
    //(Chi tiết 1 loại theo mã loại)
    getTypeID: (id) => {
        const url = `/loai/${id}`;
        return AxiosCatalog.get(url);
    },
    //(Thêm mới 1 danh mục sp)
    addCatalog: (values, token) => {
        const url = "/";
        return AxiosCatalog.post(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Thêm mới 1 loại sp)
    addProtype: (values, token) => {
        const url = "/loai";
        return AxiosCatalog.post(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Cập nhật thông tin danh mục theo mã danh mục)
    updateCatalog: (values, token) => {
        const url = "/";
        return AxiosCatalog.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Cập nhật thông tin loại theo mã loại)
    updateProtype: (values, token) => {
        const url = "/loai";
        return AxiosCatalog.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Cập nhật trạng thái loại theo mã loại)
    updateStatusType: (values, token) => {
        const url = "/cap-nhat-trang-thai-loai";
        return AxiosCatalog.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Cập nhật trạng thái danh mục theo mã danh mục)
    updateStatusCata: (values, token) => {
        const url = "/cap-nhat-trang-thai";
        return AxiosCatalog.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Xoá loại sản phẩm theo id)
    deleteProtype: (id, token) => {
        const url = `/loai/${id}`;
        return AxiosCatalog.delete(url, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Xoá danh mục sản phẩm theo id)
    deleteCatalog: (id, token) => {
        const url = `/${id}`;
        return AxiosCatalog.delete(url, {
            headers: {
                Token: `${token}`,
            },
        });
    }
};

export default catalog;