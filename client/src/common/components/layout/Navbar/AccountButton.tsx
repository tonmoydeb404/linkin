import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";

import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { authSignout, selectAuth } from "@/features/auth/authSlice";

import getNameInitials from "@/utils/getNameInitials";

import { useLazyAuthLogoutQuery } from "@/api/authApi";
import { logInKey } from "@/config/localstorage";
import { Edit, LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

const AccountButton = () => {
  const { user } = useAppSelector(selectAuth);
  const [logout] = useLazyAuthLogoutQuery();
  const dispatch = useAppDispatch();
  const handleSignout = async () => {
    await logout(undefined);
    dispatch(authSignout());
    localStorage.setItem(logInKey, "false");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
        <Avatar className="w-9 h-9">
          <AvatarImage src={user?.avatar ?? undefined} />
          <AvatarFallback>
            {getNameInitials(user?.firstName, user?.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-col items-start hidden md:flex">
          <span className="font-medium text-sm">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="text-xs">{user?.role}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to={`/${user?.username}`} target="_blank">
            <User2 className="mr-2 w-4 h-4" />
            Visit Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to={"/dashboard/edit-profile"}>
            <Edit className="mr-2 w-4 h-4" />
            Edit Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignout}>
          <LogOut className="mr-2 w-4 h-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountButton;
