'use client';

import { useState } from 'react';
import type { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import FieldError from './FieldError';

type AttributeProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type typeInput = 'text' | 'password' | 'number' | 'email' | '';

type Props<T extends FieldValues> = {
  id: string;
  label: string;
  type?: typeInput;
  name?: Path<T>;
  classAditional?: string;
  register?: UseFormRegister<T>;
  error?: string | undefined;
  rules?: RegisterOptions<T>;
  isRequired?: boolean;
} & AttributeProps;

const FieldInput = <T extends FieldValues>({
  label,
  id,
  isRequired,
  classAditional,
  type = 'text',
  name,
  rules,
  error,
  register,
  ...props
}: Props<T>) => {
  const [currentType, setCurrentType] = useState<typeInput>(type);

  const handlePassword = () => {
    const typeIn = currentType === 'password' ? 'text' : 'password';
    setCurrentType(typeIn);
  };

  return (
    <div
      className={`${
        classAditional || 'max-w-xl'
      } flex w-full flex-col relative text-black items-center justify-start`}
    >
      <div className="relative w-full">
        <label
          className={`font-semibold capitalize absolute left-5 top-3 text-xs -translate-y-1/2`}
          htmlFor={id}
        >
          {label}
        </label>
          <input
            id={name ?? id}
            required={isRequired}
            type={currentType}
            autoComplete="current-password"
            className={`w-full px-5 rounded-[19px] border focus:outline-none border-black border-1 font-light bg-[#F3F4F6] py-4 flex items-center ${id === 'password' || id === 'confirmPassword' ? 'pr-20' : ''}`}
            {...(register && name && register(name, rules))}
            name={name}
            {...props}
          />
        {id === 'password' || id === 'confirmPassword' ? (
          <button
            type="button"
            className="rounded-full shadow-xl w-[36px] h-[36px] bg-white flex justify-center items-center absolute top-1/2 -translate-y-1/2 right-8"
            onClick={handlePassword}
          >
            {currentType === type ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </button>
        ) : (
          null
        )}
      </div>
      <FieldError error={error} />
    </div>
  );
};

export default FieldInput;
