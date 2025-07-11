import { Button, Modal, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { useRef, useEffect } from 'react'
import { setCurrentChannel } from '../slices/channelsSlice.js'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import filter from 'leo-profanity'

const AddChannelModal = ({ show, onClose, onChannelCreate }) => {
  const { t } = useTranslation()
  
  filter.add(filter.getDictionary('en'))
  filter.add(filter.getDictionary('fr'))

  const dispatch = useDispatch()
  const channels = useSelector(state => state.initChannels.channels)
  const existingChannelsNames = channels.map(c => c.name)
  const inputRef = useRef(null)

  useEffect(() => {
      inputRef.current?.focus()
    }, [])

  const schema = existingNames => Yup.object().shape({
    name: Yup.string()
      .min(3, t('modalsGeneral.validation.minMax'))
      .max(20, t('modalsGeneral.validation.minMax'))
      .required(t('modalsGeneral.validation.required'))
      .test(
        'unique',
        t('modalsGeneral.validation.unique'),
        value => !existingNames.includes(value),
      ),
  })

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: schema(existingChannelsNames),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const filteredChannelName = filter.clean(values.name)
      try {
        const newChannel = { name: filteredChannelName }
        const response = await onChannelCreate(newChannel)
        toast.success(<span>{t('toasterMessages.channelCreated')}</span>);
        dispatch(setCurrentChannel(response.data))
        resetForm()
        onClose()
      }
      catch (err) {
         if (err.code === 'ERR_NETWORK') {
          toast.error(<div role="alert">{t('toasterMessages.networkError')}</div>);
        } else {
          toast.error(<div role="alert">{t('toasterMessages.unknownError')}</div>)
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
        <Modal.Title>{t('createChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <div>
            <input
              ref={inputRef}
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              type="text"
              placeholder={t('createChannelModal.inputPlaceholder')}
              className="mb-2 form-control"
              required
            />
            <label htmlFor="name" className="visually-hidden">{t('createChannelModal.channelName')}</label>
            {formik.errors.name && (
              <div className="text-danger">{formik.errors.name}</div>
            )}
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

export default AddChannelModal
