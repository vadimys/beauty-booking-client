import React from 'react';
import { Button, Typography } from 'antd';
import { CredentialResponse } from '@react-oauth/google';

const { Title, Text } = Typography;

interface SignInWithProps {
    responseGoogle: (response: CredentialResponse) => void;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    error: string | null;
}

const SignInWith: React.FC<SignInWithProps> = ({ responseGoogle, setError, error }) => {

    const handleGoogleSignIn = () => {
        window.google.accounts.id.prompt((notification: any) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                setError('Google sign-in failed. Please try again.');
            }
        });
    };

    return (
        <div className="form-container sign-in-with-container">
            <Title level={3} className="text-center mb-3">Sign in with</Title>
            <Button
                block
                className="mb-2"
                style={{
                    backgroundColor: '#1877F2',
                    color: '#FFFFFF',
                    fontFamily: 'Helvetica, sans-serif',
                    fontWeight: 'bold',
                    marginBottom: '16px'
                }}
                icon={<img src="/facebook.png" alt="Facebook" style={{ marginRight: 8 }} />}
                size="large"
            >
                Sign in with Facebook
            </Button>
            <Button
                block
                className="mb-2"
                style={{
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                    marginBottom: '16px'
                }}
                icon={<img src="/google.png" alt="Google" style={{ marginRight: 8 }} />}
                size="large"
                onClick={handleGoogleSignIn}
            >
                Sign in with Google
            </Button>
            <Button
                block
                className="mb-2"
                style={{
                    backgroundColor: '#000000',
                    color: '#FFFFFF',
                    fontFamily: 'SF Pro Display, sans-serif',
                    fontWeight: 500
                }}
                icon={<img src="/apple.png" alt="Apple" style={{ marginRight: 8 }} />}
                size="large"
            >
                Sign in with Apple
            </Button>
            {error && <Text type="danger">{error}</Text>}
        </div>
    );
};

export default SignInWith;
