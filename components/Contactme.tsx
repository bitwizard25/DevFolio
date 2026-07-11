'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle, Loader2 } from 'lucide-react';

const ContactMe = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'rbhoyar729@gmail.com',
      href: 'mailto:rbhoyar729@gmail.com',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '(+91) 9309943858',
      href: 'tel:+919309943858',
      color: 'from-emerald-500 to-green-500',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Chandrapur, Maharashtra, India',
      href: '#',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log(formState);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const isFieldActive = (field: string) =>
    focusedField === field || formState[field as keyof typeof formState];

  return (
    <section className="min-h-screen py-20">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="section-title">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4 animate-slide-up">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className="group flex items-center gap-4 p-4 card hover:scale-[1.02] transition-all duration-300"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${info.color} bg-opacity-20`}>
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                    {info.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{info.value}</p>
                </div>
              </a>
            ))}

            {/* Additional Info Card */}
            <div className="card p-6 mt-6">
              <h3 className="font-semibold text-slate-200 mb-3">Let&apos;s Connect</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                I&apos;m always excited to discuss new projects, creative ideas, or opportunities
                to be part of your vision. Whether you have a question or just want to say hi,
                my inbox is always open!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 animate-slide-up animation-delay-200">
            <div className="card p-6 md:p-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
                  <div className="p-4 rounded-full bg-emerald-500/20 mb-4">
                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">Message Sent!</h3>
                  <p className="text-slate-400 text-center">
                    Thank you for reaching out. I&apos;ll get back to you soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="input-field peer pt-6 pb-2"
                      required
                    />
                    <label
                      htmlFor="name"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${isFieldActive('name')
                          ? 'top-2 text-xs text-cyan-400'
                          : 'top-1/2 -translate-y-1/2 text-slate-500'
                        }`}
                    >
                      Your Name
                    </label>
                  </div>

                  {/* Email Field */}
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="input-field peer pt-6 pb-2"
                      required
                    />
                    <label
                      htmlFor="email"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${isFieldActive('email')
                          ? 'top-2 text-xs text-cyan-400'
                          : 'top-1/2 -translate-y-1/2 text-slate-500'
                        }`}
                    >
                      Your Email
                    </label>
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      className="input-field peer pt-6 pb-2 resize-none"
                      required
                    />
                    <label
                      htmlFor="message"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${isFieldActive('message')
                          ? 'top-2 text-xs text-cyan-400'
                          : 'top-4 text-slate-500'
                        }`}
                    >
                      Your Message
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-mascot-react="shy"
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
