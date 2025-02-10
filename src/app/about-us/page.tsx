'use client'

import { useAppInfo } from '@/contexts/info'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Facebook, Instagram, Twitter } from 'lucide-react'

const Page = () => {

    const { appInfo } = useAppInfo()
    const team_member_images = [
        "/images/blackgirl.png", "/images/blueguy.png", "/images/keyboardguy.png", "/images/redguy.png"
    ]
    return (

        <div className='h-screen snap-y snap-always overflow-y-scroll bg-black'>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:min-h-[90vh] pt-20 md:pt-0'>

                <div className="pt-12 leading-tight lg:max-h-full overflow-hidden lg:sticky top-0 p-6 max-md:pb-0 m-auto">
                    <h1 className="text-[7rem] lg:text-[18rem] xl:text-[19.5rem] leading-none font-bebas text-[#FFFFFF21]">
                        ABOUT
                    </h1>
                    <h1 className="text-[7rem] lg:text-[18rem] xl:text-[19.5rem] leading-none font-bebas text-white -translate-y-[30%] lg:-translate-y-[50%]">
                        US
                    </h1>
                </div>

                <div className='text-[#FFFFFFE8] xl:text-xl font-light flex flex-col justify-center max-w-xl mx-auto max-md:px-5'>
                    <p className='max-w-[20rem]'>Imperiah Music Studios (IM Studios) - Your Premier Destination for Rehearsal, Recording, and Live Streaming, in London</p>
                    <h2 className='text-white text-3xl mt-4'>Our mission</h2>
                    <p className='max-w-[25rem] mt-1'>Lorem ipsum dolor sit amet consectetur. Eros consequat rutrum sed facilisis ac. Cras pretium lobortis a odio et. Scelerisque ut magna augue praesent mattis ullamcorper elementum pulvinar amet. Metus proin odio tempor morbi mus.</p>
                </div>
            </section>
            <section className='grid grid-cols-1 md:grid-cols-2  lg:min-h-[90vh] pt-20 md:pt-0'>
                <div className='text-[#FFFFFFE8] xl:text-xl font-light flex flex-col justify-center max-w-xl mx-auto max-md:order-2'>
                    <div className='grid lg:grid-cols-2 gap-x-10'>
                        {
                            appInfo?.team_members.map((member, index) => (
                                <article key={index} className='text-black'>
                                    <Image src={team_member_images[index]} alt='team_img' width={300} height={500} className='rounded-3xl' />
                                    <div className='border-[0.5px] flex items-start justify-between gap-7 leading-tight rounded-[1.25rem] px-4 py-3.5 -translate-y-20 mx-2 backdrop-blur-lg bg-gradient-to-r from-[#FFFFFF33] to-[#FFFFFF20]'>
                                        <div>
                                            <h4 className='text-white text-[12px] font-semibold'>{member.name}</h4>
                                            <h4 className='text-white text-[8px] font-medium mt-2'>{member.role}</h4>
                                        </div>
                                        <div className='flex gap-3 mt-4'>
                                            <Link href={member.ig_link || '#'}> <Instagram className='text-white size-3.5' /> </Link>
                                            <Link href={member.fb_link || '#'}> <Facebook className='text-white size-3.5' /> </Link>
                                            <Link href={member.x_link || '#'}> <Twitter className='text-white size-3.5' /> </Link>
                                        </div>
                                    </div>
                                </article>
                            ))
                        }
                    </div>
                </div>

                <div className="pt-12 leading-tight lg:max-h-full overflow-hidden lg:sticky top-0 p-6 m-auto max-md:order-1">
                    <div className='flex'>
                        <h1 className="text-[7rem] lg:text-[18rem] xl:text-[19.5rem] leading-none font-bebas text-[#FFFFFF21]">
                            THE
                        </h1>
                        <p className='max-md:hidden text-xs font-sans font-light text-white mt-24'>At IM STUDIOZ, our team combines creativity and technical expertise to deliver exceptional sound and overall level of professionalism for your music process..</p>
                    </div>
                    <h1 className="text-[7rem] lg:text-[18rem] xl:text-[19.5rem] leading-none font-bebas text-white -translate-y-[20%] lg:-translate-y-[50%]">
                        TEAM
                    </h1>
                </div>
            </section>
        </div>
    )
}

export default Page