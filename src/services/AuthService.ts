import { SignIn, SignInResponse } from '@/models/auth';
import { formatedErrorServices } from '@/utils/formated';

/**
 * Service class for handling authentication and authorization operations including:
 * - User login/logout
 * - Session management
 */
class AuthService {
  /**
   * Authenticates a user with email and password
   * @param {SignIn} dataOutside - Login credentials (email and password)
   * @throws {Error} When authentication fails
   */
  loginAuth = async (dataOutside: SignIn) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 500);

      const mockResponse = await new Promise<SignInResponse>((resolve, reject) => {
        setTimeout(() => {
          const hardcodedEmail = 'admin@b2b.com';
          const hardcodedPassword = 'password123';

          if (dataOutside.email.toLowerCase() !== hardcodedEmail || dataOutside.password !== hardcodedPassword) {
            reject({ message: 'Invalid credentials' });
            return;
          }

          resolve({
            email: hardcodedEmail,
            accessToken: 'mock_jwt_token_' + Math.random().toString(36).substring(2, 9),
            expiresIn: 999999
          });
        }, 500);
      });

      clearTimeout(timeoutId);

      await fetch('/api/cookie-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(mockResponse),
      });

      return mockResponse;
    } catch (error) {
      throw formatedErrorServices(error);
    }
  };

}

export default AuthService;