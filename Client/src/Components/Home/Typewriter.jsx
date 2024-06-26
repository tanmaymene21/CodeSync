import { TypewriterEffectSmooth } from '../ui/TypewriterEffectSmooth';
export function Typewriter() {
  const words = [
    {
      text: 'Revolutionalise',
    },
    {
      text: 'your',
    },
    {
      text: 'coding',
    },
    {
      text: 'Experience.',
      className: 'text-blue-500 dark:text-blue-500',
    }
  ];
  return (
    <div className="flex flex-col items-center justify-center">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
