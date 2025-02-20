/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, {
  createContext,
  useContext,
  ReactNode
} from 'react';
import { BookingAppAxios, } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { FALLBACK_INFO } from '@/constants';






export interface AuthContextType {
  appInfo: TWebAppAPIResponse | undefined;
  isFetchingAppInfo: boolean;
}

export const initialAuthState: AuthContextType = {
  appInfo: undefined,
  isFetchingAppInfo: false
};
export interface TWebAppAPIResponse {
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
  review: string | null;
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
  nick_name: string | null;
  image: string | null;
  ig_link: null | string;
  fb_link: string | null;
  x_link: string | null;
}

interface Footer {
  id: string;
  whatsapp_url: string;
  created_at: string;
  updated_at: string;
  copyright_text: string;
  contact_phone_number: string;
  whatsapp_phone_number: string;
  x_link: string | null;
  linkedin_link: string;
  instagram_link: string;
  facebook_link: string | null;
  contact_email: string;
  telegram_link: string | null;
  mission_statement: string;
}

interface About {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  image: null;
}

export interface Service {
  id: string;
  service_name: string;
  service_type: string;
  service_description: null | string;
  icon: string | null;
  equipment: null | string;
  categories: Category[];
}

export interface Category {
  id: string;
  category_name: string;
  category_description: string;
  category_cost: number;
  category_hours: null | null | number | number;
  start_time: string | null;
  end_time: string | null;
  sub_category_packages: (Subcategorypackage | Subcategorypackage)[];
}

interface Subcategorypackage {
  id: string;
  package_name: string;
  package_description: string;
  package_cost: number;
}

interface Herosection {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  cta_text: string;
  subtitle: string;
  background_image: null;
  hero_text: string[];
}

const fetchWebApp = async (): Promise<TWebAppAPIResponse> => {
  const response = await BookingAppAxios.get<TWebAppAPIResponse>('/webapp');
  return response.data || FALLBACK_INFO;
}



const AuthContext = createContext<AuthContextType>({
  ...initialAuthState,
});

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
        appInfo: appInfo || FALLBACK_INFO,
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