"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiX } from 'react-icons/fi';
import { trackPageView, trackFormInteraction, trackButtonClick } from '@/utils/analytics';
import Scramble from '@/components/Scramble';

const ENQUIRY_TYPES = [
  { id: 'custom', label: 'Custom software', placeholder: 'What would you like built, who is it for, and is there a deadline or budget in mind?' },
  { id: 'tenanttool', label: 'TenantTool', placeholder: 'How can we help with TenantTool?' },
  { id: 'general', label: 'General', placeholder: '' },
] as const;

type EnquiryType = (typeof ENQUIRY_TYPES)[number]['id'];

export default function ContactForm() {
  const [enquiry, setEnquiry] = useState<EnquiryType>('general');
  const enquiryType = ENQUIRY_TYPES.find((t) => t.id === enquiry) ?? ENQUIRY_TYPES[2];
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

    // Links such as /contact?enquiry=custom preselect the enquiry type
    const requested = new URLSearchParams(window.location.search).get('enquiry');
    if (ENQUIRY_TYPES.some((t) => t.id === requested)) setEnquiry(requested as EnquiryType);
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
      // Using original Formspree endpoint
      const response = await fetch('https://formspree.io/f/xrbpklvn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          enquiry: enquiryType.label,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          // These are Formspree-specific fields
          _replyto: formData.email,
          _subject: `[${enquiryType.label}] ${formData.subject}`
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
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
  
  const inputClass =
    "w-full border-0 border-b border-foreground/20 bg-transparent px-0 py-3 text-foreground placeholder:text-foreground/25 transition-colors focus:border-foreground/70 focus:outline-none focus:ring-0";
  const labelClass = "block font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50";

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground flex flex-col">
      <header className="flex items-center justify-between px-4 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 sm:px-8 sm:text-[11px]">
        <a href="/" className="hover:text-foreground transition-colors">&larr; Joefergraphy Ltd</a>
      </header>

      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <motion.div 
          className="w-full max-w-lg border border-foreground/15 bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-between border-b border-foreground/15 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50 sm:px-8">
            <span>Contact</span>
            <span>Reply within one working day</span>
          </div>

          <div className="px-5 py-8 sm:px-8 sm:py-10">
          <motion.h1 
            className="font-display text-3xl md:text-4xl font-medium mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Scramble text={enquiry === 'custom' ? 'Request custom software' : 'Get in touch'} delay={200} />
          </motion.h1>
          
          <motion.p 
            className="text-foreground/60 mb-10 text-sm leading-relaxed"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {enquiry === 'custom'
              ? 'Describe the problem you want solved. We will reply with questions or a proposed approach and a quote.'
              : 'Tell us what you need and we will get back to you.'}
          </motion.p>
          
          {submitStatus === 'success' ? (
            <motion.div 
              className="border border-emerald-500/30 p-6 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 50 }}
            >
              <FiCheck className="text-emerald-400 mx-auto mb-4 text-3xl" />
              <h3 className="font-mono text-sm uppercase tracking-[0.3em] mb-2">Message sent</h3>
              <p className="text-foreground/60 text-sm mb-6">We&apos;ll be in touch shortly.</p>
              <button 
                onClick={() => {
                  trackButtonClick('Send another message', 'Contact form reset');
                  setSubmitStatus(null);
                }}
                className="border border-foreground/30 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:border-foreground hover:text-foreground"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form 
              onSubmit={handleSubmit}
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.fieldset variants={itemVariants}>
                <legend className={labelClass}>Enquiry</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ENQUIRY_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      aria-pressed={enquiry === type.id}
                      onClick={() => {
                        setEnquiry(type.id);
                        trackFormInteraction('Contact Form', `chose ${type.label} enquiry`);
                      }}
                      className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                        enquiry === type.id
                          ? 'border-foreground bg-foreground text-black'
                          : 'border-foreground/25 text-foreground/70 hover:border-foreground/60'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </motion.fieldset>

              <motion.div variants={itemVariants}>
                <label htmlFor="name" className={labelClass}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className={labelClass}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className={labelClass}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={enquiry === 'custom' ? 7 : 5}
                  placeholder={enquiryType.placeholder}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`${inputClass} resize-none`}
                />
              </motion.div>
              
              {submitStatus === 'error' && (
                <motion.div 
                  className="border border-signal/40 p-4 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-start">
                    <FiX className="text-signal mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal">Message not sent</p>
                      <p className="text-foreground/70 mt-1">{errorMessage || 'Please try again later.'}</p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-3 bg-foreground px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-white/80 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>Send message <FiArrowRight className="transition-transform group-hover:translate-x-0.5" /></>
                  )}
                </button>
              </motion.div>
            </motion.form>
          )}
          
          <motion.div 
            className="mt-10 pt-6 border-t border-foreground/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/40">
              Or email{' '}
              <a 
                href="mailto:contact@joefergraphy.co.uk" 
                className="text-foreground/80 normal-case tracking-normal hover:text-foreground transition-colors"
                onClick={() => trackButtonClick('Email contact link', 'Direct email: contact@joefergraphy.co.uk')}
              >contact@joefergraphy.co.uk</a>
            </p>
          </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
