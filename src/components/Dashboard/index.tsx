import { FC } from "react";
import { Col, Layout, Row, Typography } from "antd";
import Cards from "./Cards";
import Chart from "./Chart";
import Table from "./ProductTable";
import '../../styles/Dashboard.css';

const { Content } = Layout;

const Dashboard: FC = () => {
  return (
    <>
      <Layout className="dashboard-layout">
        <Row justify="space-between" align="middle" className="dashboard-header">
          <Col>
            <Typography.Title level={3}>Dashboard</Typography.Title>
          </Col>
        </Row>
        <Content>
          <Cards />
          <Chart />
          <Table />
        </Content>
      </Layout>
    </>
  );
};

export default Dashboard;
