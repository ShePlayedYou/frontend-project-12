import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchChannels, fetchMessages } from '../API/api.js'
import { setChannels, setCurrentChannel } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';

const useInitialDataLoad = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const loadData = async () => {
      try {
        const channelsResponse = await fetchChannels(token);
        const channels = channelsResponse.data;
        dispatch(setChannels(channels));

        if (channels.length > 0) {
          const current = channels[0];
          dispatch(setCurrentChannel(current));
          const messagesResponse = await fetchMessages(token);
          dispatch(setMessages(messagesResponse.data));
        }
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        // можно добавить тостер или обработку ошибок
      }
    };

    loadData();
  }, [dispatch]);
};

export default useInitialDataLoad;