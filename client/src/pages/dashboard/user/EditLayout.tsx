import { useGetLayoutQuery } from "@/api/layoutApi";
import LayoutUpdateForm from "@/common/components/forms/layout/LayoutUpdateForm";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const EditLayout = () => {
  const { data, isSuccess } = useGetLayoutQuery();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Edit Layout - LinkIn</title>
      </Helmet>
      <div>
        <h2 className="text-xl font-semibold mb-10">Edit Layout</h2>
        <LayoutUpdateForm
          className="flex flex-col gap-y-3 gap-x-5 max-w-lg"
          data={isSuccess ? data.result : null}
          cancelCallback={() => navigate("/dashboard")}
        />
      </div>
    </>
  );
};

export default EditLayout;
