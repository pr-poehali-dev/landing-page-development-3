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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=2070)',
            filter: 'brightness(0.3)'
          }}
        />
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <div className="inline-block mb-4 px-6 py-2 border border-gold rounded-full">
            <div className="flex items-center gap-2 text-gold text-sm font-light tracking-widest">
              <Icon name="Check" size={16} />
              <span>Официальный дилер</span>
              <Icon name="Check" size={16} />
              <span>Гарантия 5 лет</span>
              <Icon name="Check" size={16} />
              <span>Сертификаты</span>
            </div>
          </div>
          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-wider text-gold">
            HUBLOT
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-8 tracking-wide">
            Искусство синхронизации и точности
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Эксклюзивные часы, созданные для тех, кто ценит совершенство
          </p>
          <Button 
            size="lg" 
            className="bg-gold hover:bg-gold/90 text-black font-semibold text-lg px-12 py-6 rounded-sm"
            onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Открыть коллекцию
          </Button>
        </div>
      </section>

      <section id="collection" className="py-24 px-4 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Выберите свой стиль</h2>
            <p className="text-xl text-gray-600">
              Три уникальные коллекции для трех типов людей
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
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
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-gold text-black px-4 py-2 font-semibold rounded-sm">
                    {watch.badge}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{watch.name}</CardTitle>
                  <CardDescription className="text-base">{watch.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {watch.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Icon name="Check" size={16} className="text-gold flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-bold text-gold">${watch.price.toLocaleString()}</span>
                    <span className="text-lg text-gray-400 line-through">${watch.originalPrice.toLocaleString()}</span>
                  </div>
                  <Button 
                    className="w-full bg-black hover:bg-gold hover:text-black transition-colors font-semibold"
                    onClick={() => handleOrderClick(watch.id)}
                  >
                    Узнать подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: 'Timer', title: 'Точность', desc: 'Швейцарская точность каждой модели' },
              { icon: 'Crown', title: 'Престиж', desc: 'Выбор королей и знаменитостей мира' },
              { icon: 'Award', title: 'Качество', desc: 'Материалы премиум класса и мастерство' },
              { icon: 'Infinity', title: 'Вечность', desc: 'Часы передаются из поколения в поколение' }
            ].map((item, idx) => (
              <div key={idx} className="p-6">
                <div className="text-4xl mb-4 flex justify-center">
                  <Icon name={item.icon as any} size={48} className="text-gold" />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showCheckout && selectedWatchData && (
        <section id="checkout" className="py-24 px-4 bg-black">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-5xl font-bold mb-4 text-gold">Ваш заказ почти готов</h2>
              <p className="text-xl text-gray-300">
                Выполните последние шаги для получения часов мечты
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <Card className="bg-white/5 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold">Информация о заказе</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white">Выбранная модель</Label>
                    <Input 
                      value={selectedWatchData.name} 
                      readOnly 
                      className="bg-white/10 border-gold/30 text-white mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Итоговая стоимость</Label>
                    <Input 
                      value={`$${totalPrice.toLocaleString()}`}
                      readOnly 
                      className="bg-white/10 border-gold/30 text-gold font-bold text-xl mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold">Информация покупателя</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Полное имя *</Label>
                    <Input 
                      id="name" 
                      placeholder="Иван Петров" 
                      required 
                      className="bg-white/10 border-gold/30 text-white mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="ivan@example.com" 
                      required 
                      className="bg-white/10 border-gold/30 text-white mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">Телефон *</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+7 (999) 999-99-99" 
                      required 
                      className="bg-white/10 border-gold/30 text-white mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-white">Страна *</Label>
                    <Select required>
                      <SelectTrigger className="bg-white/10 border-gold/30 text-white mt-2">
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
                    <Label htmlFor="address" className="text-white">Адрес доставки *</Label>
                    <Textarea 
                      id="address" 
                      placeholder="Город, улица, дом, квартира" 
                      required 
                      className="bg-white/10 border-gold/30 text-white mt-2"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold">Способ оплаты</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                    <SelectTrigger className="bg-white/10 border-gold/30 text-white">
                      <SelectValue placeholder="Выберите способ оплаты" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">💳 Кредитная карта</SelectItem>
                      <SelectItem value="bank">🏦 Банковский перевод</SelectItem>
                      <SelectItem value="installment">📅 Рассрочка (12 месяцев)</SelectItem>
                    </SelectContent>
                  </Select>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 animate-fade-in">
                      <Input 
                        placeholder="Номер карты: 1234 5678 9012 3456" 
                        className="bg-white/10 border-gold/30 text-white"
                        required
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input 
                          placeholder="MM/YY" 
                          className="bg-white/10 border-gold/30 text-white"
                          required
                        />
                        <Input 
                          type="password" 
                          placeholder="CVV" 
                          className="bg-white/10 border-gold/30 text-white"
                          required
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-gold/20">
                <CardHeader>
                  <CardTitle className="text-gold">Дополнительные услуги</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="insurance"
                      checked={additionalServices.insurance}
                      onCheckedChange={(checked) => 
                        setAdditionalServices(prev => ({ ...prev, insurance: checked as boolean }))
                      }
                    />
                    <div className="flex-1">
                      <Label htmlFor="insurance" className="text-white font-semibold cursor-pointer">
                        Страховка часов — $500
                      </Label>
                      <p className="text-sm text-gray-400">Полная страховка на 3 года</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="engraving"
                      checked={additionalServices.engraving}
                      onCheckedChange={(checked) => 
                        setAdditionalServices(prev => ({ ...prev, engraving: checked as boolean }))
                      }
                    />
                    <div className="flex-1">
                      <Label htmlFor="engraving" className="text-white font-semibold cursor-pointer">
                        Гравировка — $150
                      </Label>
                      <p className="text-sm text-gray-400">Персональная гравировка на корпусе</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="giftBox"
                      checked={additionalServices.giftBox}
                      onCheckedChange={(checked) => 
                        setAdditionalServices(prev => ({ ...prev, giftBox: checked as boolean }))
                      }
                    />
                    <div className="flex-1">
                      <Label htmlFor="giftBox" className="text-white font-semibold cursor-pointer">
                        Премиум упаковка — $200
                      </Label>
                      <p className="text-sm text-gray-400">Роскошная подарочная коробка</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="flex-1 bg-gold hover:bg-gold/90 text-black font-bold text-lg py-6"
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
                  className="flex-1 border-gold text-gold hover:bg-gold hover:text-black font-semibold py-6"
                >
                  Вернуться в каталог
                </Button>
              </div>

              <div className="text-center text-gray-400 text-sm space-y-2">
                <p className="flex items-center justify-center gap-2">
                  <Icon name="Lock" size={16} className="text-gold" />
                  Защищенная транзакция
                </p>
                <p>support@hublot-shop.ru | Пн-Сб: 10:00-20:00 (МСК)</p>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
