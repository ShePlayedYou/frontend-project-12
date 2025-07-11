import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'

const DropdownChannelsList = ({ children, isActive, onClick, onRename, onRemove, t }) => (
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
      <span className="me-1">#</span>
      {children}
    </Button>
    <Dropdown.Toggle
      id={`dropdown-toggle-${children}`}
      split
      variant={isActive ? 'secondary' : ''}
      className="flex-grow-0"
    >
      <span className="visually-hidden">{t('channelsDropdown.controlLabel')}</span>
    </Dropdown.Toggle>
    <label htmlFor={`dropdown-toggle-${children}`} className="visually-hidden">
      {t('channelsDropdown.controlLabel')}
    </label>

    <Dropdown.Menu>
      <Dropdown.Item onClick={onRename}>{t('channelsDropdown.rename')}</Dropdown.Item>
      <Dropdown.Item onClick={onRemove}>{t('channelsDropdown.delete')}</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default DropdownChannelsList
