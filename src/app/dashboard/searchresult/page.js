"use client";
import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import axios from "axios";
import { GoArrowSwitch, GoChevronUp } from "react-icons/go";
import { BsArrowDownUp } from "react-icons/bs";
import Footer from "@/components/Footer";
import ButtonAuth from "@/components/ButtonAuth";
import plane from "../../../../public/images/whiteplane.svg";
import Link from "next/link";
import pesawat from "../../../../public/images/pesawat.svg";
import NavigationBar from "@/components/Navbar";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SearchResult() {
  const [showTransit, setShowTransit] = useState(true);
  const [showFacilities, setShowFacilities] = useState(true);
  const [showDepature, setShowDepature] = useState(true);
  const [showArrived, setShowArrived] = useState(true);
  const [showAirlines, setShowAirlines] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(null);
  const [reqFacility, setReqFacility] = useState("");
  const [reqAirline, setReqAirline] = useState("");
  const [reqMinPrice, setReqMinPrice] = useState([0, 1000]);
  const allFacilities = [
    { name: "baggage", image: "/images/luggage.svg" },
    { name: "meal", image: "/images/burger.svg" },
    { name: "wifi", image: "/images/wifi.svg" },
  ];

  function transit() {
    setShowTransit(!showTransit);
  }

  function facilities() {
    setShowFacilities(!showFacilities);
  }

  function depature() {
    setShowDepature(!showDepature);
  }
  function arrived() {
    setShowArrived(!showArrived);
  }
  function airlines() {
    setShowAirlines(!showAirlines);
  }

  const getAllFlight = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/airlines/flight`
      );
      setData(response.data.data);
      console.log(response.data.data);
      toast.success("Get all flight success");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Get all flight failed");
    }
  };

  useEffect(() => {
    getAllFlight();
  }, []);

  const getFilteredFlight = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/airlines/flight?facilities=${reqFacility}&airlineId=${reqAirline}&minPrice=${reqMinPrice[0]}&maxPrice=${reqMinPrice[1]}`
      );
      setFilter(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getFilteredFlight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqFacility, reqAirline]);

  const resetButton = () => {
    setReqAirline("");
    setReqFacility("");
  };

  const handleCheckboxChange = (facilityId) => {
    if (reqFacility.includes(facilityId)) {
      setReqFacility(reqFacility.filter((id) => id !== facilityId));
    } else {
      setReqFacility([...reqFacility, facilityId]);
    }
  };
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
      <div
        className="p-0 align-items-center d-flex w-100 "
        style={{
          backgroundColor: "#2395FF",
          height: "174px",
          borderRadius: "0px 0px 30px 30px",
          color: "white",
          backgroundImage: 'url("/images/blueplane.svg")',
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container>
          <Row>
            <Col md={4}>
              <div className="d-flex gap-3">
                <Image src={plane} alt="" width={30} />
                <p>Medan (IDN)</p>
                <GoArrowSwitch />
                <p>Tokyo (JPN)</p>
              </div>
              <div className="d-flex gap-2">
                <p>Monday,20 july</p>
                <p>6 Passenger</p>
                <p>Economy</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ backgroundColor: "#F5F6FA" }}>
        <Container>
          <Row>
            <Col md={3} className="my-3">
              <div className="d-flex justify-content-between pt-3">
                <h5 className="fw-bold">Filter</h5>
                <p className="fw-bold text-primary" onClick={resetButton}>
                  Reset
                </p>
              </div>
              <div style={{ backgroundColor: "white" }} className="p-3">
                <div className="d-flex justify-content-between">
                  <h6 className="fw-bold">Transit</h6>
                  <button
                    onClick={transit}
                    className="border border-0"
                    style={{ backgroundColor: "white" }}
                  >
                    <GoChevronUp size={25} />
                  </button>
                </div>
                {showTransit ? (
                  <>
                    <div className="p-2">
                      <div className="mb-2 d-flex justify-content-between">
                        <label>Direct</label>
                        <input type="checkbox" />
                      </div>
                      <div className="mb-2 d-flex justify-content-between">
                        <label>Transit</label>
                        <input type="checkbox" />
                      </div>
                      <div className="mb-2 d-flex justify-content-between">
                        <label>Transit 2+</label>
                        <input type="checkbox" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div></div>
                )}
                <div className="d-flex justify-content-between my-2">
                  <h6 className="fw-bold">Facilities</h6>
                  <button
                    onClick={facilities}
                    className="border border-0"
                    style={{ backgroundColor: "white" }}
                  >
                    <GoChevronUp size={25} />
                  </button>
                </div>
                {showFacilities ? (
                  <>
                    <div className="p-2">
                      <div className="mb-2 d-flex justify-content-between">
                        <label>Lugguage</label>
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(1)}
                          checked={reqFacility.includes(1)}
                        />
                      </div>
                      <div className="mb-2 d-flex justify-content-between">
                        <label>In-Flight Meal</label>
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(2)}
                          checked={reqFacility.includes(2)}
                        />
                      </div>
                      <div className="mb-2 d-flex justify-content-between">
                        <label>Wi-fi</label>
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(3)}
                          checked={reqFacility.includes(3)}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div></div>
                )}
                <div className="d-flex justify-content-between my-2">
                  <h6 className="fw-bold">Depature Time</h6>
                  <button
                    onClick={depature}
                    className="border border-0"
                    style={{ backgroundColor: "white" }}
                  >
                    <GoChevronUp size={25} />
                  </button>
                </div>
                {showDepature ? (
                  <>
                    <div className="p-2">
                      <div className="mb-2 d-flex justify-content-between">
                        <label>00.00 - 06.00</label>
                        <input type="checkbox" />
                      </div>
                      <div className="mb-2 d-flex justify-content-between">
                        <label>06.00 - 12.00</label>
                        <input type="checkbox" />
                      </div>
                      <div className="mb-2 d-flex justify-content-between">
                        <label>12.00 - 18.00</label>
                        <input type="checkbox" />
                      </div>
                      <div className="mb-2 d-flex justify-content-between">
                        <label>18.00 - 24.00</label>
                        <input type="checkbox" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div></div>
                )}
                <div className="d-flex justify-content-between my-2">
                  <h6 className="fw-bold">Time Arrived</h6>
                  <button
                    onClick={arrived}
                    className="border border-0"
                    style={{ backgroundColor: "white" }}
                  >
                    <GoChevronUp size={25} />
                  </button>
                </div>
                {showArrived ? (
                  <>
                    <div className="p-2">
                      <div className="mb-2 d-flex justify-content-between">
                        <label>00.00 - 06.00</label>
                        <input type="checkbox" />
                      </div>
                      <div className="mb-2 d-flex justify-content-between">
                        <label>06.00 - 12.00</label>
                        <input type="checkbox" />
                      </div>
                      <div className="mb-2 d-flex justify-content-between">
                        <label>12.00 - 18.00</label>
                        <input type="checkbox" />
                      </div>
                      <div className="mb-2 d-flex justify-content-between">
                        <label>18.00 - 24.00</label>
                        <input type="checkbox" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div></div>
                )}
                <div className="d-flex justify-content-between my-2">
                  <h6 className="fw-bold">Airlines</h6>
                  <button
                    onClick={airlines}
                    className="border border-0"
                    style={{ backgroundColor: "white" }}
                  >
                    <GoChevronUp size={25} />
                  </button>
                </div>
                {showAirlines ? (
                  <>
                    <div className="p-2">
                      <div className="mb-2 d-flex justify-content-between">
                        <label>Garuda</label>
                        <input
                          type="checkbox"
                          onClick={() => setReqAirline(2)}
                          checked={reqAirline === 2}
                        />
                      </div>
                      <div className="mb-2 d-flex justify-content-between">
                        <label>Air Asia</label>
                        <input
                          type="checkbox"
                          onClick={() => setReqAirline(4)}
                          checked={reqAirline === 4}
                        />
                      </div>
                      <div className="mb-2 d-flex justify-content-between">
                        <label>Lion Air</label>
                        <input
                          type="checkbox"
                          onClick={() => setReqAirline(3)}
                          checked={reqAirline === 3}
                        />
                      </div>
                      <div className="mb-2 d-flex justify-content-between">
                        <label>City Link</label>
                        <input
                          type="checkbox"
                          onClick={() => setReqAirline(5)}
                          checked={reqAirline === 5}
                        />
                      </div>
                      <div className="mb-2 d-flex justify-content-between">
                        <label>Singapore Airlines</label>
                        <input
                          type="checkbox"
                          onClick={() => setReqAirline(1)}
                          checked={reqAirline === 1}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div></div>
                )}
              </div>
            </Col>
            <Col md={9} className="my-3">
              <div className="d-flex justify-content-between pt-3">
                <div className="d-flex align-items-center gap-2">
                  <h6 className="m-0 fw-bold">Selected Ticket</h6>
                  <p className="m-0"> {`(${data?.length} flight found)`}</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <p className="m-0 fw-bold">Sort By</p>
                  <BsArrowDownUp />
                </div>
              </div>
              {filter?.map((item, index) => {
                return (
                  <div key={index}>
                    <div style={{ backgroundColor: "white" }} className="my-3">
                      <Container className="p-3">
                        <Row>
                          <Col
                            md={12}
                            className="d-flex gap-2 align-items-center"
                          >
                            <Image
                              src={item.photo}
                              alt=""
                              width={150}
                              height={100}
                            />
                            <p>{item?.name}</p>
                          </Col>
                          <Col md={3}>
                            <div className="d-flex gap-3 py-3 justify-content-center">
                              <div>
                                <h6 className="fw-bold">
                                  {item?.from?.country}
                                </h6>
                                {new Date(`${item.takeoff}`).toLocaleString(
                                  "en-US",
                                  {
                                    timeZone: "Asia/Jakarta",
                                    hour12: false,
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </div>
                              <Image
                                src={pesawat}
                                alt=""
                                height={20}
                                width={20}
                              />
                              <div>
                                <h6 className="fw-bold">{item?.to?.country}</h6>
                                {new Date(`${item.landing}`).toLocaleString(
                                  "en-US",
                                  {
                                    timeZone: "Asia/Jakarta",
                                    hour12: false,
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </div>
                            </div>
                          </Col>
                          <Col md={2} className="text-center">
                            <p className="m-0">{item?.interval_time}</p>
                            <p>({item?.transit} Transit)</p>
                          </Col>
                          <Col md={3}>
                            <div className="d-flex justify-content-center align-items-center gap-3">
                              {item?.facilities?.map((facility) => {
                                const getFacilities = allFacilities.find(
                                  (data) => data.name === facility
                                );

                                return (
                                  <div key={facility}>
                                    {getFacilities && (
                                      <Image
                                        src={getFacilities.image}
                                        alt={facility}
                                        width={30}
                                        height={30}
                                      />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </Col>
                          <Col md={2} className="d-flex justify-content-center">
                            <p className="text-primary m-0">$ {item?.price}</p>
                            <p className="m-0">/pax</p>
                          </Col>
                          <Col md={2}>
                            <Link href={`/dashboard/searchresult/${item.code}`}>
                              <ButtonAuth>Select</ButtonAuth>
                            </Link>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </div>
                );
              })}
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </Fragment>
  );
}
