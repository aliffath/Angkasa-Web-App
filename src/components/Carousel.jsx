"use client";
import React, { Component } from "react";
import Slider from "react-slick";
import Image from "next/image";
import gambar from "../../public/img/index";

export default class Carousel extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div className="bg-primary container">
        <Slider {...settings}>
          <div className="d-flex justify-content-center">
            <div>
              <Image
                src={gambar.k11}
                alt=""
                className="img-fluid "
                style={{
                  borderRadius: "100%",
                  border: "solid #fff",
                  padding: "3%",
                }}
              />
              <h4 className="mt-3 text-center">PARIS</h4>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <Image
                src={gambar.k10}
                alt=""
                className="img-fluid "
                style={{
                  borderRadius: "100%",
                  border: "solid #fff",
                  padding: "3%",
                }}
              />
              <h4 className="mt-3 text-center">PARIS</h4>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <Image
                src={gambar.k1}
                alt=""
                className="img-fluid "
                style={{
                  borderRadius: "100%",
                  border: "solid #fff",
                  padding: "3%",
                }}
              />
              <h4 className="mt-3 text-center">PARIS</h4>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <Image
                src={gambar.k2}
                alt=""
                className="img-fluid "
                style={{
                  borderRadius: "100%",
                  border: "solid #fff",
                  padding: "3%",
                }}
              />
              <h4 className="mt-3 text-center">PARIS</h4>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <Image
                src={gambar.k3}
                alt=""
                className="img-fluid "
                style={{
                  borderRadius: "100%",
                  border: "solid #fff",
                  padding: "3%",
                }}
              />
              <h4 className="mt-3 text-center">PARIS</h4>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <Image
                src={gambar.k11}
                alt=""
                className="img-fluid "
                style={{
                  borderRadius: "100%",
                  border: "solid #fff",
                  padding: "3%",
                }}
              />
              <h4 className="mt-3 text-center">PARIS</h4>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <Image
                src={gambar.k10}
                alt=""
                className="img-fluid "
                style={{
                  borderRadius: "100%",
                  border: "solid #fff",
                  padding: "3%",
                }}
              />
              <h4 className="mt-3 text-center">PARIS</h4>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <Image
                src={gambar.k1}
                alt=""
                className="img-fluid "
                style={{
                  borderRadius: "100%",
                  border: "solid #fff",
                  padding: "3%",
                }}
              />
              <h4 className="mt-3 text-center">PARIS</h4>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <Image
                src={gambar.k2}
                alt=""
                className="img-fluid "
                style={{
                  borderRadius: "100%",
                  border: "solid #fff",
                  padding: "3%",
                }}
              />
              <h4 className="mt-3 text-center">PARIS</h4>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <Image
                src={gambar.k3}
                alt=""
                className="img-fluid "
                style={{
                  borderRadius: "100%",
                  border: "solid #fff",
                  padding: "3%",
                }}
              />
              <h4 className="mt-3 text-center">PARIS</h4>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <Image
                src={gambar.k11}
                alt=""
                className="img-fluid "
                style={{
                  borderRadius: "100%",
                  border: "solid #fff",
                  padding: "3%",
                }}
              />
              <h4 className="mt-3 text-center">PARIS</h4>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <Image
                src={gambar.k10}
                alt=""
                className="img-fluid "
                style={{
                  borderRadius: "100%",
                  border: "solid #fff",
                  padding: "3%",
                }}
              />
              <h4 className="mt-3 text-center">PARIS</h4>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <Image
                src={gambar.k1}
                alt=""
                className="img-fluid "
                style={{
                  borderRadius: "100%",
                  border: "solid #fff",
                  padding: "3%",
                }}
              />
              <h4 className="mt-3 text-center">PARIS</h4>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <Image
                src={gambar.k2}
                alt=""
                className="img-fluid "
                style={{
                  borderRadius: "100%",
                  border: "solid #fff",
                  padding: "3%",
                }}
              />
              <h4 className="mt-3 text-center">PARIS</h4>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <div>
              <Image
                src={gambar.k3}
                alt=""
                className="img-fluid "
                style={{
                  borderRadius: "100%",
                  border: "solid #fff",
                  padding: "3%",
                }}
              />
              <h4 className="mt-3 text-center">PARIS</h4>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
