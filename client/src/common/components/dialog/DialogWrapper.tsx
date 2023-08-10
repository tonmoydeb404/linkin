import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { ReactNode } from "react";

type DialogWrapperProps = {
  open: boolean;
  onChange: (open: boolean) => any;
  title?: string;
  description?: string;
  children?: ReactNode;
};

const DialogWrapper = ({
  open,
  onChange,
  description,
  title,
  children,
}: DialogWrapperProps) => {
  return (
    <Dialog open={open} onOpenChange={(o) => onChange(o)}>
      <DialogContent>
        <DialogHeader>
          {title ? <DialogTitle>{title}</DialogTitle> : null}
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
