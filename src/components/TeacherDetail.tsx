import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import ReviewsSection from './ReviewsSection';

interface Teacher {
  id: number;
  name: string;
  position: string;
  department: string;
  image: string;
  experience: number;
  degree: string;
  specialization: string[];
  email: string;
  achievements: string[];
}

interface TeacherDetailProps {
  teacher: Teacher | null;
  open: boolean;
  onClose: () => void;
}

export default function TeacherDetail({ teacher, open, onClose }: TeacherDetailProps) {
  if (!teacher) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{teacher.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          <div>
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4">
              <img 
                src={teacher.image} 
                alt={teacher.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <Icon name="Mail" size={18} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
                <a href={`mailto:${teacher.email}`} className="text-sm hover:text-primary transition-colors break-all">
                  {teacher.email}
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{teacher.position}</h3>
              <p className="text-muted-foreground">{teacher.department}</p>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3 flex items-center text-foreground">
                <Icon name="GraduationCap" size={18} className="mr-2 text-primary" />
                Образование и квалификация
              </h4>
              <p className="text-foreground mb-2">{teacher.degree}</p>
              <p className="text-sm text-muted-foreground">Опыт преподавания: {teacher.experience} лет</p>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3 flex items-center text-foreground">
                <Icon name="BookOpen" size={18} className="mr-2 text-primary" />
                Специализация
              </h4>
              <div className="flex flex-wrap gap-2">
                {teacher.specialization.map((spec, index) => (
                  <Badge key={index} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-3 flex items-center text-foreground">
                <Icon name="Award" size={18} className="mr-2 text-primary" />
                Достижения
              </h4>
              <ul className="space-y-2">
                {teacher.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-sm text-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <ReviewsSection teacherId={teacher.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}