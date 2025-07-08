import { useState } from 'react'
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom';
import { handleReg } from '../API/api.js'
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slices/authSlice.js';
import * as Yup from 'yup';


const BuildRegPage = () => {

  const [regError, setRegError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const schema = Yup.object().shape({
    username: Yup.string()
       .min(3, 'От 3 до 20 символов')
       .max(20, 'От 3 до 20 символов')
       .required('Обязательное поле'),
    password: Yup.string()
       .min(6, 'Минимум 6 символов')
       .required('Обязательное поле'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле'),
   });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        const data = await handleReg(values);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        setRegError('');
        dispatch(loginSuccess(data));
        navigate('/');
      } catch (err) {
        console.log(err, 'err reg')
        setRegError(err.message)
      }
    }
  })
  
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className='card-body row p-5'>
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img
                        src="/imgs/signup.jpg"
                        alt="Логин"
                        className='rounded-circle'
                        style={{ height: '200px', objectFit: 'contain' }}
                    />
                </div>

                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <div className="form-floating mb-3">
                    <input
                        onChange={formik.handleChange} 
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                        name="username"
                        autoComplete="username"
                        required
                        type="text"
                        placeholder="Имя пользователя"
                        className={`form-control ${regError || formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                        id="username"
                    />
                    {formik.touched.username && formik.errors.username && (
                        <div className="invalid-tooltip">{formik.errors.username}</div>
                    )}
                    {regError && (
                        <div className="invalid-tooltip"></div>
                    )}
                    <label htmlFor="username">Имя пользователя</label>
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
                        placeholder="Пароль"
                        className={`form-control ${regError || formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                        id="password"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="invalid-tooltip">{formik.errors.password}</div>
                    )}
                    {regError && (
                        <div className="invalid-tooltip"></div>
                    )}
                    <label className="form-label" htmlFor="password">Пароль</label>
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
                        placeholder="Подтвердите пароль"
                        className={`form-control ${regError || formik.touched.repeatPassword && formik.errors.repeatPassword ? 'is-invalid' : ''}`}
                        id="repeatPassword"
                    />
                    {formik.touched.repeatPassword && formik.errors.repeatPassword && (
                      <div className="invalid-tooltip">{formik.errors.repeatPassword}</div>
                    )}
                    {regError && (
                        <div className="invalid-tooltip">{regError}</div>
                    )}
                    <label className="form-label" htmlFor="repeatPassword">Подтвердите пароль</label>
                    {formik.touched.repeatPassword && formik.errors.repeatPassword && (
                        <div className="text-danger">{formik.errors.repeatPassword}</div>
                    )}
                    </div>
                    <Button onSubmit={formik.handleSubmit} type="submit" variant="" className="w-100 mb-3 btn btn-outline-primary">
                        Зарегистрироваться
                    </Button>
                </Form>    
            </div>
            </div>
          </div>
          </div>
      );
};


export const RegPage = () => BuildRegPage();