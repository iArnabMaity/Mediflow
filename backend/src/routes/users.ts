/**
 * Users Routes
 */

import { Router, Request, Response, NextFunction } from 'express';
import AuthService from '../services/AuthService';
import User from '../models/User';
import Patient from '../models/Patient';
import Provider from '../models/Provider';
import { verifyToken } from '../auth/jwt';

const router = Router();

/**
 * Middleware to verify authentication
 */
const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Missing authorization token' });
    }

    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

/**
 * PUT /users/profile
 * Update user profile
 */
router.put('/profile', authenticateToken, async (req: any, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;

    if (!name && !email) {
      return res.status(400).json({
        error: 'At least one field (name or email) is required',
      });
    }

    const user = await AuthService.updateProfile(req.user.userId, {
      name,
      email,
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    if (error.message.includes('already in use')) {
      return res.status(409).json({ error: error.message });
    }
    next(error);
  }
});

/**
 * GET /users/:id
 * Get user by ID
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = await AuthService.getUser(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /users/:id
 * Deactivate user account
 */
router.delete('/:id', authenticateToken, async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Users can only delete their own account
    if (req.user.userId !== id) {
      return res.status(403).json({ error: 'Forbidden: Cannot delete other users' });
    }

    const success = await AuthService.deactivateAccount(id);

    if (!success) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User account deactivated',
    });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /users/:id/patient-profile
 * Create or update patient profile
 */
router.post('/:id/patient-profile', authenticateToken, async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { dateOfBirth, gender, bloodType, medicalHistory, allergies } = req.body;

    // Users can only create profile for themselves
    if (req.user.userId !== id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Check if user is a patient
    const user = await User.getById(id);
    if (!user || user.role !== 'patient') {
      return res.status(400).json({ error: 'User is not a patient' });
    }

    // Check if profile already exists
    const existingProfile = await Patient.getByUserId(id);

    let profile;
    if (existingProfile) {
      profile = await Patient.update(existingProfile.id, {
        dateOfBirth: new Date(dateOfBirth),
        gender,
        bloodType,
        medicalHistory,
        allergies,
      });
    } else {
      profile = await Patient.create(id, new Date(dateOfBirth), gender, bloodType, medicalHistory, allergies);
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /users/:id/patient-profile
 * Get patient profile
 */
router.get('/:id/patient-profile', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const profile = await Patient.getByUserId(id);

    if (!profile) {
      return res.status(404).json({ error: 'Patient profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
});

/**
 * POST /users/:id/provider-profile
 * Create or update provider profile
 */
router.post('/:id/provider-profile', authenticateToken, async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { licenseNumber, specialization, yearsOfExperience, consultationFee, hospital, department, qualifications } = req.body;

    // Users can only create profile for themselves
    if (req.user.userId !== id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Check if user is a provider
    const user = await User.getById(id);
    if (!user || user.role !== 'provider') {
      return res.status(400).json({ error: 'User is not a provider' });
    }

    // Check if profile already exists
    const existingProfile = await Provider.getByUserId(id);

    let profile;
    if (existingProfile) {
      profile = await Provider.update(existingProfile.id, {
        licenseNumber,
        specialization,
        yearsOfExperience,
        consultationFee,
        hospital,
        department,
        qualifications,
      });
    } else {
      profile = await Provider.create(id, licenseNumber, specialization, yearsOfExperience, consultationFee, hospital, department, qualifications);
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /users/:id/provider-profile
 * Get provider profile
 */
router.get('/:id/provider-profile', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const profile = await Provider.getByUserId(id);

    if (!profile) {
      return res.status(404).json({ error: 'Provider profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
});

export default router;
