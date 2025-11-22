export interface Client {
    id: string;
    name: string;
    email: string;
}

export interface BaseStats {
  title: string;
  count: number;
  additionalData?: Record<string, number | string>;
}

export interface ClientStats extends BaseStats {
  additionalData: {
    newThisMonth: number;
    activeNow: number;
    satisfactionRate: number;
  };
}

export interface ComputerStats extends BaseStats {
  additionalData: {
    totalComputers: number;
    available: number;
    maintenanceMode: number;
  };
}

export interface SalesStats extends BaseStats {
  additionalData: {
    completed: number;
    pending: number;
    conversionRate: number;
  };
}

export interface RevenueStats extends BaseStats {
  additionalData: {
    monthlyTarget: number;
    growth: number;
    averageTicket: number;
  };
}

export interface BaseChart {
  title: string;
  chartType: 'line' | 'bar' | 'pie' | 'area';
  data: RevenueChartData | ClientChartData | ServiceChartData | ComputerChartData;
}

export interface RevenueChartData {
  months: string[];
  revenue: number[];
  growth: number[];
}

export interface ClientChartData {
  months: string[];
  newClients: number[];
  returningClients: number[];
}

export interface ServiceChartData {
  services: string[];
  counts: number[];
  percentages: number[];
}

export interface ComputerChartData {
  categories: string[];
  available: number[];
  inUse: number[];
  maintenance: number[];
}

export interface RevenueChart extends BaseChart {
  chartType: 'line';
  data: RevenueChartData;
}

export interface ClientChart extends BaseChart {
  chartType: 'bar';
  data: ClientChartData;
}

export interface ServiceChart extends BaseChart {
  chartType: 'pie';
  data: ServiceChartData;
}

export interface ComputerChart extends BaseChart {
  chartType: 'area';
  data: ComputerChartData;
}