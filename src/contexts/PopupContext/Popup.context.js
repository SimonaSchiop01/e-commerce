import React, { useState } from 'react'

export const PopupContext = React.createContext({});

export function PopupContextProvider({children}){

  const [popupOpen, setPopupOpen]=useState(false);

  const popupCtxValue = {
    isPopupOpen: ()=>popupOpen,
    openPopup: ()=>{
      setPopupOpen(true);
    },
    closePopup: ()=>{
      setPopupOpen(false);
    }
  }

  return (
    <>
      <PopupContext.Provider value={popupCtxValue}>{children}</PopupContext.Provider>
    </>
  )
}