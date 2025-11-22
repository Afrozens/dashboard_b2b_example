"use client";

import { Column } from '@ant-design/plots';

interface BarChartProps {
  data: any;
  chartColor: string;
}

const BarChart = ({ data, chartColor }: BarChartProps) => {
  const barData = data.data.months.map((month: string, index: number) => ({
    month,
    'New Clients': data.data.newClients[index],
    'Returning Clients': data.data.returningClients[index],
  }));

  const barConfig = {
    data: barData,
    xField: 'month',
    yField: ['New Clients', 'Returning Clients'],
    color: [chartColor, `${chartColor}80`],
    isStack: false,
    height: 250,
    interactions: [
      {
        type: 'element-highlight',
      },
    ],
  };

  return <Column {...barConfig} />;
};

export default BarChart;