import { motion } from "framer-motion";
import { User, Bell, Menu } from "lucide-react";
import { Link } from "react-router-dom"; // Import the Link component
import { SpiritualButton } from "@/components/ui/spiritual-button"; // Assuming you have this component

interface HeaderProps {
  isLoggedIn?: boolean;
  onMenuClick?: () => void;
}

export const Header = ({ isLoggedIn = false, onMenuClick }: HeaderProps) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/20 border-b border-accent/20"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <div className="relative">
            <img
              src="https://www.shreemahavidyashaktipeethwebinar.com/_next/image?url=%2Fassets%2Fshree-maaha.png&w=256&q=75"
              alt="Shree Mahavidya Shaktipeeth"
              className="h-16 w-120 aura-glow"
            />
            <div className="absolute inset-0 bg-aura-gradient rounded-full -z-10"></div>
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-8">
          <motion.a
            href="/"
            whileHover={{ y: -2 }}
            className="text-foreground hover:text-accent transition-divine"
          >
            Home
          </motion.a>
          <motion.a
            href="/courses"
            whileHover={{ y: -2 }}
            className="text-foreground hover:text-accent transition-divine"
          >
            Courses
          </motion.a>
          <motion.a
            href="/community"
            whileHover={{ y: -2 }}
            className="text-foreground hover:text-accent transition-divine"
          >
            Community
          </motion.a>
          <motion.a
            href="/about"
            whileHover={{ y: -2 }}
            className="text-foreground hover:text-accent transition-divine"
          >
            About
          </motion.a>
        </nav>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <motion.div whileHover={{ scale: 1.1 }}>
                <SpiritualButton variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </SpiritualButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <SpiritualButton variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </SpiritualButton>
              </motion.div>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }}>
              {/* --- CHANGE IS HERE --- */}
              {/* Wrap the SpiritualButton with the Link component */}
              <Link to="/admin/login">
                <SpiritualButton variant="aura">Login</SpiritualButton>
              </Link>
            </motion.div>
          )}

          <motion.div
            className="md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <SpiritualButton variant="ghost" size="icon" onClick={onMenuClick}>
              <Menu className="h-5 w-5" />
            </SpiritualButton>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};