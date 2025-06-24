import { Button, Form } from "react-bootstrap";
import { useFormik } from 'formik';
import axios from "axios";
import routes from '../routes.js';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setChannels, setCurrentChannel } from '../slices/channelsSlice.js';
import { setMessages, setCurrentMessageId } from '../slices/messagesSlice.js';
import ChannelsList from './ChannelsList.jsx'
import MessagesPanel from './MessagesPanel.jsx'

const BuildPrivatePage = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token, 'token')
        const getData = async () => {
            try {
                const response = await axios.get(routes.getChannels(), {
                    headers: {
                      'Authorization': `Bearer ${token}`,
                    },
                });
                dispatch(setChannels(response.data));
                if (response.data.length > 0) {
                    dispatch(setCurrentChannel(response.data[0]));
                    const messagesResponse = await axios.get(routes.getMessages(), {
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      console.log(messagesResponse.data, 'messagesResponse')
                    dispatch(setMessages(messagesResponse.data));
                  }
              } catch (err) {
                console.log(err);
                throw new Error('Ошибка');
            }
        }
        getData();
      }, [dispatch]);

      const handleChannelSelect = (channel) => {
        console.log('Выбран канал:', channel.id);
        dispatch(setCurrentChannel(channel));
      };



    return ( 
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <div className="d-flex mt-0 justify-content-between align-items-center mb-2 ps-4 pe-2 p-4">
                    <b>Каналы</b>
                    <Button type="button" variant="" className="p-0 text-primary btn-group-vertical">
                        <i className="bi bi-plus-square fs-4"></i>
                    </Button>

                </div>
                    <ChannelsList onChannelSelect={handleChannelSelect} />
                </div>
            <div className="col p-0 h-100">
                <div className="d-flex flex-column h-100">
                <MessagesPanel></MessagesPanel>
                </div>
            </div>
        </div>
      </div>
    )
  };

export const PrivatePage = () => BuildPrivatePage();