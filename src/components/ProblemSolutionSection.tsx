import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Heart, Brain, Users, Target, Apple, Activity, Lightbulb } from "lucide-react";

interface ProblemSolutionPair {
  problem: {
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  solution: {
    title: string;
    description: string;
    icon: React.ReactNode;
  };
}

const ProblemSolutionSection = () => {
  const problemSolutionPairs: ProblemSolutionPair[] = [
    {
      problem: {
        title: "Mất hứng thú và Tê liệt cảm xúc",
        description: "Không còn thích điều từng thích, mệt dù không làm gì, ngủ nhiều mà vẫn mệt. Tách khỏi cảm xúc, không buồn không vui, chỉ trống rỗng.",
        icon: <AlertTriangle className="h-6 w-6 text-destructive" />
      },
      solution: {
        title: "Tập thể dục đều đặn",
        description: "Vận động giải phóng endorphins - hormone hạnh phúc tự nhiên. Chỉ cần 30 phút đi bộ mỗi ngày đã cải thiện tâm trạng đáng kể và giảm lo âu.",
        icon: <Activity className="h-6 w-6 text-green-600" />
      }
    },
    {
      problem: {
        title: "Mất hy vọng và Thu mình",
        description: "Thấy cuộc sống 'không còn gì đáng mong chờ', không muốn ra khỏi phòng, không muốn gặp ai, trốn vào thế giới online.",
        icon: <AlertTriangle className="h-6 w-6 text-destructive" />
      },
      solution: {
        title: "Liệu pháp Nhận thức Hành vi (CBT)",
        description: "CBT giúp nhận diện và thay đổi suy nghĩ tiêu cực thành tích cực. Kỹ thuật này đã được chứng minh hiệu quả trong điều trị trầm cảm.",
        icon: <Brain className="h-6 w-6 text-blue-600" />
      }
    },
    {
      problem: {
        title: "Thay đổi cảm xúc và Giảm tập trung",
        description: "Dễ nổi nóng, dễ bật khóc. Học sa sút, không phải lười - mà não đang suy kiệt.",
        icon: <AlertTriangle className="h-6 w-6 text-destructive" />
      },
      solution: {
        title: "Thiền và Chánh niệm",
        description: "Thực hành thiền 10-15 phút mỗi ngày giúp giảm stress, tăng khả năng tập trung và kiểm soát cảm xúc tốt hơn.",
        icon: <Lightbulb className="h-6 w-6 text-yellow-600" />
      }
    },
    {
      problem: {
        title: "Tự ti sâu sắc",
        description: "Than 'mình vô dụng', 'không ai hiểu mình'. Dính điện thoại nhưng không thật sự vui.",
        icon: <AlertTriangle className="h-6 w-6 text-destructive" />
      },
      solution: {
        title: "Kết nối xã hội",
        description: "Chia sẻ cảm xúc với người thân và bạn bè. Kết nối chân thành giúp giảm cảm giác cô đơn và tăng cảm giác được thấu hiểu.",
        icon: <Users className="h-6 w-6 text-purple-600" />
      }
    },
    {
      problem: {
        title: "Rối loạn cơ thể",
        description: "Đau đầu, đau bụng, buồn nôn, mệt vô cớ. Đó là rối loạn cơ thể đi kèm trầm cảm.",
        icon: <AlertTriangle className="h-6 w-6 text-destructive" />
      },
      solution: {
        title: "Chế độ ăn uống lành mạnh",
        description: "Bổ sung thực phẩm giàu Omega-3, axit folic và vitamin D. Tránh caffeine và đường quá mức giúp ổn định tâm trạng.",
        icon: <Apple className="h-6 w-6 text-red-600" />
      }
    }
  ];

  return (
    <div className="space-y-16 py-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
          Nhận diện và Hành động
        </h2>
        <p className="text-base md:text-lg text-muted-foreground">
          Mỗi vấn đề đều có giải pháp. Điều quan trọng là nhận biết sớm và hành động kịp thời.
        </p>
      </div>
      
      {problemSolutionPairs.map((pair, index) => (
        <div key={index} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Problem Card */}
            <Card className={`border-l-4 border-destructive shadow-md hover:shadow-lg transition-all duration-300 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  {pair.problem.icon}
                  <CardTitle className="text-xl text-destructive">{pair.problem.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base leading-relaxed">
                  {pair.problem.description}
                </CardDescription>
              </CardContent>
            </Card>
            
            {/* Solution Card */}
            <Card className={`border-l-4 border-green-600 shadow-md hover:shadow-lg transition-all duration-300 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  {pair.solution.icon}
                  <CardTitle className="text-xl text-green-600">{pair.solution.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base leading-relaxed">
                  {pair.solution.description}
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          
          {/* Connecting visual element */}
          {index < problemSolutionPairs.length - 1 && (
            <div className="flex justify-center">
              <div className="h-px w-24 bg-gradient-to-r from-destructive via-muted to-green-600"></div>
            </div>
          )}
        </div>
      ))}
      
      <div className="text-center mt-16 max-w-3xl mx-auto">
        <Card className="border-2 border-primary/20 shadow-lg">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-red-500 animate-pulse" />
            </div>
            <CardTitle className="text-2xl text-foreground">Bạn không đơn độc</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-muted-foreground text-base leading-relaxed">
              Hành trình phục hồi cần thời gian và sự kiên nhẫn. Đừng ngần ngại chia sẻ cùng những người bạn tin tưởng 
              và lắng nghe bạn. Chăm sóc sức khỏe tinh thần cũng quan trọng như chăm sóc sức khỏe thể chất.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProblemSolutionSection;