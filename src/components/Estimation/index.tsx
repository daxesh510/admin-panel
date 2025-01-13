import React, { useEffect } from "react";
import { Table, Button, Tag, Row, Col, Typography, Layout } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { getEstimateStatusColor } from "../../utils/statusColor";
import { useNavigate } from "react-router-dom";
import { fetchEstimates } from "../../store/estimatesSlice";
import { Estimate } from "../../types/estimates";
import '../../styles/Estimation.css';
import moment from "moment";

const { Title } = Typography;

const Estimation = () => {

  const navigate = useNavigate();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch: AppDispatch = useDispatch();
  const estimates = useSelector((state: RootState) => state.estimates.estimates);

  useEffect(() => {
    dispatch(fetchEstimates());
  }, [dispatch]);

  const handleAdd = () => {
    navigate("/edit-estimates",{state: {addNew: true}});
  };

  const handleEdit = (record: Estimate) => {
    navigate("/edit-estimates", { state: { estimate: record, details: record.details, addNew: false } });
  };

  const columns = [
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
      sorter: (a: Estimate, b: Estimate) => a.version.localeCompare(b.version),
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
      sorter: (a: Estimate, b: Estimate) => a.project.localeCompare(b.project),
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      sorter: (a: Estimate, b: Estimate) => a.client.localeCompare(b.client),
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (date: string) => moment(date).format("DD/MM/YYYY"),
      sorter: (a: Estimate, b: Estimate) => moment(a.createdDate).diff(moment(b.createdDate)),
    },
    {
      title: "Last Modified Date",
      dataIndex: "lastModifiedDate",
      key: "lastModifiedDate",
      render: (date: string) => moment(date).format("DD/MM/YYYY"),
      sorter: (a: Estimate, b: Estimate) => moment(a.lastModifiedDate).diff(moment(b.lastModifiedDate)),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Tag color={getEstimateStatusColor(status)}>{status}</Tag>,
      sorter: (a: Estimate, b: Estimate) => a.status.localeCompare(b.status),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Estimate) => (
        <>
          <Button onClick={() => handleEdit(record)} icon={<EditOutlined />} />
        </>
      ),
    },
  ];

  return (
    <Layout className={`estimation-layout ${isDarkMode ? "dark-mode" : ""}`}>
      <Row justify="space-between" align="middle" className="estimation-header">
        <Col>
          <Title level={3} className={`estimation-title ${isDarkMode ? "dark-mode" : ""}`}>
            Estimates
          </Title>
        </Col>
        <Col>
          <Button type="primary" onClick={handleAdd}>
            Add Estimate
          </Button>
        </Col>
      </Row>
      <div className={`estimation-table ${isDarkMode ? "dark-mode" : ""}`}>
        <Table dataSource={estimates} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} size="middle"
            scroll={{ x: "max-content", y: 400 }}

        />
      </div>
    </Layout>
  );
};

export default Estimation;
