-- ============================================
-- MediFlow Database Schema
-- ============================================

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(50) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('patient', 'provider', 'admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
);

-- Patient Profiles Table
CREATE TABLE IF NOT EXISTS patients (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(20) NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  blood_type VARCHAR(10),
  medical_history TEXT,
  allergies TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_patient (user_id),
  INDEX idx_user_id (user_id)
);

-- Provider Profiles Table
CREATE TABLE IF NOT EXISTS providers (
  id VARCHAR(50) PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  license_number VARCHAR(100) UNIQUE NOT NULL,
  specialization VARCHAR(255) NOT NULL,
  hospital VARCHAR(255),
  department VARCHAR(255),
  years_of_experience INT NOT NULL,
  qualifications TEXT,
  consultation_fee DECIMAL(10, 2) NOT NULL,
  available_slots JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_provider (user_id),
  INDEX idx_user_id (user_id),
  INDEX idx_specialization (specialization),
  INDEX idx_license (license_number)
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id VARCHAR(50) PRIMARY KEY,
  patient_id VARCHAR(50) NOT NULL,
  provider_id VARCHAR(50) NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time VARCHAR(10) NOT NULL,
  duration INT DEFAULT 30,
  status VARCHAR(20) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no-show')),
  reason TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE,
  INDEX idx_patient_id (patient_id),
  INDEX idx_provider_id (provider_id),
  INDEX idx_appointment_date (appointment_date),
  INDEX idx_status (status)
);

-- Medical Records Table
CREATE TABLE IF NOT EXISTS medical_records (
  id VARCHAR(50) PRIMARY KEY,
  patient_id VARCHAR(50) NOT NULL,
  provider_id VARCHAR(50) NOT NULL,
  record_type VARCHAR(50) NOT NULL CHECK (record_type IN ('prescription', 'diagnosis', 'lab_result', 'radiology', 'discharge', 'consultation_note', 'other')),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  record_date DATE NOT NULL,
  file_url VARCHAR(500),
  findings TEXT,
  recommendations TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE,
  INDEX idx_patient_id (patient_id),
  INDEX idx_provider_id (provider_id),
  INDEX idx_record_date (record_date),
  INDEX idx_record_type (record_type),
  FULLTEXT idx_title_description (title, description)
);

-- Create indexes for better query performance
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_patients_created_at ON patients(created_at);
CREATE INDEX idx_providers_created_at ON providers(created_at);
CREATE INDEX idx_appointments_created_at ON appointments(created_at);
CREATE INDEX idx_medical_records_created_at ON medical_records(created_at);
