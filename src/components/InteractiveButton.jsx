import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CYCLE_PER_LETTER = 2;
const SHUFFLE_TIME = 150;
const CHARS = '✦ ✧ ✩ ✪ ✫ ✬ ✭ ✮ ★ ☆ ⚝ ❁ ❃ ❀ ✿';

export default function InteractiveButton({ text, onClick }) {
  return (
    <div className='flex justify-center items-center min-h-[200px] p-4'>
      <CustomButton text={text} onClick={onClick} />
    </div>
  );
}

const CustomButton = ({ text, onClick }) => {
  const intervalRef = useRef(null);
  const [displayText, setDisplayText] = useState(text);

  const scramble = () => {
    let pos = 0;
    intervalRef.current = setInterval(() => {
      const scrambled = text.split('').map((char,index) =>{
        if(pos/CYCLE_PER_LETTER > index){
            return char
        }
        const randomCharIndex = Math.floor(Math.random() * CHARS.length);
        const randomChar = CHARS[randomCharIndex];
        return randomChar;
      }).join('');
      setDisplayText(scrambled);
      pos++;
      if(pos >= text.length * CYCLE_PER_LETTER){
        stopScramble();

      }
    },SHUFFLE_TIME);
    };
    const stopScramble = () => {
        clearInterval(intervalRef.current || undefined);
        setDisplayText(text);

    };
    return(
        <motion.button
        whileTap={{scale:0.95}}
        onClick={onClick}
        onMouseEnter={scramble}
        onMouseLeave={stopScramble}
        className="w-full px-8 py-4 text-lg font-bold text-gray-800 rounded-lg overflow-hidden relative group bg-gradient-to-br from-[#e0f7fa] to-[#a6ffff] shadow-md"
        >
            <span className="absolute inset-0 w-full h-full bg-[#00e0ff] opacity-20 rounded-lg transform scale-0 transition-transform duration-300 ease-out group-hover:scale-100 blur-sm">
            </span>
            <span className='relative z-10'>{displayText}</span>
        </motion.button>
    )
}