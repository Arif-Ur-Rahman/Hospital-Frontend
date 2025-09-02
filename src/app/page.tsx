'use client';

import { useState, useEffect } from 'react';
import { patientApi, doctorApi, statsApi, Patient, Doctor, Stats } from '@/lib/api';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PatientsTable } from '@/components/ui/patients-table';
import { DoctorsTable } from '@/components/ui/doctors-table';
import { StatsCards } from '@/components/ui/stats-cards';

// ... existing imports ...

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [activeTab, setActiveTab] = useState<'patients' | 'doctors'>('patients');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [patientsData, doctorsData, statsData] = await Promise.all([
        patientApi.getAll(),
        doctorApi.getAll(),
        statsApi.getPatientStats()
      ]);
      setPatients(patientsData);
      setDoctors(doctorsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hospital Management System</h1>
          <p className="text-gray-600">Manage patients and doctors efficiently</p>
        </header>

        {stats && <StatsCards stats={stats} doctorsCount={doctors.length} />}

        <div className="mt-8">
          <div className="flex space-x-4 mb-6">
            <Button
              variant={activeTab === 'patients' ? 'default' : 'outline'}
              onClick={() => setActiveTab('patients')}
            >
              Patients ({patients.length})
            </Button>
            <Button
              variant={activeTab === 'doctors' ? 'default' : 'outline'}
              onClick={() => setActiveTab('doctors')}
            >
              Doctors ({doctors.length})
            </Button>
          </div>

          {activeTab === 'patients' && (
            <PatientsTable patients={patients} onRefresh={loadData} />
          )}

          {activeTab === 'doctors' && (
            <DoctorsTable doctors={doctors} onRefresh={loadData} />
          )}
        </div>
      </div>
    </div>
  );
}