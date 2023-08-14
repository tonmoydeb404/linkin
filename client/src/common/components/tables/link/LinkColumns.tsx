import { Button } from "@/common/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/common/components/ui/dropdown-menu";
import { ILink, LinkStatus } from "@/types/link.type";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";

type LinkUserColumnsProps = {
  handleDelete: (id: string) => any;
  handleUpdate: (link: ILink) => any;
};

export const LinkUserColumns = ({
  handleDelete,
  handleUpdate,
}: LinkUserColumnsProps): ColumnDef<ILink>[] => [
  {
    accessorKey: "icon",
    header: "Icon",
    cell: (info) => {
      const src = info.getValue<string>();
      return (
        <Avatar>
          <AvatarImage src={src} alt="Icon" />
          <AvatarFallback>I</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ getValue }) => {
      const slug = getValue<string>();
      return (
        <Link to={`/l/${slug}`} target="_blank" className="text-primary">
          {slug}
        </Link>
      );
    },
  },
  {
    accessorKey: "url",
    header: "Url",
    cell: ({ getValue }) => {
      const url = getValue<string>();
      return (
        <Link to={`${url}`} target="_blank" className="text-primary">
          {url}
        </Link>
      );
    },
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<LinkStatus>();

      return (
        <Badge variant={status === "BANNED" ? "destructive" : "default"}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const link = row.original;
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
              onClick={() => navigator.clipboard.writeText(link.url)}
            >
              Copy URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleUpdate(link)}>
              Edit Social
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(link._id)}>
              Delete Social
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

type LinkAdminColumnsProps = {
  handleBan: (id: string) => any;
  handleUnban: (id: string) => any;
};

export const LinkAdminColumns = ({
  handleBan,
  handleUnban,
}: LinkAdminColumnsProps): ColumnDef<ILink>[] => [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ getValue }) => {
      const slug = getValue<string>();
      return (
        <Link to={`/l/${slug}`} target="_blank" className="text-primary">
          {slug}
        </Link>
      );
    },
  },
  {
    accessorKey: "url",
    header: "Url",
    cell: ({ getValue }) => {
      const url = getValue<string>();
      return (
        <Link to={`${url}`} target="_blank" className="text-primary">
          {url}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<LinkStatus>();

      return (
        <Badge variant={status === "BANNED" ? "destructive" : "default"}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const link = row.original;
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
              onClick={() => navigator.clipboard.writeText(link.url)}
            >
              Copy URL
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {link.status !== "BANNED" ? (
              <DropdownMenuItem onClick={() => handleBan(link._id)}>
                Ban Link
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => handleUnban(link._id)}>
                Unban Link
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
