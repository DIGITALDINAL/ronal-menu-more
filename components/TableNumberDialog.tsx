"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useTableNumber } from "@/context/TableNumberContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const tableOptions = Array.from({ length: 20 }, (_, i) => `Meja ${i + 1}`);

export function TableNumberDialog() {
  const { tableNumber, setTableNumber } = useCart();
  const { isDialogOpen, closeDialog } = useTableNumber();
  const [localTableNumber, setLocalTableNumber] = useState(tableNumber || "");

  useEffect(() => {
    setLocalTableNumber(tableNumber || "");
  }, [tableNumber, isDialogOpen]);

  const handleSave = () => {
    if (localTableNumber.trim()) {
      setTableNumber(localTableNumber.trim());
      closeDialog();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(isOpen) => !isOpen && closeDialog()}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Selamat Datang!</DialogTitle>
          <DialogDescription>
            Silakan pilih nomor meja Anda untuk mulai memesan.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="table-number" className="text-right">
              Meja
            </Label>
            <Select onValueChange={setLocalTableNumber} value={localTableNumber}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih Meja" />
                </SelectTrigger>
                <SelectContent>
                    {tableOptions.map(option => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={!localTableNumber.trim()}>Lanjutkan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
