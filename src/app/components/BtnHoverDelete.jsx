'use client';

import { MdDeleteOutline } from 'react-icons/md';

export default function BtnHoverDelete() {
  return (
    <button className="group absolute flex items-center justify-start w-10 h-10 rounded-full cursor-pointer overflow-hidden border-2 border-white transition-all duration-500 shadow-[2px_2px_10px_rgba(0,0,0,0.199)] bg-red-500 hover:w-32 hover:rounded-full active:translate-x-0.5 active:translate-y-0.5">
      <div className="flex w-full items-center justify-center transition-all duration-500 group-hover:w-1/3">
        <MdDeleteOutline color="white" fontSize={"1.5em"} />
      </div>
      <p className="absolute right-0 w-0 opacity-0 text-white text-[0.9em] font-semibold transition-all duration-500 group-hover:opacity-100 group-hover:w-2/3 group-hover:pr-2">
        Eliminar
      </p>
  </button>
  );
};
