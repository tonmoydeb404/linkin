import {
  useBanUserMutation,
  useGetUsersQuery,
  useUnbanUserMutation,
  useUpdateUserRoleMutation,
} from "@/api/userApi";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import ConfirmDialog from "../../dialog/ConfirmDialog";
import UserColumns from "./UserColumns";
import UserDataTable from "./UserDataTable";

const UserAdminTable = () => {
  const { data } = useGetUsersQuery(undefined);
  const [banUser] = useBanUserMutation();
  const [unbanUser] = useUnbanUserMutation();
  const [updateRole] = useUpdateUserRoleMutation();

  const [id, setId] = useState<string | null>(null);
  const [mode, setMode] = useState<"BAN" | "UNBAN" | "ROLE" | null>(null);
  const [role, setRole] = useState<"ADMIN" | "USER" | null>(null);

  const handleBan = (id: string) => {
    setId(id);
    setMode("BAN");
  };
  const handleUnban = (id: string) => {
    setId(id);
    setMode("UNBAN");
  };
  const handleMakeAdmin = (id: string) => {
    setId(id);
    setMode("ROLE");
    setRole("ADMIN");
  };
  const handleMakeUser = (id: string) => {
    setId(id);
    setMode("ROLE");
    setRole("USER");
  };

  const reset = () => {
    setId(null);
    setMode(null);
    setRole(null);
  };

  const confirmBan = async () => {
    try {
      if (!id) throw new Error("id not defined");
      await toast.promise(banUser(id).unwrap(), {
        error: "Error in ban user!",
        pending: "User ban action loading...",
        success: "User Banned!",
      });
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  };

  const confirmUnban = async () => {
    try {
      if (!id) throw new Error("id not defined");
      await toast.promise(unbanUser(id).unwrap(), {
        error: "Error in unban user!",
        pending: "User unban action loading...",
        success: "User unbanned!",
      });
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  };

  const confirmRole = async () => {
    try {
      if (!id || !role) throw new Error("id or role not defined");
      await toast.promise(updateRole({ role, user_id: id }).unwrap(), {
        error: `Error in changing user role!`,
        pending: "Changing user role...",
        success: "User role changed!",
      });
    } catch (error) {
      console.log(error);
    } finally {
      reset();
    }
  };

  const dialogContent = useMemo(() => {
    let title = "";
    let action: () => any = () => {};
    let show = false;
    switch (mode) {
      case "BAN": {
        show = true;
        title = "Are you sure to ban this user?";
        action = confirmBan;
        break;
      }
      case "UNBAN": {
        show = true;
        title = "Are you sure to unban this user?";
        action = confirmUnban;
        break;
      }
      case "ROLE": {
        show = !!role;
        title = `Are you sure to make this user ${role}`;
        action = confirmRole;
        break;
      }
      default: {
        show = false;
        break;
      }
    }

    return { title, action, show };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, role]);

  return (
    <>
      <UserDataTable
        data={data?.result || []}
        columns={UserColumns({
          handleBan,
          handleUnban,
          handleMakeAdmin,
          handleMakeUser,
        })}
      />

      <ConfirmDialog
        title={dialogContent.title}
        onAction={dialogContent.action}
        onCancel={reset}
        open={dialogContent.show}
        onChange={reset}
      />
    </>
  );
};

export default UserAdminTable;
