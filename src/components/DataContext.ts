import { createContext, useState, useContext } from 'react';
import * as React from 'react';

type Data = []

interface DataContextProps {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}

const DataContext = createContext<DataContextProps | null>(null);

// const DataProvider = ({ children }) => {
//   const [data, setData] = useState<Data>([]);

//   return 
//     <DataContext.Provider>
//     </DataContext.Provider>
  
// };

const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

export { DataContext, useDataContext };