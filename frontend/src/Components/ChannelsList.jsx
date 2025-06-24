import React from 'react';
import { useSelector } from 'react-redux';

const ChannelsList = ({ onChannelSelect }) => {
  const channels = useSelector((state) => state.initChannels.channels);
  const curChannel = useSelector((state) => state.initChannels.currentChannel)
  console.log(curChannel, 'curChannel')

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channels.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          <button
            type="button"
            className={`w-100 rounded-0 text-start btn ${channel.id === curChannel?.id ? 'btn-secondary' : ''}`}
            onClick={() => onChannelSelect(channel)}
          >
            <span className="me-1">#</span>{channel.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ChannelsList;