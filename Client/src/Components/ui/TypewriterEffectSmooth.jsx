import { motion, stagger, useAnimate, useInView } from 'framer-motion';
import { cn } from '../utils/cn';

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(''),
    };
  });

  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`text-white`, word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn('flex space-x-1 my-3', className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: '0%',
        }}
        whileInView={{
          width: 'fit-content',
        }}
        transition={{
          duration: 2,
          ease: 'linear',
          delay: 1,
        }}
      >
        <div
          className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
          style={{
            whiteSpace: 'nowrap',
          }}
        >
          {renderWords()}{' '}
        </div>{' '}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className={cn(
          'block rounded-sm w-[4px] h-6 sm:h-8 md:h-10 lg:h-14 xl:h-16 bg-blue-500',
          cursorClassName,
        )}
      ></motion.span>
    </div>
  );
};
