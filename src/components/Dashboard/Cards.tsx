import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import '../../styles/Dashboard.css';

const { Title, Text } = Typography;

const cardsData = [
  { title: 'Active Users', value: '50,123', icon: <UserOutlined />, change: '5.2% Up from yesterday', color: 'green' },
  { title: 'New Orders', value: '12,345', icon: <ShoppingCartOutlined />, change: '2.1% Up from last week', color: 'green' },
  { title: 'Revenue', value: '$120,000', icon: <DollarOutlined />, change: '3.7% Down from yesterday', color: 'red' },
  { title: 'Pending Requests', value: '1,234', icon: <ClockCircleOutlined />, change: '0.9% Up from yesterday', color: 'green' },
];

const Cards = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <Row gutter={[16, 16]} className="cards-row">
      {cardsData.map((card, index) => (
        <Col xs={24} sm={12} md={6} key={index}>
          <Card
            className={`card ${isDarkMode ? 'dark-mode' : ''}`}
          >
            <div className="card-header">
              <Title level={4} ellipsis={{ tooltip: card.title }} className={`card-title ${isDarkMode ? 'dark-mode' : ''}`}>
                {card.title}
              </Title>
              {card.icon}
            </div>
            <Title level={2} className={`card-value ${isDarkMode ? 'dark-mode' : ''}`}>{card.value}</Title>
            <Text style={{ color: card.color }} ellipsis={{ tooltip: card.change }}>
              {card.change}
            </Text>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Cards;
