"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { User, Calendar, Code, MessageCircle, Settings } from "lucide-react";
import { ProfileUser } from "./types";
import {
  ProfileHeader,
  ProfileOverview,
  ProfileActivity,
  ProfileProjects,
  ProfileEvents,
  ProfileSettings,
  ProfileStats,
  ProfileContact,
} from "./index";

// Re-export ProfileUser for backward compatibility
export type { ProfileUser } from "./types";

interface ProfileViewProps {
  user: ProfileUser;
  isEditable?: boolean;
}

export default function ProfileView({ user, isEditable = false }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState<ProfileUser>(user);

  const tabs = [
    { id: "overview", name: "Genel Bakış", icon: User },
    { id: "activity", name: "Aktivite", icon: MessageCircle },
    { id: "projects", name: "Projeler", icon: Code },
    { id: "events", name: "Etkinlikler", icon: Calendar },
  ];

  if (isEditable) {
    tabs.push({ id: "settings", name: "Ayarlar", icon: Settings });
  }

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader
        user={userData}
        isEditable={isEditable}
        isEditing={false}
        onEditToggle={() => {}}
      />

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2 border-b">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "text-green-600 border-b-2 border-green-600"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <ProfileOverview 
                  user={userData} 
                  isEditable={isEditable}
                  onUpdate={(u) => setUserData(u)}
                />
              </motion.div>
            )}

            {activeTab === "activity" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <ProfileActivity 
                  recentActivity={userData.recentActivity} 
                  isEditable={isEditable}
                />
              </motion.div>
            )}

            {activeTab === "projects" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <ProfileProjects 
                  user={userData} 
                  isEditable={isEditable}
                  onUpdate={(u) => setUserData(u)}
                />
              </motion.div>
            )}

            {activeTab === "events" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <ProfileEvents
                  count={userData.stats.events}
                  isEditable={isEditable}
                />
              </motion.div>
            )}

            {activeTab === "settings" && isEditable && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <ProfileSettings />
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ProfileStats stats={userData.stats} />
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ProfileContact 
                user={userData} 
                isEditable={isEditable}
                onUpdate={(u) => setUserData(u)}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
