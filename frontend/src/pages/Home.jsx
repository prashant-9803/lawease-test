
import { useEffect, useState } from "react"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, MessagesSquare , FileText, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router"

export default function HomePage() {

  const navigate = useNavigate()
  // For testimonial carousel
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content:
        "LawEase helped me find the perfect attorney for my business incorporation. The process was seamless and transparent.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Michael Chen",
      role: "Real Estate Developer",
      content:
        "I've used multiple legal services before, but none compare to the efficiency and quality of LawEase's platform.",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Priya Patel",
      role: "Startup Founder",
      content:
        "The transparent pricing model saved us thousands in legal fees. I highly recommend LawEase to any growing business.",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Intersection observer hooks for animations
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [howItWorksRef, howItWorksInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Parallax effect for hero section
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section with Cinematic Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic background with animated elements */}
        <div className="absolute inset-0 bg-black">
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                transform: `scale(${1 + scrollY * 0.0005}) rotate(${scrollY * 0.01}deg)`,
              }}
            ></div>
          </div>

          {/* Radial gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.95) 100%)",
            }}
          ></div>

          {/* Animated light beams */}
          <motion.div
            className="absolute top-0 left-1/4 w-1/2 h-screen bg-white/5"
            initial={{ opacity: 0, skewX: -20 }}
            animate={{
              opacity: [0, 0.1, 0.05, 0.1, 0],
              skewX: -20,
              x: [-100, 100],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            style={{
              filter: "blur(60px)",
            }}
          />

          <motion.div
            className="absolute top-0 right-1/3 w-1/3 h-screen bg-white/5"
            initial={{ opacity: 0, skewX: 15 }}
            animate={{
              opacity: [0, 0.15, 0.05, 0.15, 0],
              skewX: 15,
              x: [100, -100],
            }}
            transition={{
              duration: 10,
              delay: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            style={{
              filter: "blur(60px)",
            }}
          />
        </div>

        {/* Floating scales of justice symbol */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            style={{
              width: "40%",
              height: "40%",
              maxWidth: "500px",
              maxHeight: "500px",
             
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transform: `translateY(${scrollY * 0.05}px)`,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="mb-6 inline-block">
              <motion.div
                className="text-xs uppercase tracking-widest text-white/70 mb-2 font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                The Future of Legal Services
              </motion.div>
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white mb-2 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="inline-block">Bridging</span> <span className="inline-block">the Gap in</span>{" "}
                <span className="inline-block relative">
                  Legal Services
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 1.2 }}
                  />
                </span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-white/80 mt-6 mb-8 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Connect with verified legal experts for transparent, efficient legal solutions tailored to your specific
                needs.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Button
              onClick={() => navigate("/login")}
                size="lg"
                className="bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 min-w-40"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
 
            </motion.div>
          </motion.div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 4 + 1,
                height: Math.random() * 4 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Bottom fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
      </section>

      {/* Key Features Section */}
      <section ref={featuresRef} className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Why Choose LawEase
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-12 w-12 mb-4" />,
                title: "Verified Legal Experts",
                description:
                  "All attorneys on our platform are thoroughly vetted and credentialed to ensure the highest quality of service.",
              },
              {
                icon: <MessagesSquare  className="h-12 w-12 mb-4" />,
                title: "Secure Communication",
                description:
                  "Securely communicate with your attorney, ensuring your privacy and peace of mind.",
              },
              {
                icon: <FileText className="h-12 w-12 mb-4" />,
                title: "Seamless Case Management",
                description:
                  "Track your cases, communicate with your attorney, and access documents all in one secure platform.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>

            {[
              {
                number: "01",
                title: "Create Your Profile",
                description:
                  "Sign up and describe your legal needs in detail to help us match you with the right experts.",
              },
              {
                number: "02",
                title: "Get Matched",
                description:
                  "Our algorithm will match you with qualified attorneys specializing in your specific legal matter.",
              },
              {
                number: "03",
                title: "Collaborate Seamlessly",
                description:
                  "Work with your chosen attorney through our secure platform with integrated tools and communication.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.3 }}
              >
                <div className="bg-white border border-gray-200 rounded-lg p-8 h-full hover:shadow-lg transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black text-white font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            What Our Clients Say
          </motion.h2>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={testimonialsInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto"
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6 w-20 h-20 overflow-hidden rounded-full grayscale hover:grayscale-0 transition-all duration-500">
                      <img
                        src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                        alt={testimonials[currentTestimonial].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <blockquote className="text-xl italic mb-4">
                      "{testimonials[currentTestimonial].content}"
                    </blockquote>
                    <div>
                      <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
                      <p className="text-gray-500 text-sm">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center mt-8 space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full border-gray-300 hover:bg-black hover:text-white transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full mx-1 ${currentTestimonial === index ? "bg-black" : "bg-gray-300"}`}
                  />
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full border-gray-300 hover:bg-black hover:text-white transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 px-4 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Legal Experience?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of individuals and businesses who have simplified their legal journey with LawEase.
            </p>
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">LawEase</h3>
              <p className="text-gray-400 text-sm">
                Bridging the gap between legal professionals and those seeking legal services.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Find a Lawyer
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    For Attorneys
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>support@laweaseplatform.com</li>
                <li>1-800-LAW-EASE</li>
                <li>123 Legal Avenue, Suite 500</li>
                <li>New York, NY 10001</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} LawEase. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

