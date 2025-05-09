
import React from 'react';
import Layout from '@/components/Layout/Layout';
import Breadcrumb from '@/components/Navigation/Breadcrumb';
import SEO from '@/utils/seo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactPage = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    // In a real implementation, this would send the form data to a server
    console.log('Form submitted:', data);
    
    // Show success toast
    toast.success('Your message has been sent! We will contact you shortly.');
    
    // Reset the form
    form.reset();
  };

  // Build breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Contact', path: '/contact', isLast: true }
  ];

  return (
    <Layout>
      <SEO 
        title="Contact Us"
        description="Get in touch with Bobby Brock Insurance for expert Medicare guidance and plan selection assistance."
        schemaType="webpage"
      />
      
      <div>
        <div className="container mx-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      
      <div className="mx-auto px-6 py-12">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-bb-dark mb-6">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <p className="mb-8 text-gray-700">
                Have questions about Medicare plans? Our experts are here to help you find the right coverage for your needs.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Office Address</h3>
                  <p className="text-gray-700">
                    499 Air Park Rd<br />
                    Tupelo, MS 38801
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">Phone:</span>{' '}
                    <a href="tel:6626421512" className="text-bb-blue hover:underline">
                      (662) 642-1512
                    </a>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span>{' '}
                    <a href="mailto:info@bobbybrockinsurance.com" className="text-bb-blue hover:underline">
                      info@bobbybrockinsurance.com
                    </a>
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
                  <p className="text-gray-700 mb-1">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p className="text-gray-700">Saturday - Sunday: Closed</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 border-b border-gray-200 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
              
              <FormProvider {...form}>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we assist you with Medicare?" 
                              className="min-h-32"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button>
                      Submit Message
                    </Button>
                  </form>
                </Form>
              </FormProvider>
            </div>
          </div>
          
          <div className="rounded-lg overflow-hidden h-96 shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.8438189533136!2d-88.7053873!3d34.4479051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8877b7ab7a745129%3A0x17bec4c9a169941!2s499%20Air%20Park%20Rd%2C%20Tupelo%2C%20MS%2038801!5e0!3m2!1sen!2sus!4v1685544321912!5m2!1sen!2sus"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bobby Brock Insurance Office Location"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
