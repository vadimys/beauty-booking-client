// src/components/Dashboard.tsx
import React from 'react';
import { Typography } from 'antd';

const Dashboard: React.FC = () => {
    return (
        <div>
            <Typography.Title level={2}>Dashboard</Typography.Title>
            <Typography.Paragraph>
                Welcome to the Dashboard!
            </Typography.Paragraph>
        </div>
    );
};

export default Dashboard;
