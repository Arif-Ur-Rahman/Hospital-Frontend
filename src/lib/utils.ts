import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const patientCategories = [
  { value: "heart", label: "Heart" },
  { value: "kidney", label: "Kidney" },
  { value: "skin", label: "Skin" },
  { value: "allergy", label: "Allergy" },
  { value: "general", label: "General" },
];

export const statusOptions = [
  { value: "active", label: "Active" },
  { value: "discharged", label: "Discharged" },
  { value: "transferred", label: "Transferred" },
];

export const doctorSpecializations = [
  { value: "Cardiology", label: "Cardiology" },
  { value: "Nephrology", label: "Nephrology" },
  { value: "Dermatology", label: "Dermatology" },
  { value: "Allergology", label: "Allergology" },
  { value: "General Medicine", label: "General Medicine" },
  { value: "Cardiac Surgery", label: "Cardiac Surgery" },
];

export const doctorDepartments = [
  { value: "Heart", label: "Heart" },
  { value: "Kidney", label: "Kidney" },
  { value: "Skin", label: "Skin" },
  { value: "Allergy", label: "Allergy" },
  { value: "General", label: "General" },
];