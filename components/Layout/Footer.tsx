import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="max-w-[1280px] w-full mx-auto bg-black text-white pt-20 pb-10 px-5 md:px-10 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between md:items-end w-full max-w-[1440px] mx-auto min-h-[500px]">
        
        {/* Left Column */}
        <div className="flex flex-col justify-between h-full space-y-10 md:space-y-0 relative">
          
          <div className="space-y-12">
            {/* Socials */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Socials</span>
              <div className="flex gap-2">
                {[
                  { name: 'LinkedIn', icon: '/images/linkedin.svg', url: '#' },
                  { name: 'Instagram', icon: '/images/instagram.svg', url: '#' },
                  { name: 'YouTube', icon: '/images/youtube.svg', url: '#' },
                  { name: 'Twitter', icon: '/images/twitter.svg', url: '#' },
                  { name: 'Facebook', icon: '/images/facebook.svg', url: '#' },
                  { name: 'Pinterest', icon: '/images/pintrest.svg', url: '#' },
                ].map((social) => (
                  <Link 
                    key={social.name} 
                    href={social.url}
                    className="hover:scale-110 transition-transform"
                  >
                    <Image 
                      src={social.icon} 
                      alt={social.name} 
                      width={32} 
                      height={32} 
                      className="w-8 h-8"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div className="space-y-8">
              {/* USA */}
              <div className="flex items-center gap-6">
                <div className="w-[100px] h-[100px] flex items-center justify-center relative">
                   <Image 
                     src="/images/usa.svg" 
                     alt="USA Location" 
                     width={100} 
                     height={100}
                     className="w-full h-full object-contain"
                   />
                </div>
                <div className="text-sm leading-relaxed max-w-[200px] font-pp-neue-corp">
                  <p>1021 E Lincolnway Suite</p>
                  <p>#8086, Cheyenne, Wyoming</p>
                  <p>82001, United States</p>
                </div>
              </div>

              {/* Dubai */}
              <div className="flex items-center gap-6">
                <div className="w-[100px] h-[100px] flex items-center justify-center relative">
                    <Image 
                      src="/images/dubai.svg" 
                      alt="Dubai Location" 
                      width={100} 
                      height={100}
                      className="w-full h-full object-contain"
                    />
                </div>
                <div className="text-sm leading-relaxed max-w-[200px] font-pp-neue-corp">
                  <p>9, ART XVII,</p>
                  <p>Business Bay</p>
                  <p>Dubai, UAE</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-10 md:mt-20">
            <p className="text-sm text-gray-500 font-pp-neue-corp">© 2026 VAV™</p>
          </div>
        </div>

        {/* Right Column - Big Text */}
        <div className="mt-10 md:mt-0 flex flex-col justify-end items-end pr-4 md:pr-0 self-end">
          <div className="w-full max-w-[200px] md:max-w-[400px] lg:max-w-[600px] xl:max-w-[800px]">
             <Image
              src="/images/VAV.svg"
              alt="VALUE AT VOID"
              width={891}
              height={486}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

