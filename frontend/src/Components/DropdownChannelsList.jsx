import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

const DropdownChannelsList = ({ children, isActive, onClick, onRename, onRemove }) => (
  <Dropdown className="d-flex dropdown btn-group">
    <Button
      type="button"
      className={`w-100 rounded-0 text-start ${isActive ? 'btn-secondary' : ''}`}
      variant=""
      onClick={onClick}
      style={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      <span className="me-1">#</span>{children}
    </Button>

    <Dropdown.Toggle
      split
      variant={isActive ? 'secondary' : ''}
      className="flex-grow-0"
      id="dropdown-split-basic"
    />

    <Dropdown.Menu>
      <Dropdown.Item onClick={onRename}>Переименовать</Dropdown.Item>
      <Dropdown.Item onClick={onRemove}>Удалить</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownChannelsList;