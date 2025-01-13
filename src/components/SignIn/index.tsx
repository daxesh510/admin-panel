import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, Card, message } from 'antd';
import { useNavigate, NavLink } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import bcrypt from 'bcryptjs';

const { Title, Text } = Typography;

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup.string().email(t('Email is invalid')).required(t('Email is required')),
    password: yup.string().required(t('Password is required')),
  });

  const validate = async () => {
    try {
      await schema.validate({ email, password }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors: Record<string, string> = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path as string] = error.message;
          }
        });
      }
      setErrors(newErrors);
      return false;
    }
  };

  const handleSignIn = async () => {
    const isValid = await validate();
    if (isValid) {
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((user: { email: string; password: string }) => user.email === email);

      if (user && bcrypt.compareSync(password, user.password)) {
        dispatch(login({ email, username: user.username }));

        if (remember) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', bcrypt.hashSync(password, 10));
        } else {
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('password', bcrypt.hashSync(password, 10));
        }

        navigate('/dashboard');
      } else {
        setErrors({ email: t('Invalid email or password'), password: t('Invalid email or password') });
        message.error(t('Invalid email or password'));
      }
    }
  };

  return (
    <div className="flex-center login-container" style={{ minHeight: '10vh' }}>
      <Card className="card">
        <Title level={3} style={{ textAlign: 'center', fontWeight: 'bold' }}>
          {t('Login to Account')}
        </Title>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 24 }}>
          {t('Please enter your email and password to continue')}
        </Text>
        <Form layout="vertical" onFinish={handleSignIn} initialValues={{ remember }}>
          <Form.Item label={t('Email Address')} name="email" validateStatus={errors.email ? 'error' : ''} help={errors.email}>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label={t('Password')} name="password" validateStatus={errors.password ? 'error' : ''} help={errors.password}>
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)}>
                {t('Remember Password')}
              </Checkbox>
              <NavLink to="/forgot-password">
                {t('Forgot Password?')}
              </NavLink>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="button" block>
              {t('Sign In')}
            </Button>
          </Form.Item>
        </Form>
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: 16 }}>
          {t("Don't have an account?")}{' '}
          <NavLink to="/signup" className="link">
            {t('Create Account')}
          </NavLink>
        </Text>
      </Card>
    </div>
  );
};

export default SignIn;
