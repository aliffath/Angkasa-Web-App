"use client";
import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import ProfileCard from "@/components/cardProfile/Index";
import Footer from "@/components/Footer";
import styles from "./style.module.css";
export default function Profile() {
  return (
    <Fragment>
      <div style={{ backgroundColor: "#F5F6FA" }} className="mt-5">
        <Container className="mb-5">
          <Row>
            <Col md={4}>
              <ProfileCard />
            </Col>
            <Col md={8}>
              <div className={`d-flex flex-column ${styles.rightsideProfile}`}>
                <p className={styles.title}>P R O F I L E</p>
                <p className={styles.subtitle}>Profile</p>

                <div className="d-flex flex-column flex-md-row my-4 detailProfile">
                  <div className="col-md-6 me-4">
                    <div className="d-flex flex-column detailProfileleft">
                      <p className={styles.contact}>Contact</p>
                      <label
                        htmlFor="email"
                        className={`mt-3 ms-3 ${styles.labelForm}`}
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className={styles.inputProfile}
                        name="email"
                      />
                      <label
                        htmlFor="phone"
                        className={`mt-3 ms-3 ${styles.labelForm}`}
                      >
                        Phone Number
                      </label>
                      <input type="text" className={styles.inputProfile} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className={`d-flex flex-column ${styles.detailProfileright}`}
                    >
                      <p className={styles.biodata}>Biodata</p>
                      <label
                        htmlFor="fullname"
                        className={`mt-3 ms-3 ${styles.labelForm}`}
                      >
                        Fullname
                      </label>
                      <input type="text" className={styles.inputProfile} />
                      <label
                        htmlFor="city"
                        className={`mt-3 ms-3 ${styles.labelForm}`}
                      >
                        City
                      </label>
                      <input type="text" className={styles.inputProfile} />
                      <label
                        htmlFor="address"
                        className={`mt-3 ms-3 ${styles.labelForm}`}
                      >
                        {" "}
                        Address{" "}
                      </label>
                      <input type="text" className={styles.inputProfile} />
                      <label
                        htmlFor="Postcode"
                        className={`mt-3 ms-3 ${styles.labelForm}`}
                      >
                        Post Code
                      </label>
                      <input type="text" className={styles.inputProfile} />
                    </div>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#2395FF",
                        color: "white",
                        borderRadius: "5px",
                        border: "0",
                        boxShadow: "0px 4px 8px #2395FF",
                      }}
                      className=" fw-bold my-5 px-5 py-2 d-flex justify-content-end"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </Fragment>
  );
}
