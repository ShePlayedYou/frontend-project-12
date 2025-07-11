import { Button, Modal, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import filter from 'leo-profanity'

const RenameChannelModal = ({ show, channel, onClose, onChannelRename }) => {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  
  filter.add(filter.getDictionary('en'))
  filter.add(filter.getDictionary('fr'))

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      }, 0)
    }
  }, [show])

  const schema = existingChannelsNames => Yup.object().shape({
    name: Yup.string()
      .min(3, t('modalsGeneral.validation.minMax'))
      .max(20, t('modalsGeneral.validation.minMax'))
      .required(t('modalsGeneral.validation.required'))
      .test(
        'unique',
        t('modalsGeneral.validation.unique'),
        value => !existingChannelsNames.includes(value),
      ),
  })

  const channels = useSelector(state => state.initChannels.channels)
  const existingChannelsNames = channels.map(c => c.name)

  const formik = useFormik({
    initialValues: { name: channel.name },
    validationSchema: schema(existingChannelsNames),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const filteredChannelName = filter.clean(values.name)
      try {
        const newChannelName = { name: filteredChannelName }
        await onChannelRename(newChannelName, channel)
        toast.success(t('toasterMessages.renameChannel'));
        resetForm()
        onClose()
      }
      catch (err) {
        if (err.code === 'ERR_NETWORK') {
          toast.error(t('toasterMessages.networkError'));
        } 
        else {
          toast.error(t('toasterMessages.unknownError'))
        }
      }
      finally {
        setSubmitting(false)
      }
    },
  })

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
            {formik.touched.name && formik.errors.name
              ? (
                  <div className="text-danger">{formik.errors.name}</div>
                )
              : null}
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
  )
}

export default RenameChannelModal
