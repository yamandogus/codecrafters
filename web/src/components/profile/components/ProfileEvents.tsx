import { Calendar } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProfileEventsProps {
  count: number;
  isEditable: boolean;
}

export default function ProfileEvents({ count, isEditable }: ProfileEventsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Etkinlikler ({count})
        </h2>
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Etkinlikler yakında gelecek
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Kullanıcının katıldığı etkinlikler burada görüntülenecek
          </p>
          {isEditable && (
            <Button asChild>
              <Link href="/my-events">
                Etkinliklerimi Gör
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
