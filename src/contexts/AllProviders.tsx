'use client';
import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InfoProvider } from './info';


const AllProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <InfoProvider>
        {children}
      </InfoProvider>
    </QueryClientProvider>
  )
}

export default AllProviders