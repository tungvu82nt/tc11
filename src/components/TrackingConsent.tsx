import { useState, useEffect } from 'react';
import { getConsent, setConsent } from '@/lib/tracking-storage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, X } from 'lucide-react';

/**
 * GDPR-compliant tracking consent banner
 */
export function TrackingConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('tracking_consent');
    if (hasConsent === null) {
      // First time visitor - show banner
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setConsent(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    setConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-in-up">
      <Card className="max-w-3xl mx-auto border-2 shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg">Quyền riêng tư & Tracking</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDecline}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-base leading-relaxed">
            Chúng tôi sử dụng công nghệ tracking để cải thiện trải nghiệm của bạn. 
            Dữ liệu được lưu trữ an toàn trên thiết bị của bạn và không được chia sẻ với bên thứ ba.
          </CardDescription>
          
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              Bằng cách chấp nhận, bạn đồng ý cho phép chúng tôi thu thập và xử lý thông tin ẩn danh 
              để tối ưu hóa dịch vụ.
            </p>
            <p className="mt-3">
              <strong>Lưu ý:</strong> Bạn có thể thay đổi quyết định bất cứ lúc nào 
              và xóa toàn bộ dữ liệu đã lưu.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button 
              onClick={handleAccept}
              className="flex-1"
            >
              Chấp nhận
            </Button>
            <Button 
              onClick={handleDecline}
              variant="outline"
              className="flex-1"
            >
              Từ chối
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
