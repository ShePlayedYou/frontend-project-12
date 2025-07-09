import axios from 'axios';
import routes from '../routes.js';
import { toast } from 'react-toastify';

export const removeChannel = async (channel, t) => {
    const token = localStorage.getItem('token');
    try {
        const response = axios.delete(routes.removeChannel(channel.id), {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    toast.success(t('toasterMessages.removeChannel'));
    return response;
    } catch (err) {
        if (err.code === "ERR_NETWORK") {
            toast.error(t('toasterMessages.networkError'));
        }
  }
};
