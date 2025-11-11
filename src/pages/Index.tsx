import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productFeatures, setProductFeatures] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const templates = [
    {
      id: 1,
      name: 'Электроника',
      description: 'Шаблон для гаджетов и техники',
      icon: 'Smartphone',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 2,
      name: 'Одежда',
      description: 'Шаблон для модной одежды',
      icon: 'ShoppingBag',
      color: 'from-pink-500 to-orange-500'
    },
    {
      id: 3,
      name: 'Продукты',
      description: 'Шаблон для продуктов питания',
      icon: 'Apple',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      id: 4,
      name: 'Косметика',
      description: 'Шаблон для beauty-товаров',
      icon: 'Sparkles',
      color: 'from-purple-500 to-blue-500'
    },
    {
      id: 5,
      name: 'Мебель',
      description: 'Шаблон для мебели и декора',
      icon: 'Home',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 6,
      name: 'Спорттовары',
      description: 'Шаблон для спортивных товаров',
      icon: 'Dumbbell',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const handleGenerate = async () => {
    if (!productName || !productCategory) {
      toast({
        title: 'Заполните поля',
        description: 'Укажите название и категорию товара',
        variant: 'destructive'
      });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch('https://functions.poehali.dev/e7d48e4f-87c2-4e8b-b95a-8cb3d71bb7d4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName,
          productCategory,
          productFeatures
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка генерации');
      }

      setGeneratedTitle(data.title);
      setGeneratedDescription(data.description);
      
      toast({
        title: 'Готово!',
        description: 'Карточка товара сгенерирована с помощью ИИ'
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: error instanceof Error ? error.message : 'Не удалось сгенерировать карточку',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
            <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">CardGen AI</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Генератор карточек товаров для маркетплейсов с искусственным интеллектом
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 h-14 bg-white/80 backdrop-blur-sm shadow-lg">
            <TabsTrigger value="home" className="gap-2 data-[state=active]:gradient-bg data-[state=active]:text-white">
              <Icon name="Home" size={18} />
              Главная
            </TabsTrigger>
            <TabsTrigger value="generator" className="gap-2 data-[state=active]:gradient-bg data-[state=active]:text-white">
              <Icon name="Wand2" size={18} />
              Генератор
            </TabsTrigger>
            <TabsTrigger value="templates" className="gap-2 data-[state=active]:gradient-bg data-[state=active]:text-white">
              <Icon name="LayoutTemplate" size={18} />
              Шаблоны
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2 data-[state=active]:gradient-bg data-[state=active]:text-white">
              <Icon name="Settings" size={18} />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover-scale">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                    <Icon name="Zap" size={28} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">Быстрая генерация</CardTitle>
                  <CardDescription className="text-base">
                    Создавайте привлекательные карточки товаров за секунды с помощью ИИ
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover-scale">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center mb-4">
                    <Icon name="Brain" size={28} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">ИИ-помощник</CardTitle>
                  <CardDescription className="text-base">
                    Умные алгоритмы создают уникальные описания для каждого товара
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover-scale">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                    <Icon name="LayoutTemplate" size={28} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">Готовые шаблоны</CardTitle>
                  <CardDescription className="text-base">
                    Библиотека шаблонов для разных категорий товаров
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover-scale">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                    <Icon name="TrendingUp" size={28} className="text-white" />
                  </div>
                  <CardTitle className="text-2xl">Рост продаж</CardTitle>
                  <CardDescription className="text-base">
                    Качественные описания увеличивают конверсию на маркетплейсах
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white">
              <CardHeader className="text-center py-12">
                <CardTitle className="text-3xl mb-4">Начните создавать карточки прямо сейчас</CardTitle>
                <CardDescription className="text-white/90 text-lg mb-6">
                  Перейдите в раздел "Генератор" и создайте первую карточку товара
                </CardDescription>
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-white/90 font-semibold text-lg px-8"
                  onClick={() => setActiveTab('generator')}
                >
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Создать карточку
                </Button>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="generator" className="space-y-6 animate-fade-in">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icon name="Edit" size={24} className="text-primary" />
                    Данные товара
                  </CardTitle>
                  <CardDescription>Заполните информацию о вашем товаре</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-semibold">Название товара</Label>
                    <Input
                      id="name"
                      placeholder="Например: Беспроводные наушники"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-base font-semibold">Категория</Label>
                    <Input
                      id="category"
                      placeholder="Например: Электроника"
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="features" className="text-base font-semibold">
                      Особенности (опционально)
                    </Label>
                    <Textarea
                      id="features"
                      placeholder="Укажите ключевые особенности товара"
                      value={productFeatures}
                      onChange={(e) => setProductFeatures(e.target.value)}
                      className="min-h-24 text-base"
                    />
                  </div>

                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full h-14 text-lg font-semibold gradient-bg hover:opacity-90 transition-opacity"
                  >
                    {isGenerating ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Генерация...
                      </>
                    ) : (
                      <>
                        <Icon name="Sparkles" size={20} className="mr-2" />
                        Сгенерировать с ИИ
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icon name="FileText" size={24} className="text-secondary" />
                    Результат
                  </CardTitle>
                  <CardDescription>Готовая карточка для маркетплейса</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {generatedTitle ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-base font-semibold">Заголовок</Label>
                          <Badge className="gradient-bg">SEO оптимизирован</Badge>
                        </div>
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="font-medium text-base">{generatedTitle}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-base font-semibold">Описание</Label>
                          <Badge variant="secondary">Готово к публикации</Badge>
                        </div>
                        <div className="p-4 bg-muted rounded-lg max-h-80 overflow-y-auto">
                          <p className="text-base whitespace-pre-line">{generatedDescription}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 h-12">
                          <Icon name="Copy" size={18} className="mr-2" />
                          Копировать
                        </Button>
                        <Button className="flex-1 h-12 gradient-bg hover:opacity-90">
                          <Icon name="Download" size={18} className="mr-2" />
                          Сохранить
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4">
                        <Icon name="FileQuestion" size={40} className="text-primary" />
                      </div>
                      <p className="text-muted-foreground text-lg">
                        Заполните форму и нажмите "Сгенерировать"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="animate-fade-in">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">Библиотека шаблонов</CardTitle>
                <CardDescription>Выберите готовый шаблон для вашей категории товаров</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover-scale cursor-pointer group overflow-hidden"
                >
                  <div className={`h-32 bg-gradient-to-br ${template.color} flex items-center justify-center transition-transform group-hover:scale-105`}>
                    <Icon name={template.icon as any} size={48} className="text-white" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{template.name}</CardTitle>
                    <CardDescription className="text-base">{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      <Icon name="Eye" size={18} className="mr-2" />
                      Просмотреть
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Настройки приложения</CardTitle>
                <CardDescription>Настройте параметры генерации карточек</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="tone" className="text-base font-semibold">Тон описания</Label>
                  <Input
                    id="tone"
                    placeholder="Например: Формальный, дружелюбный, энергичный"
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="length" className="text-base font-semibold">Длина описания</Label>
                  <Input
                    id="length"
                    placeholder="Например: Короткое, среднее, подробное"
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords" className="text-base font-semibold">Ключевые слова для SEO</Label>
                  <Textarea
                    id="keywords"
                    placeholder="Укажите ключевые слова через запятую"
                    className="min-h-24 text-base"
                  />
                </div>

                <Button className="w-full h-12 gradient-bg hover:opacity-90">
                  <Icon name="Save" size={18} className="mr-2" />
                  Сохранить настройки
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;