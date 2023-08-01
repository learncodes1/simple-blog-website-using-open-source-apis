import React, { useState } from 'react';

const Toggler = ({ onChange, className }) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <span
      className={`toggler flex flex-col gap-y-1${
        className ? ` ${className}` : ''
      }`}
      onClick={() => {
        setToggle(!toggle), onChange(!toggle);
      }}
    >
      <span
        className={`relative inline-block h-[2px] w-[25px] bg-white transition-all duration-300${
          toggle ? ' top-[6px] rotate-45' : ''
        }`}
      />
      <span
        className={`relative inline-block h-[2px] w-[25px] bg-white transition-all duration-300${
          toggle ? ' opacity-0' : ''
        }`}
      />
      <span
        className={`relative inline-block h-[2px] w-[25px] bg-white transition-all duration-300${
          toggle ? ' -top-[6px] -rotate-45' : ''
        }`}
      />
    </span>
  );
};

export default Toggler;
