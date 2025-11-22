import { User } from '@/models/user';
import { formatedErrorServices } from '@/utils/formated';
import { stubUser } from '@/stub/data';

/**
 * Service class for handling user-related operations including:
 * - User authentication and session management
 */
class UserService {
  /**
   * Retrieves the current authenticated user's data
   * @param {string} token - The user's authentication token
   * @returns {Promise<User>} The user's profile data
   * @throws {Error} When the request fails or user is not authenticated
   */
  userMe = async (token: string): Promise<User> => {
    try {
      const dataUser = await new Promise<User>((resolve, reject) => {
        setTimeout(() => {
          if (!token || !token.startsWith('mock_jwt_token_')) {
            reject({message: 'unauthorized'});
            return;
          }
          resolve(stubUser);
        }, 800);
      });
      console.log(dataUser, 'asd')
      return dataUser;

    } catch (error) {
      throw formatedErrorServices(error);
    }
  };
}

export default UserService;