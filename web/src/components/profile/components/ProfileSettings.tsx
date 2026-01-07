import { Bell, Shield, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfileSettings() {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Hesap Ayarları
        </h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Bildirimler
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  E-posta ve push bildirimleri
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Düzenle
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Gizlilik
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Profil görünürlüğü ve veri koruma
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Düzenle
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-600" />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Dil ve Bölge
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Türkçe, Türkiye
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Düzenle
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
