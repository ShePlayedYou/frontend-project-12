import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetChannelsQuery } from '../slices/channelsApi.js'
import { setCurrentChannel } from '../slices/currentChannelSlice.js'

const useInitialDataLoad = () => {
  const dispatch = useDispatch()
  const currentChannel = useSelector(state => state.currentChannel.current)

  const {
    data: channels = [],
    isSuccess: isChannelsSuccess,
  } = useGetChannelsQuery()

  useEffect(() => {
    if (!currentChannel && isChannelsSuccess && channels.length > 0) {
      dispatch(setCurrentChannel(channels[0]))
    }
  }, [isChannelsSuccess, channels, currentChannel, dispatch])
}

export default useInitialDataLoad
