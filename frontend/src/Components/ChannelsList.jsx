import { useSelector } from 'react-redux';
import DropdownChannelsList from './DropdownChannelsList.jsx'
import { useTranslation } from 'react-i18next';

const ChannelsList = ({ onChannelSelect, onRename, onRemove }) => {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.initChannels.channels);
  const curChannel = useSelector((state) => state.initChannels.currentChannel)


  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          { channel.removable ?
          <DropdownChannelsList
            onRename={() => onRename(channel)}
            onRemove={() => onRemove(channel)}
            isActive={channel.id === curChannel?.id}
            onClick={() => onChannelSelect(channel)}
            t={t}
          >
            {channel.name}
          </DropdownChannelsList>
          :
          <button
            type="button"
            className={`w-100 rounded-0 text-start btn ${channel.id === curChannel?.id ? 'btn-secondary' : ''}`}
            onClick={() => onChannelSelect(channel)}
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <span className="me-1">#</span>{channel.name}
          </button>
          }
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;