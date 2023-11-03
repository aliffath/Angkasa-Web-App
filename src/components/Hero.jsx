import { Fragment } from "react";
import Image from "next/image";
import hero from "../../public/images/imageauth.svg";
const Hero = () => {
  return (
    <Fragment>
      <div
        className="d-flex vh-100 justify-content-center align-items-center"
        style={{ backgroundColor: "#2395FF" }}
      >
        <div className="d-flex ">
          <Image src={hero} alt="" style={{ width: "100%" }} />
        </div>
      </div>
    </Fragment>
  );
};

export default Hero;
