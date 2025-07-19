"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export interface DeveloperCard {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  skills: string[];
  github: string;
  linkedin: string;
  bio: string;
  projects: {
    name: string;
    description: string;
    tech: string[];
  }[];
}

export default function DeveloperShowcase() {
  const [active, setActive] = useState<(typeof developers)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[700px] h-[90vh] max-h-[800px] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden shadow-2xl"
            >
              <motion.div layoutId={`image-${active.name}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.avatar}
                  alt={active.name}
                  className="w-full h-64 sm:h-72 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center"
                />
              </motion.div>

              <div className="flex flex-col flex-1 min-h-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start p-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
                  <div className="flex-1 mb-4 sm:mb-0">
                    <motion.h3
                      layoutId={`title-${active.name}-${id}`}
                      className="font-bold text-xl text-neutral-700 dark:text-neutral-200"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.role}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 font-medium mb-3"
                    >
                      {active.role} @ {active.company}
                    </motion.p>
                    <div className="flex flex-wrap gap-2">
                      {active.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 sm:ml-4">
                    <motion.a
                      layoutId={`github-${active.name}-${id}`}
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm rounded-full font-bold bg-gray-900 hover:bg-gray-800 text-white whitespace-nowrap transition-colors"
                    >
                      GitHub
                    </motion.a>
                    <motion.a
                      layoutId={`linkedin-${active.name}-${id}`}
                      href={active.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm rounded-full font-bold bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap transition-colors"
                    >
                      LinkedIn
                    </motion.a>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 min-h-0">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-sm lg:text-base space-y-6 dark:text-neutral-400"
                  >
                    <div>
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3 text-lg">
                        Hakkında
                      </h4>
                      <p className="leading-relaxed">{active.bio}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3 text-lg">
                        Yetenekler
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {active.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm rounded-lg border border-gray-200 dark:border-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3 text-lg">
                        Projeler
                      </h4>
                      <div className="space-y-4">
                        {active.projects.map((project, index) => (
                          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
                            <h5 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                              {project.name}
                            </h5>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {project.tech.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded border border-green-200 dark:border-green-700"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {developers.map((developer) => (
          <motion.div
            layoutId={`card-${developer.name}-${id}`}
            key={`card-${developer.name}-${id}`}
            onClick={() => setActive(developer)}
            className="p-6 flex flex-col bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow w-full h-full"
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div layoutId={`image-${developer.name}-${id}`}>
                <img
                  width={60}
                  height={60}
                  src={developer.avatar}
                  alt={developer.name}
                  className="h-15 w-15 rounded-full object-cover"
                />
              </motion.div>
              <div className="flex-1 min-w-0">
                <motion.h3
                  layoutId={`title-${developer.name}-${id}`}
                  className="font-semibold text-neutral-800 dark:text-neutral-200 truncate"
                >
                  {developer.name}
                </motion.h3>
                <motion.p
                  layoutId={`description-${developer.role}-${id}`}
                  className="text-sm text-neutral-600 dark:text-neutral-400 truncate"
                >
                  {developer.role}
                </motion.p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 truncate">
                  {developer.company}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {developer.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                >
                  {skill}
                </span>
              ))}
              {developer.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                  +{developer.skills.length - 3}
                </span>
              )}
            </div>

            <div className="flex gap-2 mt-auto">
              <motion.button
                layoutId={`github-${developer.name}-${id}`}
                className="flex-1 px-3 py-2 text-xs rounded-lg font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
              >
                GitHub
              </motion.button>
              <motion.button
                layoutId={`linkedin-${developer.name}-${id}`}
                className="flex-1 px-3 py-2 text-xs rounded-lg font-medium bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 transition-colors"
              >
                LinkedIn
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const developers: DeveloperCard[] = [
  {
    id: "dev-1",
    name: "Ahmet Yılmaz",
    role: "Senior Full Stack Developer",
    company: "TechCorp",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjN8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
    github: "https://github.com/ahmetyilmaz",
    linkedin: "https://linkedin.com/in/ahmetyilmaz",
    bio: "5+ yıllık deneyime sahip full stack developer. Modern web teknolojileri ve cloud mimarisi konularında uzman. Açık kaynak projelere aktif katkı sağlıyor.",
    projects: [
      {
        name: "E-Commerce Platform",
        description: "Mikroservis mimarisi ile geliştirilmiş modern e-ticaret platformu",
        tech: ["React", "Node.js", "MongoDB", "Redis"]
      },
      {
        name: "Real-time Chat App",
        description: "WebSocket tabanlı gerçek zamanlı mesajlaşma uygulaması",
        tech: ["Socket.io", "Express", "React", "PostgreSQL"]
      }
    ]
  },
  {
    id: "dev-2",
    name: "Ayşe Demir",
    role: "Frontend Architect",
    company: "StartupXYZ",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjR8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
    skills: ["Vue.js", "React", "JavaScript", "CSS", "Figma", "Webpack"],
    github: "https://github.com/aysedemir",
    linkedin: "https://linkedin.com/in/aysedemir",
    bio: "UI/UX odaklı frontend geliştirici. Kullanıcı deneyimi ve performans optimizasyonu konularında uzman. Design system ve component library geliştirme deneyimi.",
    projects: [
      {
        name: "Design System",
        description: "Şirket genelinde kullanılan kapsamlı tasarım sistemi",
        tech: ["Vue.js", "Storybook", "SCSS", "TypeScript"]
      },
      {
        name: "Dashboard Analytics",
        description: "Veri görselleştirme odaklı analitik dashboard",
        tech: ["React", "D3.js", "Chart.js", "Tailwind"]
      }
    ]
  },
  {
    id: "dev-3",
    name: "Mehmet Kaya",
    role: "DevOps Engineer",
    company: "CloudTech",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080",
    skills: ["Kubernetes", "Docker", "AWS", "Terraform", "Jenkins", "Python"],
    github: "https://github.com/mehmetkaya",
    linkedin: "https://linkedin.com/in/mehmetkaya",
    bio: "Cloud native teknolojiler ve container orchestration konularında uzman DevOps engineer. CI/CD pipeline'ları ve infrastructure as code deneyimi.",
    projects: [
      {
        name: "K8s Cluster Management",
        description: "Otomatik scaling ve monitoring ile Kubernetes cluster yönetimi",
        tech: ["Kubernetes", "Helm", "Prometheus", "Grafana"]
      },
      {
        name: "CI/CD Pipeline",
        description: "Multi-environment deployment pipeline sistemi",
        tech: ["Jenkins", "Docker", "Terraform", "AWS"]
      }
    ]
  },
  {
    id: "dev-4",
    name: "Fatma Özkan",
    role: "Mobile Developer",
    company: "MobileFirst",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Redux"],
    github: "https://github.com/fatmaozkan",
    linkedin: "https://linkedin.com/in/fatmaozkan",
    bio: "Cross-platform mobile uygulama geliştirme konusunda uzman. iOS ve Android platformlarında native ve hybrid uygulama deneyimi.",
    projects: [
      {
        name: "Fitness Tracking App",
        description: "AI destekli kişisel fitness takip uygulaması",
        tech: ["React Native", "TensorFlow", "Firebase", "Redux"]
      },
      {
        name: "E-Learning Platform",
        description: "Interaktif öğrenme deneyimi sunan mobil platform",
        tech: ["Flutter", "Dart", "SQLite", "Provider"]
      }
    ]
  },
  {
    id: "dev-5",
    name: "Ali Çelik",
    role: "Backend Developer",
    company: "DataCorp",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080",
    skills: ["Python", "Django", "FastAPI", "PostgreSQL", "Redis", "Celery"],
    github: "https://github.com/alicelik",
    linkedin: "https://linkedin.com/in/alicelik",
    bio: "Yüksek performanslı backend sistemleri ve API geliştirme konusunda uzman. Mikroservis mimarisi ve database optimizasyonu deneyimi.",
    projects: [
      {
        name: "API Gateway",
        description: "Yüksek trafikli mikroservisler için API gateway sistemi",
        tech: ["FastAPI", "Redis", "PostgreSQL", "Docker"]
      },
      {
        name: "Data Processing Pipeline",
        description: "Büyük veri işleme ve analiz pipeline'ı",
        tech: ["Python", "Celery", "Apache Kafka", "MongoDB"]
      }
    ]
  },
  {
    id: "dev-6",
    name: "Zeynep Aktaş",
    role: "Data Scientist",
    company: "AI Labs",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzJ8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080",
    skills: ["Python", "TensorFlow", "PyTorch", "Pandas", "Scikit-learn", "SQL"],
    github: "https://github.com/zeynepaktas",
    linkedin: "https://linkedin.com/in/zeynepaktas",
    bio: "Makine öğrenmesi ve yapay zeka projeleri konusunda uzman data scientist. NLP ve computer vision alanlarında araştırma deneyimi.",
    projects: [
      {
        name: "NLP Sentiment Analysis",
        description: "Türkçe metinler için duygu analizi modeli",
        tech: ["Python", "BERT", "Transformers", "PyTorch"]
      },
      {
        name: "Computer Vision System",
        description: "Görüntü tanıma ve sınıflandırma sistemi",
        tech: ["TensorFlow", "OpenCV", "Keras", "NumPy"]
      }
    ]
  }
];
