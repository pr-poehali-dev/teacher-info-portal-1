import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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

interface TeacherCardProps {
  teacher: Teacher;
  onClick: () => void;
}

export default function TeacherCard({ teacher, onClick }: TeacherCardProps) {
  return (
    <Card 
      className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-white hover:scale-[1.05] shadow-md"
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img 
          src={teacher.image} 
          alt={teacher.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-1">{teacher.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{teacher.position}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-foreground">
            <Icon name="GraduationCap" size={16} className="mr-2 text-primary" />
            <span>{teacher.degree}</span>
          </div>
          <div className="flex items-center text-sm text-foreground">
            <Icon name="Briefcase" size={16} className="mr-2 text-primary" />
            <span>Опыт: {teacher.experience} лет</span>
          </div>
          <div className="flex items-center text-sm text-foreground">
            <Icon name="Building2" size={16} className="mr-2 text-primary" />
            <span>{teacher.department}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {teacher.specialization.slice(0, 3).map((spec, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {spec}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}