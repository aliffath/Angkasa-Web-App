import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Form } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/images/logo.svg";
import { FaRegEnvelope } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuUserCircle2 } from "react-icons/lu";
import ButtonAuth from "./ButtonAuth";
function NavigationBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-light">
      <Container>
        <Navbar.Brand href="/">
          <div className="d-flex align-items-center">
            <Image
              src={logo}
              alt="logo"
              className="object-fit-cover"
              width={70}
              height={50}
            />
            <p className="fw-bold m-0">Angkasa</p>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="d-flex justify-content-around align-items-center w-100">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
            <Nav.Link href="/dashboard/searchresult">Find Tickets</Nav.Link>
            <Nav.Link href="/dashboard/mybooking">My Booking</Nav.Link>
            {typeof window !== "undefined" &&
            localStorage.getItem("access_token") ? (
              <div className="d-flex gap-3">
                <FaRegEnvelope size={25} />
                <IoNotificationsOutline size={25} />
                <Nav.Link href="/auth/profile">
                  {" "}
                  <LuUserCircle2 size={25} />
                </Nav.Link>
              </div>
            ) : (
              <Link href={"/auth/register"}>
                <ButtonAuth>Sign Up</ButtonAuth>
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
