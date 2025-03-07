import React, { useState } from "react";
import axios from "axios"; // Make sure to install axios: npm install axios
import { Twitter, Linkedin, Github, Mail, MapPin } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const socialLinks = [
    {
      name: "Twitter",
      url: "https://twitter.com/tednotswarley",
      icon: Twitter,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/heysajit",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      url: "https://github.com/maverickOG",
      icon: Github,
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmissionStatus("sending");
  setErrorMessage("");

  try {
    // Adjust the URL to match your backend endpoint
    const response = await axios.post(
      "https://mindful-about-money.onrender.com/contact/send",
      formData
    );

    console.log(response.data);

    setSubmissionStatus("success");
    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  } catch (error) {
    setSubmissionStatus("error");

    // More explicit error handling
    if (axios.isAxiosError(error)) {
      // Check if error.response exists and has a data property
      const errorDetails = error.response?.data;

      // Convert error to a string, handling different possible error structures
      const errorMsg =
        typeof errorDetails === "object"
          ? JSON.stringify(errorDetails)
          : errorDetails?.error || error.message || "Failed to send message";

      setErrorMessage(String(errorMsg));
    } else {
      // Ensure error is converted to a string
      setErrorMessage(String(error));
    }

    console.error("Submission error:", error);
  }
};

  return (
    <div className='bg-gradient-to-br from-slate-50 via-white to-slate-100 min-h-screen overflow-x-hidden'>
      <div className='max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 mb-6'>
            Get In Touch
          </h1>
          <p className='text-xl text-slate-600 max-w-2xl mx-auto'>
            Have a question or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-16'>
          {/* Contact Details */}
          <div className='bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-emerald-50'>
            <div className='mb-8 text-center'>
              <img
                src='/assets/about-developer/developer2.webp'
                alt='Sajit Profile'
                className='w-64 h-64 object-cover rounded-full mx-auto mb-6 border-4 border-emerald-100 shadow-lg'
              />
              <h2 className='text-3xl font-bold text-slate-800'>Sajit</h2>
              <p className='text-slate-600'>Founder, Mindful About Money</p>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <Mail className='text-emerald-600 h-6 w-6' />
                <a
                  href='mailto:heysajit@outlook.com'
                  className='text-slate-700 hover:text-emerald-600 transition-colors'
                >
                  heysajit@outlook.com
                </a>
              </div>

              <div className='flex items-center space-x-4'>
                <MapPin className='text-emerald-600 h-6 w-6' />
                <span className='text-slate-700'>Remote / Bengaluru</span>
              </div>

              <div className='flex space-x-4 pt-4 justify-center'>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-slate-600 hover:text-emerald-600 transition-all duration-300 transform hover:scale-110'
                  >
                    <social.icon className='h-8 w-8' />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-emerald-50'>
            <h3 className='text-2xl font-bold text-slate-800 mb-6 text-center'>
              Send Me a Message
            </h3>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label htmlFor='name' className='block text-slate-700 mb-2'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded-lg border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                  placeholder='Your Name'
                  required
                />
              </div>
              <div>
                <label htmlFor='email' className='block text-slate-700 mb-2'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded-lg border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                  placeholder='you@example.com'
                  required
                />
              </div>
              <div>
                <label htmlFor='message' className='block text-slate-700 mb-2'>
                  Message
                </label>
                <textarea
                  id='message'
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded-lg border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500'
                  placeholder='Your message here...'
                  required
                ></textarea>
              </div>

              {/* Submission Status Indicators */}
              {submissionStatus === "error" && (
                <div
                  className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'
                  role='alert'
                >
                  <strong className='font-bold'>Error: </strong>
                  <span className='block sm:inline'>{errorMessage}</span>
                </div>
              )}

              <button
                type='submit'
                disabled={submissionStatus === "sending"}
                className='w-full bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50'
              >
                {submissionStatus === "sending" ? "Sending..." : "Send Message"}
              </button>

              {submissionStatus === "success" && (
                <div
                  className='bg-emerald-100 border border-emerald-400 text-emerald-700 px-4 py-3 rounded relative'
                  role='alert'
                >
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
