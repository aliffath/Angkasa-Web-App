"use client";
import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import ProfileCard from "@/components/cardProfile/Index";
import Footer from "@/components/Footer";
import pesawat from "../../../../public/images/pesawat.svg";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import NavigationBar from "@/components/Navbar";
export default function MyBooking() {
  const router = useRouter();
  const [data, setData] = useState(null);

  const getBookingDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/booking/tickets`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setData(response.data.data);
      console.log(response.data.data);
      toast.success("Get detail booking success!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Get detail booking failed");
    }
  };
  useEffect(() => {
    getBookingDetail();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
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
      <NavigationBar />
      <div style={{ backgroundColor: "#F5F6FA" }}>
        <Container className="mb-5">
          <Row>
            <Col md={4}>
              <ProfileCard />
            </Col>
            <Col md={8}>
              <div
                style={{ backgroundColor: "white" }}
                className="rounded shadow p-3"
              >
                <h5 className="text-primary">MY BOOKING</h5>
                <div className="d-flex justify-content-between pt-2">
                  <h4 className="fw-bold">My Booking</h4>
                  <p className="text-primary">Order history</p>
                </div>
              </div>

              {data?.result?.map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      style={{ backgroundColor: "white" }}
                      className="rounded shadow my-4 p-3"
                    >
                      <p>
                        {" "}
                        {new Date(
                          `${item?.ticket?.takeoff}`
                        ).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        -{" "}
                        {new Date(
                          `${item?.ticket?.takeoff}`
                        ).toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </p>
                      <div className="d-flex gap-3">
                        <h6 className="fw-bold">{item?.ticket?.from?.code}</h6>
                        <Image src={pesawat} alt="" width={30} height={30} />
                        <h6 className="fw-bold">
                          {" "}
                          {item?.ticket?.from?.location}
                        </h6>
                      </div>
                      <div className="d-flex align-items-center gap-4 my-3">
                        <Image
                          src={item?.ticket?.airline?.photo}
                          width={100}
                          height={100}
                          alt="plane-logo"
                        />
                        <p> {item?.ticket?.airline?.name}</p>
                      </div>
                      <Row>
                        <Col md={10}>
                          <div className="d-flex gap-5 align-items-center">
                            <p className="fw-bold m-0">Status</p>
                            {item.status.id === 1 ? (
                              <button
                                className="border border-0 rounded  fw-bold text-white py-1 px-5"
                                style={{ backgroundColor: "#FF7F23" }}
                              >
                                {item.status.name}
                              </button>
                            ) : (
                              <button
                                className="border border-0 rounded fw-bold text-white "
                                style={{ backgroundColor: "#4FCF4D" }}
                              >
                                {item.status.name}
                              </button>
                            )}
                          </div>
                        </Col>
                        <Col md={2} className="d-flex pt-2">
                          <Link href={`detailbooking/${item?.code}`}>
                            <p className="text-primary">View Detail</p>
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  </div>
                );
              })}

              <div
                style={{ backgroundColor: "white" }}
                className="rounded shadow my-4 p-3"
              >
                <p>Monday,20 Juli 20 - 12.33</p>
                <div className="d-flex gap-3">
                  <h6 className="fw-bold">IDN</h6>
                  <Image src={pesawat} alt="" />
                  <h6 className="fw-bold">JPN</h6>
                </div>
                <p>Garuda Indonesia,AB-221</p>
                <Row>
                  <Col md={10}>
                    <div className="d-flex gap-5 align-items-center">
                      <p className="fw-bold m-0">Status</p>
                      <button
                        className="border border-0 rounded  fw-bold text-white"
                        style={{ backgroundColor: "#4FCF4D" }}
                      >
                        Eticket Issued
                      </button>
                    </div>
                  </Col>
                  <Col md={2} className="d-flex pt-2">
                    <p className="text-primary">View Detail</p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </Fragment>
  );
}
