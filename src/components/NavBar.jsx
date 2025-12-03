import React, { useEffect, useState } from 'react';
import { useAnimate, stagger, motion } from 'framer-motion';

const Path = (props) => (
  <motion.path 
    fill='transparent' 
    strokeWidth='3' 
    stroke='hsl(0, 0%, 30%)' 
    strokeLinecap='round' 
    {...props}
  />
);

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scope, animate] = useAnimate();
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      if (NavItems.some(item => item.id === hash)) {
        setActiveItem(hash);
      }
    }

    const menuAnimations = isOpen ? [
      [
        'nav.mobile-nav',
        { transform: "translateX(0%)" },
        { ease: [0.88, 0.65, 0.53, 0.96], duration: 0.6 }
      ],
      [
        'li.mobile-item',
        { transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' },
        { delay: stagger(0.05), at: '-0.1' },
      ]
    ] : [
      ['li.mobile-item',
        { transform: 'scale(0.5)', opacity: 0, filter: 'blur(10px)' },
        { delay: stagger(0.05, { from: 'last' }), at: '<' },
      ],
      [
        'nav.mobile-nav',
        { transform: "translateX(-100%)" }, { at: '-0.1' }
      ],
    ];

    animate([
      [
        'path.top',
        { d: isOpen ? 'M 3 16.5 L 17 2.5' : 'M 2 2.5 L 20 2.5' },
        { at: '<' }
      ],
      [
        'path.middle',
        { opacity: isOpen ? 0 : 1 }, { at: '<' }
      ],
      [
        'path.bottom',
        { d: isOpen ? 'M 3 2.5 L 17 16.346' : 'M 2 16.346 L 20 16.346' },
        { at: '<' }
      ],
      ...menuAnimations
    ]);
  }, [isOpen, animate]);

  const handleNavItemClick = (sectionId, e) => {
    e.preventDefault();
    setActiveItem(sectionId);
    setIsOpen(false);
    
    window.location.hash = sectionId;
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: "start",
      });
    }
  };

  const NavItems = [
    { id: 'services', text: 'What I Offer?' },
    { id: 'skills', text: 'My Skills' },
    { id: 'experience', text: 'Education & Experience' },
    { id: 'work', text: 'My Work' },
    { id: 'contact', text: 'Contact' },
  ];

  return (
    <div className="relative w-full">
      {/* Desktop Navigation - Circular with Transparent White */}
      <div className="hidden md:flex w-full justify-between items-center px-8 py-4 bg-[#faf6f2]/80 backdrop-blur-sm rounded-[3rem] mx-auto max-w-6xl my-4 border border-white/50 shadow-lg">
        <div className="text-gray-700 text-2xl font-bold pl-2">
          Fatema Kanchwala
        </div>
        
        <div className="flex items-center space-x-2">
          {NavItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavItemClick(item.id, e)}
              className={`text-gray-600 text-sm font-medium transition-all duration-300 ${
                activeItem === item.id 
                  ? 'text-teal-600 font-semibold bg-white/70 px-5 py-2 rounded-full shadow-sm' 
                  : 'hover:bg-white/40 px-5 py-2 rounded-full'
              }`}
            >
              {item.text}
            </a>
          ))}
        </div>
        
        <button
          onClick={(e) => handleNavItemClick('contact', e)}
          className="px-6 py-2.5 bg-teal-500/85 text-white font-medium rounded-full hover:shadow-md transition-all duration-300 hover:bg-teal-600 border border-teal-500/30"
        >
          Hire Me
        </button>
      </div>

      {/* Mobile Navigation - Circular with Transparent White */}
      <div className="md:hidden flex justify-between items-center px-5 py-3">
        <div className="text-gray-700 text-xl font-bold bg-[#faf6f2]/80 px-5 py-2.5 rounded-full border border-white/50 shadow-sm">
          Fatema K.
        </div>

        <div ref={scope} className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="z-40 w-12 h-12 rounded-full bg-[#faf6f2]/80 border border-white/50 flex items-center justify-center shadow-sm hover:shadow-md transition-all"
          >
            <svg width={20} height={16} viewBox="0 0 23 18">
              <Path 
                d="M 2 2.5 L 20 2.5" 
                className="top"
              />
              <Path 
                d="M 2 9.423 L 20 9.423" 
                opacity="1" 
                className="middle"
              />
              <Path 
                d="M 2 16.346 L 20 16.346" 
                className="bottom"
              />
            </svg>
          </button>

          <motion.nav
            className="mobile-nav fixed top-0 left-0 h-full w-72 z-30 bg-[#faf6f2]/90 backdrop-blur-sm border-r border-white/50 p-6 shadow-xl"
            initial={{ x: '-100%' }}
            animate={{ x: isOpen ? 0 : '-100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="flex justify-end p-2">
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-600 text-2xl hover:text-teal-600 transition-colors"
              >
                &times;
              </button>
            </div>

            <ul className="mt-10 space-y-5">
              {NavItems.map((item) => (
                <motion.li 
                  key={item.id}
                  className="mobile-item"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: isOpen ? 0 : 20, opacity: isOpen ? 1 : 0 }}
                  transition={{ delay: isOpen ? 0.1 + NavItems.indexOf(item) * 0.05 : 0 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavItemClick(item.id, e)}
                    className={`block py-3 px-5 text-lg rounded-full transition-all ${
                      activeItem === item.id 
                        ? 'text-teal-600 font-medium bg-white/70 shadow-inner' 
                        : 'text-gray-600 hover:text-teal-600 hover:bg-white/50'
                    }`}
                  >
                    {item.text}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-10 px-5"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isOpen ? 0 : 20, opacity: isOpen ? 1 : 0 }}
              transition={{ delay: isOpen ? 0.3 : 0 }}
            >
              <button
                onClick={(e) => handleNavItemClick('contact', e)}
                className="w-full py-3.5 bg-teal-500/85 text-white font-medium rounded-full hover:shadow-md transition-all hover:bg-teal-600 border border-teal-500/30"
              >
                Hire Me
              </button>
            </motion.div>
          </motion.nav>
        </div>
      </div>
    </div>
  );
};

export default NavBar;