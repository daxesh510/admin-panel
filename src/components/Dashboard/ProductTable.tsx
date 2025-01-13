import React, { useState } from 'react';
import { Table, Tag, Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getStatusColor } from '../../utils/statusColor';
import '../../styles/Dashboard.css';

interface Product {
  key: number;
  name: string;
  location: string;
  date: string;
  piece: number;
  amount: string;
  status: string;
}

const rows: Product[] = [
  { key: 1, name: 'Apple watch', location: 'USA', date: '01/10/2025', piece: 100, amount: '$1000', status: 'Completed' },
  { key: 2, name: 'Samsung S25 ultra', location: 'UK', date: '02/10/2025', piece: 200, amount: '$2000', status: 'Pending' },
  { key: 3, name: 'Google Pixel 6', location: 'Canada', date: '03/10/2025', piece: 150, amount: '$1500', status: 'Cancelled' },
  { key: 4, name: 'Sony WH-1000XM4', location: 'Germany', date: '04/10/2025', piece: 50, amount: '$500', status: 'Completed' },
  { key: 5, name: 'Dell XPS 13', location: 'France', date: '05/10/2025', piece: 75, amount: '$750', status: 'Pending' },
  { key: 6, name: 'MacBook Pro', location: 'Australia', date: '06/10/2025', piece: 120, amount: '$1200', status: 'Completed' },
  { key: 7, name: 'iPad Pro', location: 'Japan', date: '07/10/2025', piece: 80, amount: '$800', status: 'Cancelled' },
];

const columns: ColumnsType<Product> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Location',
    dataIndex: 'location',
    sorter: (a, b) => a.location.localeCompare(b.location),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  },
  {
    title: 'Piece',
    dataIndex: 'piece',
    sorter: (a, b) => a.piece - b.piece,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a, b) => parseFloat(a.amount.replace(/[^0-9.-]+/g, "")) - parseFloat(b.amount.replace(/[^0-9.-]+/g, "")),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: status => <Tag color={getStatusColor(status)}>{status}</Tag>,
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
];

const CustomTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  return (
    <>
      <Table
        columns={columns}
        dataSource={rows}
        pagination={false}
        rowKey="key"
      />
      <Pagination
        current={page}
        pageSize={pageSize}
        total={rows.length}
        onChange={(page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        }}
        showSizeChanger
      />
    </>
  );
};

export default CustomTable;
