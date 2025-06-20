import React from 'react';
import { useState } from 'react'
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom';
import handleLogin from '../API/auth.js'
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slices/authSlice.js';


const BuildLoginPage = () => {

  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        console.log(values, 'smth')
        const data = await handleLogin(values);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        setAuthError('');
        console.log(data, 'data')
        dispatch(loginSuccess(data));
        navigate('/');
      } catch (err) {
        setAuthError(err.message)
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
                        src="/imgs/Login.jpg"
                        alt="Логин"
                        className='rounded-circle'
                        style={{ height: '150px', objectFit: 'contain' }}
                    />
                </div>

                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3">
                    <input
                        onChange={formik.handleChange} 
                        value={formik.values.username}
                        name="username"
                        autoComplete="username"
                        required
                        type="text"
                        placeholder="Ваш ник"
                        className="form-control"
                        id="username"
                    />
                    <label htmlFor="username">Ваш ник</label>
                    </div>
                    <div className="form-floating mb-4">
                    <input
                        onChange={formik.handleChange} 
                        value={formik.values.password}
                        name="password"
                        autoComplete="current-password"
                        required
                        type="password"
                        placeholder="Пароль"
                        className="form-control"
                        id="password"
                    />
                    <label className="form-label" htmlFor="password">Ваш пароль</label>
                    </div>
                    <Button type="submit" className="w-100 mb-3 btn btn-primary">
                        Войти
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
                        <span>Нет аккаунта? </span>
                        <Link to="/signup">Регистрация</Link>
                    </div>
                </div>
            </div>
          </div>
          </div>
      );
};


export const LoginPage = () => BuildLoginPage();