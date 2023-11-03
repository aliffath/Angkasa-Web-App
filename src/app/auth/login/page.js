"use client";
import React, { Fragment, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Logo from "@/components/Logo";
import ButtonAuth from "@/components/ButtonAuth";
import Link from "next/link";
import FormInput from "@/components/FormInput";
import FormPassword from "@/components/FormPassword";
import Hero from "@/components/Hero";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(0);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(70);
    const { email, password } = inputData;
    if (!email || !password) {
      toast.error("Please fill in all the fields");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        inputData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      localStorage.setItem("access_token", response.data.data.access_token);
      toast.success("Login success");
      setLoading(100);
      setTimeout(() => {
        router.push("/dashboard/searchresult");
      }, 2000);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      console.error(error);
      setLoading(0);
      toast.error(errorMessage);
    }
  };

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  return (
    <Fragment>
      <LoadingBar
        color="#28b485"
        progress={loading}
        onLoaderFinished={() => setLoading(0)}
      />
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
      <Row>
        <Col md={6} className="d-none d-md-block">
          <Hero />
        </Col>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <Form onSubmit={handleLogin}>
            <Logo />
            <h2 className="my-3 fw-bold" style={{ fontFamily: "Poopins" }}>
              Login
            </h2>
            <FormInput
              label="Email"
              type="email"
              placeholder="Enter Email"
              name="email"
              value={inputData.email}
              onChange={handleChange}
            />
            <FormPassword
              label="Password"
              type="password"
              placeholder="Enter Password"
              value={inputData.password}
              onChange={handleChange}
              name="password"
            />
            <ButtonAuth>Sign In</ButtonAuth>
            <div className="my-3" style={{ fontFamily: "Lato" }}>
              <p className="mb-0 text-center">Did you forgot your password?</p>
              <Link
                href="/auth/forgotpass"
                style={{ color: "#2395FF" }}
                className="text-decoration-none d-flex justify-content-center"
              >
                Tap here for reset
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
}
