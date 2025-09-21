import { motion } from "framer-motion";
import { useState } from "react";
// import { Header } from "@/components/layout/Header";
import { SpiritualCard, SpiritualCardHeader, SpiritualCardTitle, SpiritualCardContent } from "@/components/ui/spiritual-card";
import { SpiritualButton } from "@/components/ui/spiritual-button";
import { Upload, Video, Book, Mic, Users, BarChart3, Calendar, FileText, Eye, Download } from "lucide-react";

export const Admin = () => {
  const [activeSection, setActiveSection] = useState('upload');

  const sidebarItems = [
    { id: 'upload', label: 'Upload Content', icon: <Upload className="h-5 w-5" /> },
    { id: 'videos', label: 'Manage Videos', icon: <Video className="h-5 w-5" /> },
    { id: 'ebooks', label: 'Manage Ebooks', icon: <Book className="h-5 w-5" /> },
    { id: 'voice', label: 'Voice Notes', icon: <Mic className="h-5 w-5" /> },
    { id: 'users', label: 'Users', icon: <Users className="h-5 w-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-5 w-5" /> },
  ];

  const stats = [
    { label: 'Total Users', value: '2,847', icon: <Users className="h-6 w-6" />, change: '+12%' },
    { label: 'Video Views', value: '18,429', icon: <Eye className="h-6 w-6" />, change: '+8%' },
    { label: 'Ebook Downloads', value: '3,256', icon: <Download className="h-6 w-6" />, change: '+15%' },
    { label: 'Active Sessions', value: '847', icon: <Video className="h-6 w-6" />, change: '+5%' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'upload':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Upload New Content</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Upload Video */}
              <SpiritualCard variant="divine">
                <SpiritualCardHeader className="text-center">
                  <Video className="h-12 w-12 text-accent mx-auto mb-4" />
                  <SpiritualCardTitle>Upload Video</SpiritualCardTitle>
                </SpiritualCardHeader>
                <SpiritualCardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-accent/30 rounded-lg p-8 text-center hover:border-accent/60 transition-divine cursor-pointer">
                      <Upload className="h-8 w-8 text-accent mx-auto mb-2" />
                      <p className="text-sm text-primary-foreground/80">Drag & drop video file</p>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Video title" 
                      className="w-full px-4 py-2 rounded-lg bg-background/20 border border-accent/20 text-primary-foreground placeholder-primary-foreground/60 focus:border-accent/60 focus:outline-none"
                    />
                    <textarea 
                      placeholder="Description" 
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg bg-background/20 border border-accent/20 text-primary-foreground placeholder-primary-foreground/60 focus:border-accent/60 focus:outline-none resize-none"
                    />
                    <SpiritualButton variant="sacred" className="w-full">
                      Upload Video
                    </SpiritualButton>
                  </div>
                </SpiritualCardContent>
              </SpiritualCard>

              {/* Upload Ebook */}
              <SpiritualCard variant="glow">
                <SpiritualCardHeader className="text-center">
                  <Book className="h-12 w-12 text-accent mx-auto mb-4" />
                  <SpiritualCardTitle>Upload Ebook</SpiritualCardTitle>
                </SpiritualCardHeader>
                <SpiritualCardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-accent/30 rounded-lg p-8 text-center hover:border-accent/60 transition-divine cursor-pointer">
                      <FileText className="h-8 w-8 text-accent mx-auto mb-2" />
                      <p className="text-sm">Drag & drop PDF file</p>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Ebook title" 
                      className="w-full px-4 py-2 rounded-lg bg-background/20 border border-accent/20 focus:border-accent/60 focus:outline-none"
                    />
                    <textarea 
                      placeholder="Description" 
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg bg-background/20 border border-accent/20 focus:border-accent/60 focus:outline-none resize-none"
                    />
                    <SpiritualButton variant="sacred" className="w-full">
                      Upload Ebook
                    </SpiritualButton>
                  </div>
                </SpiritualCardContent>
              </SpiritualCard>

              {/* Upload Voice Note */}
              <SpiritualCard variant="ethereal">
                <SpiritualCardHeader className="text-center">
                  <Mic className="h-12 w-12 text-accent mx-auto mb-4" />
                  <SpiritualCardTitle>Upload Voice Note</SpiritualCardTitle>
                </SpiritualCardHeader>
                <SpiritualCardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-accent/30 rounded-lg p-8 text-center hover:border-accent/60 transition-divine cursor-pointer">
                      <Mic className="h-8 w-8 text-accent mx-auto mb-2" />
                      <p className="text-sm">Drag & drop audio file</p>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Voice note title" 
                      className="w-full px-4 py-2 rounded-lg bg-background/20 border border-accent/20 focus:border-accent/60 focus:outline-none"
                    />
                    <div className="flex space-x-2">
                      <input 
                        type="date" 
                        className="flex-1 px-4 py-2 rounded-lg bg-background/20 border border-accent/20 focus:border-accent/60 focus:outline-none"
                      />
                      <input 
                        type="time" 
                        className="flex-1 px-4 py-2 rounded-lg bg-background/20 border border-accent/20 focus:border-accent/60 focus:outline-none"
                      />
                    </div>
                    <SpiritualButton variant="sacred" className="w-full">
                      Upload Voice Note
                    </SpiritualButton>
                  </div>
                </SpiritualCardContent>
              </SpiritualCard>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Analytics & Reports</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <SpiritualCard variant="glow" className="text-center">
                    <div className="text-accent mb-3 flex justify-center">{stat.icon}</div>
                    <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
                    <div className="text-xs text-accent font-medium">{stat.change}</div>
                  </SpiritualCard>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <SpiritualCard variant="ethereal">
                <SpiritualCardHeader>
                  <SpiritualCardTitle>User Growth</SpiritualCardTitle>
                </SpiritualCardHeader>
                <SpiritualCardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
                    <p className="text-muted-foreground">Chart visualization would go here</p>
                  </div>
                </SpiritualCardContent>
              </SpiritualCard>

              <SpiritualCard variant="ethereal">
                <SpiritualCardHeader>
                  <SpiritualCardTitle>Content Engagement</SpiritualCardTitle>
                </SpiritualCardHeader>
                <SpiritualCardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg">
                    <p className="text-muted-foreground">Chart visualization would go here</p>
                  </div>
                </SpiritualCardContent>
              </SpiritualCard>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Manage {activeSection}</h2>
            <SpiritualCard variant="ethereal">
              <SpiritualCardContent className="text-center py-12">
                <p className="text-muted-foreground">Content management interface for {activeSection}</p>
              </SpiritualCardContent>
            </SpiritualCard>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* <Header isLoggedIn={true} /> */}
      
      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-64 bg-card/50 backdrop-blur-sm border-r border-accent/20 min-h-screen p-6"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-sm text-muted-foreground mt-2">Manage your spiritual platform</p>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                whileHover={{ x: 5 }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-divine text-left ${
                  activeSection === item.id
                    ? 'bg-accent text-accent-foreground shadow-sacred'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </motion.aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <motion.div
            key={activeSection}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};