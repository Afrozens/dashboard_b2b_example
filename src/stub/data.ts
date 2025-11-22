import { faker } from "@faker-js/faker";

import { User } from "@/models/user";
import { ClientChart, ClientStats, ComputerStats, RevenueChart, RevenueStats, SalesStats } from "@/models/client";

export const stubUser: User = {
    id: 'asjdlkjsdlkasjdlkadjslkajsd',
    name: 'John Doe',
    email: 'admin@b2b.com',
    role: 'admin'
}

export const corporateDomains = [
    'empresa.com',
];

export const generateUserMethod = () => {
    const firstName = faker.person.firstName();
    const domain = faker.helpers.arrayElement(corporateDomains);
    
    return {
        id: `emp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        name: `${firstName}`,
        email: `${firstName.toLowerCase()}-${faker.word.verb()}@${domain}`,
    };
};

export const generateUsers = (count: number) => {
    return Array.from({ length: count }, () => generateUserMethod());
};

export const generateClientStats = (): Omit<ClientStats, 'title'> => {
  return {
    count: faker.number.int({ min: 150, max: 800 }),
    additionalData: {
      newThisMonth: faker.number.int({ min: 15, max: 80 }),
      activeNow: faker.number.int({ min: 30, max: 120 }),
      satisfactionRate: faker.number.float({ min: 85, max: 99, fractionDigits: 1 })
    }
  };
};

export const generateComputerStats = (): Omit<ComputerStats, 'title'> => {
  return {
    count: faker.number.int({ min: 5, max: 25 }),
    additionalData: {
      totalComputers: faker.number.int({ min: 50, max: 200 }),
      available: faker.number.int({ min: 20, max: 80 }),
      maintenanceMode: faker.number.int({ min: 1, max: 10 })
    }
  };
};

export const generateSalesStats = (): Omit<SalesStats, 'title'> => {
  return {
    count: faker.number.int({ min: 500, max: 2000 }),
    additionalData: {
      completed: faker.number.int({ min: 450, max: 1800 }),
      pending: faker.number.int({ min: 10, max: 100 }),
      conversionRate: faker.number.float({ min: 65, max: 95, fractionDigits: 1 })
    }
  };
};

export const generateRevenueStats = (): Omit<RevenueStats, 'title'> => {
  return {
    count: faker.number.int({ min: 25000, max: 150000 }),
    additionalData: {
      monthlyTarget: faker.number.int({ min: 100000, max: 300000 }),
      growth: faker.number.float({ min: -5, max: 25, fractionDigits: 1 }),
      averageTicket: faker.number.int({ min: 50, max: 200 })
    }
  };
};

export const generateRevenueChartData = (): Omit<RevenueChart, 'title' | 'chartType'> => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return {
    data: {
      months: months.slice(0, 6),
      revenue: Array.from({ length: 6 }, () => 
        faker.number.int({ min: 20000, max: 100000 })
      ),
      growth: Array.from({ length: 6 }, () => 
        faker.number.float({ min: -10, max: 25, fractionDigits: 1 })
      )
    }
  };
};

export const generateClientChartData = (): Omit<ClientChart, 'title' | 'chartType'> => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  return {
    data: {
      months,
      newClients: Array.from({ length: 6 }, () => 
        faker.number.int({ min: 20, max: 100 })
      ),
      returningClients: Array.from({ length: 6 }, () => 
        faker.number.int({ min: 50, max: 200 })
      )
    }
  };
};