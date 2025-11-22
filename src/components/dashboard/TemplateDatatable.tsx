'use client';

import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useQuery } from '@tanstack/react-query';

import { Paginate } from '@/models/common';
import usePaginate from '@/hooks/usePaginate';
import useDatatable from '@/hooks/useDatatable';

interface Props<T> {
  columns: ColumnsType<T>;
  classService: (
    page?: number,
    limit?: number,
    filter?: string,
    sortField?: string,
    sortOrder?: 'ascend' | 'descend',
  ) => Promise<Paginate<T>>;
  name?: string;
  filter?: string;
  option?: string[];
  withCache?: boolean;
  sortableColumns?: string[];
}

const TemplateDatatable = <T extends object>({
  columns,
  classService,
  name,
  filter,
  option,
  withCache = true,
  sortableColumns = [],
}: Props<T>) => {
  const { currentPage, handlePage } = usePaginate();
  const {
    handleTableChange,
    enhancedColumns,
    sortField,
    sortOrder,
  } = useDatatable<T>({columns, sortableColumns, handlePage, currentPage})

  const { data, isLoading } = useQuery({
    queryKey: [`paginate-${name}`, filter, currentPage, option, sortField, sortOrder],
    queryFn: async () => {
        const data = await classService(
          currentPage,
          10,
          filter?.toLowerCase(),
          sortField,
          sortOrder,
        );
        return data;
    },
    staleTime: withCache ? 100 * 60 : 0,
    gcTime: withCache ? 100 * 60 : 0,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="w-full truncate p-4 md:p-10">
      <Table<T>
        scroll={{ x: 500 }}
        className="my-10"
        columns={enhancedColumns}
        loading={isLoading}
        onChange={handleTableChange}
        pagination={{
          position: ['none', 'bottomCenter'],
          onChange(page) {
            handlePage(page);
          },
          pageSize: data?.pageSize,
          total: data?.totalRecord,
          current: data?.pageNumber,
        }}
        dataSource={data?.data}
        rowKey={`row_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`}
      />
    </div>
  );
};

export default TemplateDatatable;