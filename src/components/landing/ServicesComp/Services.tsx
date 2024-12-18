import Image from 'next/image'
import React from 'react'

const Services = () => {

    const services = [
        {
            images: '/images/services1',
            title: 'Recording',
            contents: `Capture your sound with crystal-clear precision in our state-of-the-art recording studios. Whether it's vocals, instruments, or voice-overs, we deliver top-tier quality with industry-standard equipment and experienced engineers who bring your creative vision to life.`
        },
        {
            images: '/images/services2',
            title: 'Mastering',
            contents: `Achieve sonic perfection with our mastering services. We fine-tune your music to industry standards, enhancing clarity, depth, and volume for a final product that stands out on every platform and system.`
        },
        {
            images: '/images/services3',
            title: 'Mixing',
            contents: `Transform your raw recordings into polished masterpieces with our professional mixing services. Our engineers blend your tracks with skill and creativity, ensuring every element shines in a balanced, impactful mix that’s ready for release.`
        },
        {
            images: '/images/services4',
            title: 'Podcast',
            contents: `Bring your stories to life with our podcast production services. From recording to editing, we provide the tools and expertise to deliver high-quality audio that captivates your audience and keeps them coming back for more.`
        },
        {
            images: '/images/services5',
            title: 'Rehearsals',
            contents: `Perfect your performance in our acoustically treated rehearsal spaces. Designed for bands, solo artists, and ensembles, our rooms offer the space, sound, and setup you need to refine your craft and prepare for your next big gig.`
        },
        {
            images: '/images/services6',
            title: 'Live streams',
            contents: `Take your performances online with our professional live-streaming services. From concerts to podcasts and special events, we ensure seamless streaming with impeccable audio and visual quality, keeping your audience engaged in real time.`
        },
        {
            images: '/images/services7',
            title: 'Duplications',
            contents: `Need copies of your masterpiece? We offer fast and reliable duplication services for CDs, DVDs, and other media formats, ensuring your work is ready to share with the world, just the way you envisioned.`
        },
    ]

    return (
        <main>
            <div>
                {
                    services?.map((service, index) => (
                        <div key={index}>
                            <Image
                                src={service?.images}
                                alt='services'
                                width={500}
                                height={500}
                            />
                            <article>
                                <div>
                                    
                                </div>
                                <h2>{service.title}</h2>
                                <p>{service?.contents}</p>
                            </article>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}

export default Services