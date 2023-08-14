import { useState } from "react";
import { toast } from "react-toastify";
import {
  useDeleteSocialMutation,
  useGetSocialsQuery,
} from "../../../../api/socialApi";
import { ISocial } from "../../../../types/social.type";
import ConfirmDialog from "../../dialog/ConfirmDialog";
import DialogWrapper from "../../dialog/DialogWrapper";
import SocialUpdateForm from "../../forms/social/SocialUpdateForm";
import { SocialUserColumns } from "./SocialColumns";
import SocialDataTable from "./SocialDataTable";

const SocialUserTable = () => {
  const { data } = useGetSocialsQuery({});
  const [deleteSocial] = useDeleteSocialMutation();

  const [updateForm, setUpdateForm] = useState<ISocial | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => setDeleteId(id);

  const handleRemove = async () => {
    try {
      if (!deleteId) throw new Error("id not defined");
      await toast.promise(deleteSocial(deleteId).unwrap(), {
        error: "Error in deleting social link!",
        pending: "Deleting social link...",
        success: "Social link Deleted!",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteId(null);
    }
  };

  const handleUpdate = (social: ISocial) => setUpdateForm(social);

  return (
    <>
      <SocialDataTable
        data={data?.results || []}
        columns={SocialUserColumns({ handleDelete, handleUpdate })}
      />
      <DialogWrapper
        open={!!updateForm}
        onChange={() => setUpdateForm(null)}
        title="Update Link"
      >
        <SocialUpdateForm
          social={updateForm}
          submitCallback={() => setUpdateForm(null)}
          cancelCallback={() => setUpdateForm(null)}
        />
      </DialogWrapper>
      <ConfirmDialog
        title="Are you sure to delete social link?"
        description="this action cannot be undone."
        onAction={handleRemove}
        onCancel={() => setDeleteId(null)}
        open={!!deleteId}
        onChange={() => setDeleteId(null)}
      />
    </>
  );
};

export default SocialUserTable;
