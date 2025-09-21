import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/sections/Footer";
import { SpiritualCard, SpiritualCardHeader, SpiritualCardTitle, SpiritualCardContent } from "@/components/ui/spiritual-card";
import { Shield, Eye, Lock, UserCheck } from "lucide-react";

export const Privacy = () => {
  const sections = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Data Protection",
      content: [
        "We implement industry-standard security measures to protect your personal information.",
        "All data is encrypted in transit and at rest using advanced encryption protocols.",
        "Regular security audits ensure the continued protection of your information.",
        "Access to your data is restricted to authorized personnel only."
      ]
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Information We Collect",
      content: [
        "Personal details you provide during registration (name, email, phone).",
        "Usage data to improve our spiritual services and user experience.",
        "Session information for your spiritual journey tracking.",
        "Communication preferences for spiritual guidance and updates."
      ]
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "How We Use Your Data",
      content: [
        "To provide personalized spiritual guidance and content.",
        "To send you relevant updates about courses and sacred practices.",
        "To improve our platform and spiritual offerings.",
        "To maintain the security and integrity of our services."
      ]
    },
    {
      icon: <UserCheck className="h-6 w-6" />,
      title: "Your Rights",
      content: [
        "Right to access your personal data at any time.",
        "Right to correct or update your information.",
        "Right to delete your account and associated data.",
        "Right to opt-out of communications while maintaining access."
      ]
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
              Privacy{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Policy
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We respect your privacy and are committed to protecting your personal information 
              in accordance with the highest spiritual and ethical standards
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: December 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SpiritualCard variant="divine">
                <SpiritualCardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Our Commitment to Your Privacy</h2>
                  <p className="text-lg leading-relaxed mb-4">
                    At Shree Mahavidya Shaktipeeth, we understand that your spiritual journey is deeply personal. 
                    We are committed to protecting your privacy and handling your personal information with the 
                    utmost care and respect.
                  </p>
                  <p className="text-lg leading-relaxed">
                    This Privacy Policy explains how we collect, use, protect, and share information when you 
                    use our spiritual platform and services. By using our services, you agree to the collection 
                    and use of information as described in this policy.
                  </p>
                </SpiritualCardContent>
              </SpiritualCard>
            </motion.div>

            {/* Policy Sections */}
            <div className="grid gap-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <SpiritualCard variant="ethereal">
                    <SpiritualCardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="text-accent">{section.icon}</div>
                        <SpiritualCardTitle className="text-xl">{section.title}</SpiritualCardTitle>
                      </div>
                    </SpiritualCardHeader>
                    <SpiritualCardContent>
                      <ul className="space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </SpiritualCardContent>
                  </SpiritualCard>
                </motion.div>
              ))}
            </div>

            {/* Additional Sections */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <SpiritualCard variant="glow">
                <SpiritualCardHeader>
                  <SpiritualCardTitle className="text-xl">Cookies and Tracking</SpiritualCardTitle>
                </SpiritualCardHeader>
                <SpiritualCardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use cookies and similar technologies to enhance your spiritual journey on our platform. 
                    These help us remember your preferences, track your progress, and provide personalized content.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    You can control cookie settings through your browser preferences. However, disabling certain 
                    cookies may affect the functionality of our spiritual services.
                  </p>
                </SpiritualCardContent>
              </SpiritualCard>

              <SpiritualCard variant="ethereal">
                <SpiritualCardHeader>
                  <SpiritualCardTitle className="text-xl">Third-Party Services</SpiritualCardTitle>
                </SpiritualCardHeader>
                <SpiritualCardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Our platform may integrate with trusted third-party services to provide you with the best 
                    spiritual experience. These services have their own privacy policies and data practices.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We only work with partners who share our commitment to privacy and data protection. 
                    We do not sell your personal information to any third parties.
                  </p>
                </SpiritualCardContent>
              </SpiritualCard>

              <SpiritualCard variant="divine">
                <SpiritualCardHeader>
                  <SpiritualCardTitle className="text-xl">Contact Us About Privacy</SpiritualCardTitle>
                </SpiritualCardHeader>
                <SpiritualCardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or how we handle your personal information, 
                    please don't hesitate to contact us.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> privacy@shaktipeeth.com</p>
                    <p><strong>Phone:</strong> +91 98765 43210</p>
                    <p><strong>Address:</strong> Sacred Temple, India</p>
                  </div>
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