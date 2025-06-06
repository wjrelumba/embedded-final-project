'use client';

import React from 'react';

// 1. Define a type for the props
type ClientButtonProps = {
  onClickFunction: () => void; // or (event: React.MouseEvent<HTMLButtonElement>) => void if you need the event
};

// 2. Add the type to the function parameter
export default function ClientButton({ onClickFunction }: ClientButtonProps) {
  return (
    <button onClick={onClickFunction}>
      ClientButton
    </button>
  );
}