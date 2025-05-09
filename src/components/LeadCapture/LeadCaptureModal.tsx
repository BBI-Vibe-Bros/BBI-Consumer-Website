import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2, XCircle } from 'lucide-react';

const leadCaptureSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  zipCode: z.string().min(5, 'Zip code must be at least 5 digits'),
});

type LeadCaptureFormValues = z.infer<typeof leadCaptureSchema>;

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

const LeadCaptureModal = ({ isOpen, onClose, source = 'Medicare Breakdown' }: LeadCaptureModalProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  
  const form = useForm<LeadCaptureFormValues>({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      zipCode: '',
    },
  });

  const onSubmit = async (data: LeadCaptureFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/rIYCLA8SyEzdVF8EtBfR/webhook-trigger/f35395f9-3e24-4018-a7ac-2482c1faa8d0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          source,
          timestamp: new Date().toISOString(),
          leadType: 'Medicare Guide Download'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      form.reset();
      // Close modal after 3 seconds on success
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    if (submitStatus === 'success') {
      return (
        <div className="text-center py-8">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p className="text-gray-600">
            Your guide will be sent to your email shortly.
          </p>
        </div>
      );
    }

    return (
      <>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-left mb-2">
            Get Your Free Medicare Guide
          </DialogTitle>
          <p className="text-left text-gray-600 mb-6">
            Enter your information below to receive your comprehensive Medicare guide.
          </p>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="w-5 h-5" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...form.register('firstName')}
                placeholder="John"
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...form.register('lastName')}
                placeholder="Doe"
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register('email')}
              placeholder="john@example.com"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              {...form.register('phone')}
              placeholder="(555) 555-5555"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              {...form.register('zipCode')}
              placeholder="12345"
            />
            {form.formState.errors.zipCode && (
              <p className="text-sm text-red-500">{form.formState.errors.zipCode.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Get Your Free Guide'}
          </Button>
        </form>
      </>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal; 