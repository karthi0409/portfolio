import emailjs from '@emailjs/browser';

// EmailJS Configuration
export const EMAILJS_CONFIG = {
  publicKey: 'zw-J0wCbcZTAZG2Sg',
  serviceId: 'service_kk0hq6x',
  templateId: 'template_z445fjf'  // Updated EmailJS template ID
};

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};