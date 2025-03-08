import React from 'react';
import { Coffee, Sandwich, Salad, IceCream2, Wine, Clock, Phone, MapPin, Instagram, Plus } from 'lucide-react';
import { Cart } from './components/Cart';
import { useOrderStore, MenuItem } from './store';

const MenuSection = ({ title, icon: Icon, items }) => {
  const addToCart = useOrderStore((state) => state.addToCart);

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Icon className="w-6 h-6 text-amber-700" />
        <h2 className="text-2xl font-serif text-amber-900">{title}</h2>
      </div>
      <div className="space-y-4">
        {items.map((item: MenuItem) => (
          <div key={item.id} className="flex justify-between items-start p-4 hover:bg-amber-50 rounded-lg transition-colors">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              <p className="text-amber-800 font-medium mt-2">R$ {item.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => addToCart(item)}
              className="ml-4 p-2 text-amber-600 hover:bg-amber-100 rounded-full transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const menuData = {
    cafes: [
      { id: 'cafe-1', name: "Expresso", description: "Café puro e intenso.", price: 5.00, category: 'cafes' },
      { id: 'cafe-2', name: "Cappuccino Clássico", description: "Café com leite vaporizado e uma generosa camada de espuma.", price: 8.00, category: 'cafes' },
      { id: 'cafe-3', name: "Latte Art", description: "Café com leite e desenhos especiais na espuma.", price: 9.00, category: 'cafes' }
    ],
    sanduiches: [
      { id: 'sand-1', name: "Club Sandwich", description: "Frango grelhado, bacon crocante, alface, tomate e maionese especial.", price: 15.00, category: 'sanduiches' },
      { id: 'sand-2', name: "Vegetariano", description: "Berinjela assada, queijo brie, rúcula e molho de mostarda e mel.", price: 12.00, category: 'sanduiches' },
      { id: 'sand-3', name: "Beef Burger", description: "Hambúrguer artesanal, queijo cheddar, cebola caramelizada e molho barbecue.", price: 18.00, category: 'sanduiches' }
    ],
    saladas: [
      { id: 'sal-1', name: "Caesar Salad", description: "Alface romana, croutons, parmesão e molho caesar.", price: 14.00, category: 'saladas' },
      { id: 'sal-2', name: "Salada Tropical", description: "Mix de folhas, manga, queijo branco e molho de laranja.", price: 12.00, category: 'saladas' }
    ],
    sobremesas: [
      { id: 'sob-1', name: "Cheesecake de Frutas Vermelhas", description: "Massa crocante e creme suave com calda de frutas.", price: 10.00, category: 'sobremesas' },
      { id: 'sob-2', name: "Brownie com Sorvete", description: "Brownie quente com sorvete de baunilha.", price: 9.00, category: 'sobremesas' },
      { id: 'sob-3', name: "Petit Gateau", description: "Bolinho de chocolate com recheio cremoso e sorvete.", price: 12.00, category: 'sobremesas' }
    ],
    bebidas: [
      { id: 'beb-1', name: "Sucos Naturais", description: "Laranja, abacaxi, morango ou maracujá.", price: 7.00, category: 'bebidas' },
      { id: 'beb-2', name: "Água com Gás", description: "Com ou sem sabor.", price: 4.00, category: 'bebidas' },
      { id: 'beb-3', name: "Refrigerantes", description: "Coca-Cola, Guaraná, Sprite.", price: 6.00, category: 'bebidas' }
    ]
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <div 
        className="h-[300px] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h1 className="font-serif text-5xl mb-2">Lanchonete Sabor & Arte</h1>
          <p className="text-xl font-light">Sabores que encantam, momentos que ficam</p>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <MenuSection title="Cafés Especiais" icon={Coffee} items={menuData.cafes} />
        <MenuSection title="Sanduíches Gourmet" icon={Sandwich} items={menuData.sanduiches} />
        <MenuSection title="Saladas" icon={Salad} items={menuData.saladas} />
        <MenuSection title="Sobremesas" icon={IceCream2} items={menuData.sobremesas} />
        <MenuSection title="Bebidas" icon={Wine} items={menuData.bebidas} />

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-amber-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-amber-900">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <p className="text-sm">Aberto de segunda a sábado, das 8h às 20h</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <p className="text-sm">(11) 1234-5678</p>
            </div>
            <div className="flex items-center gap-2">
              <Instagram className="w-5 h-5" />
              <p className="text-sm">@lanchonete_saborarte</p>
            </div>
            <div className="flex items-center gap-2 md:col-span-3">
              <MapPin className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">Rua Saboroso, 123 - Centro, São Paulo - SP</p>
            </div>
          </div>
        </div>
      </div>

      <Cart />
    </div>
  );
}

export default App;