import { cn } from '@/app/utils/Tailwind';
import React, { FC } from 'react';

interface CustomTextareaProps {
  id: string;
  name: string;
  rows: number;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  className?:string
}

const CustomTextarea: FC<CustomTextareaProps> = ({
  id,
  name,
  rows,
  placeholder,
  value,
  onChange,
  required,
  className
}) => {
  return (
    <div className="w-full">
      <div className="mb-1">

      <label htmlFor={id} className="custom-label">
          {name}
          {/* {required && <span className="text-red-500">*</span>} */}
        </label>
      </div>
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        className={cn(`custom-input ${"rounded-lg"} ${className}`)}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default CustomTextarea;
