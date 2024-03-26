import {create} from 'zustand';
import { SelectedDates } from '../src/utils/types';


type ServiceState = {
  selectedService: string | null;
  selectedLocation: string | null;
  selectedDate: any | null;
  setSelectedDate: (selectedDate: any | null) => void;
  setSelectedService: (service: string) => void;
  setSelectedLocation: (location: string) => void;
};

export const useServiceStore = create<ServiceState>((set) => ({
  selectedService: null,
  selectedLocation: null,
  selectedDate: null,
  setSelectedDate:(selectedDate) => set({selectedDate}),
  setSelectedService: (service) => set({ selectedService: service }),
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));