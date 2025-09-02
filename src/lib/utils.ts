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