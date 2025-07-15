import { Button } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentChannel } from '../slices/currentChannelSlice.js'
import ChannelsList from './ChannelsList.jsx'
import MessagesPanel from './MessagesPanel.jsx'
import AddChannelModal from './AddChannelModal.jsx'
import RenameChannelModal from './RenameChannelModal.jsx'
import RemoveChannelModal from './RemoveChannelModal.jsx'
import useInitialDataLoad from '../Hooks/useInitialDataLoad.js'
import { useTranslation } from 'react-i18next'
import { BsPlusSquare } from 'react-icons/bs'
import { toast } from 'react-toastify'
import {
  useSendMessageMutation,
  useCreateChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} from '../slices/apiSlice.js'
import useSocket from '../Hooks/useSocket.js'

const BuildPrivatePage = () => {
  useSocket()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [modal, setModal] = useState({ type: null, channel: null })

  useInitialDataLoad()

  const [sendMessage] = useSendMessageMutation()
  const [createChannel] = useCreateChannelMutation()
  const [renameChannel] = useRenameChannelMutation()
  const [removeChannel] = useRemoveChannelMutation()

  const handleChannelSelect = (channel) => {
    dispatch(setCurrentChannel(channel))
  }

  const handleSendMessage = async (msg) => {
    try {
      await sendMessage(msg).unwrap()
    }
    catch {
      toast.error(t('toasterMessages.networkError'))
    }
  }

  const handleCreateChannel = async (channel) => {
    try {
      const data = await createChannel(channel).unwrap()
      return data
    }
    catch {
      toast.error(t('toasterMessages.networkError'))
    }
  }

  const handleRename = async (newName, channel) => {
    try {
      await renameChannel({ id: channel.id, name: newName }).unwrap()
    }
    catch {
      toast.error(t('toasterMessages.networkError'))
    }
  }

  const handleRemove = async (channel) => {
    try {
      const data = await removeChannel(channel.id).unwrap()
      return data
    }
    catch {
      toast.error(t('toasterMessages.networkError'))
    }
  }

  const openAddModal = () => setModal({ type: 'add', channel: null })
  const openRenameModal = channel => setModal({ type: 'rename', channel })
  const openRemoveModal = channel => setModal({ type: 'remove', channel })
  const closeModal = () => setModal({ type: null, channel: null })

  const renderModal = () => {
    const modalsMap = {
      add: (
        <AddChannelModal
          show
          onClose={closeModal}
          onChannelCreate={handleCreateChannel}
        />
      ),
      rename: (
        <RenameChannelModal
          show
          onClose={closeModal}
          channel={modal.channel}
          onChannelRename={handleRename}
        />
      ),
      remove: (
        <RemoveChannelModal
          show
          onClose={closeModal}
          channel={modal.channel}
          onChannelRemove={handleRemove}
        />
      ),
    }

    return modalsMap[modal.type] || null
  }

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      {renderModal()}

      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-0 justify-content-between align-items-center mb-2 ps-4 pe-2 p-4">
            <b>{t('privateChat.channels')}</b>
            <Button onClick={openAddModal} type="button" variant="" className="p-0 text-primary btn-group-vertical">
              <BsPlusSquare size={22} />
              <span className="visually-hidden">+</span>
            </Button>
          </div>
          <ChannelsList
            onChannelSelect={handleChannelSelect}
            onRename={openRenameModal}
            onRemove={openRemoveModal}
          />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <MessagesPanel onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const PrivatePage = () => BuildPrivatePage()
