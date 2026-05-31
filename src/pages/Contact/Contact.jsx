import { useState } from "react";
import emailjs from '@emailjs/browser';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta, contactConfig } from "../../data/content.jsx";
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from "react-icons/hi";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    message: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ message: "Sending...", type: "info" });

    emailjs.send(
      contactConfig.YOUR_SERVICE_ID,
      contactConfig.YOUR_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: contactConfig.YOUR_EMAIL,
      },
      contactConfig.YOUR_USER_ID
    )
    .then((result) => {
      console.log("Email sent:", result.text);
      setStatus({ message: "✅ Message sent successfully!", type: "success" });
      setFormData({ name: "", email: "", message: "" });
      setLoading(false);
      setTimeout(() => setStatus({ message: "", type: "" }), 5000);
    })
    .catch((error) => {
      console.error("Email error:", error);
      setStatus({ message: "❌ Failed to send message. Please try again later.", type: "error" });
      setLoading(false);
      setTimeout(() => setStatus({ message: "", type: "" }), 5000);
    });
  };

  return (
    <HelmetProvider>
      <div className="contact-page">
        <Helmet>
          <title>Contact | {meta.title}</title>
          <meta name="description" content="Get in touch with me" />
        </Helmet>

        <div className="contact-header">
          <h1>Contact Me</h1>
          <hr className="t_border" />
        </div>

        {status.message && (
          <div className={`contact-alert alert-${status.type}`}>
            <p>{status.message}</p>
            <button
              className="alert-close"
              onClick={() => setStatus({ message: "", type: "" })}
            >
              ×
            </button>
          </div>
        )}

        <div className="contact-content">

          {/* Left Side - Contact Info */}
          <div className="contact-info">
            <h3>Get in touch</h3>
            <div className="contact-details">

              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <HiMail className="contact-icon" />
                </div>
                <div className="contact-item-content">
                  <strong>Email</strong>
                  <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                    {contactConfig.YOUR_EMAIL}
                  </a>
                </div>
              </div>

              {contactConfig.YOUR_FONE && (
                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <HiPhone className="contact-icon" />
                  </div>
                  <div className="contact-item-content">
                    <strong>Phone</strong>
                    <span>{contactConfig.YOUR_FONE}</span>
                  </div>
                </div>
              )}

              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <HiLocationMarker className="contact-icon" />
                </div>
                <div className="contact-item-content">
                  <strong>Location</strong>
                  <span>Kano State</span>
                </div>
              </div>

              <div className="contact-description">
                <p>{contactConfig.description}</p>
              </div>

            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact__form">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="hero__btn hero__btn--primary"
                  disabled={loading || !formData.name || !formData.email || !formData.message}
                >
                  <HiPaperAirplane />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      <div className={loading ? "loading-bar" : "d-none"}></div>
    </HelmetProvider>
  );
};

export default Contact;