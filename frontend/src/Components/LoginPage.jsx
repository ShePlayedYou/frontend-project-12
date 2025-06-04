import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

const BuildLoginPage = () => {
    return (
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
                <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={() => {}}
                >
                <Form className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3">
                    <Field
                        name="username"
                        autocomplete="username"
                        required
                        type="text"
                        placeholder="Ваш ник"
                        className="form-control"
                        id="username"
                    />
                    <label htmlFor="username">Ваш ник</label>
                    </div>
                    <div className="form-floating mb-4">
                    <Field
                        name="password"
                        autocomplete="current-password"
                        required
                        type="password"
                        placeholder="Пароль"
                        className="form-control"
                        id="password"
                    />
                    <label className="form-label" htmlFor="password">Ваш ник</label>
                    </div>
                    <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
                        Войти
                    </button>
                </Form>
                </Formik>
            </div>
                <div className="card-footer p-4">
                    <div className="text-center">
                        <span>Нет аккаунта? </span>
                        <Link to="/signup">Регистрация</Link>
                    </div>
                </div>
            </div>
          </div>
      );
};


export const LoginPage = () => BuildLoginPage();