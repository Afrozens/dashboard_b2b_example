'use client';

import { PropsWithChildren } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

type typeProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface Props extends PropsWithChildren, typeProps {
  loading?: boolean;
  disabled?: boolean;
}

const ButtonPrimary = ({
  children,
  loading,
  disabled,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`disabled:bg-gray-400 disabled:text-white bg-primary-01 disabled:cursor-not-allowed disabled:opacity-90 shadow-md hover:opacity-80 transition-all focus:scale-90 cursor-pointer hover:scale-105 text-white px-6 py-2 gap-4 flex rounded-3xl justify-center items-center 'w-full text-xl h-16' ${loading ? 'w-48 h-10' : ''}`}
    >
      <span>
        {loading ? <LoadingOutlined className="text-2xl text-white" /> : children}
      </span>
    </button>
  );
};

export default ButtonPrimary;
