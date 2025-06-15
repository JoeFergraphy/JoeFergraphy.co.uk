"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiX } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { trackPageView, trackFormInteraction, trackButtonClick } from '@/utils/analytics';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Track contact page view
    trackPageView("Contact Form");

    // Initialize EmailJS with your public key
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Track first interaction with each field
    if (!formData[name as keyof typeof formData] && value) {
      trackFormInteraction('Contact Form', `started filling ${name} field`);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission attempt
    trackFormInteraction('Contact Form', 'submitted');
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      );

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 50
      }
    }
  };
  
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <motion.div 
          className="w-full max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1 
            className="text-3xl md:text-4xl font-light mb-6 md:mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Get in touch
          </motion.h1>
          
          <motion.p 
            className="text-white/80 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Tell us about your project, and we&apos;ll get back to you as soon as possible.
          </motion.p>
          
          {submitStatus === 'success' ? (
            <motion.div 
              className="bg-green-900/20 border border-green-700/30 rounded-lg p-6 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 50 }}
            >
              <FiCheck className="text-green-400 mx-auto mb-4 text-3xl" />
              <h3 className="text-xl font-light mb-2">Message sent!</h3>
              <p className="text-white/80 mb-6">Thank you for contacting us. We&apos;ll be in touch shortly.</p>
              <button 
                onClick={() => {
                  trackButtonClick('Send another message', 'Contact form reset');
                  setSubmitStatus(null);
                }}
                className="px-5 py-2 border border-white/30 rounded-full text-sm hover:bg-white/10 transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleSubmit}
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-light mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-white/30 transition-colors focus:outline-none"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-light mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-white/30 transition-colors focus:outline-none"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block text-sm font-light mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-white/30 transition-colors focus:outline-none"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-light mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-white/30 transition-colors focus:outline-none resize-none"
                />
              </motion.div>
              
              {submitStatus === 'error' && (
                <motion.div 
                  className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start">
                    <FiX className="text-red-400 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-red-300">Failed to send message</p>
                      <p className="text-white/80 mt-1">{errorMessage || 'Please try again later.'}</p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 border border-white rounded-full text-sm font-light hover:bg-white hover:text-black transition-colors inline-flex items-center"
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <FiArrowRight className="ml-2" />}
                </motion.button>
              </motion.div>
            </motion.form>
          )}
          
          <motion.div 
            className="mt-8 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            <p className="text-white/60 text-sm">
              You can also reach us directly at <a 
                href="mailto:contact@joefergraphy.co.uk" 
                className="text-white hover:underline"
                onClick={() => trackButtonClick('Email contact link', 'Direct email: contact@joefergraphy.co.uk')}
              >contact@joefergraphy.co.uk</a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 