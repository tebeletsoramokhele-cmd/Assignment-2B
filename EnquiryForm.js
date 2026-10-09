
import React, { useState } from "react";
import attractions from "../data/attractions";

function EnquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    visitors: "1",
    visitDate: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });

    setSuccess("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    } else if (!/^[A-Za-z\s'-]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = "Use letters only in your name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!/^[0-9+\s()-]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.destination) {
      newErrors.destination = "Please select a destination.";
    }

    if (
      !Number.isInteger(Number(formData.visitors)) ||
      Number(formData.visitors) < 1 ||
      Number(formData.visitors) > 100
    ) {
      newErrors.visitors = "Enter between 1 and 100 visitors.";
    }

    if (!formData.visitDate) {
      newErrors.visitDate = "Please select your preferred visit date.";
    } else {
      const selectedDate = new Date(
        formData.visitDate + "T00:00:00"
      );

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.visitDate = "The visit date cannot be in the past.";
      }
    }

    if (formData.message.trim().length < 10) {
      newErrors.message =
        "Please enter a message of at least 10 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSuccess("");
      return;
    }

    setSuccess(
      "Thank you, " +
        formData.fullName +
        "! Your enquiry has been submitted successfully."
    );

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      destination: "",
      visitors: "1",
      visitDate: "",
      message: ""
    });

    setErrors({});
  }

  return (
    <section className="enquiry-section" id="enquiry">
      <div className="enquiry-heading">
        <p className="subtitle">PLAN YOUR ADVENTURE</p>
        <h2>Visitor Enquiry Form</h2>
        <p>
          Interested in exploring Lesotho? Send us your enquiry
          and tell us about your planned visit.
        </p>
      </div>

      <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <span className="error">{errors.fullName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="teebyramokhele@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="error">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+266 57944431"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <span className="error">{errors.phone}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="destination">Selected Destination</label>
          <select
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
          >
            <option value="">Choose a destination</option>

            {attractions.map((attraction) => (
              <option key={attraction.id} value={attraction.name}>
                {attraction.name}
              </option>
            ))}
          </select>
          {errors.destination && (
            <span className="error">{errors.destination}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="visitors">Number of Visitors</label>
          <input
            id="visitors"
            name="visitors"
            type="number"
            min="1"
            max="100"
            value={formData.visitors}
            onChange={handleChange}
          />
          {errors.visitors && (
            <span className="error">{errors.visitors}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="visitDate">Preferred Visit Date</label>
          <input
            id="visitDate"
            name="visitDate"
            type="date"
            min={new Date().toLocaleDateString("en-CA")}
            value={formData.visitDate}
            onChange={handleChange}
          />
          {errors.visitDate && (
            <span className="error">{errors.visitDate}</span>
          )}
        </div>

        <div className="form-group full-width">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Tell us about your travel plans..."
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && (
            <span className="error">{errors.message}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          Submit Enquiry
        </button>

        {success && (
          <p className="success-message" role="status">
            {success}
          </p>
        )}
      </form>
    </section>
  );
}

export default EnquiryForm;
