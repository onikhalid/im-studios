import { TWebAppAPIResponse } from "@/contexts/info";

export const FALLBACK_INFO: TWebAppAPIResponse = {
  "hero_section": {
    "id": "4b07f8fc-8ab6-4495-860b-c77b71230d1a",
    "created_at": "2025-02-07T10:44:28.971716Z",
    "updated_at": "2025-02-10T17:12:40.904493Z",
    "title": "Imperiah",
    "cta_text": "Book Now",
    "subtitle": "Located in SE15, we provide top-tier rehearsal, recording, and live-streaming services.",
    "background_image": null,
    "hero_text": [
      "Rythm",
      "Melody",
      "Music",
      "Beats",
      "Groove",
      "Sounds"
    ]
  },
  "services": [
    {
      "id": "318735b8-c9a8-4bef-8ac7-fcf0fa6db71b",
      "service_name": "Recording Sessions",
      "service_type": "RECORDING",
      "service_description": "High-quality recording sessions with expert engineers.",
      "icon": null,
      "equipment": null,
      "categories": [
        {
          "id": "8d03bf78-81c5-42b8-852f-f915426634c9",
          "category_name": "Day Recording Session",
          "category_description": "Our Day Recording Sessions take place during standard hours, from 12noon to 5pm. Must be booked 1 week in advance. \r\nPrice: £220",
          "category_cost": 220.0,
          "category_hours": 5,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        },
        {
          "id": "f2ee117e-828e-4371-990d-ae1bbeeed77c",
          "category_name": "Multitrack Recording",
          "category_description": "Recording of multiple instruments, and vocals on separate tracks, allowing for individual editing, mixing and mastering. Perfect for live performance where post-production is needed. Note: Price Excludes editing, mixing, and mastering, which can be added as separate services (if required).\r\nIn studio Price: £300\r\nOut Studio price: £500",
          "category_cost": 300.0,
          "category_hours": 4,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        },
        {
          "id": "c1fe74c2-93dd-43c2-8607-a49e02c8700c",
          "category_name": "Evening Recording  Session",
          "category_description": "Our Evening Sessions are held during off-peak hours, typically from 7pm to 11pm. Last minute bookings welcome.",
          "category_cost": 180.0,
          "category_hours": 4,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        }
      ]
    },
    {
      "id": "342ff343-991e-4e8a-a492-c38d076132cd",
      "service_name": "Mixing & Mastering",
      "service_type": "MIXING_MASTERING",
      "service_description": null,
      "icon": null,
      "equipment": null,
      "categories": [
        {
          "id": "ca09b3c7-4368-4e2e-a8c2-e6c41b733998",
          "category_name": "Vocal Editing",
          "category_description": "Our vocal editing service ensures your recordings are polished and professional, including pitch correction, timing adjustments, and noise removal for a clean, balanced sound.  \r\nPrice: £150 per track.",
          "category_cost": 150.0,
          "category_hours": null,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        },
        {
          "id": "8853e299-1e3b-41db-b704-063549fc74a0",
          "category_name": "Mixing",
          "category_description": "Our mixing service involves balancing individual tracks—vocals, instruments, and more—to create a polished, cohesive sound. We apply EQ, compression, reverb, and panning adjustments to ensure your track is professionally crafted.\u2028Price: From £150 per track (pricing may vary based on track duration and mix complexity).",
          "category_cost": 150.0,
          "category_hours": null,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        },
        {
          "id": "7985add2-5e58-4b57-be31-7dcc2fd0014e",
          "category_name": "Mastering",
          "category_description": "Mastering is the final step in music production, where your mixed track is optimized for various platforms and formats. This ensures your music sounds its best across all listening devices, from headphones to high-end speakers.\u2028Price: £130 per track.",
          "category_cost": 150.0,
          "category_hours": null,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        },
        {
          "id": "75edfa65-3c7a-435a-95e3-3c3e09756e4c",
          "category_name": "Mixing & Mastering (Package)",
          "category_description": "Our Mixing & Mastering package combines both services into one streamlined offering, providing a complete solution for clients who want their tracks professionally mixed and mastered at a great value.\u2028Price: From £250 (depending on track complexity and track duration).",
          "category_cost": 250.0,
          "category_hours": null,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        }
      ]
    },
    {
      "id": "b5b9be93-0517-4c5f-8399-6df49a1dd827",
      "service_name": "Production Services",
      "service_type": "PRODUCTION",
      "service_description": null,
      "icon": null,
      "equipment": null,
      "categories": [
        {
          "id": "22257dc1-4b5d-42f8-9c5f-9c942716de80",
          "category_name": "NPO Packages (Non-Profit Organization Packages)",
          "category_description": "Tailored services for charities or non-profits needing music production, including affordable rates and special considerations. Consultation required",
          "category_cost": 0.0,
          "category_hours": null,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": [
            {
              "id": "3af0e196-5b2d-4cbe-9f47-7862b957cd8a",
              "package_name": "Bronze package",
              "package_description": "Bronze package (from 1000 pounds)\r\n- 2 Rehearsal sessions\r\n- 1 special track (max 4 minutes) for the event (including mixing and mastering).",
              "package_cost": 1000.0
            },
            {
              "id": "39beb842-1a6d-463a-b2c2-41b23ab18bf4",
              "package_name": "Silver Package",
              "package_description": "Silver Package: (from 1500 pounds)\r\n- 4 Rehearsal Session\r\n- 1 Special Track up to 10 minutes with 50% off mixing and mastering\r\n- Free audio Jingle for the event including mixing and mastering\r\n- Any 2 from IM instrumentalists (to be booked 3months ahead of event)",
              "package_cost": 1500.0
            },
            {
              "id": "1967ba20-a14f-4419-a96d-4430000ae2d2",
              "package_name": "Gold Package",
              "package_description": "Gold Package (from 2000 pounds)\r\n- Up to 6 Rehearsal Session\r\n- 2 Special Track up to 15minutes in total\r\n- Free Jingle for the event 50% off mixing and mastering\r\n- Any 2 from IM instrumentalists (to be booked 3months ahead of event)",
              "package_cost": 2000.0
            }
          ]
        },
        {
          "id": "ee78b04c-58fe-4ab9-93fc-e56a7cadcfd4",
          "category_name": "Full Album Production",
          "category_description": "Comprehensive service that includes overseeing all aspects of the recording, mixing, and mastering process for an entire album. A producer will guide the project from concept to final release. Consultation required \u2028Price: From £5000 (depending on experience, scope of work, and studio involvement).",
          "category_cost": 5000.0,
          "category_hours": null,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        },
        {
          "id": "73aebd57-da2c-4688-a8d5-43d9fa7e62c0",
          "category_name": "Songwriting",
          "category_description": "Collaborative or solo songwriting sessions to develop lyrics, melodies, and full compositions for original tracks.\u2028Price Range: from £150 per song.",
          "category_cost": 150.0,
          "category_hours": null,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        },
        {
          "id": "e7d1e6e9-1821-437b-b5a4-de70a0c41391",
          "category_name": "Track Production",
          "category_description": "Creating a single track from scratch, including arrangement, recording, mixing, and production. This service is ideal for independent artists looking to release individual songs. Consultation required\u2028Price: From £1000 per track.",
          "category_cost": 1000.0,
          "category_hours": null,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        },
        {
          "id": "945268d5-d994-409d-8de7-04526cff2ad5",
          "category_name": "Vocal Production",
          "category_description": "Focusing on vocal performance and recording, including coaching, arrangement, and technical execution. Consultation required\u2028Price: From £150 / per track.",
          "category_cost": 150.0,
          "category_hours": null,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        },
        {
          "id": "64d28491-b211-491f-9d1b-5939e2d20017",
          "category_name": "Consultation",
          "category_description": "A personalized session to discuss your creative goals, project needs, or technical requirements, providing expert guidance to bring your vision to life. \r\nPrice: first 30 minutes free, £20 an hour thereafter",
          "category_cost": 20.0,
          "category_hours": null,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        }
      ]
    },
    {
      "id": "63302486-b821-49ec-957a-288eb2c5cfd6",
      "service_name": "Streaming Services",
      "service_type": "STREAMING",
      "service_description": null,
      "icon": null,
      "equipment": null,
      "categories": [
        {
          "id": "b7e5d46f-4b25-41a8-ab3c-756cc6d5fbd2",
          "category_name": "Live Streaming",
          "category_description": "Setup and broadcast of live in studio events or performances, including audio-visual mixing and streaming on platforms like YouTube, Facebook, or Twitch. All cameras included with all audio equipment.\u2028Price: £350 (without cameras), £500 including cameras, £600 with camera and editing.(3hrs)",
          "category_cost": 0.0,
          "category_hours": 3,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": [
            {
              "id": "698eef3f-e870-442b-aba9-1b4eb8ff012a",
              "package_name": "Live Stream Without Camera",
              "package_description": "Live Stream Without Camera",
              "package_cost": 350.0
            },
            {
              "id": "e8a78976-5c84-40d6-8010-5f431921c64e",
              "package_name": "Live Stream With Camera",
              "package_description": "Live Stream With Camera",
              "package_cost": 500.0
            },
            {
              "id": "bc9224b2-d874-44f5-90b4-9ea4d08d9a91",
              "package_name": "Live Stream With Camera and Editing",
              "package_description": "Live Stream With Camera and Editing",
              "package_cost": 600.0
            }
          ]
        },
        {
          "id": "c916353a-8f8f-4749-bc34-4fffd7995437",
          "category_name": "Podcast Production",
          "category_description": "Complete podcast production, including audio recording, audio editing, mixing, and post-production. Ideal for individuals or businesses launching a podcast series. With all cameras included and audio equipment.\u2028Price: 1 Hour £100, 2 hours £160, 3 hours £240",
          "category_cost": 0.0,
          "category_hours": null,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": [
            {
              "id": "3e9dbd0e-a90b-4206-b58c-d628d9344088",
              "package_name": "An Hour Package",
              "package_description": "The streaming service last for an hour",
              "package_cost": 100.0
            },
            {
              "id": "43316b70-dbed-4728-9ede-ea93474df685",
              "package_name": "Two(2) Hours Package",
              "package_description": "The streaming service last for two(2) hours",
              "package_cost": 160.0
            },
            {
              "id": "9f298983-1c21-4cc1-9c79-c5574bf9a770",
              "package_name": "Three(3) Hours Package",
              "package_description": "This streaming last for three(3) hours",
              "package_cost": 240.0
            }
          ]
        }
      ]
    },
    {
      "id": "a5c47497-0f9a-414d-b2a3-a8466baf48a1",
      "service_name": "Rehearsals",
      "service_type": "REHEARSAL",
      "service_description": "A practice session where artists, bands, or performers refine their music, performance, or arrangements in preparation for recording, live shows, or events.\r\n\r\n\r\nNote: this service is dry hire and does not include the use of recording equipment just instruments.",
      "icon": null,
      "equipment": "",
      "categories": [
        {
          "id": "3f06f18f-bef1-45a0-9abb-104e52231000",
          "category_name": "Day Rehearsal Session",
          "category_description": "Our Day Recording Sessions take place during standard hours, from 12noon to 5pm. Must be booked 1 week in advance",
          "category_cost": 180.0,
          "category_hours": 5,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        },
        {
          "id": "2d44f6ec-54fd-4243-b423-589dbbad7d42",
          "category_name": "Evening Rehearsal Session",
          "category_description": "Our Evening Sessions are held during off-peak hours, typically from 7pm to 11pm. Last minute bookings welcome. (4hrs)",
          "category_cost": 150.0,
          "category_hours": 4,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        }
      ]
    },
    {
      "id": "bc568b05-98a3-4974-ad59-bd71d43f3bd9",
      "service_name": "Additional Services",
      "service_type": "ADDITIONAL_SERVICES",
      "service_description": "",
      "icon": null,
      "equipment": "",
      "categories": [
        {
          "id": "eb8c611e-04a0-462f-ad52-27b522611b2b",
          "category_name": "Session Musicians",
          "category_description": "Hire experienced musicians to play instruments or provide vocal performances for your recording. Ideal for sessions requiring specific instrumental expertise.\r\nPrice: from £150 – £350 per musician, per session\r\nNote to developer: We need a profile created for each of our musicians with their Names, Description about them location and grade based on reviews. Also their price to book them (exactly like meet the team)",
          "category_cost": 250.0,
          "category_hours": null,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        },
        {
          "id": "7aecc363-5291-4ac3-bfcf-d51556e47049",
          "category_name": "Music Lessons",
          "category_description": "One-on-one music tuition in areas such as vocals, guitar, drums, piano, and music theory.\u2028Price Range: £60 per hour.",
          "category_cost": 60.0,
          "category_hours": null,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        },
        {
          "id": "57876102-6b7f-436f-9698-93a9e1de6579",
          "category_name": "Sound Engineering Courses",
          "category_description": "Educational courses focusing on sound engineering, mixing, mastering, and music production. Ideal for those looking to pursue a career in audio. Consultation required\u2028Price: from £550- £1,500 per course,",
          "category_cost": 550.0,
          "category_hours": null,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        }
      ]
    },
    {
      "id": "83349105-894e-471c-91ff-70c7d624c3ef",
      "service_name": "DUPLICATION_SERVICES",
      "service_type": "DUPLICATION",
      "service_description": "CD Duplication \r\nProfessional duplication of CDs, including printing and packaging services.\r\nNote: (All duplication includes £10 packaging and delivery costs)",
      "icon": null,
      "equipment": "",
      "categories": [
        {
          "id": "d144c88e-bbce-4361-8e63-522058102279",
          "category_name": "CD Duplication",
          "category_description": "Professional duplication of CDs, including printing and packaging services.\r\nNote: (All duplication includes £10 packaging and delivery costs)\r\nOption 1: 2 Sides £2.75 / CD (minimum of 50 CDs- Professional duplication of CDs, including printing and packaging services. Price includes coloured printing on jacket, Main CD printing and audio duplication and shrink-wrapping on each CD.\r\n \r\nOption 2: 4 Sides £3.50 CD (minimum of 50 CDs- Professional duplication of CDs, including printing and packaging services. Price includes coloured printing on jacket, Main CD printing and audio duplication and shrink-wrapping on each CD.",
          "category_cost": 0.0,
          "category_hours": null,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": [
            {
              "id": "feb9c907-4eab-40ad-8d7e-cb839ee5f667",
              "package_name": "Option 1",
              "package_description": "2 Sides £2.75 / CD (minimum of 50 CDs- Professional duplication of CDs, including printing and packaging services. Price includes coloured printing on jacket, Main CD printing and audio duplication and shrink-wrapping on each CD.",
              "package_cost": 2.75
            },
            {
              "id": "93218f79-8bb1-480d-b749-ad1bc07087ff",
              "package_name": "Option 2",
              "package_description": "4 Sides £3.50 CD (minimum of 50 CDs- Professional duplication of CDs, including printing and packaging services. Price includes coloured printing on jacket, Main CD printing and audio duplication and shrink-wrapping on each CD.",
              "package_cost": 3.5
            }
          ]
        },
        {
          "id": "aaefbdca-7d2c-4f49-b918-8e7ef705fbcf",
          "category_name": "USB Duplication",
          "category_description": "Copying music or other content onto USB drives, ideal for unique promotional items or physical Audio media in mp3. (Note: All duplication includes £10 packaging and delivery costs)\r\n\r\nPrice: from £4.50 per USB",
          "category_cost": 4.5,
          "category_hours": null,
          "start_time": null,
          "end_time": null,
          "sub_category_packages": []
        }
      ]
    }
  ],
  "about": {
    "id": "311cf5ad-3e72-49cd-8638-aaaf4e0f9205",
    "created_at": "2025-02-07T10:44:35.805584Z",
    "updated_at": "2025-02-07T10:44:35.805606Z",
    "title": "About IM Studios",
    "content": "State-of-the-art equipment, expert engineers, and a creative environment to bring your music to life.",
    "image": null
  },
  "footer": {
    "id": "196bff02-1dea-431c-9d27-1e04a576bd28",
    youtube_link: "https://www.youtube.com/@imstudioz",
    "whatsapp_url": "https://wa.me/+447415167302?text=",
    "created_at": "2025-02-07T10:44:37.790682Z",
    "updated_at": "2025-03-17T10:55:43.736967Z",
    "copyright_text": "Copyright ©️ 2024, IM STUDIOZ. All rights reserved",
    "contact_phone_number": "4474151673",
    "whatsapp_phone_number": "+447415167302",
    "x_link": "https://x.com/imstudioz?s=21",
    "linkedin_link": "https://x.com/imstudioz?s=11",
    "instagram_link": "https://www.instagram.com/im_studioz/",
    "facebook_link": "https://www.facebook.com/profile.php?id=61571485552570",
    "contact_email": "info.imstudioz@gmail.com",
    "telegram_link": null,
    "mission_statement": "At Imperiah Music Studios (IM Studios), our mission is to empower creativity by providing an enabling space where artists, musicians, and creators can thrive. With state-of-the-art technology, expert audio engineering, and an inspiring environment, we are dedicated to delivering exceptional rehearsal, recording, and live-streaming experiences. Rooted in a passion for music and a deep commitment to excellence, we strive to bring every creative vision to life while championing the global reach of music and artistry. We hope you join us as we bring this mission to reality."
  },
  "team_members": [
    {
      "id": "693ae4a6-3e85-4e18-8693-03a34428da52",
      "created_at": "2025-02-07T10:44:39.864620Z",
      "updated_at": "2025-02-07T10:44:39.864641Z",
      "name": "Tosin Ogunbameru",
      "role": "Lead Engineer",
      "nick_name": null,
      "image": null,
      "ig_link": "https://www.instagram.com/im_tosyn/",
      "fb_link": null,
      "x_link": null
    },
    {
      "id": "494322d6-39da-4de9-a0d3-a63a1db645b1",
      "created_at": "2025-02-07T10:44:41.098772Z",
      "updated_at": "2025-02-07T10:44:41.098792Z",
      "name": "Aanu Akinsanya",
      "role": "Studio Manager",
      "nick_name": null,
      "image": null,
      "ig_link": null,
      "fb_link": null,
      "x_link": null
    }
  ],
  "studios": [
    {
      "id": "b36363a2-0f19-442c-8355-802d6fd2ea0a",
      "created_at": "2025-02-07T10:48:57.602857Z",
      "updated_at": "2025-02-07T10:48:57.602921Z",
      "title": "Main Studio",
      "icon": "https://example.com/icons/main_studio.png"
    },
    {
      "id": "f2f7a75f-953a-4e3c-a4e2-91e86fe00f2b",
      "created_at": "2025-02-07T10:48:59.182635Z",
      "updated_at": "2025-02-07T10:48:59.182660Z",
      "title": "Vocal Booth",
      "icon": "https://example.com/icons/vocal_booth.png"
    },
    {
      "id": "3c5f8b91-cf36-4d79-9dbf-a1d3daea034d",
      "created_at": "2025-02-07T10:49:00.583086Z",
      "updated_at": "2025-02-07T10:49:00.583107Z",
      "title": "Production Suite",
      "icon": "https://example.com/icons/production_suite.png"
    }
  ],
  "faqs": [
    {
      "id": "9e43d129-69bc-4282-8df1-3a2b6e90c527",
      "created_at": "2025-02-07T10:49:03.178996Z",
      "updated_at": "2025-02-07T10:49:03.179018Z",
      "question": "What are your opening hours?",
      "answer": "We are open from 9 AM to 11 PM, Monday to Sunday."
    },
    {
      "id": "0fe355e2-137e-4d7e-a063-c6e8427fd38f",
      "created_at": "2025-02-07T10:49:04.484242Z",
      "updated_at": "2025-02-07T10:49:04.484267Z",
      "question": "Do you offer discounts for bulk bookings?",
      "answer": "Yes! Contact us for special rates on bulk bookings."
    },
    {
      "id": "a3ad57b7-75ef-4596-a41b-49ee4f6d0fe5",
      "created_at": "2025-02-07T10:49:06.323847Z",
      "updated_at": "2025-02-07T10:49:06.323870Z",
      "question": "Can I bring my own producer?",
      "answer": "Absolutely! You can bring your own producer or work with ours."
    }
  ],
  "testimonials": [
    {
      "id": "82977e7b-3103-46b3-9f48-bd8fd7482980",
      "created_at": "2025-02-07T10:49:08.163030Z",
      "updated_at": "2025-02-07T10:49:08.163053Z",
      "name": "John Doe",
      "role": "Independent Artist",
      "review": null
    },
    {
      "id": "b50945e3-54a0-46c1-ae8b-b1effe38ee8b",
      "created_at": "2025-02-07T10:49:09.710157Z",
      "updated_at": "2025-02-07T10:49:09.710188Z",
      "name": "Jane Smith",
      "role": "Music Producer",
      "review": null
    },
    {
      "id": "235c10d1-8299-4e58-96e0-c15880e52f49",
      "created_at": "2025-02-07T10:49:12.275992Z",
      "updated_at": "2025-02-07T10:49:12.295011Z",
      "name": "DJ Khaled",
      "role": "DJ & Producer",
      "review": null
    }
  ]
};