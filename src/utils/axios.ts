import Axios, { AxiosInstance } from 'axios';

const BOOKING_APP_BASE_URL = process.env.NEXT_PUBLIC_BOOKING_APP_BASE_URL as string;
const USER_PROFILE_BASE_URL = process.env.NEXT_PUBLIC_USER_PROFILE_BASE_URL as string;



export const BookingAppAxios = Axios.create({
    baseURL: BOOKING_APP_BASE_URL,
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const UserProfileAxios = Axios.create({
    baseURL: USER_PROFILE_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const setAxiosDefaultToken = (token: string, Instance: AxiosInstance) => {
    Instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const deleteAxiosDefaultToken = (Instance: AxiosInstance) => {
    delete Instance.defaults.headers.common.Authorization;
};
