import React from 'react';
import { Form, Input, Button, Checkbox, Typography, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/authSlice';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().email(t('Invalid email address')).required(t('Email is required')),
    username: Yup.string().required(t('Username is required')),
    password: Yup.string()
      .min(8, t('Password must be at least 8 characters'))
      .matches(/[a-z]/, t('Password must contain at least one lowercase letter'))
      .matches(/[A-Z]/, t('Password must contain at least one uppercase letter'))
      .matches(/[0-9]/, t('Password must contain at least one number'))
      .matches(/[@$!%*?&#]/, t('Password must contain at least one special character'))
      .required(t('Password is required')),
    terms: Yup.boolean().oneOf([true], t('You must accept the terms and conditions')),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      terms: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(signup({ email: values.email, username: values.username, password: values.password }));
      navigate('/login');
    },
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f6fc' }}>
      <Card style={{ width: '100%', maxWidth: '400px', padding: '20px', borderRadius: '5px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <Typography.Title level={3} style={{ textAlign: 'center', fontWeight: 'bold' }}>
          {t('Create an Account')}
        </Typography.Title>
        <Typography.Text style={{ textAlign: 'center', color: '#6b7280', marginBottom: '20px', display: 'block' }}>
          {t('Create an account to continue')}
        </Typography.Text>
        <Form onFinish={formik.handleSubmit} layout="vertical">
          <Form.Item
            label={t('Email Address')}
            validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''}
            help={formik.touched.email && formik.errors.email}
          >
            <Input
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
          <Form.Item
            label={t('Username')}
            validateStatus={formik.touched.username && formik.errors.username ? 'error' : ''}
            help={formik.touched.username && formik.errors.username}
          >
            <Input
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
          <Form.Item
            label={t('Password')}
            validateStatus={formik.touched.password && formik.errors.password ? 'error' : ''}
            help={formik.touched.password && formik.errors.password}
          >
            <Input.Password
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
          <Form.Item
            validateStatus={formik.touched.terms && formik.errors.terms ? 'error' : ''}
            help={formik.touched.terms && formik.errors.terms}
          >
            <Checkbox
              id="terms"
              name="terms"
              checked={formik.values.terms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {t('I accept the terms and conditions')}
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t('Sign Up')}
            </Button>
          </Form.Item>
          <Typography.Text style={{ textAlign: 'center', display: 'block', color: '#6b7280' }}>
            {t("Already have an account?")}{' '}
            <a href="/login" style={{ color: '#3b82f6', textDecoration: 'underline', fontWeight: 'bold' }}>
              {t('LogIn')}
            </a>
          </Typography.Text>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
