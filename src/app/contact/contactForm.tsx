'use client';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import RoundedButton from '@/components/animations/roundedButton';

type ContactFormData = {
  name: string;
  email: string;
  company: string;
  subject: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  website: string; // honeypot, kept empty by real users
};

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const form = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      subject: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: '',
      website: ''
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitState('success');
      form.reset();
    } catch {
      setSubmitState('error');
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="flex flex-col gap-12 lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="flex flex-col gap-4 sm:gap-6">
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
            Let&apos;s talk!
          </h2>
          <p className="max-w-lg text-lg text-black/70 sm:text-xl">
            I&apos;m always looking for new and innovative ways to use my
            skills.
          </p>
        </div>
        <div className="col-span-2">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1">
                    <FormLabel className="text-xl">Full name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Full name"
                        className="w-full rounded-xl border-gray-300 bg-gray-100 text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1">
                    <FormLabel className="text-xl">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full rounded-xl border-gray-300 bg-gray-100 text-black"
                        type="email"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1">
                    <FormLabel className="text-xl">Company (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Company"
                        className="w-full rounded-xl border-gray-300 bg-gray-100 text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1">
                    <FormLabel className="text-xl">Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Subject"
                        className="w-full rounded-xl border-gray-300 bg-gray-100 text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1">
                    <FormLabel className="text-xl">Project type</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Shopify, React, Node.js"
                        className="w-full rounded-xl border-gray-300 bg-gray-100 text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1">
                      <FormLabel className="text-xl">
                        Budget (optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Budget"
                          className="w-full rounded-xl border-gray-300 bg-gray-100 text-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1">
                      <FormLabel className="text-xl">
                        Timeline (optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Timeline"
                          className="w-full rounded-xl border-gray-300 bg-gray-100 text-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-1">
                    <FormLabel className="text-xl">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        className="w-full rounded-xl border-gray-300 bg-gray-100 text-black"
                        placeholder="Message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Honeypot field, hidden from real users via CSS */}
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input tabIndex={-1} autoComplete="off" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-col items-end gap-2">
                {submitState === 'success' && (
                  <p className="text-sm text-green-600">
                    Thanks! Your message has been sent.
                  </p>
                )}
                {submitState === 'error' && (
                  <p className="text-sm text-red-600">
                    Something went wrong. Please try again.
                  </p>
                )}
                <RoundedButton>
                  {submitState === 'submitting' ? 'Sending...' : 'Submit'}
                </RoundedButton>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
