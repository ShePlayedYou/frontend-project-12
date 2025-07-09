import axios from 'axios';
import routes from '../routes.js';
import { toast } from 'react-toastify';


export const sendMessage = async (message, t) => {
  const token = localStorage.getItem('token');
  
  try {
          await axios.post(routes.sendMessage(), message, {
              headers: {
                  'Authorization': `Bearer ${token}`,
          },
      });
  } catch (err) {
    if (err.code === "ERR_NETWORK") {
      toast.error(t('toasterMessages.networkError'));
      setTimeout(async () => {
        try {
          await axios.post(routes.sendMessage(), message, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        } catch (retryErr) {
        if (retryErr.code === "ERR_NETWORK") {
            toast.error(t('toasterMessages.networkError'));
        return null;
        } 
        }
      }, 2000);
    }
    toast.error(t('toasterMessages.unknownError'));
  }
}