'use client';
import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InfoProvider, useAppInfo } from './info';
import Spinner from '@/components/ui/spinner';


const AllProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  const { isFetchingAppInfo } = useAppInfo()
  
  return (
    <QueryClientProvider client={queryClient}>
      <InfoProvider>
        {
          isFetchingAppInfo ?
            <div className='fixed inset-0 z-[12] flex items-center justify-center'>
              <Spinner />
            </div>
            :
            children
        }
      </InfoProvider>
    </QueryClientProvider>
  )
}

export default AllProviders