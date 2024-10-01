import React, { createContext, useContext, useState } from 'react';

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctorName, setDoctorName] = useState(null);

  return (
    <DoctorContext.Provider value={{ doctorName, setDoctorName }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => {
  return useContext(DoctorContext);
};
