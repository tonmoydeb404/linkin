import { useState } from "react";
import { Table } from "react-daisyui";
import { toast } from "react-toastify";
import {
  useDeleteLinkMutation,
  useUserLinksQuery,
} from "../../../../api/linksApi";
import { ILink } from "../../../../types/link.type";
import LinkUpdateForm from "../../forms/link/LinkUpdateForm";
import ModalWrapper from "../../modals/ModalWrapper";
import LinkRow from "./LinkRow";

const LinkTable = () => {
  const { data, isSuccess } = useUserLinksQuery(undefined);
  const [deleteLink] = useDeleteLinkMutation();

  const [updateForm, setUpdateForm] = useState<ILink | false>(false);

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
      <Table className="w-full">
        <Table.Head>
          <span />
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
      <ModalWrapper
        show={!!updateForm}
        hide={() => setUpdateForm(false)}
        title="Update Link"
      >
        <LinkUpdateForm
          link={updateForm}
          onSubmit={() => setUpdateForm(false)}
          onCancel={() => setUpdateForm(false)}
        />
      </ModalWrapper>
    </>
  );
};

export default LinkTable;
