import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Code , ScanEyeIcon} from "lucide-react";

export default function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        {/* Section Heading */}
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-primary mb-6">
          About Me
        </h2>
        <p className="text-muted-foreground md:text-lg lg:text-xl max-w-[800px] leading-relaxed mx-auto">
          I&apos;m a passionate Full Stack Software Developer with a degree in Software Engineering and certifications including Cisco. 
          I specialize in web and mobile development, cloud infrastructure management(AWS and Digital ocean), and AI/ML. 
          I strive to build scalable, innovative, and user-focused solutions while continuously expanding my skills.
        </p>

        {/* Highlighted Achievements */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Badge className="flex items-center space-x-2 bg-primary text-background px-3 py-2 text-sm font-medium shadow-md hover:scale-105 transition-transform">
            <GraduationCap className="h-4 w-4" />
            <span>Degree in Software Engineering</span>
          </Badge>
          <Badge className="flex items-center space-x-2 bg-primary text-background px-3 py-2 text-sm font-medium shadow-md hover:scale-105 transition-transform">
            <Award className="h-4 w-4" />
            <span>Cisco Certifications</span>
          </Badge>
          <Badge className="bg-secondary  px-3 py-2 text-sm font-medium shadow-md hover:scale-105 transition-transform">
            <Code className="h-4 w-4" />
            <span>Full Stack Developer</span>
          </Badge>
          <Badge className="bg-secondary px-3 py-2 text-sm font-medium shadow-md hover:scale-105 transition-transform">
            <ScanEyeIcon className="h-4 w-4" />
            <span>AI/ML Enthusiast</span>
          </Badge>
        </div>
      </div>
    </section>
  );
}
