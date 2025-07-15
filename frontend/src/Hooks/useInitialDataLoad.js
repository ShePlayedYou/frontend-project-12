import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetChannelsQuery, useGetMessagesQuery } from '../slices/apiSlice.js'
import { setCurrentChannel } from '../slices/currentChannelSlice.js'

const useInitialDataLoad = () => {
  const dispatch = useDispatch()
  const currentChannel = useSelector(state => state.currentChannel.current)

  const {
    data: channels = [],
    isSuccess: isChannelsSuccess,
  } = useGetChannelsQuery()

  useGetMessagesQuery(undefined, {
    skip: !isChannelsSuccess,
  })

  useEffect(() => {
    if (!currentChannel && isChannelsSuccess && channels.length > 0) {
      dispatch(setCurrentChannel(channels[0]))
    }
  }, [isChannelsSuccess, channels, currentChannel, dispatch])
}

export default useInitialDataLoad
