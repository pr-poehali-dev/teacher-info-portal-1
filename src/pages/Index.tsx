import { useState } from 'react';
import TeacherCard from '@/components/TeacherCard';
import TeacherDetail from '@/components/TeacherDetail';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

const teachers: Teacher[] = [
  {
    id: 1,
    name: 'Иванов Сергей Петрович',
    position: 'Профессор, доктор наук',
    department: 'Кафедра высшей математики',
    image: 'https://cdn.poehali.dev/projects/3f5b9162-0a15-463e-981c-8ed14fbe5fb7/files/d02d80ac-217c-4609-8bfc-d3245046e563.jpg',
    experience: 25,
    degree: 'Доктор физико-математических наук',
    specialization: ['Математический анализ', 'Функциональный анализ', 'Дифференциальные уравнения'],
    email: 'ivanov.sp@university.edu',
    achievements: [
      'Автор более 100 научных публикаций',
      'Научный руководитель 15 кандидатов наук',
      'Лауреат государственной премии в области науки',
      'Член-корреспондент Российской академии наук'
    ]
  },

];

const departments = [
  'Кафедра высшей математики'
];

export default function Index() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Кафедра высшей математики');

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDepartment = teacher.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Преподавательский состав</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Наши преподаватели — высококвалифицированные специалисты с богатым опытом в науке и образовании
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск по имени, кафедре или специализации..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? "default" : "outline"}
                onClick={() => setSelectedDepartment(dept)}
                className="text-sm"
              >
                {dept}
              </Button>
            ))}
          </div>
        </div>

        {filteredTeachers.length === 0 ? (
          <div className="text-center py-16">
            <Icon name="Users" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Преподаватели не найдены</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacher={teacher}
                onClick={() => setSelectedTeacher(teacher)}
              />
            ))}
          </div>
        )}
      </div>

      <TeacherDetail
        teacher={selectedTeacher}
        open={!!selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
      />
    </div>
  );
}