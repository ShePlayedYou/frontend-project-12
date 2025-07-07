import { Button, Modal, Form } from "react-bootstrap";
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannel } from '../slices/channelsSlice.js';
import * as Yup from 'yup';

const AddChannelModal = ({ show, onClose, onChannelCreate }) => {

  const dispatch = useDispatch();

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
    initialValues: { name: '' },
    validationSchema: schema(existingChannelsNames),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const newChannel = {
          name: values.name
        }
        const response = await onChannelCreate(newChannel)
        dispatch(setCurrentChannel(response.data));
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
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate className="" onSubmit={formik.handleSubmit}>
          <div>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              type="text"
              placeholder="Введите название канала..."
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

export default AddChannelModal;