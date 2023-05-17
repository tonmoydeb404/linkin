import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";

const Profile = () => {
  return (
    <div className="max-w-lg mx-auto py-10">
      <div className="flex flex-col items-center mb-10">
        <img
          src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          alt="User Image"
          className="w-[160px] h-[160px] aspect-square rounded-full mb-5"
        />

        <h1 className="text-3xl font-bold mb-1">Jhon Doe</h1>
        <h2 className="text-base font-medium opacity-90">@jhondoe</h2>
      </div>
      <div className="flex flex-col gap-2 mb-10">
        <div className="flex items-center gap-3 bg-white shadow-sm border p-2 rounded-xl group">
          <div className="aspect-square relative w-[40px]">
            <img
              src="https://th.bing.com/th/id/OIP.VXUzRhDKbCbEnq2RwKKrgwHaHa?pid=ImgDet&w=2048&h=2048&rs=1"
              alt="Link Thumbnail"
              className="object-cover rounded-full"
            />
          </div>
          <h3 className="text-lg font-medium">Hello World </h3>
          <a
            href="#"
            className="inline-flex items-center justify-center w-[40px] h-[40px] bg-slate-800 text-slate-50 rounded-lg ml-auto opacity-0 group-hover:opacity-100 duration-200"
          >
            <HiExternalLink className="text-2xl" />
          </a>
        </div>
      </div>

      <div className="flex items-center justify-center flex-wrap text-2xl gap-3">
        <a
          href="#"
          target="_blank"
          className="p-2 hover:bg-black/10 inline-block rounded-full duration-200"
        >
          <FaFacebook />
        </a>
        <a
          href="#"
          target="_blank"
          className="p-2 hover:bg-black/10 inline-block rounded-full duration-200"
        >
          <FaTwitter />
        </a>
        <a
          href="#"
          target="_blank"
          className="p-2 hover:bg-black/10 inline-block rounded-full duration-200"
        >
          <FaInstagram />
        </a>
        <a
          href="#"
          target="_blank"
          className="p-2 hover:bg-black/10 inline-block rounded-full duration-200"
        >
          <FaWhatsapp />
        </a>
      </div>
    </div>
  );
};

export default Profile;
