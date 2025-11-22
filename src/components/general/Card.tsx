import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  classAditional?: string;
}

const Card = ({ children, classAditional }: Props) => {
  return (
    <div
      className={`${
        classAditional || ""
      } w-full max-w-sm p-4 relative bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8`}
    >
      {children}
    </div>
  );
};

export default Card;