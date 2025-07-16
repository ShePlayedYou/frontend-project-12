import { useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import filter from 'leo-profanity'
import { BsFillSendFill } from 'react-icons/bs'
import {
  useSendMessageMutation,
  useGetMessagesQuery,
} from '../slices/messagesApi.js'
import { useGetChannelsQuery,
} from '../slices/channelsApi.js'

const MessagesPanel = () => {
  const { t } = useTranslation()

  filter.add(filter.getDictionary('en'))
  filter.add(filter.getDictionary('ru'))

  const inputRef = useRef(null)
  const currentChannelId = useSelector(state => state.currentChannel.current?.id)

  const [sendMessage] = useSendMessageMutation()
  const { data: messages = [] } = useGetMessagesQuery()
  const { data: channels = [] } = useGetChannelsQuery()

  const currentMessages = messages.filter(msg => msg.channelId === currentChannelId)
  const currentChannel = channels.find(ch => ch.id === currentChannelId)

  useEffect(() => {
    const container = document.getElementById('messages-box')
    const last = container?.lastElementChild
    if (last) last.scrollIntoView({ behavior: 'auto' })
  }, [currentMessages.length, currentChannelId])

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const filteredMessage = filter.clean(values.message)
      try {
        const newMessage = {
          body: filteredMessage,
          channelId: currentChannelId,
          username: localStorage.getItem('username'),
        }
        await sendMessage(newMessage).unwrap()
        resetForm()
        inputRef.current?.focus()
      }
      catch (err) {
        const messageKey = err?.status === 'FETCH_ERROR' || err?.code === 'ERR_NETWORK'
          ? 'toasterMessages.networkError'
          : 'toasterMessages.unknownError'
        toast.error(<div role="alert">{t(messageKey)}</div>)
      }
      finally {
        setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    if (!formik.isSubmitting) {
      inputRef.current?.focus()
    }
  }, [formik.isSubmitting])

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {currentChannel?.name ?? t('MessagesPanel.channelLoading')}
          </b>
        </p>
      </div>

      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {currentMessages.map(msg => (
          <div key={msg.id} className="text-break mb-2">
            <b>{msg.username}</b>
            :
            {msg.body}
          </div>
        ))}
      </div>

      <div className="mt-auto px-5 py-3">
        <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <input
              ref={inputRef}
              disabled={formik.isSubmitting}
              onChange={formik.handleChange}
              value={formik.values.message}
              name="message"
              type="text"
              placeholder={t('MessagesPanel.enterMessageForm')}
              aria-label="Новое сообщение"
              className="border-0 p-0 ps-2 form-control"
              required
            />
            <Button
              type="submit"
              variant=""
              className="text-primary btn btn-group-vertical"
              disabled={formik.isSubmitting}
            >
              <BsFillSendFill size={22} />
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default MessagesPanel
