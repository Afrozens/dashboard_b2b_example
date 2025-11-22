"use client";

import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

interface ChartProps {
  data: any;
  chartColor: string;
}

const Chart = ({ data, chartColor }: ChartProps) => {
  switch (data.chartType) {
    case 'line':
      return <LineChart data={data} chartColor={chartColor} />;

    case 'bar':
      return <BarChart data={data} chartColor={chartColor} />;

    case 'pie':
      return <PieChart data={data} chartColor={chartColor} />;

    default:
      return <div className="text-center text-gray-500 py-8">Chart type not supported</div>;
  }
};

export default Chart;