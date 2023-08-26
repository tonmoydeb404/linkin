import { Button } from "@/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { IUser, UserStatus, UserVerifiedStatus } from "@/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { HiBadgeCheck, HiShieldCheck, HiXCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Badge } from "../../ui/badge";

type UserColumnsProps = {
  handleBan: (id: string) => any;
  handleUnban: (id: string) => any;
  handleMakeAdmin: (id: string) => any;
  handleMakeUser: (id: string) => any;
  handleVerifyNone: (id: string) => any;
  handleVerifyDeveloper: (id: string) => any;
  handleVerifyCelebrity: (id: string) => any;
};

const UserColumns = ({
  handleBan,
  handleUnban,
  handleMakeAdmin,
  handleMakeUser,
  handleVerifyDeveloper,
  handleVerifyNone,
  handleVerifyCelebrity,
}: UserColumnsProps): ColumnDef<IUser>[] => [
  {
    accessorKey: "username",
    header: "User Name",
    cell: ({ getValue }) => {
      const username = getValue<string>();
      return (
        <Link to={`/${username}`} target="_blank" className="text-primary">
          {username}
        </Link>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<UserStatus>();

      return (
        <Badge variant={status === "BANNED" ? "destructive" : "default"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "verifiedStatus",
    header: "Verified",
    cell: ({ getValue }) => {
      const status = getValue<UserVerifiedStatus>();
      return (
        <Badge variant={"outline"}>
          {status}

          {status === "DEVELOPER" ? (
            <HiBadgeCheck className={`text-base ml-1 text-primary`} />
          ) : null}
          {status === "CELEBRITY" ? (
            <HiBadgeCheck className={`text-base ml-1 text-blue-600`} />
          ) : null}
        </Badge>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div
          className="flex gap-1 items-center"
          title={
            user.emailVerified ? `email verified` : "email is not verified"
          }
        >
          {user.email}
          {user.emailVerified ? (
            <HiShieldCheck className="text-base text-primary" />
          ) : (
            <HiXCircle className="text-base text-destructive" />
          )}
        </div>
      );
    },
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

            {user.verifiedStatus !== "CELEBRITY" ? (
              <DropdownMenuItem onClick={() => handleVerifyCelebrity(user._id)}>
                Verify as a Celebrity
              </DropdownMenuItem>
            ) : null}

            {user.verifiedStatus !== "DEVELOPER" ? (
              <DropdownMenuItem onClick={() => handleVerifyDeveloper(user._id)}>
                Verify as a Developer
              </DropdownMenuItem>
            ) : null}

            {user.verifiedStatus !== "NONE" ? (
              <DropdownMenuItem onClick={() => handleVerifyNone(user._id)}>
                Remove verified status
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default UserColumns;
