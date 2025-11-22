'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, Spin } from 'antd';
import ButtonPrimary from '../commons/buttons/ButtonPrimary';
import { colors } from '@/utils/getSplitName';
import Chart from './visualizators/Chart';

interface Props {
  classService: () => Promise<any>;
  name: string;
  withCache?: boolean;
}

const Visualizator = ({
  classService,
  name,
  withCache = true,
}: Props) => {
  const { data, isLoading, error, refetch, dataUpdatedAt } = useQuery({
    queryKey: [`chart-${name}`],
    queryFn: async () => {
      const data = await classService();
      return data;
    },
    staleTime: withCache ? 100 * 60 : 0,
    gcTime: withCache ? 100 * 60 : 0,
    refetchOnWindowFocus: false,
  });

  const handleRetry = async () => {
    await refetch();
  };

  const formatLastUpdate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const chartColor = colors[name?.charCodeAt(0) % colors.length] || '#005f73';

  return (
    <Card className="w-full h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {data ? data?.title : "Loading..."}
        </h3>
        {isLoading && <Spin size="small" />}
      </div>

      <div className="flex-1 min-h-[300px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Spin size="large" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">
            <p>Error loading chart data</p>
            <ButtonPrimary 
              type="button" 
              onClick={handleRetry}
              className="mt-2"
            >
              Retry
            </ButtonPrimary>
          </div>
        ) : data ? (
          <Chart data={data} chartColor={chartColor} />
        ) : null}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          {dataUpdatedAt && `Last Update: ${formatLastUpdate(dataUpdatedAt)}`}
        </div>
        
        <ButtonPrimary 
          type="button" 
          onClick={handleRetry}
          disabled={isLoading}
          className="text-xs py-1 px-3"
        >
          {isLoading ? 'Loading...' : 'Retry'}
        </ButtonPrimary>
      </div>
    </Card>
  );
};

export default Visualizator;