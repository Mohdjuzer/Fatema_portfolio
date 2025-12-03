import { useState, useRef, useEffect } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Numbers } from './data/config.js'

export default function NumbersSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        }
    }, []);
    return (
        <section className="mx-auto w-full relative text-white mt-32 flex justify-center">
            <header className='absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#007cda]
        via-[#785ae4] to-primary opacity-20 blur-[100px] left-10 top-0 hidden md:block pointer-events-none'></header>

            <header className='absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#007cda]
        via-[#785ae4] to-primary opacity-20 blur-[100px] right-10 bottom-0 hidden md:block pointer-events-none'></header>
        <motion.section
        ref={sectionRef}
        initial={{opacity:0,y:50}}
        whileInView={{opacity:1,y:0}}
        transition={{duration:0.8,ease:'easeOut'}}
        viewport={{once:true,amount:0.5}}
        className="relative z-1 mx-auto w-11/12 lg:mx-0 p-5 sm:p-6 py-6 sm:py-8 rounded-3xl border border-[#00FFFF] bg-[#ffffff29] shadow-lg 
        md:divide-x divide-[#FAFAFA] grid grid-cols-2 md:grid-cols-4 gap-4 dm:gap-8 md:gap-6 lg:gap-12">
            {Numbers.map((item)=>(
                <article key={item.id} className="text-center">
                    <header>
                        <h2 className="font-semibold text-xl sm:text-2xl md:text-4xl ">
                            +{isVisible && (
                                <CountUp 
                                start={0}
                                end={item.number}
                                duration={2.5}
                                separator=","
                                />
                            )}
                        </h2>
                    </header>
                    <p className="mt-2">{item.title}</p>
                </article>
            ))}
        </motion.section>
        </section>
    )
}
