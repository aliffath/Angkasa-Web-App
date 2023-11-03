"use client";
import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form, Alert, Button } from "react-bootstrap";
import Footer from "@/components/Footer";
import Image from "next/image";

import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";
import style from "./index.module.css";

function DetailFlightPage(props) {
  const router = useRouter();
  const [data, setData] = useState();

  const [dataDetailFlight, setDataDetailFlight] = useState({});
  const [profile, setProfile] = useState({});
  const [flightData, setFlightData] = useState({});

  const [dataUser, setDataUser] = useState("");
  const [getTitle, setGetTitle] = useState("");
  const [getCountry, setGetCountry] = useState("");

  const handleChange = (e) => {
    const newdata = { ...dataDetailFlight };
    newdata[e.target.name] = e.target.value;
    setDataDetailFlight(newdata);
  };
  const { id } = useParams();

  let url = `https://easy-lime-seal-toga.cyclic.app/airlines/flight/${id}`;
  const getData = () => {
    axios
      .get(url)
      .then((res) => {
        console.log("get data success");
        console.log(res.data.data);
        res.data.data && setData(res.data.data);
        setSelected(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData(url);
  }, []);

  const handleSubmit = async () => {
    try {
      const data = {
        title1: getTitle,
        fullname1: dataUser,
        nationality1: getCountry,
      };
      console.log(data);
      const result = await axios.post(
        `https://easy-lime-seal-toga.cyclic.app/booking/tickets/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      Swal.fire({
        title: "Success!",
        text: `${result.data.message}`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      // router.push(`/users/mybooking/bookingpass/${result.data.data.code}`);
      router.push("/dashboard/mybooking");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <>
      <Row>
        <div
          className="p-0 text-center position-relative w-100 "
          style={{
            backgroundColor: "#2395FF",
            height: "174px",
            borderRadius: "0px 0px 30px 30px",
            color: "white",
            backgroundImage: "url(/images/blueplane.svg)",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Row>
            <Col xs={12} sm={12} md={5} className="my-5 d-none d-md-block">
              <h4>Contact Person Detail</h4>
            </Col>
            <Col xs={12} sm={12} md={4} className="my-5 d-none d-md-block">
              <h4>Flight Details</h4>
            </Col>
            <Col xs={12} sm={12} md={3} className="my-5 d-none d-md-block">
              <h5>View Details</h5>
            </Col>
          </Row>
        </div>
      </Row>

      <div
        className="position-absolute w-100"
        style={{ top: "100px", padding: "0 32px" }}
      >
        <Container>
          <Row>
            <Col xs={12} sm={8} md={8}>
              <div
                className="shadow card"
                style={{
                  borderRadius: "15px",
                }}
              >
                <div style={{ padding: "40px" }}>
                  <Form>
                    <Form.Label htmlFor="name" style={{ color: "#9B96AB" }}>
                      Full Name
                    </Form.Label>
                    <input
                      type="text"
                      className={`form-control ${style.form_control}`}
                      name="fullname"
                      id="fullname"
                      placeholder="Your Full Name"
                      onChange={(e) => handleChange(e)}
                      value={profile.fullname}
                      autoFocus
                    />
                    <Form.Label htmlFor="name" style={{ color: "#9B96AB" }}>
                      Email
                    </Form.Label>
                    <input
                      type="email"
                      className={`form-control ${style.form_control}`}
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      onChange={(e) => handleChange(e)}
                      value={profile.email}
                      autoFocus
                    />
                    <Form.Label htmlFor="name" style={{ color: "#9B96AB" }}>
                      Phone Number
                    </Form.Label>
                    <input
                      country=""
                      type="number"
                      className={`form-control ${style.form_control}`}
                      name="number"
                      id="number"
                      placeholder="Your Phone Number"
                      onChange={(e) => handleChange(e)}
                      value={profile.phone}
                      autoFocus
                    />
                  </Form>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={4} md={4} className="space">
              <div
                className="shadow card"
                style={{
                  borderRadius: "15px",
                }}
              >
                <div className="card-body">
                  <Row className="align-items-center">
                    <Col md={5}>
                      <Image
                        src={data?.photo}
                        width={140}
                        height={140}
                        alt="airplane-logo"
                      />
                    </Col>
                    <Col md={7}>{data?.name}</Col>
                  </Row>
                  <Row className="mt-3 align-items-center">
                    <Col md={12} className="gap-5 d-flex">
                      <p className="m-0 fw-bold">
                        {data?.to?.location?.split(",")[0]} ({data?.to?.code})
                      </p>
                      <Image
                        src="/img/plan.png"
                        alt=""
                        height={20}
                        width={20}
                      />
                      <p className="m-0 fw-bold">
                        {data?.from?.location?.split(",")[0]} (
                        {data?.from?.code})
                      </p>
                    </Col>
                  </Row>
                  <Row className="mt-3 align-items-center">
                    <Col md={8}>
                      <p className="m-0" style={{ color: "#6B6B6B" }}>
                        {new Date(`${data?.takeoff}`).toLocaleDateString(
                          "id-ID",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </Col>
                    <Col md={4}>
                      <p className="m-0" style={{ color: "#6B6B6B" }}>
                        {" "}
                        {new Date(`${data?.takeoff}`).toLocaleTimeString(
                          "id-ID",
                          { hour: "2-digit", minute: "2-digit", hour12: false }
                        )}{" "}
                        -{" "}
                        {new Date(`${data?.landing}`).toLocaleTimeString(
                          "id-ID",
                          { hour: "2-digit", minute: "2-digit", hour12: false }
                        )}
                      </p>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      color: "#2395FF",
                      fontFamily: "Poppins",
                    }}
                    className="my-3"
                  >
                    <Col md={8} className="gap-3 d-flex">
                      <Form.Check type="radio" />{" "}
                      <p className="m-0">Refundable</p>
                    </Col>
                    <Col md={8} className="gap-3 d-flex">
                      <Form.Check type="radio" />{" "}
                      <p className="m-0">Can Reschedule</p>
                    </Col>
                  </Row>
                  <Row style={{ fontFamily: "Poppins" }}>
                    <hr />
                    <Col
                      md={12}
                      className="my-4 d-flex justify-content-between"
                    >
                      <p className="fw-bold fs-6">Total Payment</p>
                      <p className="fs-5" style={{ color: "#2395FF" }}>
                        {data?.price},00
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <h3 className="my-5">Passenger Detail</h3>
          <Row className="my-5 ">
            <Col md={6}>
              <div
                className="shadow card"
                style={{
                  height: "415px",
                  borderRadius: "15px",
                }}
              >
                <div className="card-body">
                  {/* Konten Card */}
                  <Alert variant="primary" className="p-2 m-0">
                    <div
                      className="d-flex justify-content-between"
                      style={{
                        color: "#595959",
                        fontFamily: "Lato",
                      }}
                    >
                      <p className="m-0">Passenger : 1 Adult</p>
                      <div className="d-flex">
                        <p className="m-0">Same as contact person</p>
                        <div className="form-check form-switch form-check-reverse">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </div>
                    </div>
                  </Alert>
                  <Form>
                    <Form.Label htmlFor="name" style={{ color: "#9B96AB" }}>
                      Title
                    </Form.Label>
                    <Form.Select
                      aria-label="title"
                      name="title1"
                      placeholder="Your Title"
                      id="title1"
                      value={dataDetailFlight.title1}
                      onChange={(e) => setGetTitle(e.target.value)}
                      autoFocus
                      className={`form-control ${style.form_control}`}
                    >
                      <option>Open Title</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                    </Form.Select>
                    <Form.Label htmlFor="name" style={{ color: "#9B96AB" }}>
                      Full Name
                    </Form.Label>
                    <input
                      name="fullname1"
                      placeholder=""
                      value={dataDetailFlight.fullname1}
                      onChange={(e) => setDataUser(e.target.value)}
                      autoFocus
                      className={`form-control ${style.form_control}`}
                    />
                    <Form.Label htmlFor="name" style={{ color: "#9B96AB" }}>
                      Country
                    </Form.Label>
                    <Form.Select
                      name="country"
                      onChange={(e) => setGetCountry(e.target.value)}
                      value={dataDetailFlight.country}
                      autoFocus
                      className={`form-control ${style.form_control}`}
                    >
                      <option>Open Country</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Japan">Japan</option>
                      <option value="Argentina">Argentina</option>
                      <option value="France">France</option>
                      <option value="Spain">Spain</option>
                      <option value="Australia">Australia</option>
                    </Form.Select>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <h3 className="mb-5 fw-bold">Passenger Detail</h3>
            <Col md={6}>
              <div
                className="shadow card"
                style={{
                  borderRadius: "15px",
                }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className=" d-flex gap-3">
                      <input type="checkbox" id="isChecked" name="isChecked" />
                      <div
                        style={{ fontFamily: "Lato" }}
                        className="fs-5 fw-bold"
                      >
                        Travel Insurance
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <h5 style={{ color: "#2395FF" }} className="m-0">
                        $2,00
                      </h5>
                      <p className="m-0">/pack</p>
                    </div>
                  </div>
                  <hr />
                  <div style={{ fontFamily: "Poppins" }}>
                    <p>Get travel compensation up to $ 10.000,00</p>
                  </div>
                </div>
              </div>
              <div className="my-4">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  style={{
                    backgroundColor: "#2395FF",
                    color: "white",
                    borderRadius: "5px",
                    border: "0",
                    boxShadow: "0px 4px 8px #2395FF",
                  }}
                  className="my-2 fw-bold w-100 p-2"
                >
                  Proceed to payment
                </button>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </>
  );
}
export default DetailFlightPage;
