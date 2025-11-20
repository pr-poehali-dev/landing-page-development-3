import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const watches = [
  {
    id: 'big_bang_001',
    name: 'Big Bang Unico',
    price: 14500,
    originalPrice: 16000,
    image: 'https://cdn.poehali.dev/projects/2fabbbd2-b618-4e38-b577-b0de88fc53fb/files/86a72dc0-9c79-420f-87a9-066e48b2346f.jpg',
    description: 'Классическая модель с сапфировым корпусом',
    features: [
      'Автоматический механизм',
      'Водонепроницаемость 100м',
      'Сапфировое стекло',
      'Гарантия 5 лет'
    ],
    badge: 'Хит продаж'
  },
  {
    id: 'classic_fusion_002',
    name: 'Classic Fusion',
    price: 12800,
    originalPrice: 14500,
    image: 'https://cdn.poehali.dev/projects/2fabbbd2-b618-4e38-b577-b0de88fc53fb/files/1408f067-ea51-4919-9504-a46eb9dbd54e.jpg',
    description: 'Элегантность и минимализм в одних часах',
    features: [
      'Швейцарское производство',
      'Титановый корпус',
      'Механизм ETA',
      'Лимитированный выпуск'
    ],
    badge: 'Лимит'
  },
  {
    id: 'spirit_of_big_bang_003',
    name: 'Spirit of Big Bang',
    price: 18900,
    originalPrice: 21000,
    image: 'https://cdn.poehali.dev/projects/2fabbbd2-b618-4e38-b577-b0de88fc53fb/files/3ecfca59-352f-4c04-b475-d375e441c1db.jpg',
    description: 'Премиум коллекция для истинных ценителей',
    features: [
      'Розовое золото',
      'Бриллианты',
      'Хронограф',
      'Эксклюзивный дизайн'
    ],
    badge: 'Премиум'
  }
];

