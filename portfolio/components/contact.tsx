"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
// import { sendEmail } from "@/app/lib/sendEmail";

export default function Contact() {
  // State to manage form inputs and form submission state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [status, setStatus] = useState("");  // To display success or error messages

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure all fields are filled out
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill in all fields.");
      return;
    }

    // Send the form data to the backend API
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok) {
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });  // Reset form after successful submission
    } else {
      setStatus(`Error: ${result.message}`);
    }
  };

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary mb-8">Contact Me</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
            />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
            />
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your Message"
            />
            <Button type="submit" className="w-full">Send Message</Button>
            {/* Show the status message */}
            {status && <p className="text-center text-lg">{status}</p>}
          </form>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Get in Touch</h3>
            <p className="text-muted-foreground">
              Feel free to reach out for collaborations or just a friendly hello
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>benjaminkaranja8393official@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>+254716549814</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" asChild>
                <a href="https://www.linkedin.com/in/benjamin-karanja-93852523b" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/Nrad8394" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
