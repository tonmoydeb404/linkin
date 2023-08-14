import { Button } from "@/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { IUser } from "@/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

type UserColumnsProps = {
  handleBan: (id: string) => any;
  handleUnban: (id: string) => any;
  handleMakeAdmin: (id: string) => any;
  handleMakeUser: (id: string) => any;
};

const UserColumns = ({
  handleBan,
  handleUnban,
  handleMakeAdmin,
  handleMakeUser,
}: UserColumnsProps): ColumnDef<IUser>[] => [
  {
    accessorKey: "username",
    header: "User Name",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user.status !== "BANNED" ? (
              <DropdownMenuItem onClick={() => handleBan(user._id)}>
                Ban User
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => handleUnban(user._id)}>
                Unban User
              </DropdownMenuItem>
            )}

            {user.role !== "ADMIN" ? (
              <DropdownMenuItem onClick={() => handleMakeAdmin(user._id)}>
                Make Admin
              </DropdownMenuItem>
            ) : null}
            {user.role !== "USER" ? (
              <DropdownMenuItem onClick={() => handleMakeUser(user._id)}>
                Make User
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default UserColumns;
