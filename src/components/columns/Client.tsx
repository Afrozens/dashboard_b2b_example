'use client';

import { TableProps } from 'antd';


import { Client } from '@/models/client';
import Cellclient from '../cells/CellClient';
import Actionclient from '../actions/ActionClient';

const columnclient = () => {
  const columns: TableProps<Client>['columns'] = [
    {
      width: 150,
      title: 'Information Main',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <Cellclient record={record} />,
    },
    {
      width: 150,
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => (
        <span> {text} </span>
      ),
    },
    {
      width: 150,
      title: 'Actions',
      key: crypto.randomUUID(),
      render: (text, record) => (
        <Actionclient record={record} />
      ),
    },
  ];
  return columns;
};

export default columnclient;
