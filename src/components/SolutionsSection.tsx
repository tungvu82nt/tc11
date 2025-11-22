import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Heart, Brain, Sun, Users, Target } from "lucide-react";

interface Solution {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  color: string;
}

const SolutionsSection: React.FC = () => {
  const solutions: Solution[] = [
    {
      id: 1,
      title: "Tập thể dục đều đặn",
      description: "Vận động thể chất giúp giải phóng endorphins, serotonin và dopamine - các chất dẫn truyền thần kinh cải thiện tâm trạng.",
      icon: <Heart className="h-6 w-6" />,
      benefits: [
        "Giảm căng thẳng và lo âu",
        "Cải thiện chất lượng giấc ngủ",
        "Tăng cường sự tự tin",
        "Giảm triệu chứng trầm cảm"
      ],
      color: "text-red-500"
    },
    {
      id: 2,
      title: "Liệu pháp Nhận thức Hành vi (CBT)",
      description: "CBT giúp xác định và thay đổi các suy nghĩ tiêu cực và hành vi không lành mạnh.",
      icon: <Brain className="h-6 w-6" />,
      benefits: [
        "Nhận diện và thay đổi suy nghĩ tiêu cực",
        "Phát triển kỹ năng giải quyết vấn đề",
        "Học cách quản lý cảm xúc",
        "Xây dựng thói quen tích cực"
      ],
      color: "text-blue-500"
    },
    {
      id: 3,
      title: "Thiền chánh niệm",
      description: "Thực hành chánh niệm giúp tập trung vào hiện tại và giảm lo lắng về tương lai.",
      icon: <Sun className="h-6 w-6" />,
      benefits: [
        "Giảm lo âu và căng thẳng",
        "Tăng khả năng tập trung",
        "Cải thiện nhận thức về cảm xúc",
        "Tăng cường sự kiên nhẫn"
      ],
      color: "text-yellow-500"
    },
    {
      id: 4,
      title: "Kết nối xã hội",
      description: "Duy trì mối quan hệ xã hội lành mạnh giúp giảm cảm giác cô đơn và cải thiện tâm trạng.",
      icon: <Users className="h-6 w-6" />,
      benefits: [
        "Giảm cảm giác cô đơn",
        "Tăng cảm giác thuộc về",
        "Cung cấp hỗ trợ cảm xúc",
        "Tạo cơ hội chia sẻ kinh nghiệm"
      ],
      color: "text-green-500"
    },
    {
      id: 5,
      title: "Thiết lập mục tiêu thực tế",
      description: "Đặt ra các mục tiêu nhỏ và có thể đạt được giúp tạo cảm giác thành tựu và kiểm soát.",
      icon: <Target className="h-6 w-6" />,
      benefits: [
        "Tăng cảm giác thành tựu",
        "Cải thiện động lực",
        "Tăng cường sự tự tin",
        "Giảm cảm giác quá tải"
      ],
      color: "text-purple-500"
    },
    {
      id: 6,
      title: "Duy trì chế độ ăn uống lành mạnh",
      description: "Chế độ ăn uống cân bằng cung cấp dưỡng chất cần thiết cho não bộ và cải thiện tâm trạng.",
      icon: <CheckCircle className="h-6 w-6" />,
      benefits: [
        "Cung cấp năng lượng ổn định",
        "Hỗ trợ chức năng não bộ",
        "Cải thiện giấc ngủ",
        "Giảm cảm giác mệt mỏi"
      ],
      color: "text-orange-500"
    }
  ];

  return (
    <section className="py-16 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-in-left">
            Giải pháp cải thiện tâm trạng
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-slide-in-right">
            Dưới đây là các phương pháp đã được khoa học chứng minh giúp cải thiện tâm trạng và suy nghĩ tích cực hơn.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution) => (
            <Card 
              key={solution.id} 
              className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-scale-in"
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className={solution.color}>{solution.icon}</div>
                  <CardTitle className="text-xl">{solution.title}</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  {solution.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline" className="mb-2">Lợi ích:</Badge>
                  <ul className="space-y-1">
                    {solution.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 animate-fade-in">
          <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
            Lời khuyên quan trọng
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            Nếu bạn đang trải qua các triệu chứng trầm cảm nghiêm trọng, hãy tìm kiếm sự giúp đỡ từ chuyên gia y tế. 
            Các phương pháp trên có thể hỗ trợ nhưng không thay thế cho việc điều trị chuyên nghiệp.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-100">
              Tìm kiếm sự giúp đỡ khi cần thiết
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-100">
              Kiên trì áp dụng các phương pháp
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-100">
              Chăm sóc bản thân là ưu tiên
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;