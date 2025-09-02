const API_BASE_URL = 'http://localhost:8000';

export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact_number?: string;
  email?: string;
  category: string;
  diagnosis?: string;
  doctor_name?: string;
  room_number?: string;
  status: string;
  admission_date: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  department: string;
  contact_number?: string;
  email?: string;
  years_of_experience: number;
  qualification: string;
  availability: string;
  room_number?: string;
}

export interface Stats {
  total_patients: number;
  category_stats: Record<string, number>;
  status_stats: Record<string, number>;
  total_doctors?: number;
  specialization_stats?: Record<string, number>;
  department_stats?: Record<string, number>;
}

// Patient API calls
export const patientApi = {
  getAll: async (category?: string, status?: string): Promise<Patient[]> => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (status) params.append('status', status);
    
    const response = await fetch(`${API_BASE_URL}/patients?${params}`);
    return response.json();
  },

  getById: async (id: number): Promise<Patient> => {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`);
    return response.json();
  },

  create: async (patient: Omit<Patient, 'id' | 'admission_date'>): Promise<Patient> => {
    const response = await fetch(`${API_BASE_URL}/patients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patient),
    });
    return response.json();
  },

  update: async (id: number, patient: Partial<Patient>): Promise<Patient> => {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patient),
    });
    return response.json();
  },

  delete: async (id: number): Promise<void> => {
    await fetch(`${API_BASE_URL}/patients/${id}`, { method: 'DELETE' });
  },
};

// Doctor API calls
export const doctorApi = {
  getAll: async (specialization?: string, department?: string): Promise<Doctor[]> => {
    const params = new URLSearchParams();
    if (specialization) params.append('specialization', specialization);
    if (department) params.append('department', department);
    
    const response = await fetch(`${API_BASE_URL}/doctors?${params}`);
    return response.json();
  },

  getById: async (id: number): Promise<Doctor> => {
    const response = await fetch(`${API_BASE_URL}/doctors/${id}`);
    return response.json();
  },
};

// Stats API calls
export const statsApi = {
  getPatientStats: async (): Promise<Stats> => {
    const response = await fetch(`${API_BASE_URL}/stats/patients`);
    return response.json();
  },

  getDoctorStats: async (): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/stats/doctors`);
    return response.json();
  },
};