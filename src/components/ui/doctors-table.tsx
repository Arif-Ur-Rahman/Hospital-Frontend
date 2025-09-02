import { Doctor } from '@/lib/api';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DoctorsTableProps {
  doctors: Doctor[];
}

export function DoctorsTable({ doctors }: DoctorsTableProps) {
  return (
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {doctors.map((doctor) => (
          <TableRow key={doctor.id}>
            <TableCell className="font-medium">{doctor.name}</TableCell>
            <TableCell>{doctor.specialization}</TableCell>
            <TableCell>{doctor.department}</TableCell>
            <TableCell>{doctor.years_of_experience} years</TableCell>
            <TableCell>{doctor.qualification}</TableCell>
            <TableCell>{doctor.availability}</TableCell>
            <TableCell>{doctor.room_number || '-'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}