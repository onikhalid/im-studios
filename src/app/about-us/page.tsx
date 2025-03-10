'use client'

import { useAppInfo } from '@/contexts/info'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Facebook, Instagram, Twitter } from 'lucide-react'

const Page = () => {

    const { appInfo } = useAppInfo()
    const team_member_images = [
        "/images/blueguy.png", "/images/blackgirl.png", "/images/keyboardguy.png", "/images/redguy.png"
    ]
    return (

        <div className='h-screen snap-y snap-always overflow-y-scroll bg-[#0E0E0E]'>
            <section className='relative grid grid-cols-1 md:grid-cols-2 lg:min-h-screen pt-20 md:pt-0 max-w-[1500px] mx-auto'>

                <h1 className="pt-12 leading-tight lg:max-h-full overflow-hidden lg:sticky top-0 p-6 max-md:pb-0 m-auto">
                    <span className="block text-[7rem] lg:text-[18rem] xl:text-[19.5rem] leading-none font-bebas text-[#FFFFFF21]">
                        ABOUT
                    </span>
                    <span className="block text-[7rem] lg:text-[18rem] xl:text-[19.5rem] leading-none font-bebas text-white -translate-y-[30%] lg:-translate-y-[50%]">
                        US
                    </span>
                </h1>

                <div className='text-[#ffffffd6] xl:text-lg font-light flex flex-col justify-center max-w-md mx-auto max-md:px-5'>
                    <p className=''>Imperiah Music Studios (IM Studios) - Your Premier Destination for Rehearsal, Recording, and Live Streaming, in London</p>
                    <h2 className='text-white text-3xl mt-8'>Our mission</h2>
                    <p className='mt-1 m'>{appInfo?.footer.mission_statement}</p>
                </div>

                <Image
                    className="absolute bottom-0 right-0 rounded-[40%] blur-[4000px] opacity-30"
                    src="/images/contact_bg_gradient.png"
                    alt="bg-gradient"
                    width={650}
                    height={650}
                />
            </section>

            <section className=' lg:min-h-[90vh] pt-20 md:pt-0 bg-black'>

                <div className='relative grid grid-cols-1 md:grid-cols-2 max-w-[1500px] mx-auto'>
                    <div className='text-[#FFFFFFE8] xl:text-xl font-light flex flex-col justify-center w-full max-w-3xl mx-auto max-md:order-2'>
                        <div className='grid lg:flex items-stretch lg:max-xl:justify-around flex-wrap gap-5 xl:gap-10'>
                            {
                                appInfo?.team_members.map((member, index) => (
                                    <article key={index} className='relative text-black h-[300px] md:h-[380px] lg:h-[400px] bg-cover rounded-3xl w-full max-w-[300px]' style={{ backgroundImage: `url(${team_member_images[index]})` }}>
                                        {/* <Image src={team_member_images[index]} alt='team_img' width={300} height={500} className='rounded-3xl' /> */}
                                        <div className='absolute z-[10] w-[calc(100%-24px)] bottom-0 border-[0.5px] flex items-start justify-between gap-7 leading-tight rounded-[1.25rem] px-4 py-3.5 m-3 backdrop-blur-lg bg-gradient-to-r from-[#FFFFFF33] to-[#FFFFFF20]'>
                                            <div>
                                                <h4 className='text-white text-[14px] font-semibold'>{member.name}</h4>
                                                <h4 className='text-white text-[10px] font-medium mt-2'>{member.role}</h4>
                                            </div>
                                            <div className='flex gap-3 mt-4'>
                                                <Link href={member.ig_link || '#'}> <Instagram className='text-white size-4' /> </Link>
                                                <Link href={member.fb_link || '#'}> <Facebook className='text-white size-4' /> </Link>
                                                <Link href={member.x_link || '#'}> <Twitter className='text-white size-4' /> </Link>
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
                            <p className='max-md:hidden text-xs font-sans font-light text-white mt-24 max-w-sm'>At IM STUDIOZ, our team combines creativity and technical expertise to deliver exceptional sound and overall level of professionalism for your music process..</p>
                        </div>
                        <h1 className="text-[7rem] lg:text-[18rem] xl:text-[19.5rem] leading-none font-bebas text-white -translate-y-[20%] lg:-translate-y-[50%]">
                            TEAM
                        </h1>
                    </div>
                    <Image
                        className="absolute bottom-0 left-0-0 rounded-[40%] blur-[4000px] opacity-30"
                        src="/images/contact_bg_gradient.png"
                        alt="bg-gradient"
                        width={650}
                        height={650}
                    />
                </div>
            </section>
        </div>
    )
}

export default Page