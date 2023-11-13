"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import plane from "../../../../../public/images/plane.svg";
import barcode from "../../../../../public/images/barcode.svg";
import NavigationBar from "@/components/Navbar";
export default function DetailBooking() {
  const { id } = useParams();
  const [detailTicket, setDetailTicket] = useState(null);

  const getDetailTicket = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/booking/tickets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setDetailTicket(response.data.data.result.ticket);
      toast.success("Success get detail ticket!");
    } catch (error) {
      console.log("Error when get data", error);
      toast.error("Get detail ticket failed!");
    }
  };
  useEffect(() => {
    getDetailTicket();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      <NavigationBar />
      <Container
        fluid
        style={{ backgroundColor: "#2395FF", padding: "30px 0" }}
        className="mb-5"
      >
        <Row className="justify-content-center align-items-center">
          <Col md={6}>
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "20px",
                gap: "20px",
                boxShadow: "0px 8px 27px rgba(14, 63, 108, 0.19)",
                borderRadius: "20px",
              }}
            >
              <h3 className="text-start fw-bolder m-4">Booking Pass</h3>
              <Row
                style={{
                  border: "2px solid",
                  borderColor: " #e5e5e5",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  margin: "25px",
                }}
              >
                <Col
                  md={7}
                  className="p-5"
                  style={{
                    borderRight: "3px dotted #E5E5E5",
                  }}
                >
                  <Row className=" mb-5 w-100">
                    {/* Image */}
                    <Col md={6} className="d-flex align-items-center">
                      <Image
                        src={detailTicket?.airline?.photo}
                        alt="Image"
                        width={100}
                        height={57}
                      />
                    </Col>
                    <Col md={2} className="d-flex align-items-center">
                      {/* Text */}
                      <p className="m-0 fw-bold">{detailTicket?.from?.code}</p>
                    </Col>
                    <Col md={2} className="d-flex align-items-center">
                      <Image src={plane} alt="" className="mx-2" />
                    </Col>
                    <Col md={2} className="d-flex align-items-center">
                      <p className="m-0 fw-bold">{detailTicket?.to?.code}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      md={6}
                      style={{
                        fontFamily: "Lato",
                        color: "#A5A5A5",
                      }}
                    >
                      <p className="m-0">Code</p>
                      <p className="m-0">AB-221</p> <br />
                      <p className="m-0">Terminal</p>
                      <p className="m-0">A</p>
                    </Col>
                    <Col
                      md={6}
                      style={{
                        fontFamily: "Lato",
                        color: "#A5A5A5",
                      }}
                    >
                      <p className="m-0">Class</p>
                      <p className="m-0 ">Economy</p> <br />
                      <p className="m-0">Gate</p>
                      <p className="m-0">221</p>
                    </Col>
                  </Row>
                  <div className="text-start mt-4">
                    <p className="m-0" style={{ color: "#A5A5A5" }}>
                      Depature
                    </p>
                    <p className="m-0" style={{ color: "#595959" }}>
                      {new Date(`${detailTicket?.takeoff}`).toLocaleDateString(
                        "id-ID",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}{" "}
                      -{" "}
                      {new Date(`${detailTicket?.takeoff}`).toLocaleTimeString(
                        "id-ID",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }
                      )}
                    </p>
                  </div>
                </Col>
                <Col
                  md={5}
                  className="p-5 d-flex align-items-center justify-content-center"
                >
                  <Image src={barcode} alt="Barcode" />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
