"use client";
import React, { Fragment } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Logo from "@/components/Logo";
import ButtonAuth from "@/components/ButtonAuth";

import FormInput from "@/components/FormInput";
import Hero from "@/components/Hero";
export default function ForgotPass() {
  return (
    <Fragment>
      <Row>
        <Col md={6} className="d-none d-md-block">
          <Hero />
        </Col>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <Form>
            <Logo />
            <h2 className="my-3 fw-bold" style={{ fontFamily: "Poopins" }}>
              Verifikasi Otp
            </h2>
            <FormInput label="Email" type="email" placeholder="Enter Email" />
            <FormInput label="Otp" type="text" placeholder="Enter Otp" />

            <ButtonAuth>Verify</ButtonAuth>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
}
