import UserService from "@/services/UserService"

const userService = new UserService();

export const handleAuthUserMe = async (token: string | undefined) => {
        try {
            if (!token) throw new Error('token-not-found')
            const data = await userService.userMe(token)
            return data;
        } catch (error) {
            console.error('Auth error:', error);
            throw new Error(`Authentication failed - Server Error: ${error}`);
        }
    }