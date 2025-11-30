import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  text: string;
}

interface ReviewsSectionProps {
  teacherId: number;
}

export default function ReviewsSection({ teacherId }: ReviewsSectionProps) {
  const getInitialReviews = () => {
    if (teacherId === 1) {
      return [
        {
          id: 1,
          name: 'Иван Петров',
          date: '15 ноября 2024',
          rating: 5,
          text: 'Отличный преподаватель! Объясняет сложные темы простым языком. Всегда готова помочь и ответить на вопросы.'
        },
        {
          id: 2,
          name: 'Мария Сидорова',
          date: '10 ноября 2024',
          rating: 5,
          text: 'Очень внимательный и терпеливый педагог. Благодаря Дарье Дмитриевне я начала понимать высшую математику!'
        }
      ];
    } else if (teacherId === 2) {
      return [
        {
          id: 1,
          name: 'Алексей Морозов',
          date: '20 ноября 2024',
          rating: 5,
          text: 'Софья Александровна делает биологию интересной! Каждая лекция — это увлекательное путешествие в мир живой природы.'
        },
        {
          id: 2,
          name: 'Екатерина Волкова',
          date: '18 ноября 2024',
          rating: 5,
          text: 'Прекрасный преподаватель! Использует современные методы обучения, всегда приводит актуальные примеры из жизни.'
        }
      ];
    } else if (teacherId === 3) {
      return [
        {
          id: 1,
          name: 'Быков Егор',
          date: '25 ноября 2024',
          rating: 5,
          text: 'Елена Викторовна — замечательный куратор и преподаватель! Всегда поддержит, поможет разобраться в сложных темах по физике.'
        },
        {
          id: 2,
          name: 'Ахмедбаев Тимур',
          date: '22 ноября 2024',
          rating: 5,
          text: 'Лучший куратор! Елена Викторовна не только отлично преподает физику, но и всегда готова помочь с любыми вопросами группы.'
        }
      ];
    }
    return [];
  };

  const [reviews, setReviews] = useState<Review[]>(getInitialReviews());

  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    text: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const review: Review = {
      id: reviews.length + 1,
      name: newReview.name,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
      rating: newReview.rating,
      text: newReview.text
    };

    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, text: '' });
    setShowForm(false);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={16}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-lg flex items-center text-foreground">
          <Icon name="MessageSquare" size={20} className="mr-2 text-primary" />
          Отзывы студентов ({reviews.length})
        </h4>
        <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "outline" : "default"}>
          <Icon name={showForm ? "X" : "Plus"} size={16} className="mr-2" />
          {showForm ? 'Отмена' : 'Оставить отзыв'}
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                <Input
                  required
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  placeholder="Введите ваше имя"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Оценка</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className="focus:outline-none"
                    >
                      <Icon
                        name="Star"
                        size={24}
                        className={star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Ваш отзыв</label>
                <Textarea
                  required
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  placeholder="Поделитесь своим опытом обучения"
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full">
                Опубликовать отзыв
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className="text-foreground">{review.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}