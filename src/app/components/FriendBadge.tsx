import { FC } from 'react';

interface BadgeProps {
  label: string;
  bgColorClass: string;
  textColorClass: string;
}

const Badge: FC<BadgeProps> = ({ label, bgColorClass, textColorClass }) => (
  <div className={`flex flex-col items-center justify-center py-[3px] px-[8.75px] text-[12px] font-semibold rounded-full ${bgColorClass} ${textColorClass}`}>
    {label}
  </div>
);

export default Badge;