import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import routes from '../routes.js';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCurrentChannel } from '../slices/channelsSlice.js';
import ChannelsList from './ChannelsList.jsx'
import MessagesPanel from './MessagesPanel.jsx'
import AddChannelModal from './AddChannelModal.jsx'
import RenameChannelModal from './RenameChannelModal.jsx'
import RemoveChannelModal from './RemoveChannelModal.jsx'
import useMessagesSocket from '../Hooks/useMessagesSocket.js';
import useChannelsSocket from '../Hooks/useChannelsSocket.js';
import useInitialDataLoad from '../Hooks/useInitialDataLoad.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { sendMessage } from '../API/sendMessage.js'
import { createChannel } from '../API/createChannel.js'
import { renameChannel } from '../API/renameChannel.js'
import { removeChannel } from '../API/removeChannel.js'



const BuildPrivatePage = () => {
  const { t } = useTranslation();
  
  const dispatch = useDispatch();

  const [modal, setModal] = useState({ type: null, channel: null });

  useMessagesSocket();
  useInitialDataLoad();
  useChannelsSocket();
  

  const handleChannelSelect = (channel) => {
    dispatch(setCurrentChannel(channel));
  };

  const handleSendMessage = async (msg) => {
      await sendMessage(msg, t);
  };

  const handleCreateChannel = async (channel) => {
    const data = await createChannel(channel, t);
    return data;
  }

  const handleRename = async (newChannelName, channel) => {
    await renameChannel(newChannelName, channel, t)
  };

  const handleRemove = async (channel) => {
    const data = await removeChannel(channel, t);
    return data;
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
            <b>{t('privateChat.channels')}</b>
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