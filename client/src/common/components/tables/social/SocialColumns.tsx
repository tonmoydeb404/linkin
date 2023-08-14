import { Button } from "@/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { ISocial } from "@/types/social.type";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

type SocialUserColumnsProps = {
  handleDelete: (id: string) => any;
  handleUpdate: (social: ISocial) => any;
};

export const SocialUserColumns = ({
  handleDelete,
  handleUpdate,
}: SocialUserColumnsProps): ColumnDef<ISocial>[] => [
  {
    accessorKey: "site",
    header: "Site",
  },
  {
    accessorKey: "url",
    header: "Url",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const social = row.original;
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(social.url)}
            >
              Copy URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleUpdate(social)}>
              Edit Social
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(social._id)}>
              Delete Social
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type SocialAdminColumnsProps = {
  handleBan: (id: string) => any;
  handleUnban: (id: string) => any;
};

export const SocialAdminColumns = ({
  handleBan,
  handleUnban,
}: SocialAdminColumnsProps): ColumnDef<ISocial>[] => [
  {
    accessorKey: "site",
    header: "Site",
  },
  {
    accessorKey: "url",
    header: "Url",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const social = row.original;
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(social.url)}
            >
              Copy URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {social.status !== "BANNED" ? (
              <DropdownMenuItem onClick={() => handleBan(social._id)}>
                Ban Link
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => handleUnban(social._id)}>
                Unban Link
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
