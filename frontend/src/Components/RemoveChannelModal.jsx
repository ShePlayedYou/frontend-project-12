import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const RemoveChannelModal = ({ show, channel, onClose, onChannelRemove }) => {
  const { t } = useTranslation()
  const [isDeleting, setState] = useState(false)

  const deleteChannel = async () => {
    try {
      setState(true)
      await onChannelRemove(channel)
      toast.success(t('toasterMessages.removeChannel'));
      onClose()
    }
    catch (err) {
      if (err.code === 'ERR_NETWORK') {
        toast.error(t('toasterMessages.networkError'));
      } 
      else {
        toast.error(t('toasterMessages.unknownError'))
      }
    }
    finally {
      setState(false)
    }
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('deleteChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('deleteChannelModal.confirmationText')}</p>
        <div className="d-flex justify-content-end">
          <Button type="button" className="me-2 btn btn-secondary" onClick={onClose}>
            {t('modalsGeneralButton.cancel')}
          </Button>
          <Button type="submit" className="btn btn-danger" onClick={deleteChannel} disabled={isDeleting}>
            {isDeleting ? t('deleteChannelModal.processing') : t('deleteChannelModal.deleteButton')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default RemoveChannelModal
