import { Button, Modal, Form } from "react-bootstrap";
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react'
import * as Yup from 'yup';

const RenameChannelModal = ({ show, channel, onClose, onChannelRename }) => {

  const inputRef = useRef(null);
  useEffect(() => {
  if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
    }
  }, [channel.name]);

  const schema = (existingChannelsNames) => Yup.object().shape({
   name: Yup.string()
     .min(3, 'От 3 до 20 символов')
     .max(20, 'От 3 до 20 символов')
     .required('Обязательное поле')
     .test(
        'unique',
        'Должно быть уникальным',
        (value) => !existingChannelsNames.includes(value)
      ),
 });

  const channels = useSelector((state) => state.initChannels.channels); //[m]
  const existingChannelsNames = channels.map((c) => c.name);

  const formik = useFormik({
    initialValues: { name: channel.name },
    validationSchema: schema(existingChannelsNames),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const newChannelName = {
          name: values.name
        }
        await onChannelRename(newChannelName, channel)
        resetForm();
        onClose();
      }
      catch (err) {
        console.log('Error adding channel', err)
      }
      finally {
      setSubmitting(false);
      }
    },
  });

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate className="" onSubmit={formik.handleSubmit}>
          <div>
            <input
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              type="text"
              placeholder={"Введите название канала..."}
              aria-label="Новое название"
              className="mb-2 form-control"
              required
            />
            <label htmlFor="name" className="visually-hidden"></label>
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
            <div className="d-flex justify-content-end">
              <Button type="button" className="me-2 btn btn-secondary" onClick={onClose}>
                Отменить
              </Button>
              <Button type="submit" className="btn btn-primary" onSubmit={formik.handleSubmit} disabled={formik.isSubmitting}>
                {formik.isSubmitting ? 'Отправка...' : 'Отправить'}
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;