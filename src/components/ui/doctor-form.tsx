import { useState } from 'react';
import { Doctor } from '@/lib/api';
import { doctorApi } from '@/lib/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { doctorSpecializations, doctorDepartments } from '@/lib/utils';

interface DoctorFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor?: Doctor | null;
  onSuccess: () => void;
}

export function DoctorForm({ open, onOpenChange, doctor, onSuccess }: DoctorFormProps) {
  const [formData, setFormData] = useState({
    name: doctor?.name || '',
    specialization: doctor?.specialization || 'General Medicine',
    department: doctor?.department || 'General',
    contact_number: doctor?.contact_number || '',
    email: doctor?.email || '',
    years_of_experience: doctor?.years_of_experience || 0,
    qualification: doctor?.qualification || '',
    availability: doctor?.availability || '',
    room_number: doctor?.room_number || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (doctor) {
        await doctorApi.update(doctor.id, formData);
      } else {
        await doctorApi.create(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving doctor:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{doctor ? 'Edit Doctor' : 'Add New Doctor'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label>Years of Experience *</Label>
              <Input
                type="number"
                value={formData.years_of_experience}
                onChange={(e) => setFormData({ ...formData, years_of_experience: parseInt(e.target.value) })}
                required
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Specialization *</Label>
              <Select
                value={formData.specialization}
                onValueChange={(value) => setFormData({ ...formData, specialization: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {doctorSpecializations.map((spec) => (
                    <SelectItem key={spec.value} value={spec.value}>
                      {spec.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Department *</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {doctorDepartments.map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Contact Number</Label>
              <Input
                value={formData.contact_number}
                onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label>Qualification *</Label>
            <Input
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              required
            />
          </div>

          <div>
            <Label>Availability *</Label>
            <Input
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              required
              placeholder="e.g., Mon-Fri, 9AM-5PM"
            />
          </div>

          <div>
            <Label>Room Number</Label>
            <Input
              value={formData.room_number}
              onChange={(e) => setFormData({ ...formData, room_number: e.target.value })}
              placeholder="e.g., Cardio-101"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Doctor</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}