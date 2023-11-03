import Image from "next/image";
import logo from "../../public/images/logo.svg";

const Logo = () => {
  return (
    <>
      <div className="my-5 d-flex align-items-center">
        <Image height={25} src={logo} alt="" />
        <span className="fw-bold p-2 fs-5">Ankasa</span>
      </div>
    </>
  );
};

export default Logo;
