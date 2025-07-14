import { useState } from 'react'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import useAuth from '../Hooks/useAuth.js'

const BuildRegPage = () => {
  const { t } = useTranslation()

  const { register } = useAuth()

  const [regError, setRegError] = useState('')
  const navigate = useNavigate()

  const schema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('registerErrors.usernameLength'))
      .max(20, t('registerErrors.usernameLength'))
      .required(t('registerErrors.required')),
    password: Yup.string()
      .min(6, t('registerErrors.passwordLength'))
      .required(t('registerErrors.required')),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('registerErrors.passwordsMustMatch'))
      .required(t('registerErrors.required')),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await register(values)
        setRegError('')
        navigate('/')
      }
      catch (err) {
        console.log(err, 'err reg')
        setRegError(err.message)
      }
    },
  })

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img
                src="/imgs/signup.jpg"
                alt={t('register.imgAlt')}
                className="rounded-circle"
                style={{ height: '200px', objectFit: 'contain' }}
              />
            </div>

            <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
              <h1 className="text-center mb-4">{t('register.title')}</h1>

              <div className="form-floating mb-3">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  onBlur={formik.handleBlur}
                  name="username"
                  autoComplete="username"
                  required
                  type="text"
                  placeholder={t('register.usernamePlaceholder')}
                  className={`form-control ${regError || (formik.touched.username && formik.errors.username) ? 'is-invalid' : ''}`}
                  id="username"
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="invalid-tooltip">{formik.errors.username}</div>
                )}
                {regError && (
                  <div className="invalid-tooltip"></div>
                )}
                <label htmlFor="username">{t('register.usernameLabel')}</label>
              </div>

              <div className="form-floating mb-4">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  name="password"
                  autoComplete="current-password"
                  required
                  type="password"
                  placeholder={t('register.passwordPlaceholder')}
                  className={`form-control ${regError || (formik.touched.password && formik.errors.password) ? 'is-invalid' : ''}`}
                  id="password"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-tooltip">{formik.errors.password}</div>
                )}
                {regError && (
                  <div className="invalid-tooltip"></div>
                )}
                <label className="form-label" htmlFor="password">{t('register.passwordLabel')}</label>
              </div>

              <div className="form-floating mb-4">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.repeatPassword}
                  onBlur={formik.handleBlur}
                  name="repeatPassword"
                  autoComplete="current-password"
                  required
                  type="password"
                  placeholder={t('register.repeatPasswordPlaceholder')}
                  className={`form-control ${regError || (formik.touched.repeatPassword && formik.errors.repeatPassword) ? 'is-invalid' : ''}`}
                  id="repeatPassword"
                />
                {formik.touched.repeatPassword && formik.errors.repeatPassword && (
                  <div className="invalid-tooltip">{formik.errors.repeatPassword}</div>
                )}
                {regError && (
                  <div className="invalid-tooltip">{regError}</div>
                )}
                <label className="form-label" htmlFor="repeatPassword">{t('register.repeatPasswordLabel')}</label>
              </div>

              <Button onSubmit={formik.handleSubmit} type="submit" variant="" className="w-100 mb-3 btn btn-outline-primary">
                {t('register.submit')}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export const RegPage = () => BuildRegPage()
