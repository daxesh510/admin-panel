import React from 'react';
import { Card, Typography } from 'antd';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useTranslation } from '../../hooks/useTranslation';
import '../../styles/Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const { t } = useTranslation();

  const chartData = {
    labels: ['5k', '10k', '15k', '20k', '25k', '30k', '35k', '40k', '45k', '50k', '55k', '60k'],
    datasets: [
      {
        label: 'Sales',
        data: [20, 40, 30, 90, 50, 40, 60, 70, 20, 50, 40, 60],
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(233, 234, 241, 0.2)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        grid: {
          color: isDarkMode ? '#054887' : '#ccc',
        },
        ticks: {
          color: isDarkMode ? '#fff' : '#000',
        },
      },
      y: {
        grid: {
          color: isDarkMode ? '#054887' : '#ccc',
        },
        ticks: {
          color: isDarkMode ? '#fff' : '#000',
        },
      },
    },
  };

  return (
    <Card
      className={`chart-card ${isDarkMode ? 'dark-mode' : ''}`}
    >
      <Typography.Title level={4} className={`chart-title ${isDarkMode ? 'dark-mode' : ''}`}>
        {t('Sales Chart')}
      </Typography.Title>
      <Line data={chartData} options={chartOptions} />
    </Card>
  );
};

export default Chart;
