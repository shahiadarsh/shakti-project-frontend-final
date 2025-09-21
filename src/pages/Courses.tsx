import { useState } from "react";
import { motion } from "framer-motion";
import {
  PlayCircleIcon, // Video ke liye
  BookOpenIcon, // E-books ke liye
  SpeakerWaveIcon, // Audio ke liye
  ChatBubbleLeftRightIcon, // Live Q&A ke liye
  UsersIcon, // Community ke liye
  ChevronRightIcon,
  SparklesIcon, // Extra benefits ke liye
} from "@heroicons/react/24/outline";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";

// COURSE KA DATA UPDATE KIYA GAYA HAI - Video, Audio, Ebooks ke saath
const courseFeatures = [
  {
    icon: PlayCircleIcon,
    title: "Extensive Video Playlist",
    description:
      "Access over 100+ hours of high-quality video lectures on ancient spiritual practices, tantra, and meditation techniques, available anytime.",
  },
  {
    icon: BookOpenIcon,
    title: "Exclusive E-books & Notes",
    description:
      "Download a rich library of curated e-books, sacred texts, and detailed notes to deepen your understanding and support your practice.",
  },
  {
    icon: SpeakerWaveIcon,
    title: "Guided Audio Lectures & Meditations",
    description:
      "Listen to powerful guided audio meditations and lectures on the go, perfect for daily practice and integrating spiritual wisdom into your life.",
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Weekly Live Q&A Sessions",
    description:
      "Get your questions answered directly in weekly live sessions. Interact, learn, and clear your doubts in real-time.",
  },
  {
    icon: UsersIcon,
    title: "Private Community Access",
    description:
      "Join our exclusive community of like-minded spiritual seekers. Share experiences, support each other, and grow together on your journey.",
  },
  {
    icon: SparklesIcon,
    title: "Lifetime Access & Future Updates",
    description:
      "Enjoy lifetime access to all course materials, including all future lectures, resources, and updates, at no extra cost.",
  },
];

export default function Courses() {
  const navigate = useNavigate();
  const courseImageUrl =
    "https://t4.ftcdn.net/jpg/06/30/26/05/360_F_630260541_rw88M00bU736LFYOqLRJe0PcUxcuXyof.jpg"; // New, more relevant image

  const handleNavigateToLogin = () => {
    navigate("/admin/login");
  };

  return (
    <>
      <Header />
      <section className="py-20 sm:py-28 bg-background relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[40vw] h-[70vh] bg-aura-gradient opacity-10 blur-3xl -z-0 -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[40vw] h-[70vh] bg-aura-gradient opacity-10 blur-3xl -z-0 translate-y-1/4 -translate-x-1/4"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-sm font-semibold text-secondary tracking-widest uppercase mb-3">
              A Complete Spiritual Journey
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              What's Inside The{" "}
              <span className="text-primary  bg-clip-text">
                Spiritual Course
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side: Image */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute -inset-2 rounded-3xl bg-gradient-sacred opacity-20 blur-xl"></div>
              <img
                src={courseImageUrl}
                alt="Meditation and Spiritual Learning"
                className="rounded-2xl w-full h-full object-cover relative shadow-2xl aspect-[3/4]"
              />
            </motion.div>

            {/* Right Side: Features List (NEW UI) */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="flex flex-col space-y-8" // Use flex-col and space-y for spacing
            >
              {courseFeatures.map((item, index) => (
                <div key={index} className="flex items-start gap-5">
                  {/* Icon with background */}
                  <div className="flex-shrink-0 bg-accent/10 p-3 rounded-full">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  {/* Title and Description */}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Call to Action Button */}
              <div className="pt-8">
                <button onClick={handleNavigateToLogin} className="gradient-sacred text-background font-bold text-lg px-10 py-3 rounded-full shadow-lg shadow-accent/20 hover:scale-105 transition-transform duration-300 flex items-center group">
                  Enroll in the Course
                  <ChevronRightIcon className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
