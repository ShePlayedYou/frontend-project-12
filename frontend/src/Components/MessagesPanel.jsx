import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useRef, useEffect } from 'react';

const MessagesPanel = ({ onSendMessage } ) => {

  const currentChannelId = useSelector((state) => state.initChannels.currentChannel); //1
  const messages = useSelector((state) => state.initMessages.messages); //[m]
  const currentMessages = messages.filter(msg => msg.channelId === currentChannelId?.id); //[m=1]

  useEffect(() => {
    const container = document.getElementById('messages-box');
    const last = container?.lastElementChild;
    if (last) {
      last.scrollIntoView({ behavior: 'auto' });
    }
  }, [currentMessages.length, currentChannelId]);


  const formik = useFormik({
    initialValues: { message: '' },
    onSubmit: async (values, { resetForm }) => {
      try {
        const newMessage = {
            body: values.message,
            channelId: currentChannelId.id,
            username: localStorage.getItem('username'),
        }
        await onSendMessage(newMessage)
        resetForm()
      } catch (err) {
        console.log('Error sending message', err)
      }
    },
  });

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0"><b># {currentChannelId?.name}</b></p>
      </div>

      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {currentMessages.map(msg => (
          <div key={msg.id} className="text-break mb-2">
            <b>{msg.username}</b>: {msg.body}
          </div>
        ))}
      </div>

      <div className="mt-auto px-5 py-3">
        <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <input
              onChange={formik.handleChange}
              value={formik.values.message}
              name="message"
              type="text"
              placeholder="Введите сообщение..."
              aria-label="Новое сообщение"
              className="border-0 p-0 ps-2 form-control"
              required
            />
            <Button type="submit" variant="" className="text-primary btn btn-group-vertical">
                <i className="bi bi-send-fill"></i>
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default MessagesPanel;