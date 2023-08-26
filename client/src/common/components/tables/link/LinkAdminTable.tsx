import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  useBanLinkMutation,
  useGetAllLinksQuery,
  useUnbanLinkMutation,
} from "../../../../api/linkApi";
import ConfirmDialog from "../../dialog/ConfirmDialog";
import { LinkAdminColumns } from "./LinkColumns";
import LinkDataTable from "./LinkDataTable";

const LinkAdminTable = () => {
  const { data } = useGetAllLinksQuery({});
  const [banLink] = useBanLinkMutation();
  const [unbanLink] = useUnbanLinkMutation();

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
      await toast.promise(banLink(id).unwrap(), {
        error: "Error in ban link!",
        pending: "Link ban action loading...",
        success: "Link Banned!",
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
      await toast.promise(unbanLink(id).unwrap(), {
        error: "Error in unban link!",
        pending: "Link unban action loading...",
        success: "Link unbanned!",
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
      <LinkDataTable
        data={data?.result || []}
        columns={LinkAdminColumns({ handleBan, handleUnban })}
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

export default LinkAdminTable;
