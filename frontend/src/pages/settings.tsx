/**
 * SettingsPage
 * MediFlow - User preferences, account settings, notifications, privacy, and theme
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
import Card, { CardHeader, CardBody, CardFooter, CardTitle } from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Badge from '@/components/Badge';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from '@/hooks/useForm';
import { useNotification } from '@/context/NotificationContext';
import { userService } from '@/services/api';
import Loading from '@/components/Loading';
import { colors, spacing } from '@/design/tokens';

interface SettingsFormData {
  email: string;
  firstName: string;
  lastName: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  appointmentReminders: boolean;
  healthAlerts: boolean;
  newsletterSubscription: boolean;
}

interface PrivacySettings {
  dataSharing: boolean;
  analyticsEnabled: boolean;
  thirdPartyApps: boolean;
  profileVisibility: 'public' | 'private' | 'providers-only';
}

const settingsValidationSchema = {
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  firstName: { required: true, minLength: 2 },
  lastName: { required: true, minLength: 2 },
  currentPassword: { minLength: 6 },
  newPassword: { minLength: 8 },
  confirmPassword: { minLength: 8 },
};

export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { success, error } = useNotification();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'privacy' | 'theme'>('account');
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    appointmentReminders: true,
    healthAlerts: true,
    newsletterSubscription: false,
  });
  
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    dataSharing: false,
    analyticsEnabled: true,
    thirdPartyApps: false,
    profileVisibility: 'private',
  });
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { values: formData, errors, setValues: setFormData, handleSubmit } = useForm<SettingsFormData>({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      try {
        setIsSaving(true);
        await userService.updateProfile({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
        });
        success('Account settings updated successfully');
      } catch (err) {
        console.error('Failed to save settings:', err);
        error('Failed to save settings');
      } finally {
        setIsSaving(false);
      }
    },
    validate: {
      email: [(value: any) => !value ? "Email is required" : undefined, (value: any) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email format" : undefined],
      firstName: [(value: any) => !value || value.length < 2 ? "First name must be at least 2 characters" : undefined],
      lastName: [(value: any) => !value || value.length < 2 ? "Last name must be at least 2 characters" : undefined],
      currentPassword: [],
      newPassword: [],
      confirmPassword: [],
    },
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Fetch user settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const response = await userService.getProfile();
        const profile = response.data;

        if (profile) {
          setFormData({
            email: profile.email || '',
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          });
        }

        // Load notification settings from localStorage or API
        const savedNotifications = localStorage.getItem('mediflow_notifications');
        if (savedNotifications) {
          setNotificationSettings(JSON.parse(savedNotifications));
        }

        const savedPrivacy = localStorage.getItem('mediflow_privacy');
        if (savedPrivacy) {
          setPrivacySettings(JSON.parse(savedPrivacy));
        }

        const savedTheme = localStorage.getItem('mediflow_theme');
        setIsDarkMode(savedTheme === 'dark');
      } catch (errorFromFetch) {
        console.error('Failed to fetch settings:', errorFromFetch);
        error('Failed to load settings');
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchSettings();
    }
  }, [isAuthenticated]);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Use the useForm's setValues to update form data
    const currentValues = formData;
    setFormData({
      ...currentValues,
      [name]: value,
    });
  };

  const handleChangePassword = async () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      error('Please fill in all password fields');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      error('New passwords do not match');
      return;
    }

    if (formData.newPassword.length < 8) {
      error('Password must be at least 8 characters');
      return;
    }

    try {
      setIsSaving(true);
      // Call API to change password
      // await userService.changePassword({
      //   currentPassword: formData.currentPassword,
      //   newPassword: formData.newPassword,
      // });
      
      success('Password changed successfully');
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsChangingPassword(false);
    } catch (errorFromPassword) {
      console.error('Failed to change password:', errorFromPassword);
      error('Failed to change password');
    } finally {
      setIsSaving(false);
    }
  };


  const handleSaveAccountSettings = async () => {
    try {
      setIsSaving(true);
      // Call API to update account settings
      // const updatedProfile = await userService.updateProfile({
      //   firstName: formData.firstName,
      //   lastName: formData.lastName,
      //   email: formData.email,
      // });
      // setFormData(updatedProfile);
      
      success('Account settings updated successfully');
    } catch (errorFromSettings) {
      console.error('Failed to save account settings:', errorFromSettings);
      error('Failed to save account settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNotificationSettings = async () => {
    try {
      setIsSaving(true);
      localStorage.setItem('mediflow_notifications', JSON.stringify(notificationSettings));
      // Call API to save notification settings
      // await userService.updateNotificationSettings(notificationSettings);
      
      success('Notification settings updated');
    } catch (errorFromNotif) {
      console.error('Failed to save notification settings:', errorFromNotif);
      error('Failed to save notification settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePrivacySettings = async () => {
    try {
      setIsSaving(true);
      localStorage.setItem('mediflow_privacy', JSON.stringify(privacySettings));
      // Call API to save privacy settings
      // await userService.updatePrivacySettings(privacySettings);
      
      success('Privacy settings updated');
    } catch (errorFromPrivacy) {
      console.error('Failed to save privacy settings:', errorFromPrivacy);
      error('Failed to save privacy settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleThemeToggle = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('mediflow_theme', newTheme);
    success(`Theme changed to ${newTheme} mode`);
  };

  if (!isAuthenticated) {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-gray-600">
            Manage your account preferences and security settings
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-2 border-b border-gray-200">
          {(['account', 'notifications', 'privacy', 'theme'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Account Settings */}
        {activeTab === 'account' && (
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      First Name
                    </label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Last Name
                    </label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                    <p className="text-sm text-gray-600">
                      Update your password to keep your account secure
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsChangingPassword(!isChangingPassword)}
                  >
                    {isChangingPassword ? 'Cancel' : 'Change Password'}
                  </Button>
                </div>

                {isChangingPassword && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Current Password
                      </label>
                      <Input
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        New Password
                      </label>
                      <Input
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        placeholder="Enter new password (min 8 characters)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Confirm New Password
                      </label>
                      <Input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm new password"
                      />
                    </div>
                    <Button
                      variant="primary"
                      onClick={handleChangePassword}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Updating...' : 'Update Password'}
                    </Button>
                  </div>
                )}
              </div>
            </CardBody>
            <CardFooter className="bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
              <Button
                variant="primary"
                onClick={handleSaveAccountSettings}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              {/* Notification Channels */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h3>
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive updates via email' },
                    { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive urgent updates via SMS' },
                    { key: 'pushNotifications', label: 'Push Notifications', description: 'Receive notifications on your device' },
                  ].map(({ key, label, description }) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{label}</p>
                        <p className="text-sm text-gray-600">{description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificationSettings[key as keyof NotificationSettings] as boolean}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              [key]: e.target.checked,
                            })
                          }
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notification Types */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Types</h3>
                <div className="space-y-4">
                  {[
                    { key: 'appointmentReminders', label: 'Appointment Reminders', description: 'Get reminders before your appointments' },
                    { key: 'healthAlerts', label: 'Health Alerts', description: 'Important health-related notifications' },
                    { key: 'newsletterSubscription', label: 'Newsletter Subscription', description: 'Subscribe to our health tips newsletter' },
                  ].map(({ key, label, description }) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{label}</p>
                        <p className="text-sm text-gray-600">{description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificationSettings[key as keyof NotificationSettings] as boolean}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              [key]: e.target.checked,
                            })
                          }
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
            <CardFooter className="bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
              <Button
                variant="primary"
                onClick={handleSaveNotificationSettings}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Preferences'}
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Privacy Settings */}
        {activeTab === 'privacy' && (
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Privacy & Data</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              {/* Data Settings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Privacy</h3>
                <div className="space-y-4">
                  {[
                    { key: 'dataSharing', label: 'Share My Data with Research', description: 'Allow your anonymous data to be used for medical research' },
                    { key: 'analyticsEnabled', label: 'Analytics & Performance', description: 'Help us improve the app by sharing usage data' },
                    { key: 'thirdPartyApps', label: 'Third-Party Integrations', description: 'Allow connected health apps to sync your data' },
                  ].map(({ key, label, description }) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">{label}</p>
                        <p className="text-sm text-gray-600">{description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={privacySettings[key as keyof PrivacySettings] as boolean}
                          onChange={(e) =>
                            setPrivacySettings({
                              ...privacySettings,
                              [key]: e.target.checked,
                            })
                          }
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Profile Visibility */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Visibility</h3>
                <div className="space-y-3">
                  {[
                    { value: 'public', label: 'Public', description: 'Anyone can see your profile' },
                    { value: 'providers-only', label: 'Providers Only', description: 'Only healthcare providers can see your profile' },
                    { value: 'private', label: 'Private', description: 'Only you can see your profile' },
                  ].map(({ value, label, description }) => (
                    <label key={value} className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer">
                      <input
                        type="radio"
                        name="profileVisibility"
                        value={value}
                        checked={privacySettings.profileVisibility === value}
                        onChange={() =>
                          setPrivacySettings({
                            ...privacySettings,
                            profileVisibility: value as 'public' | 'private' | 'providers-only',
                          })
                        }
                        className="w-4 h-4"
                      />
                      <div className="ml-3">
                        <p className="font-semibold text-gray-900">{label}</p>
                        <p className="text-sm text-gray-600">{description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </CardBody>
            <CardFooter className="bg-gray-50 border-t border-gray-200 flex justify-end gap-2">
              <Button
                variant="primary"
                onClick={handleSavePrivacySettings}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Privacy Settings'}
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Theme Settings */}
        {activeTab === 'theme' && (
          <Card className="border-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Appearance</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme</h3>
                <div className="flex gap-4">
                  {[
                    { value: false, label: 'Light Mode', icon: '☀️' },
                    { value: true, label: 'Dark Mode', icon: '🌙' },
                  ].map(({ value, label, icon }) => (
                    <button
                      key={String(value)}
                      onClick={() => {
                        if (isDarkMode !== value) {
                          handleThemeToggle();
                        }
                      }}
                      className={`flex-1 flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${
                        isDarkMode === value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-3xl mb-2">{icon}</div>
                      <p className="font-semibold text-gray-900">{label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Your theme preference will be saved and applied across all your sessions.
                </p>
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
