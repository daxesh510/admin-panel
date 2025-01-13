import React, { useEffect, useState } from "react";
import {
  Layout,
  Table,
  Select,
  Button,
  Space,
  Tag,
  DatePicker,
  Modal,
  Form,
  Input,
  message,
  Typography,
  Row,
  Col,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import {
  fetchProjectsAsync,
  createProjectAsync,
  updateProjectAsync,
  deleteProjectAsync,
} from "../../store/projectsSlice";
import { getProjectStatusColor } from "../../utils/statusColor";
import { formatDate, parseProjectData } from "../../utils/commonFunctions";
import { Project } from "../../types/projects";
import '../../styles/Projects.css';

const { Option } = Select;

const Projects = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading } = useSelector((state: RootState) => state.projects);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form] = Form.useForm();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    dispatch(fetchProjectsAsync());
  }, [dispatch]);

  const handleDateFilterChange = (dateString: string) => {
    setDateFilter(dateString);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsModalVisible(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalVisible(true);
    form.setFieldsValue(parseProjectData(project));
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await dispatch(deleteProjectAsync(id)).unwrap();
      message.success("Project deleted successfully");
    } catch (error) {
      message.error(`Error deleting project: ${error}`);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const projectData = {
        ...values,
        projectReference: {
          title: values.projectReference.title,
          name: values.projectReference.name,
        },
        projectLocation: {
          title: values.projectLocation.title,
          name: values.projectLocation.name,
        },
        assignedTo: {
          manager: values.assignedTo.manager,
          staff: values.assignedTo.staff,
        },
      };
      if (editingProject) {
        await dispatch(updateProjectAsync({ id: editingProject.id, projectData })).unwrap();
        message.success("Project updated successfully");
      } else {
        await dispatch(createProjectAsync(projectData)).unwrap();
        message.success("Project added successfully");
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error(`Error saving project: ${error}`);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const filteredProjects = projects.filter((project) => {
    const matchesDate = dateFilter
      ? new Date(project.dueDate).toDateString() === new Date(dateFilter).toDateString()
      : true;
    const matchesStatus = statusFilter ? project.status === statusFilter : true;
    return matchesDate && matchesStatus;
  });

  const columns = [
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      sorter: (a: Project, b: Project) => a.customer.localeCompare(b.customer),
    },
    {
      title: "REF Number",
      dataIndex: "refNumber",
      key: "refNumber",
      sorter: (a: Project, b: Project) => a.refNumber.localeCompare(b.refNumber),
    },
    {
      title: "Project Reference",
      key: "projectReference",
      children: [
        {
          title: "Project Name",
          dataIndex: ["projectReference", "title"],
          sorter: (a: Project, b: Project) => a.projectReference.title.localeCompare(b.projectReference.title),
        },
        {
          title: "Project Number",
          dataIndex: ["projectReference", "name"],
          sorter: (a: Project, b: Project) => a.projectReference.name.localeCompare(b.projectReference.name),
        },
      ],
    },
    {
      title: "Project Location",
      key: "projectLocation",
      children: [
        {
          title: "Area location",
          dataIndex: ["projectLocation", "title"],
          sorter: (a: Project, b: Project) => a.projectLocation.title.localeCompare(b.projectLocation.title),
        },
        {
          title: "Address",
          dataIndex: ["projectLocation", "name"],
          sorter: (a: Project, b: Project) => a.projectLocation.name.localeCompare(b.projectLocation.name),
        },
      ],
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: (a: Project, b: Project) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      render: (dueDate: string) => formatDate(dueDate),
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
      sorter: (a: Project, b: Project) => a.contact.localeCompare(b.contact),
    },
    {
      title: "Assigned To",
      key: "assignedTo",
      children: [
        {
          title: "Manager",
          dataIndex: ["assignedTo", "manager"],
          sorter: (a: Project, b: Project) => a.assignedTo.manager.localeCompare(b.assignedTo.manager),
        },
        {
          title: "Staff",
          dataIndex: ["assignedTo", "staff"],
          sorter: (a: Project, b: Project) => a.assignedTo.staff.localeCompare(b.assignedTo.staff),
        },
      ],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a: Project, b: Project) => a.status.localeCompare(b.status),
      render: (status: string) => <Tag color={getProjectStatusColor(status)}>{status}</Tag>,
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
      sorter: (a: Project, b: Project) => a.comments.localeCompare(b.comments),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Project) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEditProject(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDeleteProject(record?.id)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Layout className={`projects-layout ${isDarkMode ? "dark-mode" : ""}`}>
        <Row justify="space-between" align="middle" className="projects-header">
          <Col>
            <Typography.Title level={3} className={`projects-title ${isDarkMode ? "dark-mode" : ""}`}>
              Projects
            </Typography.Title>
          </Col>
          <Col>
            <Space>
              <DatePicker placeholder="Filter by date" onChange={handleDateFilterChange} />
              <Select
                placeholder="Filter by Status"
                value={(statusFilter || undefined) as string}
                onChange={handleStatusFilterChange}
                className={`status-filter ${isDarkMode ? "dark-mode" : ""}`}
                allowClear
              >
                <Option value="Completed">Completed</Option>
                <Option value="Processing">Processing</Option>
                <Option value="Rejected">Rejected</Option>
              </Select>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddProject}>
                Add Project
              </Button>
            </Space>
          </Col>
        </Row>
        <div className={`projects-table ${isDarkMode ? "dark-mode" : ""}`}>
          <Table
            columns={columns}
            dataSource={filteredProjects}
            rowKey="refNumber"
            loading={loading}
            scroll={{ x: "max-content", y: 400 }}

          />
        </div>
        <Modal
          title={editingProject ? "Edit Project" : "Add Project"}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="customer"
              label="Customer"
              rules={[{ required: true, message: "Please input the customer!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="refNumber"
              label="REF Number"
              rules={[{ required: true, message: "Please input the REF number!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["projectReference", "title"]}
              label="Project Name"
              rules={[{ required: true, message: "Please input the project name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["projectReference", "name"]}
              label="Project Number"
              rules={[{ required: true, message: "Please input the project number!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["projectLocation", "title"]}
              label="Area Location"
              rules={[{ required: true, message: "Please input the area location!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["projectLocation", "name"]}
              label="Address"
              rules={[{ required: true, message: "Please input the address!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="dueDate"
              label="Due Date"
              rules={[{ required: true, message: "Please input the due date!" }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="contact"
              label="Contact"
              rules={[{ required: true, message: "Please input the contact!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["assignedTo", "manager"]}
              label="Manager"
              rules={[{ required: true, message: "Please input the manager!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["assignedTo", "staff"]}
              label="Staff"
              rules={[{ required: true, message: "Please input the staff!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select the status!" }]}>
              <Select>
                <Option value="Completed">Completed</Option>
                <Option value="Processing">Processing</Option>
                <Option value="Rejected">Rejected</Option>
              </Select>
            </Form.Item>
            <Form.Item name="comments" label="Comments">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    </>
  );
};

export default Projects;
