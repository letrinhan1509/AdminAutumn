import AxiosCity from "./AxiosCity";

const city = {
    //(Danh sách tất cả Tỉnh/Thành phố)
    getAll: () => {
        const url = '/city';
        return AxiosCity.get(url);
    },
    getAll_pickShiftGHN: () => {
        const url = "/ca-lay-hang-GHN";
        return AxiosCity.get(url);
    },
    //(Chi tiết 1 thành phố theo ID)
    getCityID: (id) => {
        const url = `/city/${id}`;
        return AxiosCity.get(url);
    },
    getAll_ServiceGHN: (id) => {
        const url = `/dich-vu-GHN/${id}`;
        return AxiosCity.get(url);
    },
    //(Danh sách toàn bộ Quận/Huyện thuộc 1 Tỉnh/Thành phố)
    getCityDistrict: (id) => {
        const url = `/city/${id}/district`;
        return AxiosCity.get(url);
    },
    //(Chi tiết 1 Quận/Huyện theo ID)
    getDistrictID: (id) => {
        const url = `/district/${id}`;
        return AxiosCity.get(url);
    },
    //(Danh sách toàn bộ Phường/Xã thuộc 1 Quận/Huyện)
    getDistrictWard: (id) => {
        const url = `/district/${id}/ward`;
        return AxiosCity.get(url);
    },
    //(Chi tiết 1 Phường/Xã theo ID)
    getWardID: (id) => {
        const url = `/ward/${id}`;
        return AxiosCity.get(url);
    },
    //(Thống kê Dashboard)
    getStatistical: (token) => {
        const url = `/thong-ke`;
        return AxiosCity.get(url, {
            headers: {
                Token: `${token}`,
            },
        });
    }
};

export default city;