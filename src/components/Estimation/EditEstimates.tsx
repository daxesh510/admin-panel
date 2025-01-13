import React, { useState, useEffect } from "react";
import { Table, Input, InputNumber, Button, Space, Typography, Card, Layout, Modal, Form, Divider, Empty, Select, Row, Col, Alert } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { Estimate, Item } from "../../types/estimates";
import { calculateCategoryTotal, calculateTotalMargin, calculateGrandTotal } from "../../utils/calculation";
import '../../styles/Estimation.css';
import { createEstimate, updateEstimate } from "../../store/estimatesSlice";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";

const { Title, Text } = Typography;
const { Content } = Layout;
const { Option } = Select;

const EditEstimates: React.FC = () => {
  const location = useLocation();
  const { details, addNew, estimate } = location?.state || {};
  const [items, setItems] = useState<Item[]>(Array.isArray(details) ? details : []);
  console.log(details,items)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [version, setVersion] = useState(estimate?.version || "");
  const [project, setProject] = useState(estimate?.project || "");
  const [client, setClient] = useState(estimate?.client || "");
  const [status, setStatus] = useState(estimate?.status || "");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (Array.isArray(details)) {
      setItems(details);
    }
  }, [details]);

  const handleAddItem = (category: string) => {
    const newItem: Item = {
      key: items.length + 1,
      item: "",
      description: "",
      unit: "",
      quantity: 0,
      price: 0,
      margin: 0,
      category,
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (key: number) => {
    const newItems = items.filter((item) => item.key !== key);
    setItems(newItems);
  };

  const handleChange = (key: number, field: keyof Item, value: string | number) => {
    const newItems = items.map((item) => (item.key === key ? { ...item, [field]: value } : item));
    setItems(newItems);
  };

  const categories = Array.from(new Set(items.map((item) => item.category)));

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      handleAddItem(newCategory);
      setNewCategory("");
      setIsModalVisible(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const estimateData: Estimate = {
        id: addNew ? undefined : estimate.id,
        version,
        project,
        client,
        status,
        createdDate: addNew ? new Date().toISOString() : estimate.createdDate,
        lastModifiedDate: new Date().toISOString(),
        details: items,
      };
      if (addNew) {
        await dispatch(createEstimate(estimateData));
      } else {
        await dispatch(updateEstimate({ id: estimate.id, data: estimateData }));
      }
      navigate("/estimation");
    } catch (error) {
      console.error("Error saving estimate:", error);
    }
  };

  return (
    <Layout className="estimation-layout">
      <Content className="estimation-content">
        <div className="estimation-header">
          <Title level={3} className="estimation-title">{addNew ? 'Add New Estimates' : 'Edit Estimates'}</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="add-category-button"
          >
            Add New Category
          </Button>
        </div>
        {addNew && (
          <Alert
            message="Please add a new category before adding items."
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        <Form layout="vertical" className="estimation-form">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Version" required>
                <Input value={version} onChange={(e) => setVersion(e.target.value)} placeholder="Enter version" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Project" required>
                <Input value={project} onChange={(e) => setProject(e.target.value)} placeholder="Enter project" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Client" required>
                <Input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Enter client" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Status" required>
                <Select value={status} onChange={(value) => setStatus(value)} placeholder="Select status">
                  <Option value="Created">Created</Option>
                  <Option value="Processing">Processing</Option>
                  <Option value="Rejected">Rejected</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        {categories.length === 0 ? (
          <Empty description="No estimates found" />
        ) : (
          categories.map((category) => (
            <Card key={category} className="category-card">
              <div className="category-header">
                <Title level={4} className="category-title">{category}</Title>
                <Text strong className="category-total">$ {calculateCategoryTotal(items, category).toFixed(2)}</Text>
              </div>
              <Divider />
              <Table
                dataSource={items.filter((item) => item.category === category)}
                pagination={false}
                rowKey="key"
                bordered
                className="estimation-table"
              >
                <Table.Column
                  title="Item"
                  dataIndex="item"
                  render={(text, record) => (
                    <Input value={text} onChange={(e) => handleChange(record.key, "item", e.target.value)} />
                  )}
                />
                <Table.Column
                  title="Description"
                  dataIndex="description"
                  render={(text, record) => (
                    <Input value={text} onChange={(e) => handleChange(record.key, "description", e.target.value)} />
                  )}
                />
                <Table.Column
                  title="Unit"
                  dataIndex="unit"
                  render={(text, record) => (
                    <Input value={text} onChange={(e) => handleChange(record.key, "unit", e.target.value)} />
                  )}
                />
                <Table.Column
                  title="Quantity"
                  dataIndex="quantity"
                  render={(text, record) => (
                    <InputNumber value={text} onChange={(value) => handleChange(record.key, "quantity", value)} />
                  )}
                />
                <Table.Column
                  title="Price ($)"
                  dataIndex="price"
                  render={(text, record) => (
                    <InputNumber value={text} onChange={(value) => handleChange(record.key, "price", value)} />
                  )}
                />
                <Table.Column
                  title="Margin (+/-)"
                  dataIndex="margin"
                  render={(text, record) => (
                    <InputNumber value={text} onChange={(value) => handleChange(record.key, "margin", value)} />
                  )}
                />
                <Table.Column
                  title="Total Amount"
                  dataIndex="totalAmount"
                  render={(text, record) => {
                    const totalAmount =
                      record.quantity * record.price + (record.quantity * record.price * record.margin) / 100;
                    return <Text>$ {totalAmount.toFixed(2)}</Text>;
                  }}
                />
                <Table.Column
                  title="Action"
                  render={(text, record) => (
                    <Space size="middle">
                      <Button onClick={() => handleDeleteItem(record.key)} icon={<MinusOutlined />} type="default" />
                      {items.filter((item) => item.category === record.category).slice(-1)[0].key === record.key && (
                        <Button onClick={() => handleAddItem(record.category)} icon={<PlusOutlined />} type="primary" />
                      )}
                    </Space>
                  )}
                />
              </Table>
              <div className="category-footer">
                <Text strong>Margin Total: ${calculateCategoryTotal(items, category).toFixed(2)}</Text>
              </div>
            </Card>
          ))
        )}
        {categories.length > 0 && (
          <>
            <div className="summary-card-container">
              <Card className="summary-card">
                <div className="summary-row">
                  <Text>Sub Total:</Text>
                  <Text>$ {calculateGrandTotal(items).toLocaleString()}</Text>
                </div>
                <Divider />
                <div className="summary-row">
                  <Text>Total Margin:</Text>
                  <Text>$ {calculateTotalMargin(items).toLocaleString()}</Text>
                </div>
                <Divider />
                <div className="summary-row">
                  <Text strong>Total Amount:</Text>
                  <Text strong>$ {calculateGrandTotal(items).toLocaleString()}</Text>
                </div>
              </Card>
            </div>
            <div className="action-buttons">
              <Button type="primary" className="submit-button" onClick={handleSubmit}>Submit</Button>
              <Button type="default" onClick={() => navigate("/estimation")}>Cancel</Button>
            </div>
          </>
        )}
        <Modal
          title="Add New Category"
          visible={isModalVisible}
          onOk={handleAddCategory}
          onCancel={() => setIsModalVisible(false)}
          okText="Add Category"
          cancelText="Cancel"
        >
          <Form layout="vertical">
            <Form.Item label="Category Name" required>
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter category name"
              />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default EditEstimates;
