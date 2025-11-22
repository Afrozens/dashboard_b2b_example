'use client';

import getSplitName from "@/utils/getSplitName";


interface Props {
  size: number;
  name: string;
}

const AvatarGenerate = ({
  size = 64,
  name,
}: Props) => {
  const { color, nameSplit } = getSplitName(name);

  return (
    <>
        <>
          <div
            style={{ backgroundColor: color, height: size, width: size }}
            className={`relative flex justify-center rounded-md`}
          >
            <p className="flex items-center justify-center text-xl font-bold text-white">
              {nameSplit.toUpperCase()}
            </p>
          </div>
        </>
    </>
  );
};

export default AvatarGenerate;
