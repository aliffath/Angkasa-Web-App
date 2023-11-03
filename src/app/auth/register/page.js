"use client";
import React, { Fragment, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import ButtonAuth from "@/components/ButtonAuth";
import Link from "next/link";
import FormInput from "@/components/FormInput";
import FormPassword from "@/components/FormPassword";
import Hero from "@/components/Hero";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
export default function Register() {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(0);
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(70);
    const { name, email, password } = inputData;
    if (!name || !email || !password) {
      toast.error("Please fill in all the fields");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
        inputData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      toast.success("Register success");
      setLoading(100);
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      console.error(error);
      setLoading(0);
      toast.error(errorMessage);
    }
  };

  const onChange = (e) => {
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
          <Form onSubmit={handleRegister}>
            <Logo />
            <h2 className="my-3 fw-bold" style={{ fontFamily: "Poopins" }}>
              Register
            </h2>
            <FormInput
              label="Full Name"
              type="text"
              placeholder="Enter Name"
              name="name"
              value={inputData.name}
              onChange={onChange}
            />
            <FormInput
              label="Email"
              type="email"
              placeholder="Enter Email"
              name="email"
              value={inputData.email}
              onChange={onChange}
            />
            <FormPassword
              label="Password"
              type="password"
              placeholder="Enter Password"
              name="password"
              value={inputData.password}
              onChange={onChange}
            />
            <ButtonAuth>Sign Up</ButtonAuth>
            <div
              className="my-3 d-flex gap-2"
              style={{ accentColor: " #2395ff" }}
            >
              <input type="checkbox" />
              <label>I agree to terms and condition</label>
            </div>

            <div style={{ borderBottom: "1px solid black" }}></div>

            <p className="my-3 text-center">Already have an account?</p>

            <button
              type="button"
              style={{
                backgroundColor: "transparent",
                color: "#2395FF",
                borderRadius: "5px",
                border: "1px solid #2395FF",
              }}
              className="p-2 my-2 fw-bold w-100"
            >
              <Link href={"/auth/login"} className="text-decoration-none">
                Sign In
              </Link>
            </button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
}
