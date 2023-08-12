import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import {
  selectTheme,
  themeDark,
  themeLight,
  themeSystem,
} from "@/features/theme/themeSlice";
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react";
import { Button } from "../../ui/button";

const ThemeButton = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector(selectTheme);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"outline"}>
          {mode === "DARK" ? <MoonIcon /> : null}
          {mode === "LIGHT" ? <SunIcon /> : null}
          {mode === "SYSTEM" ? <SunMoonIcon /> : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={mode === "DARK"}
          onClick={() => dispatch(themeDark())}
        >
          Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={mode === "LIGHT"}
          onClick={() => dispatch(themeLight())}
        >
          Light
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={mode === "SYSTEM"}
          onClick={() => dispatch(themeSystem())}
        >
          System
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeButton;
