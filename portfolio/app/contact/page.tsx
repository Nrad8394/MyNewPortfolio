"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Send } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import emailjs from "emailjs-com" // Import EmailJS

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  // EmailJS configuration (replace these with your credentials)
  const serviceID = "service_5adhn4q"  // Replace with your service ID
  const templateID = "template_qmcwsxb" // Replace with your template ID
  const userID = "bFJ0Gpn0_36zLrxRT" // Replace with your user ID

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Create template parameters object
    const templateParams = {
      from_name: values.name,
      to_name: "Bejamin",
      message: values.message,
      reply_to: values.email,
      
    }

    try {
      // Send email using EmailJS
      const response = await emailjs.send(serviceID, templateID, templateParams, userID)

      // Handle successful response
      console.log('SUCCESS!', response.status, response.text)
      alert("Your message has been sent successfully!")
    } catch (error) {
      // Handle error response
      console.error("FAILED...", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
      form.reset()
    }
  }

  return (
    <main className="container py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
          <p className="mt-2 text-lg text-muted-foreground">Have a project in mind? Let's talk about it.</p>
        </div>

        <div className="grid gap-8">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
              <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
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
                            placeholder="Tell me about your project..."
                            className="min-h-[150px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" asChild>
              <Link href="https://github.com/Nrad8394" target="_blank">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="https://www.linkedin.com/in/benjamin-karanja-93852523b" target="_blank">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link href="mailto:benjaminkaranja8393official@gmail.com">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
