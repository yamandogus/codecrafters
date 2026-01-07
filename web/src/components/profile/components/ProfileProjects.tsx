import { Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileProjectsProps {
  count: number;
}

export default function ProfileProjects({ count }: ProfileProjectsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Projeler ({count})
        </h2>
        <div className="text-center py-12">
          <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Projeler yakında gelecek
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Kullanıcının projeleri burada görüntülenecek
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
