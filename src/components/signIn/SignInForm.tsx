import React from 'react';
import {Form, Input, Button, Checkbox, Typography, Row, Col, Spin, Divider} from 'antd';

const { Title, Text } = Typography;

interface SignInFormProps {
    onFinish: (values: any) => void;
    error: string | null;
    loading: boolean;
    setIsCreatingAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignInForm: React.FC<SignInFormProps> = ({ onFinish, error, loading, setIsCreatingAccount }) => (
    <div className="form-container">
        <Title level={3} className="text-center mb-3">Account log in</Title>
        <Form name="login" onFinish={onFinish} layout="vertical" className="form">
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
            >
                <Input placeholder="Your Mobile Number or Email" size="large" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }, { min: 6, message: 'Password must be at least 6 characters!' }]}
            >
                <Input.Password placeholder="Password" size="large" />
            </Form.Item>
            <Form.Item>
                <Checkbox>Keep me signed in</Checkbox>
            </Form.Item>
            <Row>
                <Col>
                    <a href="#">Forgot password?</a>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" disabled={loading}>
                    {loading ? <Spin /> : 'Log in'}
                </Button>
            </Form.Item>
        </Form>
        {error && <Text type="danger">{error}</Text>}
        <Divider>or</Divider>
        <Button type="dashed" block size="large" onClick={() => setIsCreatingAccount(true)}>
            Sign up
        </Button>
    </div>
);

export default SignInForm;
