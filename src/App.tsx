import React from 'react';
import Karta from './blocks/Karta'
import OnClick from './blocks/OnClick'
import './App.sass';

  const information ={
    title:"Парк",
    description:"Студеньческий парк"
  }

export default function App() {
  
  return (
    <>
    <Karta />
    {/* <OnClick information={information}/> */}
    </>
  );
}