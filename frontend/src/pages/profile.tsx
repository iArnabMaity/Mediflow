/**
 * PatientProfilePage
 * MediFlow - Patient information, medical history, allergies, and emergency contacts
 */

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardHeader, CardBody, CardFooter, CardTitle } from "@/components/Card";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Badge from "@/components/Badge";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "@/hooks/useForm";
import { useNotification } from "@/context/NotificationContext";
import { userService } from "@/services/api";
import Loading from "@/components/Loading";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  allergies: string;
  medicalHistory: string;
}

interface EmergencyContact {
  id?: string;
  name: string;
  relationship: string;
  phone: string;
}

const profileValidationSchema = {
  firstName: { required: true, minLength: 2 },
  lastName: { required: true, minLength: 2 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phone: { required: true, pattern: /^[+]?[\d\s-()]+$/ },
  dateOfBirth: { required: true },
  gender: { required: true },
  bloodType: { required: true },
};

export default function PatientProfilePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { showNotification } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState<EmergencyContact>({
    name: "",
    relationship: "",
    phone: "",
  });

  const {
    formData,
    errors,
    setFormData,
    validateForm,
    resetForm,
  } = useForm<ProfileFormData>(
    {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      bloodType: "",
      allergies: "",
      medicalHistory: "",
    },
    profileValidationSchema
  );

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await userService.getProfile();
        const profile = response.data;

        setFormData({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          email: profile.email || "",
          phone: profile.phone || "",
          dateOfBirth: profile.dateOfBirth || "",
          gender: profile.gender || "",
          bloodType: profile.bloodType || "",
          allergies: profile.allergies || "",
          medicalHistory: profile.medicalHistory || "",
        });

        setEmergencyContacts(profile.emergencyContacts || []);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        showNotification("Failed to load profile", "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (!validateForm()) {
      showNotification("Please fix the errors in the form", "error");
      return;
    }

    try {
      setIsSaving(true);
      await userService.updateProfile({
        ...formData,
        emergencyContacts,
      });
      showNotification("Profile updated successfully", "success");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save profile:", error);
      showNotification("Failed to save profile", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to previous values
  };

  const handleAddContact = () => {
    if (
      !newContact.name.trim() ||
      !newContact.relationship.trim() ||
      !newContact.phone.trim()
    ) {
      showNotification("Please fill in all contact fields", "error");
      return;
    }

    setEmergencyContacts([...emergencyContacts, newContact]);
    setNewContact({ name: "", relationship: "", phone: "" });
    setShowAddContact(false);
    showNotification("Emergency contact added", "success");
  };

  const handleRemoveContact = (index: number) => {
    setEmergencyContacts(emergencyContacts.filter((_, i) => i !== index));
    showNotification("Emergency contact removed", "success");
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Profile</h1>
            <p className="mt-1 text-gray-600">
              Manage your personal and medical information
            </p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <Card className="border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  First Name
                </label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
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
                  disabled={!isEditing}
                  placeholder="Last name"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Phone
                </label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="+1-555-0123"
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Date of Birth
                </label>
                <Input
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-600 mt-1">{errors.dateOfBirth}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Blood Type
                </label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={(e) =>
                    setFormData({ ...formData, bloodType: e.target.value })
                  }
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select blood type</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Medical Information */}
        <Card className="border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Medical Information</h2>
          </CardHeader>
          <CardBody className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Allergies
              </label>
              <textarea
                name="allergies"
                value={formData.allergies}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="List all known allergies and their severity..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Medical History
              </label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Describe your medical history, past surgeries, chronic conditions, etc..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </CardBody>
        </Card>

        {/* Emergency Contacts */}
        <Card className="border-gray-200">
          <CardHeader className="bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Emergency Contacts</h2>
            {isEditing && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowAddContact(true)}
              >
                + Add Contact
              </Button>
            )}
          </CardHeader>
          <CardBody>
            {emergencyContacts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No emergency contacts added
              </p>
            ) : (
              <div className="space-y-4">
                {emergencyContacts.map((contact, idx) => (
                  <div
                    key={idx}
                    className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-base font-semibold text-gray-900">
                        {contact.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {contact.relationship}
                      </p>
                      <p className="text-sm text-gray-600">{contact.phone}</p>
                    </div>
                    {isEditing && (
                      <Button
                        variant="tertiary"
                        size="sm"
                        onClick={() => handleRemoveContact(idx)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {showAddContact && (
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">
                <Input
                  placeholder="Full Name"
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact({ ...newContact, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Relationship (e.g., Spouse, Parent, Sibling)"
                  value={newContact.relationship}
                  onChange={(e) =>
                    setNewContact({
                      ...newContact,
                      relationship: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Phone Number"
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) =>
                    setNewContact({ ...newContact, phone: e.target.value })
                  }
                />
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    onClick={handleAddContact}
                  >
                    Add
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowAddContact(false);
                      setNewContact({ name: "", relationship: "", phone: "" });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}

