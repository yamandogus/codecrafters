import { BlogPost } from "./blog-card";
import { FilterOption } from "./blog-filter";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Next.js 15 ile Modern Web Geliştirme",
    excerpt: "Next.js 15'in getirdiği yenilikler ve bu yenilikleri projelerinizde nasıl kullanabileceğinizi keşfedin. App Router, Server Components ve daha fazlası.",
    author: "Ahmet Yılmaz",
    date: "15 Ocak 2024",
    category: "Web Development",
    image: "/api/placeholder/400/200",
    readTime: "5 dk",
    tags: ["nextjs", "react", "web"]
  },
  {
    id: "2",
    title: "TypeScript ile Tip Güvenli Kod Yazma",
    excerpt: "TypeScript'in temel özelliklerini öğrenin ve JavaScript projelerinizi daha güvenli hale getirin. İleri seviye type sistemleri ve best practices.",
    author: "Zeynep Kaya",
    date: "12 Ocak 2024",
    category: "Programming",
    image: "/api/placeholder/400/200",
    readTime: "8 dk",
    tags: ["typescript", "javascript", "tips"]
  },
  {
    id: "3",
    title: "React Hook'ları ile State Yönetimi",
    excerpt: "React'in useState, useEffect ve custom hook'larını kullanarak etkili state yönetimi teknikleri. Performans optimizasyonu ve best practices.",
    author: "Mehmet Demir",
    date: "10 Ocak 2024",
    category: "Frontend",
    image: "/api/placeholder/400/200",
    readTime: "6 dk",
    tags: ["react", "hooks", "state"]
  },
  {
    id: "4",
    title: "Tailwind CSS ile Hızlı UI Geliştirme",
    excerpt: "Tailwind CSS'in utility-first yaklaşımı ile hızlı ve tutarlı arayüzler oluşturun. Component tasarımı ve responsive design teknikleri.",
    author: "Ayşe Öztürk",
    date: "8 Ocak 2024",
    category: "Design",
    image: "/api/placeholder/400/200",
    readTime: "4 dk",
    tags: ["tailwind", "css", "design"]
  },
  {
    id: "5",
    title: "Node.js ile RESTful API Geliştirme",
    excerpt: "Express.js kullanarak güvenli ve ölçeklenebilir RESTful API'ler oluşturun. Authentication, validation ve error handling konularını öğrenin.",
    author: "Can Arslan",
    date: "5 Ocak 2024",
    category: "Backend",
    image: "/api/placeholder/400/200",
    readTime: "12 dk",
    tags: ["nodejs", "api", "backend"]
  },
  {
    id: "6",
    title: "Git ve GitHub ile Versiyon Kontrolü",
    excerpt: "Git'in temel komutlarından ileri seviye özelliklerine kadar. Branch management, merge conflicts ve collaborative development.",
    author: "Fatma Çelik",
    date: "3 Ocak 2024",
    category: "Tools",
    image: "/api/placeholder/400/200",
    readTime: "7 dk",
    tags: ["git", "github", "version-control"]
  },
  {
    id: "7",
    title: "Docker ile Uygulama Konteynerleştirme",
    excerpt: "Docker'ın temellerini öğrenin ve uygulamalarınızı containerize edin. Dockerfile yazımı, image yönetimi ve deployment stratejileri.",
    author: "Oğuz Kara",
    date: "1 Ocak 2024",
    category: "DevOps",
    image: "/api/placeholder/400/200",
    readTime: "10 dk",
    tags: ["docker", "devops", "containerization"]
  },
  {
    id: "8",
    title: "JavaScript ES2024 Yenilikleri",
    excerpt: "JavaScript'in en son sürümünde gelen yenilikler ve bu özellikleri projelerinizde nasıl kullanabileceğiniz. Kod örnekleri ile detaylı inceleme.",
    author: "Elif Yıldız",
    date: "28 Aralık 2023",
    category: "Programming",
    image: "/api/placeholder/400/200",
    readTime: "9 dk",
    tags: ["javascript", "es2024", "features"]
  },
  {
    id: "9",
    title: "Veritabanı Tasarımı ve Optimizasyonu",
    excerpt: "İlişkisel veritabanı tasarımının temel prensipleri ve performans optimizasyonu teknikleri. SQL sorgu optimizasyonu ve indexing stratejileri.",
    author: "Murat Şahin",
    date: "25 Aralık 2023",
    category: "Database",
    image: "/api/placeholder/400/200",
    readTime: "15 dk",
    tags: ["database", "sql", "optimization"]
  }
];

export const blogCategories: FilterOption[] = [
  { id: "all", label: "Tümü", count: blogPosts.length },
  { id: "Web Development", label: "Web Geliştirme", count: blogPosts.filter(p => p.category === "Web Development").length },
  { id: "Programming", label: "Programlama", count: blogPosts.filter(p => p.category === "Programming").length },
  { id: "Frontend", label: "Frontend", count: blogPosts.filter(p => p.category === "Frontend").length },
  { id: "Backend", label: "Backend", count: blogPosts.filter(p => p.category === "Backend").length },
  { id: "Design", label: "Tasarım", count: blogPosts.filter(p => p.category === "Design").length },
  { id: "Tools", label: "Araçlar", count: blogPosts.filter(p => p.category === "Tools").length },
  { id: "DevOps", label: "DevOps", count: blogPosts.filter(p => p.category === "DevOps").length },
  { id: "Database", label: "Veritabanı", count: blogPosts.filter(p => p.category === "Database").length }
];

export const getFilteredPosts = (posts: BlogPost[], category: string, searchTerm: string): BlogPost[] => {
  let filtered = posts;
  
  // Kategori filtresi
  if (category !== "all") {
    filtered = filtered.filter(post => post.category === category);
  }
  
  // Arama filtresi
  if (searchTerm) {
    filtered = filtered.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }
  
  return filtered;
}; 