import { Client, ClientChart, ClientStats, RevenueChart, RevenueStats } from '@/models/client';
import { Paginate } from '@/models/common';
import { generateClientChartData, generateClientStats, generateComputerStats, generateRevenueChartData, generateRevenueStats, generateSalesStats } from '@/stub/data';
import { faker } from '@faker-js/faker';

/**
 * Service class for handling Client-related operations including:
 * - Paginated Client data retrieval
 * - Global filter and multi-select filtering
 */
class ClientService {
    /**
     * Retrieves a single Client by ID
     * @param {string} id - Client ID
     * @returns {Promise<Client>} The Client data
     * @throws {Error} When Client is not found or request fails
     */
    async getClient(id: string): Promise<Client> {
        try {
            const delay = Math.random() * 500 + 100;
            await new Promise(resolve => setTimeout(resolve, delay));
            
            const allClients: Client[] = JSON.parse(localStorage.getItem('data-stub') || '[]') as Client[];
            
            const Client = allClients.find(emp => emp.id === id);
            
            if (!Client) {
                throw new Error(`Client with ID ${id} not found`);
            }
            return Client;
        } catch (error) {
            console.error('Error getting Client:', error);
            throw error;
        }
    }

    /**
     * Creates a new Client
     * @param {Omit<Client, 'id'>} data - Client data without ID
     * @returns {Promise<Client>} The created Client with generated ID
     * @throws {Error} When the creation fails
     */
    async createClient(data: Partial<Client>): Promise<void> {
        try {
            const delay = Math.random() * 500 + 100;
            await new Promise(resolve => setTimeout(resolve, delay));
            
            const allClients: Client[] = JSON.parse(localStorage.getItem('data-stub') || '[]') as Client[];

            const newClient = {
                ...data,
                id: `emp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            };
            
            const updatedClients = [newClient, ...allClients];
            
            localStorage.setItem('data-stub', JSON.stringify(updatedClients));
        } catch (error) {
            console.error('Error creating Client:', error);
            throw error;
        }
    }

    /**
     * Updates an existing Client
     * @param {string} id - Client ID to update
     * @param {Partial<Client>} ClientData - Partial Client data to update
     * @returns {Promise<Client>} The updated Client
     * @throws {Error} When the update fails or Client is not found
     */
    async editClient(data: Partial<Client>, id?: string | undefined): Promise<void> {
        try {
            const delay = Math.random() * 500 + 100;
            await new Promise(resolve => setTimeout(resolve, delay));
            
            const allClients: Client[] = JSON.parse(localStorage.getItem('data-stub') || '[]') as Client[];
            
            const ClientIndex = allClients.findIndex(Client => Client.id === id);
            
            if (ClientIndex === -1) {
                throw new Error(`Client with ID ${id} not found`);
            }
            
            const updatedClient: Client = {
                ...allClients[ClientIndex],
                ...data,
                id: allClients[ClientIndex].id,
            };
            
            const updatedClients = [...allClients];
            updatedClients[ClientIndex] = updatedClient;
            
            localStorage.setItem('data-stub', JSON.stringify(updatedClients));
        } catch (error) {
            console.error('Error updating Client:', error);
            throw error;
        }
    }

    /**
     * Retrieves paginated Client data with global filter and multi-select filtering
     * @param {number} page - Current page number (default: 1)
     * @param {number} limit - Number of items per page (default: 10)
     * @param {string} filter - Global filter term for name, email, or department
     * @param {string[]} options - Array of selected departments and countries
     * @returns {Promise<Paginate<Client>>} Paginated response with Client data
     * @throws {Error} When the request fails
     */
    async clientPaginate(
        page: number = 1,
        limit: number = 10,
        filter: string | undefined = '',
        options: string[] = [],
        sortField?: string,
        sortOrder?: 'ascend' | 'descend',
    ): Promise<Paginate<Client>> {
        try {
            await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 500));
            
            const allClients: Client[] = JSON.parse(localStorage.getItem('data-stub')!) as Client[];
            
            let filteredClients = allClients.filter(client => {
                const matchesFilter = !filter || filter.trim() === '' || 
                    client.name.toLowerCase().includes(filter.toLowerCase().trim()) ||
                    client.email.toLowerCase().includes(filter.toLowerCase().trim());

                return matchesFilter;
            });

            if (sortField && sortOrder) {
                filteredClients = filteredClients.sort((a, b) => {
                const aValue = a[sortField as keyof Client];
                const bValue = b[sortField as keyof Client];
                
                if (sortOrder === 'ascend') {
                    return aValue > bValue ? 1 : -1;
                } else {
                    return aValue < bValue ? 1 : -1;
                }
                });
            }

            const totalRecord = filteredClients.length;
            const totalPages = Math.ceil(totalRecord / limit);
            const currentPage = Math.max(1, Math.min(page, totalPages));
            const startIndex = (currentPage - 1) * limit;
            const endIndex = startIndex + limit;

            const paginatedData = filteredClients.slice(startIndex, endIndex);

            return {
                pageNumber: currentPage,
                pageSize: limit,
                totalPages: totalPages,
                totalRecord: totalRecord,
                data: paginatedData
            };

        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Retrieves client statistics including total clients and monthly metrics
     * @returns Promise resolving to ClientStats with title and generated data
     */
    async getClientStats(): Promise<ClientStats> {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 300));
        
        return {
            title: "Clients Obtained",
            ...generateClientStats()
        };
    }

    /**
     * Retrieves computer statistics including queue and availability metrics
     * @returns Promise resolving to ComputerStats with title and generated data
     */
    async getComputerStats(): Promise<any> {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 300));
        
        return {
        title: "Computers in Queue", 
        ...generateComputerStats()
        };
    }

    /**
     * Retrieves sales statistics including completed sales and conversion rates
     * @returns Promise resolving to SalesStats with title and generated data
     */
    async getSalesStats(): Promise<any> {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 300));
        
        return {
            title: "Sales Achieved",
            ...generateSalesStats()
        };
    };

    /**
     * Retrieves revenue statistics including current revenue and growth metrics
     * @returns Promise resolving to RevenueStats with title and generated data
     */
    async getRevenueStats(): Promise<RevenueStats> {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 300));
        
        return {
            title: "Current Revenue",
            ...generateRevenueStats()
        };
    }

    /**
     * Retrieves revenue growth chart data for visualization
     * @returns Promise resolving to RevenueChart with title and generated data
     */
    async getRevenueChart(): Promise<RevenueChart> {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 300));
        
        return {
            title: "Revenue Growth",
            chartType: 'line',
            ...generateRevenueChartData()
        };
    }

    /**
     * Retrieves client acquisition chart data for visualization
     * @returns Promise resolving to ClientChart with title and generated data
     */
    async getClientChart(): Promise<ClientChart> {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 300));
        
        return {
            title: "Client Acquisition",
            chartType: 'bar',
            ...generateClientChartData()
        };
    }

}

export default ClientService;