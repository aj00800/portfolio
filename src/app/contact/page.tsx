'use client';

import TextDisperse from '@/app/contact/textDisperse/textDisperse';
import { clsx } from 'clsx';
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { ContactForm } from '@/app/contact/contactForm';
import { useToast } from '@/components/ui/use-toast';

export default function Contact() {
  const background = useRef(null);
  const emailRef = useRef(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const { toast } = useToast();

  const setBackground = (isActive: any) => {
    gsap.to(background.current, { opacity: isActive ? 0.7 : 0 });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('aj08abdullah@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const scrollToEmail = () => {
    const emailSection = document.getElementById('email');
    copyEmail();
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="-mt-20 bg-black text-white">
      <div className="flex min-h-screen w-full items-center justify-center pt-44 align-middle text-[8.6vw] xs:text-[5.6vw]">
        <div className="p-12 xs:w-1/2 xs:p-0">
          <div className="flex justify-between uppercase text-white">
            <p className="m-0 text-white">Abdullah</p>
            <p className="m-0 text-white">Jamil</p>
          </div>
          <div className="flex justify-between uppercase text-white">
            <p className="m-0 text-white">Computer</p>
            <p className="m-0 text-white">Vision</p>
          </div>
          <div className="flex justify-between uppercase text-white">
            <p className="m-0 text-white">&</p>
            <p className="m-0 text-white">Full-Stack</p>
          </div>
          <div className="flex justify-between uppercase text-white">
            <p className="m-0 text-white">Engineer</p>
            <p className="m-0 text-white">Lahore</p>
          </div>
          <div className="flex justify-between uppercase text-white">
            <Link href={'https://www.linkedin.com/in/abdullah-jamil-b47015284/'}>
              <TextDisperse setBackground={setBackground}>
                <p className="text-white">→Linkedin</p>
              </TextDisperse>
            </Link>
            <TextDisperse
              setBackground={setBackground}
              onClick={() => {
                toast({
                  description:
                    'Email copied to clipboard, alternatively write your enquiry on the form!'
                });
                scrollToEmail();
              }}
            >
              <p className="m-0 text-white">→Email</p>
            </TextDisperse>
          </div>
          <div className="flex justify-between uppercase text-white">
            <Link href={'https://github.com/aj00800'}>
              <TextDisperse setBackground={setBackground}>
                <p className="text-white">→Github</p>
              </TextDisperse>
            </Link>
            <p className="m-0 text-white">0325-4433324</p>
          </div>
          <div
            ref={background}
            className={clsx(
              'pointer-events-none absolute inset-0 h-full w-full bg-muted text-[5.6vw] opacity-0'
            )}
          ></div>
        </div>
      </div>
      <div className="bg-white px-12 pb-20 sm:px-56" id="email" ref={emailRef}>
        <div className="text-black">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
