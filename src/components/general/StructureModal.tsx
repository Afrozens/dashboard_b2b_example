'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import ButtonCloseModal from '../commons/buttons/ButtonCloseModal';

interface Props extends PropsWithChildren {
  onClose: () => void;
  show?: boolean;
  classAditional?: string;
}

const StructuredModal = ({ onClose, show, children, classAditional }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (show) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);

  if (!mounted || !show) return null;

  return ReactDOM.createPortal(
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9999] h-full w-full overflow-y-auto bg-gray-900/60 backdrop-blur-sm transition-all duration-300 ease-in-out"
      />

      <div
        className={`fixed left-1/2 top-1/2 z-[99999] w-full -translate-x-1/2 -translate-y-1/2 transform ${classAditional ?? 'w-fit max-w-[95vw]'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="relative max-h-[90vh] h-full w-full overflow-y-auto rounded-xl bg-white shadow-2xl">
          <ButtonCloseModal onClose={onClose} />
          <div className="p-6">{children}</div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default StructuredModal;
