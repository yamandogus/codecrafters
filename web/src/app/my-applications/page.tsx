"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  MapPin, 
  Building2, 
  Clock, 
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { jobService } from "@/services/jobsService";
import { toast } from "sonner";
import { AuthGuard } from "@/components/auth/auth-guard";

interface JobApplication {
  id: string;
  status: string;
  appliedAt: string;
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    category: string;
    status: string;
  };
}

export default function MyApplicationsPage() {
  return (
    <AuthGuard>
      <MyApplicationsContent />
    </AuthGuard>
  );
}

function MyApplicationsContent() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await jobService.getMyApplications();
        if (response.success && response.data) {
          setApplications(response.data);
        }
      } catch (error) {
        console.error("Başvurular yüklenirken hata:", error);
        toast.error("Başvurular yüklenemedi");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepted': return 'Kabul Edildi';
      case 'rejected': return 'Reddedildi';
      case 'pending': return 'Değerlendiriliyor';
      default: return status;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
          <p className="text-gray-500">Başvurular yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">İş Başvurularım</h1>
          <p className="text-gray-500">
            Yaptığınız tüm iş başvurularını ve durumlarını buradan takip edebilirsiniz.
          </p>
        </div>
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href="/jobs">Yeni İş İlanlarına Bak</Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-[1fr,200px] gap-4 bg-white p-4 rounded-xl border shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="İlan veya şirket ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
        >
          <option value="all">Tüm Durumlar</option>
          <option value="pending">Değerlendiriliyor</option>
          <option value="accepted">Kabul Edildi</option>
          <option value="rejected">Reddedildi</option>
        </select>
      </div>

      {/* Applications List */}
      <div className="grid gap-4">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-white rounded-xl border hover:border-green-500/50 hover:shadow-md transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                            {application.job.type}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(application.appliedAt).toLocaleDateString('tr-TR')} tarihinde başvuruldu
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                          {application.job.title}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                          <Building2 className="w-4 h-4" />
                          <span className="font-medium">{application.job.company}</span>
                          <span className="text-gray-300">•</span>
                          <MapPin className="w-4 h-4" />
                          <span>{application.job.location}</span>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        <span>{getStatusText(application.status)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t mt-4">
                      <div className="flex gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4" />
                          <span>{application.job.category}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/jobs/${application.job.id}`}>İlanı Görüntüle</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Başvuru Bulunamadı</h3>
            <p className="text-gray-500 mb-6">
              {statusFilter !== 'all' 
                ? "Bu filtreye uygun başvuru bulunmuyor." 
                : "Henüz hiçbir iş ilanına başvurmadınız."}
            </p>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/jobs">İş İlanlarını İncele</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
