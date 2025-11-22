'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, Spin } from 'antd';
import ButtonPrimary from '../commons/buttons/ButtonPrimary';
import { colors } from '@/utils/getSplitName';

interface Props {
  classService: () => Promise<any>;
  icon: React.ReactNode;
  name: string;
  withCache?: boolean;
}

const Widget = ({
  classService,
  icon,
  name,
  withCache = true,
}: Props) => {
  const { data, isLoading, error, refetch, dataUpdatedAt } = useQuery({
    queryKey: [`widget-${name}`],
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

  const widgetColor = colors[name?.charCodeAt(0) % colors.length] || '#005f73';

  return (
    <Card className="w-full h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start gap-4">
        <div 
          className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-lg"
          style={{ backgroundColor: `${widgetColor}15` }}
        >
          <div 
            className="text-3xl"
            style={{ color: widgetColor }}
          >
            {icon}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {data ? data?.title : "N/A"}
            </h3>
            {isLoading && <Spin size="small" />}
          </div>

          <div className="min-h-[60px]">
            {isLoading ? (
              <div className="flex items-center justify-center h-16">
                <Spin />
              </div>
            ) : error ? (
              <div className="text-center text-red-600 py-2">
                <p className="text-sm">Error loading data</p>
              </div>
            ) : (
              <div className="space-y-1">
                {data && (
                  <>
                    <p className="text-3xl font-bold text-gray-800">
                      {data.count?.toLocaleString()}
                    </p>
                    {data.additionalData && (
                      <div className="text-xs text-gray-500">
                        {data.additionalData.growth !== undefined && (
                          <p className={data.additionalData.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                            {data.additionalData.growth > 0 ? '↑' : '↓'} {Math.abs(data.additionalData.growth)}%
                          </p>
                        )}
                        {data.additionalData.newThisMonth !== undefined && (
                          <p className="text-blue-600">
                            +{data.additionalData.newThisMonth} this month
                          </p>
                        )}
                        {data.additionalData.conversionRate !== undefined && (
                          <p className="text-purple-600">
                            {data.additionalData.conversionRate}% conversion
                          </p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-2">
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
        </div>
      </div>
    </Card>
  );
};

export default Widget;