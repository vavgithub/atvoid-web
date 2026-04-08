import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full mx-auto bg-black text-white pt-0 md:pt-20 pb-20 px-5 md:px-10 lg:px-20 overflow-hidden">
      <div className="relative w-full max-w-[1440px] mx-auto min-h-[500px]">
        
        {/* Left Column */}
        <div className="flex flex-col justify-between h-full space-y-10 md:space-y-0 relative">
          
          <div className="mt-10 space-y-12">
            {/* Socials */}
            <div className="flex items-center gap-4">
              <span className="font-pp-neue-corp text-base font-medium">Socials</span>
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
              <div className="flex items-center gap-8">
                <div className="w-[140px] h-[130px] flex items-center justify-center relative">                   <Image 
                     src="/images/usa.svg" 
                     alt="USA Location" 
                     width={116} 
                     height={130}
                     className="w-full h-full object-contain"
                   />
                </div>
                <div className="mt-12 text-base font-medium leading-relaxed min-w-[250px] font-pp-neue-corp">
                  <p>1021 E Lincolnway Suite</p>
                  <p>#8086, Cheyenne, Wyoming</p>
                  <p>82001, United States</p>
                </div>
              </div>

              {/* Dubai */}
              <div className="flex items-center gap-8">
                <div className="w-[140px] h-[130px] flex items-center justify-center relative">
                    <Image 
                      src="/images/dubai.svg" 
                      alt="Dubai Location" 
                      width={140} 
                      height={130}
                      className="w-full h-full object-contain"
                    />
                </div>
                <div className="mt-12 text-base leading-relaxed min-w-[250px] font-pp-neue-corp">
                  <p>9, ART XVII,</p>
                  <p>Business Bay</p>
                  <p>Dubai, UAE</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="md:mt-10">
            <p className="text-base text-[#5B5B5B] font-pp-neue-corp">© 2026 VAV™</p>
          </div>

        </div>

        {/* Right Column - Big Text */}
        <div className="mt-10 ml-auto w-[clamp(220px,80vw,891px)] pointer-events-none md:absolute md:right-0 md:bottom-0 md:mt-0 md:w-[891px] md:max-[1269px]:w-[clamp(260px,60vw,891px)]">
          <div className="w-full">
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

