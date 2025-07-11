import { useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import filter from 'leo-profanity'

const MessagesPanel = ({ onSendMessage }) => {
  const { t } = useTranslation()

  filter.add(filter.getDictionary('en'))
  filter.add(filter.getDictionary('ru'))

  const inputRef = useRef(null)

  const currentChannelId = useSelector(state => state.initChannels.currentChannel)
  const messages = useSelector(state => state.initMessages.messages)
  const currentMessages = messages.filter(msg => msg.channelId === currentChannelId?.id)

  useEffect(() => {
    const container = document.getElementById('messages-box')
    const last = container?.lastElementChild
    inputRef.current?.focus()
    if (last) {
      last.scrollIntoView({ behavior: 'auto' })
    }
  }, [currentMessages.length, currentChannelId])

  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const filteredMessage = filter.clean(values.message)
      try {
        const newMessage = {
          body: filteredMessage,
          channelId: currentChannelId.id,
          username: localStorage.getItem('username'),
        }
        await onSendMessage(newMessage)
        resetForm()
      }
      catch (err) {
        if (err.code === 'ERR_NETWORK') {
          toast.error(<div role="alert">{t('toasterMessages.networkError')}</div>)
        }
        else {
          toast.error(<div role="alert">{t('toasterMessages.unknownError')}</div>)
        }
      }
      finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {currentChannelId?.name}
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
            <Button type="submit" variant="" className="text-primary btn btn-group-vertical" disabled={formik.isSubmitting}>
              <i className="bi bi-send-fill"></i>
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default MessagesPanel
