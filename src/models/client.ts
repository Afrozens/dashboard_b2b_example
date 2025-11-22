
export interface Client {
    id: string;
    name: string;
    email: string
}

export interface BaseStats {
  title: string;
  count: number;
  additionalData?: Record<string, any>;
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