"use client";

import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface ConfirmModalProps {
  children: ReactNode;
  title: string;
  textBtn?: ReactNode;
  btnClass?: string;
  btnDisabled?: boolean;
  openDefault?: boolean;
  large?: boolean;
  onAcept?: () => void | Promise<void> | undefined;
  onClose?: () => void | undefined;
  btnAsChild?: boolean;
  notClose?: boolean;
}

export const SimpleModal = ({
  children,
  title,
  textBtn,
  btnClass,
  btnDisabled,
  openDefault,
  onAcept,
  onClose,
  notClose,
  large = true,
  btnAsChild,
}: ConfirmModalProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openDefault || false)
  }, [openDefault])
  

  const handleClose = () => {
    setOpen(false);
    onClose && onClose();
  };

  const onClickAcept = () => {
    setOpen(false);
    onAcept && onAcept();
    onClose && onClose();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {/* {typeof textBtn === "string" ? ( */}
        <Button
          asChild={btnAsChild}
          disabled={btnDisabled}
          className={cn("bg-secondary", btnClass)}
        >
          {textBtn}
        </Button>
        {/* ) : (
          textBtn
        )} */}
      </AlertDialogTrigger>

      <AlertDialogContent
        className={`overflow-y-auto ${
          large ? "max-w-screen-lg min-h-[300px]" : "max-w-[600px]"
        }  max-h-screen `}
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">
            <div className="flex justify-between">
             <span className="text-center w-full"> {`${title}`}</span>
              {!notClose && (
                <Button
                  className="w-fit h-fit flex rounded-md justify-center items-center p-1 hover:bg-slate-50"
                  variant="outline"
                  onClick={handleClose}
                >
                  <X className="text-red-500" />
                </Button>
              )}
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="w-full"></AlertDialogDescription>
        <span className="w-full">{children}</span>
        <AlertDialogFooter className="gap-3">
          {onAcept && (
            <Button
              className="bg-zinc-400 hover:bg-zinc-600"
              onClick={handleClose}
            >
              Cancelar
            </Button>
          )}
          {onAcept && <Button onClick={onClickAcept}>Aceptar</Button>}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
