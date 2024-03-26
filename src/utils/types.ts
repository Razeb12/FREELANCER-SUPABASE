type GalleryPhoto = {
  fileName: string;
  id: string;
  name: string;
};

export type Skills = {
  id: string;
  name: string;
  rate: number;
};

type Category = {
  id: string;
  name: string;
  category: string;
};

export type Equipments = {
  id: string;
  equipment?: string;
  rate: number;
  is_rented: boolean;
  name: string,
  skill_id: string;
  skill_name: string;
  skill_rate: string
}

type ReviewsType ={
  createdAt: string,
  rating: number,
  review: string,
  ratedBy: string
}

export type Profile = {
  id: string
  email: string;
  firstName: string;
  bio: string;
  galleryPhotos: GalleryPhoto[];
  lastName: string;
  phoneNumber: string;
  profilePhoto: string;
  rating: number;
  skills: Skills[];
  categories: Category[];
  latitude: string;
  longitude: string;
  favorites: string[];
  ratings: number
  equipments: Equipments[]
  social: string
  city: string
  lng: string
  lat: string
  location: string
  bookedusers:string[]
  bookedFreelancers: string[]
  reviews: ReviewsType[]
  availableTimes: string[]
};


export type SelectedDates = {
  startDate: string;
  endDate: string
}

export type FreelancerLocation = {
  latitude: string;
  longitude: string
}