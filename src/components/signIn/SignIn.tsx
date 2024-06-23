import React, { useState, useEffect } from 'react';
import { Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SignInForm from './SignInForm';
import SignInWith from './SignInWith';
import CreateAccountForm from './CreateAccountForm';
import {CredentialResponse} from '@react-oauth/google';

const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;

interface SignInProps {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setUserType: (userType: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ setIsAuthenticated, setUserType }) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);
    const navigate = useNavigate();

    const onFinishSignIn = async (values: any) => {
        setError(null);
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', values);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userType', response.data.userType);
            setIsAuthenticated(true);
            setUserType(response.data.userType);
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Login error:', error);
            setError(error.response?.data?.error || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const onFinishCreateAccount = async (values: any) => {
        setError(null);
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/auth/register', values);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userType', response.data.userType);
            setIsAuthenticated(true);
            setUserType(response.data.userType);
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Registration error:', error);
            setError(error.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const responseGoogle = async (response: CredentialResponse) => {
        if (response.credential) {
            setLoading(true);
            try {
                const res = await axios.post('http://localhost:3000/api/auth/google', { token: response.credential });
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userType', res.data.userType);
                setIsAuthenticated(true);
                setUserType(res.data.userType);
                navigate('/dashboard');
            } catch (error) {
                console.error('Google sign-in error:', error);
                setError('Google sign-in failed. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        const initializeGoogleSignIn = () => {
            if (window.google && window.google.accounts) {
                window.google.accounts.id.initialize({
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
                    callback: responseGoogle,
                });
                window.google.accounts.id.renderButton(
                    document.getElementById('google-signin-button')!,
                    { theme: 'outline', size: 'large' }
                );
            } else {
                console.error('Google API not loaded');
            }
        };

        initializeGoogleSignIn();
    }, []);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ color: 'white', textAlign: 'center', padding: 10 }}>
                <Title level={2} style={{ color: 'white', margin: 0 }}>Beauty Booking</Title>
            </Header>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                <div className="form-row">
                    <div className="form-col">
                        {isCreatingAccount ? (
                            <CreateAccountForm onFinish={onFinishCreateAccount} error={error} loading={loading} setIsCreatingAccount={setIsCreatingAccount} />
                        ) : (
                            <SignInForm onFinish={onFinishSignIn} error={error} loading={loading} setIsCreatingAccount={setIsCreatingAccount} />
                        )}
                    </div>
                    <div className="divider"></div>
                    <div className="form-col">
                        <SignInWith responseGoogle={responseGoogle} setError={setError} error={error} />
                        <div id="google-signin-button" style={{ display: 'none' }}></div>
                    </div>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                <Text type="secondary">Easy booking, easy working!</Text>
            </Footer>
        </Layout>
    );
};

export default SignIn;
