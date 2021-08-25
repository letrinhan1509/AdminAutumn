import AxiosComment from "./AxiosComment"

const comment = {
    getAll: () => {
        const url = "/";
        return AxiosComment.get(url);
    },
    //(Chi tiết 1 bình luận theo mã bình luận)
    getid: (id) => {
        const url = `/${id}`;
        return AxiosComment.get(url);
    },
    //(Tất cả bình luận theo mã sản phẩm)
    getProductID: (id) => {
        const url = `/san-pham/${id}`;
        return AxiosComment.get(url);
    },
    //(Tất cả bình luận theo mã khách hàng)
    getUserID: (id) => {
        const url = `/khach-hang/${id}`;
        return AxiosComment.get(url);
    },
    //(Tất cả chi tiết bình luận theo mã bình luận)
    getDetailID: (id) => {
        const url = `/${id}/chi-tiet-bluan`;
        return AxiosComment.get(url);
    },
    //(Thêm mới 1 bình luận)
    addComment: (values, token) => {
        const url = "/";
        return AxiosComment.post(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Trả lời 1 bình luận đã có sẵn)
    replyComment: (values, token) => {
        const url = "/tra-loi/admin";
        return AxiosComment.post(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Chỉnh sửa nội dung chi tiết(trả lời) bình luận theo mã chitietbl)
    updateDeComment: (values, token) => {
        const url = "/cap-nhat-tra-loi/admin";
        return AxiosComment.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Cập nhật trạng thái 1 bình luận theo mabl ẩn hoặc hiện)
    hideCommet: (values, token) => {
        const url = "/cap-nhat-trang-thai";
        return AxiosComment.put(url, values, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Xoá 1 bình luận theo mabl)
    deleteCommentID: (id, token) => {
        const url = `/${id}`;
        return AxiosComment.delete(url, {
            headers: {
                Token: `${token}`,
            },
        });
    },
    //(Xoá 1 chi tiết(trả lời) bình luận theo mã chitietbl)
    deleteCommentDe: (id, token) => {
        const url = `/xoa-tra-loi/admin/${id}`;
        return AxiosComment.delete(url, {
            headers: {
                Token: `${token}`,
            },
        });
    }
};

export default comment;