import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import * as yup from 'yup';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ email?: string }>({});
  const navigate = useNavigate();
  const { t } = useTranslation();

  const schema = yup.object().shape({
    email: yup.string().email(t('Email is invalid')).required(t('Email is required')),
  });

  const validate = async () => {
    try {
      await schema.validate({ email }, { abortEarly: false });
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

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = await validate();
    if (isValid) {
      // Mock password reset logic
      console.log('Password reset link sent to:', email);
      navigate('/login');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  backgroundColor: '#f4f6fc' }}>
      <Card style={{ width: '100%', maxWidth: '400px', padding: '20px', borderRadius: '5px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <Typography.Title level={3} style={{ textAlign: 'center', fontWeight: 'bold' }}>
          {t('Reset Password')}
        </Typography.Title>
        <Typography.Text style={{ textAlign: 'center', color: '#6b7280', marginBottom: '20px', display: 'block' }}>
          {t('Enter your email to receive a password reset link')}
        </Typography.Text>
        <Form onFinish={handleResetPassword}>
          <Form.Item
            label={t('Email Address')}
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email}
          >
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {t('Send Reset Link')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
