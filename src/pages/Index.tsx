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
  },
  {
    id: 3,
    name: 'Клейменова Елена Викторовна',
    position: 'Преподаватель физики, куратор групп Д25 и Д24',
    department: 'Преподаватели группы Д25',
    image: 'https://cdn.poehali.dev/files/9aa5b87e-f429-4655-bf70-247a045eedfd.jpg',
    experience: 8,
    degree: 'Преподаватель',
    specialization: ['Физика', 'Механика', 'Электродинамика'],
    email: 'kleymenova.ev@nvnpimephi.ru',
    achievements: [
      'Преподаватель НВПИ НИЯУ МИФИ',
      'Куратор групп Д25 и Д24',
      'Специализация: физика',
      'Организация научных кружков и олимпиад'
    ]
  },
  {
    id: 4,
    name: 'Кочеткова Марина Валерьевна',
    position: 'Преподаватель истории',
    department: 'Преподаватели группы Д25',
    image: 'https://cdn.poehali.dev/files/896c424e-7460-49e5-a6b1-d73dfe3614e7.png',
    experience: 6,
    degree: 'Преподаватель',
    specialization: ['История', 'История России', 'Всемирная история'],
    email: 'kochetkova.mv@nvnpimephi.ru',
    achievements: [
      'Преподаватель НВПИ НИЯУ МИФИ',
      'Специализация: история',
      'Справедливый подход к студентам',
      'Требовательна к дисциплине и качеству работы'
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMThjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTE4IDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDE4YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
          <img 
            src="https://cdn.poehali.dev/files/825af2aa-e091-4b52-a0fc-402414f8706c.jpg" 
            alt="Препод.info"
            className="h-16 md:h-20 mb-4"
          />
          <p className="text-lg opacity-90 max-w-2xl text-center">
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