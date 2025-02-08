
import React from 'react'
import Spinner from '@/components/ui/spinner';
import { useAppInfo } from './info';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { isFetchingAppInfo } = useAppInfo()

  return (
    <>
     {
          isFetchingAppInfo ?
            <div className='fixed inset-0 z-[12] flex items-center justify-center bg-black'>
              <Spinner color="white" />
            </div>
            :
            children
        }
    </>
  )
}

export default Wrapper