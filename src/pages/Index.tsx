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
    name: 'Люлина Дарья Дмитриевна',
    position: 'Преподаватель математики',
    department: 'Преподаватели группы Д25',
    image: 'https://cdn.poehali.dev/files/3251dba0-285d-4785-bb8b-a78dddd18bc2.jpg',
    experience: 5,
    degree: 'Преподаватель',
    specialization: ['Высшая математика', 'Математический анализ', 'Алгебра'],
    email: 'lyulina.dd@nvnpimephi.ru',
    achievements: [
      'Преподаватель НВПИ НИЯУ МИФИ',
      'Специализация: высшая математика',
      'Индивидуальный подход к каждому студенту',
      'Опыт преподавания в техническом вузе'
    ]
  },
  {
    id: 2,
    name: 'Ковалева Софья Александровна',
    position: 'Преподаватель биологии',
    department: 'Преподаватели группы Д25',
    image: 'https://cdn.poehali.dev/files/338e7a58-8b59-48b1-a163-4a355e9c1d9e.png',
    experience: 4,
    degree: 'Преподаватель',
    specialization: ['Биология', 'Общая биология', 'Ботаника'],
    email: 'kovaleva.sa@nvnpimephi.ru',
    achievements: [
      'Преподаватель НВПИ НИЯУ МИФИ',
      'Специализация: биология',
      'Современные методы преподавания',
      'Подготовка студентов к олимпиадам'
    ]
  }
];

const departments = [
  'Преподаватели группы Д25'
];

export default function Index() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Преподаватели группы Д25');

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