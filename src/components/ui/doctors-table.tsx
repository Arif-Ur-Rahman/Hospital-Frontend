import { useState } from 'react';
import { Doctor } from '@/lib/api';
import { doctorApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DoctorForm } from './doctor-form';
import { Edit, Trash2, Plus } from 'lucide-react';

interface DoctorsTableProps {
  doctors: Doctor[];
  onRefresh: () => void;
}

export function DoctorsTable({ doctors, onRefresh }: DoctorsTableProps) {
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      try {
        await doctorApi.delete(id);
        onRefresh();
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
    }
  };

  return (
    <>
      <div className="mb-4">
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Doctor
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Qualification</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              <TableCell className="font-medium">{doctor.name}</TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {doctor.specialization}
                </span>
              </TableCell>
              <TableCell>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  {doctor.department}
                </span>
              </TableCell>
              <TableCell>{doctor.years_of_experience} years</TableCell>
              <TableCell>{doctor.qualification}</TableCell>
              <TableCell>{doctor.availability}</TableCell>
              <TableCell>{doctor.room_number || '-'}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingDoctor(doctor);
                      setIsFormOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(doctor.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DoctorForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        doctor={editingDoctor}
        onSuccess={() => {
          setEditingDoctor(null);
          setIsFormOpen(false);
          onRefresh();
        }}
      />
    </>
  );
}