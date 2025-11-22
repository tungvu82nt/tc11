import Hero from "@/components/Hero";
import ContentSection from "@/components/ContentSection";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <ContentSection>
        <div className="space-y-8 md:space-y-10 text-base md:text-lg leading-relaxed fade-in-up max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl font-bold text-foreground text-center animate-fade-in">
            Không có chuyện đó.
          </p>
          
          <div className="space-y-4 text-muted-foreground">
            <p className="animate-slide-in-left">Trầm cảm không phải "buồn quá mức".</p>
            <p className="animate-slide-in-left">Nó là điểm cuối của một hành trình dài.</p>
            <p className="animate-slide-in-left">Một hành trình mà chính bạn cũng quên mình đã đi qua.</p>
          </div>
          
          <div className="space-y-4 text-muted-foreground border-l-4 border-primary pl-6 py-2 bg-card/50 rounded-r-lg shadow-md hover:shadow-lg transition-all duration-300">
            <p>Một ngày kiệt sức.</p>
            <p>Một ngày khóc không lý do.</p>
            <p>Rồi dần dần… đứng ngoài cuộc sống của chính mình.</p>
            <p>Như nhìn qua một tấm kính dày.</p>
            <p className="font-semibold text-foreground">Không còn cảm được gì nữa.</p>
          </div>
        </div>
      </ContentSection>

      <ContentSection className="bg-muted/50">
        <div className="space-y-8 md:space-y-10 text-base md:text-lg leading-relaxed fade-in-up max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center animate-bounce">
            Nhưng mọi thứ đều có gốc rễ.
          </h2>
          
          <div className="space-y-4 text-muted-foreground text-center">
            <p className="animate-fade-in">Bạn không tự dưng gục ngã.</p>
            <p className="animate-fade-in">Bạn chỉ mang quá nhiều. Quá lâu. Trong im lặng.</p>
          </div>
          
          <div className="space-y-3 text-muted-foreground bg-card p-6 md:p-8 rounded-xl border-l-4 border-accent shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
            <p>Mang những điều không nói thành lời.</p>
            <p>Mang sự cô đơn trong chính gia đình.</p>
            <p>Mang áp lực phải "hoàn hảo".</p>
            <p>Mang tuổi thơ chưa lành.</p>
            <p>Mang stress nén chặt đến mức não phải tắt cảm xúc để bảo vệ bạn.</p>
          </div>
          
          <div className="space-y-2 text-lg md:text-xl font-semibold text-center pt-4">
            <p className="text-foreground animate-pulse">Đó không phải yếu đuối.</p>
            <p className="text-accent text-2xl animate-pulse">Đó là sinh tồn.</p>
          </div>
        </div>
      </ContentSection>

      <ContentSection>
        <div className="space-y-8 md:space-y-10 text-base md:text-lg leading-relaxed fade-in-up max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center">
            Trầm cảm đang trẻ hoá.
          </h2>
          
          <div className="space-y-6 text-center max-w-2xl mx-auto">
            <p className="text-muted-foreground">Ngày xưa là người lớn. Giờ thì:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
              <div className="bg-card p-4 rounded-lg border border-border hover:bg-accent/10 transition-colors duration-300 transform hover:scale-105">12 tuổi mất ngủ</div>
              <div className="bg-card p-4 rounded-lg border border-border hover:bg-accent/10 transition-colors duration-300 transform hover:scale-105">15 tuổi kiệt sức</div>
              <div className="bg-card p-4 rounded-lg border border-border hover:bg-accent/10 transition-colors duration-300 transform hover:scale-105">20 tuổi muốn bỏ cuộc</div>
              <div className="bg-card p-4 rounded-lg border border-border hover:bg-accent/10 transition-colors duration-300 transform hover:scale-105">22 tuổi thấy đời vô nghĩa</div>
            </div>
          </div>
          
          <div className="space-y-6 pt-6">
            <p className="text-xl md:text-2xl font-bold text-foreground text-center">
              Gen Z – Gen Alpha lớn lên trong thế giới không có chỗ thở:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
              <div className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg hover:bg-muted transition-colors duration-300">
                <span className="text-accent text-xl">•</span>
                <p>Áp lực học hành nặng</p>
              </div>
              <div className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg hover:bg-muted transition-colors duration-300">
                <span className="text-accent text-xl">•</span>
                <p>Mạng xã hội so sánh liên tục</p>
              </div>
              <div className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg hover:bg-muted transition-colors duration-300">
                <span className="text-accent text-xl">•</span>
                <p>Cô đơn giữa đám đông</p>
              </div>
              <div className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg hover:bg-muted transition-colors duration-300">
                <span className="text-accent text-xl">•</span>
                <p>Ba mẹ bận rộn, ba mẹ ly hôn</p>
              </div>
              <div className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg hover:bg-muted transition-colors duration-300">
                <span className="text-accent text-xl">•</span>
                <p>Sợ thất bại, sợ cả thành công</p>
              </div>
              <div className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg hover:bg-muted transition-colors duration-300">
                <span className="text-accent text-xl">•</span>
                <p>Tự ti nhưng vẫn phải tỏ ra mạnh mẽ</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-6 md:p-10 rounded-2xl border-2 border-accent/20 shadow-lg mt-8 space-y-4 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <p className="text-muted-foreground">Chúng không yếu đuối.</p>
            <p className="text-muted-foreground">
              Chúng chỉ đang đối mặt những áp lực mà thế hệ trước chưa từng trải qua.
            </p>
            <p className="text-foreground font-semibold text-lg md:text-xl">
              Và không ai dạy chúng cách xử lý cảm xúc. Cách đứng dậy. Cách yêu thương bản thân thật sự.
            </p>
          </div>
        </div>
      </ContentSection>

      <ProblemSolutionSection />
    </div>
  );
};

export default Index;
