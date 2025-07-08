import { Button, Modal, Form } from "react-bootstrap";
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const RenameChannelModal = ({ show, channel, onClose, onChannelRename }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [channel.name]);

  const schema = (existingChannelsNames) => Yup.object().shape({
    name: Yup.string()
      .min(3, t('modalsGeneral.validation.minMax'))
      .max(20, t('modalsGeneral.validation.minMax'))
      .required(t('modalsGeneral.validation.required'))
      .test(
        'unique',
        t('modalsGeneral.validation.unique'),
        (value) => !existingChannelsNames.includes(value)
      ),
  });

  const channels = useSelector((state) => state.initChannels.channels);
  const existingChannelsNames = channels.map((c) => c.name);

  const formik = useFormik({
    initialValues: { name: channel.name },
    validationSchema: schema(existingChannelsNames),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const newChannelName = { name: values.name };
        await onChannelRename(newChannelName, channel);
        resetForm();
        onClose();
      } catch (err) {
        console.log('Error renaming channel', err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('renameChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <div>
            <input
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              type="text"
              placeholder={t('renameChannelModal.inputPlaceholder')}
              aria-label={t('renameChannelModal.inputPlaceholder')}
              className="mb-2 form-control"
              required
            />
            <label htmlFor="name" className="visually-hidden"></label>
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger">{formik.errors.name}</div>
            ) : null}
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={onClose}
              >
                {t('modalsGeneralButton.cancel')}
              </Button>
              <Button
                type="submit"
                className="btn btn-primary"
                onSubmit={formik.handleSubmit}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting
                  ? t('modalsGeneralButton.submitting')
                  : t('modalsGeneralButton.submit')}
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;