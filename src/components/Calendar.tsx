// src/components/Calendar.tsx
import React from 'react';
import { Typography } from 'antd';

const Calendar: React.FC = () => {
    return (
        <div>
            <Typography.Title level={2}>Calendar</Typography.Title>
            <Typography.Paragraph>
                This is the Calendar page.
            </Typography.Paragraph>
        </div>
    );
};

export default Calendar;
