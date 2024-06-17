"use strict";

/**
 * add event on multiple elements
 */

const addEventOnElement = function (elements, evetType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(evetType, callback);
  }
};

/**
 * Navbar toggle for mobile
 */

const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggleBtn.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElement([navToggleBtn, overlay], "click", toggleNavbar);

/**
 * Send Email
 */

document
  .getElementById("emailForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, message }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("E-Mail gesendet: " + data.message);
      })
      .catch((error) => {
        console.error("Fehler:", error);
      });
  });

/**
 * Parallax effect
 */

const parallaxElements = document.querySelectorAll("[data-parallax]");

window.addEventListener("mousemove", (event) => {
  for (let i = 0, len = parallaxElements.length; i < len; i++) {
    const movementX =
      (event.clientX / window.innerWidth) *
      Number(parallaxElements[i].dataset.parallaxSpeed);
    const movementY =
      (event.clientY / window.innerHeight) *
      Number(parallaxElements[i].dataset.parallaxSpeed);

    parallaxElements[i].animate(
      {
        transform: `translate(${movementX}px, ${movementY}px)`,
      },
      { duration: 500, fill: "forwards" }
    );
  }
});
