"use client"
import Link from "next/link"
import { Button } from "@/components/ui"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react";


export default function TermsOfService() {
    const router = useRouter();
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl mt-16">
            <Button size="sm" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-4" />
                Back
            </Button>

            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-4">IM Studioz London – Terms of Service</h1>
            </header>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">1. General</h2>
                <p className="mb-4">
                    Imperiah Studioz Ltd London (&quot;IM Studioz&quot;) owns and operates this website. By accessing or using the website,
                    you agree to these Terms of Service.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">2. Intellectual Property</h2>
                <p className="mb-4">
                    All content on this website, including text, images, audio, video, and software, is the property of IM Studioz
                    or its licensors and protected by copyright laws. You may only use the content for personal, non-commercial
                    purposes. Modification, reproduction, or distribution without permission is prohibited.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">3. Website Use</h2>
                <p className="mb-4">
                    IM Studioz provides this website &quot;as is&quot; and makes no guarantees regarding its accuracy, reliability, or
                    availability. We are not liable for any direct or indirect damages arising from its use.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">4. Purchases</h2>
                <p className="mb-4">
                    When purchasing services or products, you may be required to provide personal and payment information. IM
                    Studioz uses third-party payment providers and is not responsible for their policies or data handling
                    practices.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">5. Cookies</h2>
                <p className="mb-4">
                    We use cookies to enhance your browsing experience. You can disable cookies in your browser settings, but some
                    website features may not function properly.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">6. User Conduct</h2>
                <p className="mb-4">
                    You agree not to post, share, or transmit any unlawful, abusive, defamatory, or objectionable content. IM
                    Studioz reserves the right to remove content or block users who violate these terms.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">7. Age Restrictions</h2>
                <p className="mb-4">Users under 16 require parental or guardian consent to provide personal information.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">8. External Links</h2>
                <p className="mb-4">
                    IM Studioz is not responsible for the content, policies, or practices of third-party websites linked from this
                    site.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">9. Privacy & Security</h2>
                <p className="mb-4">
                    We take reasonable measures to protect your personal information but cannot guarantee complete security for
                    data transmitted over the internet.
                </p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">10. Changes to Terms</h2>
                <p className="mb-4">
                    IM Studioz may update these terms at any time. Continued use of the website constitutes acceptance of the
                    revised terms.
                </p>
            </section>

            <section className="mt-10 pt-6 border-t border-border">
                <h2 className="text-xl font-semibold mb-3">Contact Us:</h2>
                <address className="not-italic">
                    <p>
                        Email:{" "}
                        <Link href="mailto:info.imstudioz@gmail.com" className="text-primary hover:underline">
                            info.imstudioz@gmail.com
                        </Link>
                    </p>
                    <p>
                        Phone:{" "}
                        <Link href="tel:07564880711" className="text-primary hover:underline">
                            07564 880711
                        </Link>
                    </p>
                </address>
            </section>
        </div>
    )
}

