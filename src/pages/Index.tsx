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
  {
    id: 2,
    name: 'Смирнова Елена Викторовна',
    position: 'Доцент, кандидат наук',
    department: 'Кафедра прикладной информатики',
    image: 'https://cdn.poehali.dev/projects/3f5b9162-0a15-463e-981c-8ed14fbe5fb7/files/25f22988-fad7-4fa5-8140-129a1ce37274.jpg',
    experience: 15,
    degree: 'Кандидат технических наук',
    specialization: ['Алгоритмы и структуры данных', 'Машинное обучение', 'Искусственный интеллект'],
    email: 'smirnova.ev@university.edu',
    achievements: [
      'Разработка инновационных методов обучения',
      'Руководитель лаборатории машинного обучения',
      'Победитель конкурса "Лучший преподаватель года"',
      'Автор 5 учебных пособий'
    ]
  },
  {
    id: 3,
    name: 'Петров Михаил Александрович',
    position: 'Профессор, доктор наук',
    department: 'Кафедра физики',
    image: 'https://cdn.poehali.dev/projects/3f5b9162-0a15-463e-981c-8ed14fbe5fb7/files/445dfe22-e382-4619-8e8a-3e5912a15983.jpg',
    experience: 30,
    degree: 'Доктор физико-математических наук',
    specialization: ['Квантовая физика', 'Термодинамика', 'Статистическая физика'],
    email: 'petrov.ma@university.edu',
    achievements: [
      'Стаж научной работы более 35 лет',
      'Руководитель крупных исследовательских проектов',
      'Международное признание в области квантовой физики',
      'Лектор международных конференций'
    ]
  },
  {
    id: 4,
    name: 'Козлова Анна Николаевна',
    position: 'Доцент, кандидат наук',
    department: 'Кафедра экономики',
    image: 'https://cdn.poehali.dev/projects/3f5b9162-0a15-463e-981c-8ed14fbe5fb7/files/25f22988-fad7-4fa5-8140-129a1ce37274.jpg',
    experience: 12,
    degree: 'Кандидат экономических наук',
    specialization: ['Макроэкономика', 'Финансовый анализ', 'Экономическая теория'],
    email: 'kozlova.an@university.edu',
    achievements: [
      'Консультант крупных финансовых компаний',
      'Эксперт в области финансового анализа',
      'Автор более 40 научных статей',
      'Разработка учебных программ'
    ]
  },
  {
    id: 5,
    name: 'Волков Дмитрий Игоревич',
    position: 'Профессор, доктор наук',
    department: 'Кафедра химии',
    image: 'https://cdn.poehali.dev/projects/3f5b9162-0a15-463e-981c-8ed14fbe5fb7/files/d02d80ac-217c-4609-8bfc-d3245046e563.jpg',
    experience: 22,
    degree: 'Доктор химических наук',
    specialization: ['Органическая химия', 'Биохимия', 'Химический синтез'],
    email: 'volkov.di@university.edu',
    achievements: [
      'Открытия в области органического синтеза',
      'Руководитель химической лаборатории',
      'Патенты на изобретения',
      'Международные публикации в топовых журналах'
    ]
  },
  {
    id: 6,
    name: 'Морозова Ольга Сергеевна',
    position: 'Доцент, кандидат наук',
    department: 'Кафедра иностранных языков',
    image: 'https://cdn.poehali.dev/projects/3f5b9162-0a15-463e-981c-8ed14fbe5fb7/files/25f22988-fad7-4fa5-8140-129a1ce37274.jpg',
    experience: 18,
    degree: 'Кандидат филологических наук',
    specialization: ['Английская литература', 'Деловой английский', 'Лингвистика'],
    email: 'morozova.os@university.edu',
    achievements: [
      'Преподаватель международного уровня',
      'Сертификат CELTA',
      'Организатор языковых стажировок',
      'Автор методических пособий'
    ]
  }
];

const departments = [
  'Все кафедры',
  'Кафедра высшей математики',
  'Кафедра прикладной информатики',
  'Кафедра физики',
  'Кафедра экономики',
  'Кафедра химии',
  'Кафедра иностранных языков'
];

export default function Index() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Все кафедры');

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.specialization.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDepartment = selectedDepartment === 'Все кафедры' || teacher.department === selectedDepartment;
    
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
