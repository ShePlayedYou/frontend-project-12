import { Button, Form } from "react-bootstrap";
import { useFormik } from 'formik';
import axios from "axios";
import routes from '../routes.js';
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { setChannels, setCurrentChannel } from '../slices/channelsSlice.js';
import { setMessages, addMessage, setCurrentMessageId } from '../slices/messagesSlice.js';
import ChannelsList from './ChannelsList.jsx'
import MessagesPanel from './MessagesPanel.jsx'
import { useSocket } from '../contexts/SocketContext.jsx';
import { fetchChannels, fetchMessages } from '../API/api.js'

const BuildPrivatePage = () => {
    
    const dispatch = useDispatch();
    const socket = useSocket();


    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!socket) return;

        const handleNewMessage = (msg) => {
        dispatch(addMessage(msg));
        };

        socket.on('newMessage', handleNewMessage);
          

        const getData = async () => {
            try {
                const response = await fetchChannels(token)
                dispatch(setChannels(response.data));
                if (response.data.length > 0) {
                    dispatch(setCurrentChannel(response.data[0]));

                    const messagesResponse = await fetchMessages(token)

                    dispatch(setMessages(messagesResponse.data));
                  }
              } catch (err) {
                console.log(err);
                throw new Error('Ошибка');
            }
        }
        getData();
        return () => {
            socket.off('newMessage', handleNewMessage);
          };
      }, [socket, dispatch]);


      const handleChannelSelect = (channel) => {
        console.log('Выбран канал:', channel.id);
        dispatch(setCurrentChannel(channel));
      };


      const handleSendMessage = async (message) => {
        console.log(message, ' this is new message')
        const token = localStorage.getItem('token');
        try {
                await axios.post(routes.sendMessage(), message, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                },
            });
        } catch (err) {
            console.log(err, 'err message send')
        }
      }



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
                <MessagesPanel onSendMessage={handleSendMessage}></MessagesPanel>
                </div>
            </div>
        </div>
      </div>
    )
  };

export const PrivatePage = () => BuildPrivatePage();