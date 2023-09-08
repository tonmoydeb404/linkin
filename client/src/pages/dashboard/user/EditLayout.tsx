import { useGetLayoutQuery } from "@/api/layoutApi";
import DialogWrapper from "@/common/components/dialog/DialogWrapper";
import LayoutCreateForm from "@/common/components/forms/layout/LayoutCreateForm";
import LayoutUpdateForm from "@/common/components/forms/layout/LayoutUpdateForm";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/common/components/ui/alert";
import { Button } from "@/common/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const EditLayout = () => {
  const layout = useGetLayoutQuery();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  if (layout.isError && "data" in layout.error) {
    if (layout.error.data.statusCode === 404) {
      return (
        <>
          <Helmet>
            <title>Initialize Layout - LinkIn</title>
          </Helmet>

          <div className="flex w-full h-full flex-col items-center justify-center">
            <Alert className="mb-5 max-w-md">
              <AlertCircleIcon />
              <AlertTitle>Profile Layout not found!</AlertTitle>
              <AlertDescription>
                Look like your profile layout is not created. create this now!
              </AlertDescription>
            </Alert>

            <Button onClick={() => setShowModal(true)}>
              Create Profile Layout
            </Button>
          </div>
          <DialogWrapper
            open={showModal}
            onChange={setShowModal}
            title="Create profile layout"
          >
            <LayoutCreateForm
              className="flex flex-col gap-y-3 gap-x-5"
              submitCallback={() => {
                setShowModal(false);
                layout.refetch();
              }}
              cancelCallback={() => setShowModal(false)}
            />
          </DialogWrapper>
        </>
      );
    }
  }

  if (layout.isSuccess) {
    return (
      <>
        <Helmet>
          <title>Edit Layout - LinkIn</title>
        </Helmet>
        <div>
          <h2 className="text-xl font-semibold mb-10">Edit Layout</h2>
          <LayoutUpdateForm
            className="flex flex-col gap-y-3 gap-x-5 max-w-lg"
            data={layout.data.result}
            cancelCallback={() => navigate("/dashboard")}
          />
        </div>
      </>
    );
  }

  return "loading";
};

export default EditLayout;
