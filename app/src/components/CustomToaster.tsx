'use client';
import { Toaster, ToastIcon, resolveValue } from 'react-hot-toast';

import { Transition } from '@headlessui/react';

export default function CustomToaster() {
  return (
    <Toaster position="top-right">
      {(t) => (
        <Transition
          appear
          show={t.visible}
          className="alert w-full max-w-full md:max-w-xs lg:max-w-xs flex flex-row rounded-lg"
          enter="transform transition duration-150 ease-out"
          enterFrom="opacity-0 translate-y-[-20px]"
          enterTo="opacity-100 translate-y-0"
          leave="transform transition duration-300 ease-in"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-[-20px]"
        >
          <ToastIcon toast={t} />
          <p className="w-max">{resolveValue(t.message, t)}</p>
        </Transition>
      )}
    </Toaster>
  );
}
