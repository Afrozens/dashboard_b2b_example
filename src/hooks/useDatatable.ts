import { ColumnsType } from "antd/es/table";
import { FilterValue, SorterResult, TablePaginationConfig } from 'antd/es/table/interface';
import { useState } from "react";

interface Props<T> {
    sortableColumns?: string[];
    columns: ColumnsType<T>;
    handlePage: (page: number) => void;
    currentPage: number;
}

const useDatatable= <T extends object>({ columns, sortableColumns, handlePage, currentPage }: Props<T>) => {
    const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend'>('ascend');

  const enhancedColumns = columns.map(column => {
    const key = Array.isArray(column.key) 
      ? column.key.join('.') 
      : column.key;
    
    const isSortable = sortableColumns?.includes(String(key));

    return {
      ...column,
      sorter: isSortable,
      sortOrder: sortField === key ? sortOrder : null,
    };
  });

   const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
  ) => {
    if (pagination.current !== currentPage) {
      handlePage(pagination.current || 1);
    }

    if (sorter && !Array.isArray(sorter) && sorter.field) {
      const field = Array.isArray(sorter.field) 
        ? sorter.field.join('.') 
        : sorter.field;
      
      const order = sorter.order as 'ascend' | 'descend';

      if (sortableColumns?.includes(String(field))) {
        setSortField(String(field));
        setSortOrder(order);
      }
    } else {
      setSortField('');
      setSortOrder('ascend');
    }
  };

  return {
    handleTableChange, 
    enhancedColumns,
    sortField,
    sortOrder
  }

}

export default useDatatable;