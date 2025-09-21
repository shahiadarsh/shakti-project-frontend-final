import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/sections/Footer";
import { SpiritualCard, SpiritualCardHeader, SpiritualCardTitle, SpiritualCardContent } from "@/components/ui/spiritual-card";
import { SpiritualButton } from "@/components/ui/spiritual-button";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export const Contact = () => {
  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      description: "Get in touch via email",
      contact: "contact@shaktipeeth.com",
      action: "Send Email"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      description: "Speak with our spiritual guides",
      contact: "+91 98765 43210",
      action: "Call Now"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      description: "Sacred Temple Location",
      contact: "Sacred Temple, India",
      action: "Get Directions"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Office Hours",
      description: "When we're available",
      contact: "Mon-Sat: 6AM-8PM IST",
      action: "Schedule Call"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Connect with{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Sacred Wisdom
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Reach out to our spiritual community for guidance, support, or to begin your sacred journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SpiritualCard variant="glow" className="text-center h-full">
                  <SpiritualCardContent className="p-6">
                    <div className="text-accent mb-4 flex justify-center">
                      {method.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                    <p className="font-medium mb-4">{method.contact}</p>
                    <SpiritualButton variant="sacred" size="sm" className="w-full">
                      {method.action}
                    </SpiritualButton>
                  </SpiritualCardContent>
                </SpiritualCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SpiritualCard variant="divine">
                <SpiritualCardHeader>
                  <SpiritualCardTitle className="text-2xl">Send us a Message</SpiritualCardTitle>
                </SpiritualCardHeader>
                <SpiritualCardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-background/20 border border-accent/20 focus:border-accent/60 focus:outline-none transition-divine"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-background/20 border border-accent/20 focus:border-accent/60 focus:outline-none transition-divine"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg bg-background/20 border border-accent/20 focus:border-accent/60 focus:outline-none transition-divine"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-background/20 border border-accent/20 focus:border-accent/60 focus:outline-none transition-divine">
                      <option>General Inquiry</option>
                      <option>Spiritual Guidance</option>
                      <option>Course Information</option>
                      <option>Technical Support</option>
                      <option>Partnership</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-background/20 border border-accent/20 focus:border-accent/60 focus:outline-none transition-divine resize-none"
                      placeholder="Share your thoughts or questions..."
                    />
                  </div>
                  
                  <SpiritualButton variant="aura" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </SpiritualButton>
                </SpiritualCardContent>
              </SpiritualCard>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6">Get Spiritual Guidance</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Whether you're seeking spiritual guidance, have questions about our practices, 
                  or want to join our sacred community, we're here to support your journey.
                </p>
              </div>

              <SpiritualCard variant="ethereal">
                <SpiritualCardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">What to Expect</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>Personalized spiritual guidance from experienced teachers</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>Detailed information about our courses and practices</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>Support for your spiritual journey and growth</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span>Response within 24 hours during working days</span>
                    </li>
                  </ul>
                </SpiritualCardContent>
              </SpiritualCard>

              <SpiritualCard variant="glow">
                <SpiritualCardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-3">Join Live Sessions</h3>
                  <p className="text-muted-foreground mb-4">
                    Experience our sacred practices firsthand every Sunday at 10 AM IST
                  </p>
                  <SpiritualButton variant="sacred">
                    Join Next Session
                  </SpiritualButton>
                </SpiritualCardContent>
              </SpiritualCard>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};