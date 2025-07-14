import { useSelector } from 'react-redux'
import DropdownChannelsList from './DropdownChannelsList.jsx'
import { useTranslation } from 'react-i18next'

const ChannelsList = ({ onChannelSelect, onRename, onRemove }) => {
  const { t } = useTranslation()
  const channels = useSelector(state => state.initChannels.channels)
  const curChannel = useSelector(state => state.initChannels.currentChannel)

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels.map((channel) => {
        const isActive = channel.id === curChannel?.id

        if (channel.removable) {
          return (
            <li key={channel.id} className="nav-item w-100">
              <DropdownChannelsList
                onRename={() => onRename(channel)}
                onRemove={() => onRemove(channel)}
                isActive={isActive}
                onClick={() => onChannelSelect(channel)}
                t={t}
              >
                {channel.name}
              </DropdownChannelsList>
            </li>
          )
        }

        return (
          <li key={channel.id} className="nav-item w-100">
            <button
              type="button"
              className={`w-100 rounded-0 text-start btn ${isActive ? 'btn-secondary' : ''}`}
              onClick={() => onChannelSelect(channel)}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default ChannelsList
