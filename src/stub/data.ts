import { faker } from "@faker-js/faker";

import { User } from "@/models/user";

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