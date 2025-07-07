import { Button, Modal } from "react-bootstrap";
import { useState } from 'react'

const RenameChannelModal = ({ show, channel, onClose, onChannelRemove }) => {

  const [isDeleting, setState] = useState(false);


  const deleteChannel = async () => {
    try {
        setState(true);
        await onChannelRemove(channel)
        onClose()
    } catch (err) {
        console.log('Error adding channel', err)
    } finally {
      setState(false);
    }
}

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
            <div className="d-flex justify-content-end">
              <Button type="button" className="me-2 btn btn-secondary" onClick={onClose}>
                Отменить
              </Button>
              <Button type="submit" className="btn btn-danger" onClick={deleteChannel} disabled={isDeleting}>
                {isDeleting ? 'Удаление...' : 'Удалить'}
              </Button>
            </div>
      </Modal.Body>
    </Modal>
  );
};


export default RenameChannelModal;