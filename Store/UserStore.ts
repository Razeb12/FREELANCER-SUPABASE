import { create } from "zustand";
import { Profile, FreelancerLocation } from "../src/utils/types";



type UserState = {
  user: any | null;
  image: string | null
  profile: any | null;
  gallery: any | null
  skills: any | null,
  cards: any | null
  favorites: any | null,
  freelancers: any[] | null;
  allFreelancers: Profile[] | null;
  loading: boolean;
  freelancerLocation:FreelancerLocation | null
  setImage:(image: string | null) => void
  setFreelancerLocation: (freelancerLocation: FreelancerLocation | null) => void
  setAllFreelancers: (allFreelancers: Profile[] | null) => void;
  setLoading: (loading: boolean) => void;
  setFreelancers: (freelancers: Profile[] | null) => void;
  setUser: (user: any | null) => void;
  setProfile: (profile: any | null) => void;
  setGallery: (gallery: any | null) => void; 
  setSkills: (skills: any | null) => void; 
  setFavorites: (favorites: any | null) => void; 
  setCards: (cards: any | null) =>  void
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  profile: null,
  gallery: null,
  skills: null,
  cards: null,
  favorites: null,
  freelancers: null,
  loading: false,
  allFreelancers: null,
  freelancerLocation: null,
  image: null,
  setImage: (image) => set({image}),
  setFreelancerLocation: (freelancerLocation) => set({freelancerLocation}),
  setLoading: (loading) => set({ loading }),
  setFreelancers: (freelancers) => set({ freelancers }),
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setGallery: (gallery) => set({gallery}),
  setSkills: (skills) => set({skills}),
  setFavorites: (favorites) => set({favorites}),
  setAllFreelancers: (allFreelancers) => set({ allFreelancers }),
  setCards:(cards) => set({cards})
}));


