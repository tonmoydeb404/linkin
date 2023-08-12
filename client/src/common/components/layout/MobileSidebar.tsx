import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Sheet, SheetContent } from "@/common/components/ui/sheet";
import { selectSidebar, sidebarChange } from "@/features/sidebar/sidebarSlice";
import Sidebar from "./Sidebar";

type Props = { className?: string };

const MobileSidebar = ({ className = "" }: Props) => {
  const { isOpen } = useAppSelector(selectSidebar);
  const dispatch = useAppDispatch();
  return (
    <Sheet open={isOpen} onOpenChange={(open) => dispatch(sidebarChange(open))}>
      <SheetContent side={"left"} className={className}>
        <Sidebar className="h-full" />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
