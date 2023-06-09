import { useState } from "react";
import { Table } from "react-daisyui";
import { toast } from "react-toastify";
import {
  useDeleteLinkMutation,
  useUserLinksQuery,
} from "../../../../api/linkApi";
import { ILink } from "../../../../types/link.type";
import LinkUpdateForm from "../../forms/link/LinkUpdateForm";
import ModalWrapper from "../../modals/ModalWrapper";
import LinkRow from "./LinkRow";

const LinkTable = () => {
  const { data, isSuccess } = useUserLinksQuery(undefined);
  const [deleteLink] = useDeleteLinkMutation();

  const [updateForm, setUpdateForm] = useState<ILink | null>(null);

  const handleDeleteLink = async (id: string) => {
    try {
      await toast.promise(deleteLink(id).unwrap(), {
        error: "Error in deleting link!",
        pending: "Deleting link...",
        success: "Link Deleted!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateLink = (link: ILink) => {
    setUpdateForm(link);
  };

  return (
    <>
      <div className="overflow-x-auto w-full">
        <Table className="w-full">
          <Table.Head>
            <span>Icon</span>
            <span>Title</span>
            <span>Slug</span>
            <span>URL</span>
            <span>Clicks</span>
            <span>Manage</span>
          </Table.Head>

          <Table.Body>
            {isSuccess
              ? data.results.map((link) => (
                  <LinkRow
                    link={link}
                    onDelete={async () => await handleDeleteLink(link._id)}
                    onUpdate={() => handleUpdateLink(link)}
                    key={link._id}
                  />
                ))
              : null}
          </Table.Body>
        </Table>
      </div>
      <ModalWrapper
        show={!!updateForm}
        hide={() => setUpdateForm(null)}
        title="Update Link"
      >
        <LinkUpdateForm
          link={updateForm}
          onSubmit={() => setUpdateForm(null)}
          onCancel={() => setUpdateForm(null)}
        />
      </ModalWrapper>
    </>
  );
};

export default LinkTable;
