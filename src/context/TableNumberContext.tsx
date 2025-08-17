"use client";

import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import { useCart } from './CartContext';

interface TableNumberContextType {
  isDialogOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}

const TableNumberContext = createContext<TableNumberContextType | undefined>(undefined);

export const TableNumberProvider = ({ children }: { children: ReactNode }) => {
  const { tableNumber } = useCart();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    // Open the dialog if no table number is set
    if (!tableNumber) {
      setIsDialogOpen(true);
    } else {
      setIsDialogOpen(false);
    }
  }, [tableNumber]);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    // Prevent closing if there's no table number
    if (tableNumber) {
        setIsDialogOpen(false);
    }
  }

  return (
    <TableNumberContext.Provider value={{ isDialogOpen, openDialog, closeDialog }}>
      {children}
    </TableNumberContext.Provider>
  );
};

export const useTableNumber = () => {
  const context = useContext(TableNumberContext);
  if (context === undefined) {
    throw new Error('useTableNumber must be used within a TableNumberProvider');
  }
  return context;
};
