import { Button, Input, Textarea } from "react-daisyui";
import { HiPencilAlt, HiX } from "react-icons/hi";

const EditProfile = () => {
  return (
    <div className="px-8 py-10">
      <h2 className="text-xl font-semibold mb-10">Edit Profile</h2>
      <div className="flex flex-col gap-y-3 gap-x-5 mb-16">
        <div className="form-control w-full max-w-lg">
          <label htmlFor="firstName" className="label">
            <span className="label-text">First Name</span>
          </label>
          <Input name="firstName" id="firstName" placeholder="Jhon" />
        </div>
        <div className="form-control w-full max-w-lg">
          <label htmlFor="lastName" className="label">
            <span className="label-text">Last Name</span>
          </label>
          <Input name="lastName" id="lastName" placeholder="Doe" />
        </div>
        <div className="form-control w-full max-w-lg">
          <label htmlFor="lastName" className="label">
            <span className="label-text">Bio</span>
          </label>
          <Textarea
            name="lastName"
            id="lastName"
            placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, facilis?"
            rows={5}
          />
        </div>
        <div className="form-control w-full max-w-lg">
          <label htmlFor="avatar" className="label">
            <span className="label-text">Avatar</span>
          </label>
          <div className="flex items-stretch gap-2">
            <div className="aspect-square relative w-[50px]">
              <img
                src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                alt="User Image"
                className="object-cover rounded-lg"
              />
            </div>
            <Input
              type="url"
              name="avatar"
              id="avatar"
              placeholder="https://example.com/image.jpeg"
              className="flex-1"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button endIcon={<HiPencilAlt />} color="success">
          Update
        </Button>
        <Button endIcon={<HiX />} color="error">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
