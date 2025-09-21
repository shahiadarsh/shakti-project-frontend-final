import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, Twitter, Heart, Mail, Phone, MapPin } from "lucide-react";
import { SpiritualButton } from "@/components/ui/spiritual-button";

export const Footer = () => {
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Youtube className="h-5 w-5" />, href: "#", label: "YouTube" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Community", href: "/community" },
    { name: "Live Sessions", href: "/live-sessions" },
    { name: "Contact", href: "/contact" },
  ];

  const contactInfo = [
    { icon: <Mail className="h-4 w-4" />, text: "contact@shaktipeeth.com" },
    { icon: <Phone className="h-4 w-4" />, text: "+91 98765 43210" },
    { icon: <MapPin className="h-4 w-4" />, text: "Sacred Temple, India" },
  ];

  return (
    <footer className="relative bg-gradient-to-t from-background to-card/50 border-t border-accent/20 pt-20 pb-8">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFC107' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main quote section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Invoke the Grace of Maa Mahalakshmi in{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              6 Months
            </span>
          </h2>
          <div className="w-24 h-1 bg-sacred-gradient mx-auto rounded-full"></div>
        </motion.div>

        {/* Footer content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Brand section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <img
                src="https://www.shreemahavidyashaktipeethwebinar.com/_next/image?url=%2Fassets%2Fshree-maaha.png&w=256&q=75"
                alt="Shree Mahavidya Shaktipeeth"
                className="h-16 w-120 aura-glow"
              />
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Awakening divine consciousness through ancient Vedic practices and
              sacred teachings. Join our community of spiritual seekers on the
              path to enlightenment.
            </p>

            {/* Social links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 hover:text-secondary transition-divine"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ x: 5 }}
                  className="block text-muted-foreground hover:text-accent transition-divine"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Contact Info
            </h3>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <div className="text-accent group-hover:text-secondary transition-divine">
                    {contact.icon}
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-divine text-sm">
                    {contact.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-foreground">
              Stay Connected
            </h3>
            <p className="text-muted-foreground text-sm">
              Get daily spiritual insights and updates about our sacred
              practices.
            </p>

            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-background/50 border border-accent/20 text-foreground placeholder-muted-foreground focus:border-accent/60 focus:outline-none transition-divine"
              />
              <SpiritualButton variant="sacred" size="sm" className="w-full">
                Subscribe
              </SpiritualButton>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-accent/20 mt-16 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© 2024 Shree Mahavidya Shaktipeeth. Made with</span>
              <Heart className="h-4 w-4 text-primary fill-current" />
              <span>for spiritual seekers</span>
            </div>

            <div className="flex space-x-6 text-sm">
              <motion.a
                href="/privacy"
                whileHover={{ y: -1 }}
                className="text-muted-foreground hover:text-accent transition-divine"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="/terms"
                whileHover={{ y: -1 }}
                className="text-muted-foreground hover:text-accent transition-divine"
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
