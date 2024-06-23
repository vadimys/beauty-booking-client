import React, { useState } from 'react';
import { Form, Input, Button, Typography, Spin, Divider } from 'antd';
import zxcvbn from 'zxcvbn';

const { Title, Text } = Typography;

interface CreateAccountFormProps {
    onFinish: (values: any) => void;
    error: string | null;
    loading: boolean;
    setIsCreatingAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FieldErrors {
    email?: string;
    password?: string;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ onFinish, error, loading, setIsCreatingAccount }) => {
    const [form] = Form.useForm();
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [passwordStrength, setPasswordStrength] = useState<number>(0);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleValuesChange = (changedValues: any) => {
        setFieldErrors({});
        setPasswordError(null);

        if (changedValues.password) {
            const result = zxcvbn(changedValues.password);
            setPasswordStrength(result.score);
        }
    };

    const handleFinishFailed = ({ errorFields }: any) => {
        const newErrors: FieldErrors = {};
        let passwordIsWeak = false;
        errorFields.forEach((field: any) => {
            if (field.name[0] === 'password') {
                const result = zxcvbn(field.value || '');
                if (result.score < 3) {
                    passwordIsWeak = true;
                    setPasswordError('Password is too weak!');
                }
            }
            newErrors[field.name[0] as keyof FieldErrors] = field.errors[0];
        });
        if (!passwordIsWeak) {
            setPasswordError(null);
        }
        setFieldErrors(newErrors);
    };

    const passwordRules = [
        { required: true, message: 'Please input your password!' },
        { min: 8, message: 'Password must be at least 8 characters!' },
        () => ({
            validator(_: any, value: string) {
                if (submitted) {
                    const result = zxcvbn(value || '');
                    if (result.score < 3) {
                        return Promise.reject('Password is too weak!');
                    }
                }
                return Promise.resolve();
            },
        }),
    ];


    const handleSubmit = () => {
        setSubmitted(true);
        form.validateFields().then(() => {
            onFinish(form.getFieldsValue());
        }).catch(() => {
            handleFinishFailed({ errorFields: form.getFieldsError() });
        });
    };

    return (
        <div className="form-container">
            <Title level={3} className="text-center mb-3">New account setup</Title>
            <Form
                name="register"
                onFinish={handleSubmit}
                onFinishFailed={handleFinishFailed}
                layout="vertical"
                className="form"
                form={form}
                onValuesChange={handleValuesChange}
            >
                <Form.Item
                    name="email"
                    validateStatus={fieldErrors.email ? 'error' : ''}
                    help={fieldErrors.email}
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input
                        placeholder="Your Email"
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    validateStatus={fieldErrors.password ? 'error' : ''}
                    help={fieldErrors.password}
                    rules={passwordRules}
                >
                    <Input.Password placeholder="Password" size="large" />
                </Form.Item>
                {passwordError && (
                    <Text type="danger">{passwordError}</Text>
                )}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large" disabled={loading}>
                        {loading ? <Spin /> : 'Create account'}
                    </Button>
                </Form.Item>
            </Form>
            {error && <Text type="danger">{error}</Text>}
            <Divider>or</Divider>
            <Button type="dashed" block size="large" onClick={() => setIsCreatingAccount(false)}>
                Log in
            </Button>
        </div>
    );
};

export default CreateAccountForm;
