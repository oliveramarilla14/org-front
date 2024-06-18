import { useEffect, useState } from 'react';
import Header from './views/homepage/Header';

export default function Test() {
  return (
    <>
      <div data-testid='main'>
        <Header title='Tests'></Header>
      </div>
    </>
  );
}
