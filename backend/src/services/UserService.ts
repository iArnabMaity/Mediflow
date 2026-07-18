/**
 * User Service
 * Handles user-related operations and queries
 */

import User, { UserProfile } from '../models/User';
import Patient, { PatientProfile } from '../models/Patient';
import Provider, { ProviderProfile } from '../models/Provider';

export class UserService {
  /**
   * Get user with their profile (patient or provider)
   */
  static async getUserWithProfile(userId: string): Promise<{
    user: Omit<UserProfile, 'password'>;
    profile?: PatientProfile | ProviderProfile | undefined;
  } | null> {
    const user = await User.getById(userId);

    if (!user) {
      return null;
    }

    let profile;

    if (user.role === 'patient') {
      profile = await Patient.getByUserId(userId);
    } else if (user.role === 'provider') {
      profile = await Provider.getByUserId(userId);
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      profile,
    };
  }

  /**
   * Search users by name or email
   */
  static async searchUsers(query: string, skip: number = 0, take: number = 10): Promise<Omit<UserProfile, 'password'>[]> {
    const allUsers = await User.getAll(skip, take * 10); // Get more to search
    const results = allUsers.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );

    return results.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  /**
   * Get user by ID
   */
  async getUser(id: string) {
    return await User.getById(id);
  }

  /**
   * Get all users with a specific role
   */
  static async getUsersByRole(role: 'patient' | 'provider' | 'admin', skip: number = 0, take: number = 10): Promise<Omit<UserProfile, 'password'>[]> {
    const users = await User.getByRole(role, skip, take);

    return users.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  /**
   * Count users by role
   */
  static async countUsersByRole(role: 'patient' | 'provider' | 'admin'): Promise<number> {
    // This would require a dedicated count query in the User model
    const users = await User.getByRole(role, 0, 1000);
    return users.length;
  }
}

export default UserService;
