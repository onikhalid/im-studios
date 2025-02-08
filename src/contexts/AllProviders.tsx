'use client';
import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { InfoProvider } from './info';
import Wrapper from './Wrapper';


const AllProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <InfoProvider>
        <Wrapper>
          {children}
        </Wrapper>
      </InfoProvider>
    </QueryClientProvider>
  )
}

export default AllProviders