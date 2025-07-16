import { Button, Modal, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import filter from 'leo-profanity'
import { channelsApi } from '../slices/channelsApi.js'
import { useRenameChannelMutation } from '../slices/channelsApi.js'

const RenameChannelModal = ({ show, channel, onClose }) => {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  const [renameChannel] = useRenameChannelMutation()

  filter.add(filter.getDictionary('en'))
  filter.add(filter.getDictionary('ru'))

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      }, 0)
    }
  }, [show])

  const channels = useSelector(
    channelsApi.endpoints.getChannels.select(),
  )?.data || []
  const existingChannelNames = channels.map(c => c.name)

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(3, t('modalsGeneral.validation.minMax'))
      .max(20, t('modalsGeneral.validation.minMax'))
      .required(t('modalsGeneral.validation.required'))
      .test(
        'unique',
        t('modalsGeneral.validation.unique'),
        value => !existingChannelNames.includes(value),
      ),
  })

  const formik = useFormik({
    initialValues: { name: channel.name },
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const filteredName = filter.clean(values.name)
      try {
        await renameChannel({ id: channel.id, name: filteredName }).unwrap()
        toast.success(t('toasterMessages.renameChannel'))
        resetForm()
        onClose()
      }
      catch (err) {
        const msg = err?.status === 'FETCH_ERROR' || err?.code === 'ERR_NETWORK'
          ? t('toasterMessages.networkError')
          : t('toasterMessages.unknownError')
        toast.error(msg)
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
              value={formik.values.name}
              name="name"
              id="name"
              type="text"
              placeholder={t('renameChannelModal.inputPlaceholder')}
              className="mb-2 form-control"
              required
            />
            <label htmlFor="name" className="visually-hidden">
              {t('renameChannelModal.inputLabel')}
            </label>
            {formik.errors.name && (
              <div className="text-danger">{formik.errors.name}</div>
            )}
            <div className="d-flex justify-content-end">
              <Button type="button" className="me-2 btn btn-secondary" onClick={onClose}>
                {t('modalsGeneralButton.cancel')}
              </Button>
              <Button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
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
