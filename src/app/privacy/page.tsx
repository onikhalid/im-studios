"use client"
import { Button } from "@/components/ui"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react";
// import { format } from "date-fns";
// {format(new Date(), "MMM dd, yyyy")}

export default function PrivacyPolicy() {
    const router = useRouter();
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl mt-16">
            <Button size="sm" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-4" />
                Back
            </Button>

            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2">IM Studioz London Privacy Policy</h1>
                <div className="text-sm text-muted-foreground">
                    <p>Version: 1.0</p>
                    <p>Effective Date March 17, 2025</p>
                </div>
            </header>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">WHO WE ARE</h2>
                <p className="mb-4">
                    IM Studioz London we are a professional recording, rehearsal, and podcast studio located in London, UK. We
                    provide audio recording, live streaming, video shoots, and related services. This Privacy Policy explains how
                    we collect, use, and protect your personal information when you use our website, book services, or interact
                    with us.
                </p>
                <p className="mb-4">
                    If you have any questions about this Privacy Policy or how we handle your data, you can contact us at:
                </p>
                <address className="not-italic mb-4">
                    <p className="font-semibold">IM STUDIOZ, LONDON</p>
                    <p>
                        Email:{" "}
                        <Link href="mailto:info.imstudioz@gmail.com" className="text-primary hover:underline">
                            info.imstudioz@gmail.com
                        </Link>
                    </p>
                    <p>
                        Phone:{" "}
                        <Link href="tel:07564880711" className="text-primary hover:underline">
                            07564880711
                        </Link>
                    </p>
                </address>
                <hr className="my-6 border-t border-border" />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">INFORMATION WE COLLECT</h2>

                <h3 className="text-xl font-medium mt-6 mb-3">Information You Provide Directly</h3>
                <p className="mb-4">We collect personal information that you provide when you:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li>Book a service or make a purchase through our website.</li>
                    <li>Contact us via email, phone, or social media.</li>
                    <li>Participate in promotions, contests, or surveys.</li>
                </ul>
                <p className="mb-4">This may include:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li>Contact details: name, email address, phone number, and address.</li>
                    <li>
                        Payment information: billing details, including payment card information. Through a secured third party
                        payment collector.
                    </li>
                    <li>Media and content: images, videos, or audio files uploaded by you.</li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">Information We Collect Automatically</h3>
                <p className="mb-4">When you use our website, we automatically collect certain information, including:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li>IP address and network information.</li>
                    <li>Device details: browser type, operating system, and device identifiers.</li>
                    <li>Usage data: pages visited, time spent on the site, and interaction patterns.</li>
                    <li>Cookies and tracking data: to enhance functionality and track visitor analytics.</li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">Information from Third Parties</h3>
                <p className="mb-4">We may receive information from third-party service providers, such as:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li>Payment processors (e.g., Paypal, Stripe) for payment verification.</li>
                    <li>Social media platforms if you interact with us through those channels.</li>
                </ul>
                <hr className="my-6 border-t border-border" />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">HOW WE USE YOUR INFORMATION</h2>
                <p className="mb-4">We use the data we collect to:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li>Provide and manage our services: process bookings, payments, and customer support inquiries.</li>
                    <li>Improve and personalise your experience: customise content, offers, and promotions.</li>
                    <li>Marketing and communications: send newsletters, special offers, and service updates.</li>
                    <li>Enhance website functionality: monitor usage, detect errors, and improve security.</li>
                    <li>Comply with legal obligations: fulfill tax, accounting, and regulatory requirements.</li>
                </ul>
                <hr className="my-6 border-t border-border" />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">HOW WE SHARE YOUR INFORMATION</h2>
                <p className="mb-4">We may share your information with:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li>
                        Service providers: Payment processors, website hosting, and marketing platforms that help us operate the
                        studio efficiently.
                    </li>
                    <li>Business partners: Trusted third parties who collaborate with us to deliver joint services.</li>
                    <li>Legal authorities: When required by law, regulation, or to protect our legal rights.</li>
                    <li>With your consent: When you explicitly agree to share your information with third parties.</li>
                </ul>
                <p className="mb-4 font-medium">We do not sell or rent your personal information to third parties.</p>
                <hr className="my-6 border-t border-border" />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">STORAGE AND RETENTION OF INFORMATION</h2>
                <p className="mb-4">
                    We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy
                    Policy. This may include retaining data to comply with legal obligations, resolve disputes, or enforce
                    agreements.
                </p>
                <p className="mb-4">When data is no longer required, we securely delete or anonymize it.</p>
                <hr className="my-6 border-t border-border" />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">YOUR RIGHTS</h2>
                <p className="mb-4">You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li>Access: Request access to the personal data we hold about you.</li>
                    <li>Correction: Request corrections to inaccurate or incomplete information.</li>
                    <li>Deletion: Request the removal of your personal data, where legally applicable.</li>
                    <li>Withdraw consent: Opt out of marketing communications at any time.</li>
                    <li>Data portability: Request a copy of your personal data in a portable format.</li>
                </ul>
                <p className="mb-4">
                    To exercise your rights, contact us at:{" "}
                    <Link href="mailto:info.imstudioz@gmail.com" className="text-primary hover:underline">
                        info.imstudioz@gmail.com
                    </Link>
                </p>
                <hr className="my-6 border-t border-border" />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">COOKIES AND TRACKING TECHNOLOGIES</h2>
                <p className="mb-4">We use cookies and similar technologies to enhance your experience. Cookies help us:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li>Remember your preferences and settings.</li>
                    <li>Analyze website performance and visitor patterns.</li>
                    <li>Deliver personalized ads and promotions.</li>
                </ul>
                <p className="mb-4">You can manage your cookie preferences through your browser settings.</p>
                <hr className="my-6 border-t border-border" />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">CHILDREN&apos;S PRIVACY</h2>
                <p className="mb-4">
                    IM Studioz London does not knowingly collect personal information from children under 16 without parental
                    consent. If you believe we have inadvertently collected such data, please contact us, and we will take steps
                    to delete it.
                </p>
                <hr className="my-6 border-t border-border" />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">SECURITY MEASURES</h2>
                <p className="mb-4">
                    We implement technical and organizational measures to protect your personal information, including:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li>Secure payment processing with encryption.</li>
                    <li>Firewalls and access controls to prevent unauthorized access.</li>
                    <li>Regular security audits and monitoring.</li>
                </ul>
                <p className="mb-4">
                    However, no data transmission over the internet is entirely secure. We cannot guarantee the security of
                    information shared online.
                </p>
                <hr className="my-6 border-t border-border" />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">INTERNATIONAL DATA TRANSFERS</h2>
                <p className="mb-4">
                    If we transfer your personal data outside the UK or EU, we ensure appropriate safeguards are in place, such as
                    contractual clauses or data protection agreements, in compliance with applicable laws.
                </p>
                <hr className="my-6 border-t border-border" />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">CHANGES TO THIS POLICY</h2>
                <p className="mb-4">
                    We may update this Privacy Policy occasionally. Any significant changes will be posted on our website with the
                    updated effective date.
                </p>
                <hr className="my-6 border-t border-border" />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">CONTACT US</h2>
                <p className="mb-4">
                    If you have questions, concerns, or requests regarding this Privacy Policy, you can contact us at:
                </p>
                <address className="not-italic">
                    <p>IM Studioz London, UK</p>
                    <p>
                        Email:{" "}
                        <Link href="mailto:info.imstudioz@gmail.com" className="text-primary hover:underline">
                            info.imstudioz@gmail.com
                        </Link>
                    </p>
                    <p>
                        Phone:{" "}
                        <Link href="tel:07564880711" className="text-primary hover:underline">
                            07564880711
                        </Link>
                    </p>
                </address>
            </section>
        </div>
    )
}

