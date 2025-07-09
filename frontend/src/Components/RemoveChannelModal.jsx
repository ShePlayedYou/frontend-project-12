import { Button, Modal } from "react-bootstrap";
import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const RemoveChannelModal = ({ show, channel, onClose, onChannelRemove }) => {
  const { t } = useTranslation();
  console.log('Вызвано модальное окно удаления канала')

  const [isDeleting, setState] = useState(false);


  const deleteChannel = async () => {
    try {
        console.log('Удаляем канал')
        setState(true);
        await onChannelRemove(channel)
        onClose()
    } catch (err) {
        toast.error(t('toasterMessages.unknownError'));
    } finally {
      setState(false);
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
  );
};


export default RemoveChannelModal;