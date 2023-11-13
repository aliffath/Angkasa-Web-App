"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./style.module.css";
import iconprofile from "../../../public/images/user.svg";
import iconstar from "../../../public/images/star.svg";
import iconsettings from "../../../public/images/setting.svg";
import iconlogout from "../../../public/images/logout.svg";
import user from "../../../public/images/userimage.jpg";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
const ProfileCard = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const getDetailUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/detail`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data.data);
      console.log(response.data.data);
      toast.success("Get detail users success");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Get detail users failed");
    }
  };

  useEffect(() => {
    getDetailUsers();
  }, []);

  const handleLogout = () => {
    if (localStorage.getItem("access_token")) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
      return localStorage.clear();
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        transition={Bounce}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <section className={styles.profilecard}>
        <div className="container">
          <div className="row">
            <div className={styles.cardProfile}>
              <div
                className={`d-flex flex-row justify-content-center my-3 px-5 ${styles.picProfile}`}
              >
                <Image
                  width={150}
                  height={150}
                  className="object-fit-cover"
                  src={user}
                  alt=""
                />
              </div>

              <div className="d-flex flex-column align-items-center my-3">
                <h2>{data?.name}</h2>
                <div className="d-flex gap-2">
                  <FaLocationDot size={23} color="#2395FF" />
                  <p>Medan Indonesia</p>
                </div>
              </div>

              {/* credit card */}
              <div className="p-3">
                <div className="d-flex justify-content-between">
                  <p className="fw-bold">Cards</p>
                  <p className="fw-bold text-primary">+ Add</p>
                </div>
                <div className="bg-primary rounded shadow py-3 text-white">
                  <p className="fw-bold  text-center">4444 0002 2333 2222</p>
                  <div className="d-flex justify-content-between px-5">
                    <p>x-card</p>
                    <p>$ 1,4444,2</p>
                  </div>
                </div>
              </div>

              <div className={`d-flex flex-row mx-3 ${styles.setProfile}`}>
                <Image
                  src={iconprofile}
                  alt=""
                  className={styles.iconprofile}
                />
                <p className={`mx-5 ${styles.textProfile}`}> Profile </p>
              </div>
              <div className={`d-flex flex-row mx-3 ${styles.setMyreview}`}>
                <Image src={iconstar} alt="" className={styles.iconstar} />
                <p className={`mx-5 ${styles.textMyreview}`}> My Review </p>
              </div>
              <div className={`d-flex flex-row mx-3 ${styles.setSettings}`}>
                <Image
                  src={iconsettings}
                  alt=""
                  className={styles.iconsettings}
                />

                <p
                  className={`mx-5 ${styles.textSettings}`}
                  style={{ cursor: "pointer" }}
                >
                  Settings
                </p>
              </div>
              <button
                className={`d-flex flex-row mx-3  ${styles.setLogout}`}
                onClick={() => handleLogout()}
              >
                <Image src={iconlogout} alt="" className={styles.iconlogout} />
                <p
                  style={{ cursor: "pointer" }}
                  className={`mx-5 ${styles.textLogout}`}
                >
                  Logout
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileCard;
