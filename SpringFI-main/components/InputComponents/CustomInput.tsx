import { cn } from '@/app/utils/Tailwind';
import React, { FC } from 'react';

interface CustomInputProps {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  isValid?: boolean;
  errorMessage?: string;
  className?:string,
  labelElement?: React.ReactNode;
  defaultValue?:any

}

const CustomInput: FC<CustomInputProps> = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  required,
  isValid,
  errorMessage,
  className="",
  labelElement,
  defaultValue
}) => {
  return (
    <div className={cn("w-full "+className)}>
        <div className="mb-1">
        <label htmlFor={id} className="custom-label">
        {labelElement || name}
          {/* {required && <span className="inputRequired">*</span>} */}
        </label>
        </div>
      <input
        id={id}
        name={name}
        defaultValue={defaultValue}
        type={type}
        placeholder={placeholder}
        className="custom-input"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
      />
      {isValid === false && value?.trim() !== "" && (
        <p className="text-red-600 text-xs mt-1 ml-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default CustomInput;