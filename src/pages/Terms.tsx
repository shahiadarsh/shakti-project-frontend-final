import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/sections/Footer";
import { SpiritualCard, SpiritualCardHeader, SpiritualCardTitle, SpiritualCardContent } from "@/components/ui/spiritual-card";
import { FileText, Users, AlertTriangle, Heart } from "lucide-react";

export const Terms = () => {
  const sections = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Terms of Service",
      content: [
        "By accessing our platform, you agree to these terms and conditions.",
        "Our services are intended for personal spiritual growth and development.",
        "You must be at least 13 years old to use our services.",
        "You are responsible for maintaining the confidentiality of your account."
      ]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "User Responsibilities",
      content: [
        "Use our platform with respect and in the spirit of spiritual growth.",
        "Do not share content that is harmful, offensive, or inappropriate.",
        "Respect other community members and their spiritual journeys.",
        "Maintain the sanctity of our spiritual practices and teachings."
      ]
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: "Prohibited Activities",
      content: [
        "Misusing our spiritual content for commercial purposes without permission.",
        "Attempting to hack, damage, or interfere with our platform.",
        "Sharing false information or impersonating others.",
        "Using our services for any illegal or unauthorized purposes."
      ]
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Community Guidelines",
      content: [
        "Approach all interactions with compassion and understanding.",
        "Share your spiritual journey respectfully and authentically.",
        "Support fellow community members in their growth.",
        "Maintain the sacred nature of our spiritual discussions."
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
              Terms of{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Sacred guidelines for our spiritual community and platform usage
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
                  <h2 className="text-2xl font-bold mb-6">Welcome to Our Sacred Community</h2>
                  <p className="text-lg leading-relaxed mb-4">
                    These Terms of Service govern your use of the Shree Mahavidya Shaktipeeth platform and services. 
                    By joining our spiritual community, you become part of a sacred space dedicated to growth, 
                    wisdom, and divine connection.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Please read these terms carefully as they establish the foundation for our spiritual community 
                    and outline the mutual respect and responsibilities we share in this sacred space.
                  </p>
                </SpiritualCardContent>
              </SpiritualCard>
            </motion.div>

            {/* Terms Sections */}
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
                  <SpiritualCardTitle className="text-xl">Intellectual Property</SpiritualCardTitle>
                </SpiritualCardHeader>
                <SpiritualCardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    All spiritual content, teachings, videos, texts, and materials on our platform are protected by 
                    intellectual property laws. These sacred teachings are shared for your personal spiritual growth.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    You may not reproduce, distribute, or commercialize our content without explicit written permission. 
                    The wisdom is meant to be internalized and practiced, not redistributed for profit.
                  </p>
                </SpiritualCardContent>
              </SpiritualCard>

              <SpiritualCard variant="ethereal">
                <SpiritualCardHeader>
                  <SpiritualCardTitle className="text-xl">Service Availability</SpiritualCardTitle>
                </SpiritualCardHeader>
                <SpiritualCardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We strive to provide uninterrupted access to our spiritual services. However, like all earthly 
                    endeavors, technical issues may occasionally arise.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify, suspend, or discontinue any aspect of our services for 
                    maintenance, improvements, or other operational reasons. We will provide advance notice when possible.
                  </p>
                </SpiritualCardContent>
              </SpiritualCard>

              <SpiritualCard variant="divine">
                <SpiritualCardHeader>
                  <SpiritualCardTitle className="text-xl">Limitation of Liability</SpiritualCardTitle>
                </SpiritualCardHeader>
                <SpiritualCardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Our spiritual teachings and guidance are provided for educational and personal growth purposes. 
                    While we believe deeply in the transformative power of these practices, individual results may vary.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We encourage you to approach your spiritual journey with discernment and to seek additional 
                    guidance from qualified teachers when needed. The ultimate responsibility for your spiritual 
                    path remains with you.
                  </p>
                </SpiritualCardContent>
              </SpiritualCard>

              <SpiritualCard variant="glow">
                <SpiritualCardHeader>
                  <SpiritualCardTitle className="text-xl">Changes to Terms</SpiritualCardTitle>
                </SpiritualCardHeader>
                <SpiritualCardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    As our spiritual community grows and evolves, we may need to update these terms to better 
                    serve our members and maintain the sanctity of our platform.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We will notify you of any significant changes through our platform. Continued use of our 
                    services after such changes constitutes acceptance of the new terms.
                  </p>
                </SpiritualCardContent>
              </SpiritualCard>

              <SpiritualCard variant="ethereal">
                <SpiritualCardHeader>
                  <SpiritualCardTitle className="text-xl">Contact Us</SpiritualCardTitle>
                </SpiritualCardHeader>
                <SpiritualCardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have questions about these Terms of Service or need clarification about any aspect 
                    of our community guidelines, please reach out to us.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> legal@shaktipeeth.com</p>
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