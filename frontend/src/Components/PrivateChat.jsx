import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import routes from '../routes.js';
import { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { setChannels, setCurrentChannel } from '../slices/channelsSlice.js';
import ChannelsList from './ChannelsList.jsx'
import MessagesPanel from './MessagesPanel.jsx'
import AddChannelModal from './AddChannelModal.jsx'
import RenameChannelModal from './RenameChannelModal.jsx'
import RemoveChannelModal from './RemoveChannelModal.jsx'
import useMessagesSocket from '../Hooks/useMessagesSocket.js';
import useChannelsSocket from '../Hooks/useChannelsSocket.js';
import useInitialDataLoad from '../Hooks/useInitialDataLoad.js';


const BuildPrivatePage = () => {
    
    const dispatch = useDispatch();

    const [modal, setModal] = useState({ type: null, channel: null });

    useMessagesSocket();
    useInitialDataLoad();
    useChannelsSocket();
    

    const handleChannelSelect = (channel) => {
      dispatch(setCurrentChannel(channel));
    };


      const handleSendMessage = async (message) => {
        const token = localStorage.getItem('token');
        try {
                await axios.post(routes.sendMessage(), message, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                },
            });
        } catch (err) {
            console.log(err, 'err message send') //тостер - не удалось добавить сообщение
            setTimeout(async () => {
                try {
                    await axios.post(routes.sendMessage(), message, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    });
                    console.log('Повторная отправка успешна');
                } catch (retryErr) {
                    console.log('Повторная попытка не удалась', retryErr);
                    // тостер повторная ошибка
                }
                }, 2000);
        }
      }

      const handleCreateChannel = async (channel) => {
        const token = localStorage.getItem('token');
        try {
                const response = await axios.post(routes.createChannel(), channel, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                },
            });
            return response;
        } catch (err) {
            console.log(err, 'err message send') //тостер - не удалось добавить сообщение
            setTimeout(async () => {
                try {
                    await axios.post(routes.createChannel(), channel, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    });
                    console.log('Повторная отправка успешна');
                } catch (retryErr) {
                    console.log('Повторная попытка не удалась', retryErr);
                    // тостер повторная ошибка
                }
                }, 2000);
        }
      }

      const handleRename = async (newChannelName, channel) => {
        const token = localStorage.getItem('token');
        try {
                await axios.patch(routes.editChannel(channel.id), newChannelName, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                },
            });
        } catch (err) {
            console.log(err, 'err message send') //тостер - не удалось изменить название
        }
      };

      const handleRemove = async (channel) => {
        const token = localStorage.getItem('token');
        const response = axios.delete(routes.removeChannel(channel.id), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response;
      };

      const openAddModal = () => setModal({ type: 'add', channel: null });
      const openRenameModal = (channel) => setModal({ type: 'rename', channel });
      const openRemoveModal = (channel) => setModal({ type: 'remove', channel });
      const closeModal = () => setModal({ type: null, channel: null });



    return ( 
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
            {modal.type === 'add' && (
              <AddChannelModal
                show
                onClose={closeModal}
                onChannelCreate={handleCreateChannel}
              />
            )}
            {modal.type === 'rename' && (
              <RenameChannelModal
                show
                onClose={closeModal}
                channel={modal.channel}
                onChannelRename={handleRename}
              />
            )}
            {modal.type === 'remove' && (
              <RemoveChannelModal
                show
                onClose={closeModal}
                channel={modal.channel}
                onChannelRemove={handleRemove}
              />
            )}

        <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <div className="d-flex mt-0 justify-content-between align-items-center mb-2 ps-4 pe-2 p-4">
                    <b>Каналы</b>
                    <Button onClick={openAddModal} type="button" variant="" className="p-0 text-primary btn-group-vertical">
                        <i className="bi bi-plus-square fs-4"></i>
                    </Button>

                </div>
                    <ChannelsList onChannelSelect={handleChannelSelect} onRename={openRenameModal} onRemove={openRemoveModal}/>
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