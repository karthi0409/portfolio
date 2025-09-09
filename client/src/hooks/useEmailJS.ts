import { useState } from "react";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/lib/emailjs';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function useEmailJS() {
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = async (data: EmailData) => {
    setIsLoading(true);
    
    try {
      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_name: "Karthigayan S",
        reply_to: data.email
      };

      // Send email using EmailJS with your provided credentials
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      if (response.status === 200) {
        console.log('Email sent successfully!');
      }
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendEmail, isLoading };
}
