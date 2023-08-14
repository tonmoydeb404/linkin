import { useState } from "react";
import { toast } from "react-toastify";
import {
  useDeleteLinkMutation,
  useUserLinksQuery,
} from "../../../../api/linkApi";
import { ILink } from "../../../../types/link.type";
import ConfirmDialog from "../../dialog/ConfirmDialog";
import DialogWrapper from "../../dialog/DialogWrapper";
import LinkUpdateForm from "../../forms/link/LinkUpdateForm";
import { LinkUserColumns } from "./LinkColumns";
import LinkDataTable from "./LinkDataTable";

const LinkUserTable = () => {
  const { data } = useUserLinksQuery(undefined);
  const [deleteLink] = useDeleteLinkMutation();

  const [updateForm, setUpdateForm] = useState<ILink | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => setDeleteId(id);

  const handleRemove = async () => {
    try {
      if (!deleteId) throw new Error("id not defined");
      await toast.promise(deleteLink(deleteId).unwrap(), {
        error: "Error in deleting link!",
        pending: "Deleting link...",
        success: "Link Deleted!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (link: ILink) => {
    setUpdateForm(link);
  };

  return (
    <>
      <LinkDataTable
        data={data?.results || []}
        columns={LinkUserColumns({ handleDelete, handleUpdate })}
      />
      <DialogWrapper
        open={!!updateForm}
        onChange={() => setUpdateForm(null)}
        title="Update Link"
      >
        <LinkUpdateForm
          link={updateForm}
          submitCallback={() => setUpdateForm(null)}
          cancelCallback={() => setUpdateForm(null)}
        />
      </DialogWrapper>
      <ConfirmDialog
        title="Are you sure to delete link?"
        description="this action cannot be undone."
        onAction={handleRemove}
        onCancel={() => setDeleteId(null)}
        open={!!deleteId}
        onChange={() => setDeleteId(null)}
      />
    </>
  );
};

export default LinkUserTable;
