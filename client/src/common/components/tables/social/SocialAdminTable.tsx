import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useBanSocialMutation,
  useGetAllSocialsQuery,
  useUnbanSocialMutation,
} from "../../../../api/socialApi";
import ConfirmDialog from "../../dialog/ConfirmDialog";
import { SocialAdminColumns } from "./SocialColumns";
import SocialDataTable from "./SocialDataTable";

const SocialAdminTable = () => {
  const { data } = useGetAllSocialsQuery({});
  const [banSocial] = useBanSocialMutation();
  const [unbanSocial] = useUnbanSocialMutation();

  const [id, setId] = useState<string | null>(null);
  const [mode, setMode] = useState<"BAN" | "UNBAN" | null>(null);

  const reset = () => {
    setId(null);
    setMode(null);
  };
  const handleBan = (id: string) => {
    setId(id);
    setMode("BAN");
  };
  const handleUnban = (id: string) => {
    setId(id);
    setMode("UNBAN");
  };
  const confirmBan = async () => {
    try {
      if (!id) throw new Error("id not defined");
      await toast.promise(banSocial(id).unwrap(), {
        error: "Error in ban social link!",
        pending: "Social link ban action loading...",
        success: "Social link Banned!",
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
      await toast.promise(unbanSocial(id).unwrap(), {
        error: "Error in unban social link!",
        pending: "Social link unban action loading...",
        success: "Social link unbanned!",
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
        title = "Are you sure to ban this link?";
        action = confirmBan;
        break;
      }
      case "UNBAN": {
        show = true;
        title = "Are you sure to unban this link?";
        action = confirmUnban;
        break;
      }
      default: {
        show = false;
        break;
      }
    }

    return { title, action, show };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <>
      <SocialDataTable
        data={data?.results || []}
        columns={SocialAdminColumns({ handleBan, handleUnban })}
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

export default SocialAdminTable;
