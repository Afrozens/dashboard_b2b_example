"use client";

import { Pie } from '@ant-design/plots';

interface PieChartProps {
  data: any;
  chartColor: string;
}

const PieChart = ({ data, chartColor }: PieChartProps) => {
  const pieData = data.data.services.map((service: string, index: number) => ({
    service,
    count: data.data.counts[index],
    percentage: data.data.percentages[index],
  }));

  const pieConfig = {
    data: pieData,
    angleField: 'count',
    colorField: 'service',
    color: [chartColor, '#0a9396', '#ee9b00', '#ca6702', '#9b2226'],
    radius: 0.8,
    height: 250,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'element-highlight',
      },
      {
        type: 'legend-highlight',
      },
    ],
  };

  return <Pie {...pieConfig} />;
};

export default PieChart;