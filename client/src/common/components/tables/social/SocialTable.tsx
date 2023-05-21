import { useState } from "react";
import { Table } from "react-daisyui";
import { toast } from "react-toastify";
import {
  useDeleteSocialMutation,
  useGetAllSocialsQuery,
} from "../../../../api/socialApi";
import { ISocial } from "../../../../types/social.type";
import SocialUpdateForm from "../../forms/social/SocialUpdateForm";
import ModalWrapper from "../../modals/ModalWrapper";
import SocialRow from "./SocialRow";

const SocialTable = () => {
  const { data, isSuccess } = useGetAllSocialsQuery(undefined);
  const [deleteSocial] = useDeleteSocialMutation();

  const [updateForm, setUpdateForm] = useState<ISocial | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await toast.promise(deleteSocial(id).unwrap(), {
        error: "Error in deleting social link!",
        pending: "Deleting social link...",
        success: "Social link Deleted!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (social: ISocial) => {
    setUpdateForm(social);
  };

  return (
    <>
      <Table className="w-full">
        <Table.Head>
          <span>Site</span>
          <span>URL</span>
          <span>Manage</span>
        </Table.Head>

        <Table.Body>
          {isSuccess
            ? data.results.map((social) => (
                <SocialRow
                  social={social}
                  onDelete={async () => await handleDelete(social._id)}
                  onUpdate={() => handleUpdate(social)}
                  key={social._id}
                />
              ))
            : null}
        </Table.Body>
      </Table>
      <ModalWrapper
        show={!!updateForm}
        hide={() => setUpdateForm(null)}
        title="Update Link"
      >
        <SocialUpdateForm
          social={updateForm}
          onSubmit={() => setUpdateForm(null)}
          onCancel={() => setUpdateForm(null)}
          className="flex flex-col gap-2"
        />
      </ModalWrapper>
    </>
  );
};

export default SocialTable;
