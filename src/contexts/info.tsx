/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, {
    createContext,
    useContext,
    ReactNode
} from 'react';
import { BookingAppAxios, } from "@/utils/axios";
import {  useQuery } from "@tanstack/react-query";






export interface AuthContextType {
   appInfo: TWebAppAPIResponse | undefined;
    isFetchingAppInfo: boolean;
}

export const initialAuthState: AuthContextType = {
   appInfo: undefined,
   isFetchingAppInfo: false
};


interface TWebAppAPIResponse {
  hero_section: Herosection;
  services: Service[];
  about: About;
  footer: Footer;
  team_members: Teammember[];
  studios: Studio[];
  faqs: Faq[];
  testimonials: Testimonial[];
}

interface Testimonial {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  role: string;
}

interface Faq {
  id: string;
  created_at: string;
  updated_at: string;
  question: string;
  answer: string;
}

interface Studio {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  icon: string;
}

interface Teammember {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  role: string;
  nick_name: null;
  image: null;
  ig_link: null | string;
  fb_link: null;
  x_link: null;
}

interface Footer {
  id: string;
  created_at: string;
  updated_at: string;
  copyright_text: string;
  contact_phone_number: null;
  whatsapp_phone_number: null;
  x_link: null;
  instagram_link: string;
  facebook_link: null;
  contact_email: null;
  telegram_link: null;
}

interface About {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  image: null;
}

interface Service {
  id: string;
  categories: (Category | Categories2)[];
  created_at: string;
  updated_at: string;
  service_name: string;
  service_type: string;
  service_description: null | string;
  icon: null;
  equipment: null;
}

interface Categories2 {
  id: string;
  created_at: string;
  updated_at: string;
  category_name: string;
  sub_category_name: string;
  sub_category_cost: string;
  category_description: string;
  category_cost: string;
  category_hours: number;
  service: string;
}

interface Category {
  id: string;
  created_at: string;
  updated_at: string;
  category_name: string;
  sub_category_name: string;
  sub_category_cost: string;
  category_description: string;
  category_cost: string;
  category_hours: null;
  service: string;
}

interface Herosection {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  cta_text: string;
  subtitle: string;
  background_image: null;
}

// const fetchServices = async (): Promise<TService[]> => {
//     const response = await BookingAppAxios.get<TService[]>('/services');
//     return response.data;
// }
// const fetchTeam = async (): Promise<TeamMember[]> => {
//     const response = await BookingAppAxios.get<TeamMember[]>('/teams');
//     return response.data;
// }
const fetchWebApp = async (): Promise<TWebAppAPIResponse> => {
    const response = await BookingAppAxios.get<TWebAppAPIResponse>('/webapp');
    return response.data;
}


// Create Context
const AuthContext = createContext<AuthContextType>({
    ...initialAuthState,
});

// Provider Component
export const InfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

   
    const useFetchAppInfo = () => {
        return useQuery({
            queryKey: ['app-info'],
            queryFn: fetchWebApp,
        })
    }
    const { data: appInfo, isLoading: isFetchingAppInfo } = useFetchAppInfo()


  

    return (
        <AuthContext.Provider
            value={{
                appInfo,
                isFetchingAppInfo
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using auth context
export const useAppInfo = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAppInfo must be used within an InfoProvider');
    }

    return context;
};