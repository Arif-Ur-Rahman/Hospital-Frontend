import { useState } from 'react';
import { Patient } from '@/lib/api';
import { patientApi } from '@/lib/api'; // Add this import
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { patientCategories, statusOptions } from '@/lib/utils';
import { PatientForm } from './patient-form';
import { Edit, Trash2 } from 'lucide-react';

interface PatientsTableProps {
  patients: Patient[];
  onRefresh: () => void;
}

export function PatientsTable({ patients, onRefresh }: PatientsTableProps) {
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      try {
        await patientApi.delete(id);
        onRefresh();
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  return (
    <>
      <div className="mb-4">
        <Button onClick={() => setIsFormOpen(true)}>Add New Patient</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell className="font-medium">{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {patient.category}
                </span>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  patient.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {patient.status}
                </span>
              </TableCell>
              <TableCell>{patient.doctor_name || '-'}</TableCell>
              <TableCell>{patient.room_number || '-'}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingPatient(patient);
                      setIsFormOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(patient.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PatientForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        patient={editingPatient}
        onSuccess={() => {
          setEditingPatient(null);
          setIsFormOpen(false);
          onRefresh();
        }}
      />
    </>
  );
}