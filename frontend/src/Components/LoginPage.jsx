import { useState } from 'react'
import { useFormik } from 'formik'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useAuth from '../Hooks/useAuth.js'

const BuildLoginPage = () => {
  const { t } = useTranslation()
  const [authError, setAuthError] = useState('')
  const navigate = useNavigate()
  const { logIn } = useAuth()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      const result = await logIn(values)
      if (result.success) {
        setAuthError('')
        navigate('/')
      }
      else {
        setAuthError(t('logInError'))
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
                src="/imgs/Login.jpg"
                alt="Логин"
                className="rounded-circle"
                style={{ height: '150px', objectFit: 'contain' }}
              />
            </div>

            <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
              <h1 className="text-center mb-4">{t('loginTitle')}</h1>
              <div className="form-floating mb-3">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  name="username"
                  required
                  type="text"
                  placeholder={t('loginUsername')}
                  className="form-control"
                  id="username"
                />
                <label htmlFor="username">{t('loginUsername')}</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  name="password"
                  required
                  type="password"
                  placeholder={t('loginPassword')}
                  className="form-control"
                  id="password"
                />
                <label className="form-label" htmlFor="password">{t('loginPassword')}</label>
              </div>
              <Button type="submit" className="w-100 mb-3" variant="outline-primary">
                {t('logInButton')}
              </Button>
              {authError && (
                <div className="text-danger text-center mt-2" role="alert">
                  {authError}
                </div>
              )}
            </Form>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span>
                {t('doNotHaveAccount')}
                {' '}
              </span>
              <Link to="/signup">
                {t('registerLink')}
                {' '}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const LoginPage = () => BuildLoginPage()