const Index = () => {
  const { toast } = useToast();
  const [selectedWatch, setSelectedWatch] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [additionalServices, setAdditionalServices] = useState({
    insurance: false,
    engraving: false,
    giftBox: false
  });

  const handleOrderClick = (watchId: string) => {
    setSelectedWatch(watchId);
    setShowCheckout(true);
    setTimeout(() => {
      document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заказ оформлен!",
      description: "Мы свяжемся с вами в ближайшее время для подтверждения.",
    });
  };

  const selectedWatchData = watches.find(w => w.id === selectedWatch);
  const servicesPrice = (additionalServices.insurance ? 500 : 0) + 
                        (additionalServices.engraving ? 150 : 0) + 
                        (additionalServices.giftBox ? 200 : 0);
  const totalPrice = selectedWatchData ? selectedWatchData.price + servicesPrice : 0;

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative min-h-screen h-auto sm:h-screen flex items-center justify-center overflow-hidden py-12 sm:py-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=2070)',
            filter: 'brightness(0.3)'
          }}
        />
        <div className="relative z-10 text-center px-4 animate-fade-in max-w-4xl">
          <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-6 py-1.5 sm:py-2 border border-gold rounded-full">
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-gold text-xs sm:text-sm font-light tracking-wide sm:tracking-widest">
              <Icon name="Check" size={14} className="sm:w-4 sm:h-4" />
              <span className="whitespace-nowrap">Официальный дилер</span>
              <Icon name="Check" size={14} className="hidden xs:inline sm:w-4 sm:h-4" />
              <span className="hidden xs:inline whitespace-nowrap">Гарантия 5 лет</span>
              <Icon name="Check" size={14} className="hidden sm:inline" />
              <span className="hidden sm:inline">Сертификаты</span>
            </div>
          </div>
          <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4 sm:mb-6 tracking-wider text-gold leading-tight">
            HUBLOT
          </h1>
          <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-light mb-4 sm:mb-8 tracking-wide px-2">
            Искусство синхронизации и точности
          </p>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
            Эксклюзивные часы, созданные для тех, кто ценит совершенство
          </p>
          <Button 
            size="lg" 
            className="bg-gold hover:bg-gold/90 text-black font-semibold text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-6 rounded-sm w-full xs:w-auto"
            onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Открыть коллекцию
          </Button>
        </div>
      </section>

      <section id="collection" className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 px-2">Выберите свой стиль</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
              Три уникальные коллекции для трех типов людей
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-24">
            {watches.map((watch, index) => (
              <Card 
                key={watch.id} 
                className="group hover-scale overflow-hidden border-2 hover:border-gold transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden bg-gray-50">
                  <img 
                    src={watch.image} 
                    alt={watch.name}
                    className="w-full h-48 xs:h-64 sm:h-72 md:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gold text-black px-2 sm:px-4 py-1 sm:py-2 font-semibold rounded-sm text-xs sm:text-base">
                    {watch.badge}
                  </div>
                </div>
                <CardHeader className="p-3 sm:p-6">
                  <CardTitle className="text-lg xs:text-xl sm:text-2xl font-bold">{watch.name}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">{watch.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-3 sm:p-6 pt-0">
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {watch.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                        <Icon name="Check" size={14} className="text-gold flex-shrink-0 sm:w-4 sm:h-4" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <span className="text-2xl sm:text-3xl font-bold text-gold">${watch.price.toLocaleString()}</span>
                    <span className="text-base sm:text-lg text-gray-400 line-through">${watch.originalPrice.toLocaleString()}</span>
                  </div>
                  <Button 
                    className="w-full bg-black hover:bg-gold hover:text-black transition-colors font-semibold text-sm sm:text-base py-5 sm:py-6"
                    onClick={() => handleOrderClick(watch.id)}
                  >
                    Узнать подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            {[
              { icon: 'Timer', title: 'Точность', desc: 'Швейцарская точность каждой модели' },
              { icon: 'Crown', title: 'Престиж', desc: 'Выбор королей и знаменитостей мира' },
              { icon: 'Award', title: 'Качество', desc: 'Материалы премиум класса и мастерство' },
              { icon: 'Infinity', title: 'Вечность', desc: 'Часы передаются из поколения в поколение' }
            ].map((item, idx) => (
              <div key={idx} className="p-3 sm:p-4 md:p-6">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-4 flex justify-center">
                  <Icon name={item.icon as any} size={32} className="text-gold sm:w-12 sm:h-12" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showCheckout && selectedWatchData && (
        <section id="checkout" className="py-12 sm:py-16 md:py-24 px-3 sm:px-4 bg-black">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 animate-fade-in">
              <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold mb-3 sm:mb-4 text-gold px-2">Ваш заказ почти готов</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 px-4">
                Выполните последние шаги для получения часов мечты
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8">
              <Card className="bg-white/5 border-gold/20">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-gold text-lg sm:text-xl">Информация о заказе</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  <div>
                    <Label className="text-white text-sm sm:text-base">Выбранная модель</Label>
                    <Input 
                      value={selectedWatchData.name} 
                      readOnly 
                      className="bg-white/10 border-gold/30 text-white mt-2 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <Label className="text-white text-sm sm:text-base">Итоговая стоимость</Label>
                    <Input 
                      value={`$${totalPrice.toLocaleString()}`}
                      readOnly 
                      className="bg-white/10 border-gold/30 text-gold font-bold text-lg sm:text-xl mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gold/20">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-gold text-lg sm:text-xl">Информация покупателя</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  <div>
                    <Label htmlFor="name" className="text-white text-sm sm:text-base">Полное имя *</Label>
                    <Input 
                      id="name" 
                      placeholder="Иван Петров" 
                      required 
                      className="bg-white/10 border-gold/30 text-white mt-2 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white text-sm sm:text-base">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="ivan@example.com" 
                      required 
                      className="bg-white/10 border-gold/30 text-white mt-2 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white text-sm sm:text-base">Телефон *</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+7 (999) 999-99-99" 
                      required 
                      className="bg-white/10 border-gold/30 text-white mt-2 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-white text-sm sm:text-base">Страна *</Label>
                    <Select required>
                      <SelectTrigger className="bg-white/10 border-gold/30 text-white mt-2 text-sm sm:text-base">
                        <SelectValue placeholder="Выберите страну" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="russia">Россия</SelectItem>
                        <SelectItem value="belarus">Беларусь</SelectItem>
                        <SelectItem value="kazakhstan">Казахстан</SelectItem>
                        <SelectItem value="ukraine">Украина</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-white text-sm sm:text-base">Адрес доставки *</Label>
                    <Textarea 
                      id="address" 
                      placeholder="Город, улица, дом, квартира" 
                      required 
                      className="bg-white/10 border-gold/30 text-white mt-2 text-sm sm:text-base min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gold/20">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-gold text-lg sm:text-xl">Способ оплаты</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                    <SelectTrigger className="bg-white/10 border-gold/30 text-white text-sm sm:text-base">
                      <SelectValue placeholder="Выберите способ оплаты" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">💳 Кредитная карта</SelectItem>
                      <SelectItem value="bank">🏦 Банковский перевод</SelectItem>
                      <SelectItem value="installment">📅 Рассрочка (12 месяцев)</SelectItem>
                    </SelectContent>
                  </Select>

                  {paymentMethod === 'card' && (
                    <div className="space-y-3 sm:space-y-4 animate-fade-in">
                      <Input 
                        placeholder="Номер карты: 1234 5678 9012 3456" 
                        className="bg-white/10 border-gold/30 text-white text-sm sm:text-base"
                        required
                      />
                      <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <Input 
                          placeholder="MM/YY" 
                          className="bg-white/10 border-gold/30 text-white text-sm sm:text-base"
                          required
                        />
                        <Input 
                          type="password" 
                          placeholder="CVV" 
                          className="bg-white/10 border-gold/30 text-white text-sm sm:text-base"
                          required
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gold/20">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-gold text-lg sm:text-xl">Дополнительные услуги</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <Checkbox 
                      id="insurance"
                      checked={additionalServices.insurance}
                      onCheckedChange={(checked) => 
                        setAdditionalServices(prev => ({ ...prev, insurance: checked as boolean }))
                      }
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="insurance" className="text-white font-semibold cursor-pointer text-sm sm:text-base">
                        Страховка часов — $500
                      </Label>
                      <p className="text-xs sm:text-sm text-gray-400">Полная страховка на 3 года</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <Checkbox 
                      id="engraving"
                      checked={additionalServices.engraving}
                      onCheckedChange={(checked) => 
                        setAdditionalServices(prev => ({ ...prev, engraving: checked as boolean }))
                      }
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="engraving" className="text-white font-semibold cursor-pointer text-sm sm:text-base">
                        Гравировка — $150
                      </Label>
                      <p className="text-xs sm:text-sm text-gray-400">Персональная гравировка на корпусе</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <Checkbox 
                      id="giftBox"
                      checked={additionalServices.giftBox}
                      onCheckedChange={(checked) => 
                        setAdditionalServices(prev => ({ ...prev, giftBox: checked as boolean }))
                      }
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="giftBox" className="text-white font-semibold cursor-pointer text-sm sm:text-base">
                        Премиум упаковка — $200
                      </Label>
                      <p className="text-xs sm:text-sm text-gray-400">Роскошная подарочная коробка</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-3 sm:gap-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gold hover:bg-gold/90 text-black font-bold text-base sm:text-lg py-5 sm:py-6"
                >
                  Завершить покупку
                </Button>
                <Button 
                  type="button" 
                  size="lg" 
                  variant="outline"
                  onClick={() => {
                    setShowCheckout(false);
                    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full border-gold text-gold hover:bg-gold hover:text-black font-semibold py-5 sm:py-6 text-base sm:text-lg"
                >
                  Вернуться в каталог
                </Button>
              </div>

              <div className="text-center text-gray-400 text-xs sm:text-sm space-y-2">
                <p className="flex items-center justify-center gap-2">
                  <Icon name="Lock" size={14} className="text-gold sm:w-4 sm:h-4" />
                  Защищенная транзакция
                </p>
                <p className="px-2">support@hublot-shop.ru<br className="sm:hidden" /><span className="hidden sm:inline"> | </span>Пн-Сб: 10:00-20:00 (МСК)</p>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;