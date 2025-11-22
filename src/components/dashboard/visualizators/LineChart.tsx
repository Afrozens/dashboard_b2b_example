"use client";

import { Line } from '@ant-design/plots';

interface LineChartProps {
  data: any;
  chartColor: string;
}

const LineChart = ({ data, chartColor }: LineChartProps) => {
  const lineData = data.data.months.map((month: string, index: number) => ({
    month,
    revenue: data.data.revenue[index],
    growth: data.data.growth[index],
  }));

  const lineConfig = {
    data: lineData,
    xField: 'month',
    yField: 'revenue',
    color: chartColor,
    point: {
      size: 5,
      shape: 'diamond',
    },
    interactions: [
      {
        type: 'tooltip',
        cfg: {
          render: (e: any, { title, items }: any) => (
            <div key={title}>
              <h4 className="font-semibold mb-2">{title}</h4>
              {items.map((item: any) => (
                <div key={item.name} style={{ margin: '4px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: item.color,
                        marginRight: 8,
                      }}
                    ></span>
                    <span>{item.name}</span>
                  </div>
                  <b>${item.value?.toLocaleString()}</b>
                </div>
              ))}
            </div>
          ),
        },
      },
    ],
    height: 250,
  };

  return <Line {...lineConfig} />;
};

export default LineChart;