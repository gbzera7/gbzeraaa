import React from 'react';
import { ShoppingCart, Minus, Plus, Trash2, X, CreditCard, QrCode } from 'lucide-react';
import { useOrderStore } from '../store';
import { QRCodeSVG } from 'qrcode.react';

const PaymentMethods = () => {
  const { selectedPaymentMethod, setSelectedPaymentMethod, total } = useOrderStore();

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Escolha a forma de pagamento:</h4>
      
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setSelectedPaymentMethod('pix')}
          className={`p-4 rounded-lg border flex items-center justify-center gap-2 transition-colors ${
            selectedPaymentMethod === 'pix'
              ? 'bg-amber-100 border-amber-500'
              : 'border-gray-200 hover:bg-amber-50'
          }`}
        >
          <QrCode className="w-5 h-5" />
          <span>PIX</span>
        </button>
        
        <button
          onClick={() => setSelectedPaymentMethod('card')}
          className={`p-4 rounded-lg border flex items-center justify-center gap-2 transition-colors ${
            selectedPaymentMethod === 'card'
              ? 'bg-amber-100 border-amber-500'
              : 'border-gray-200 hover:bg-amber-50'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span>Cartão</span>
        </button>
      </div>

      {selectedPaymentMethod === 'pix' && (
        <div className="mt-6 p-4 bg-white rounded-lg border border-amber-200">
          <div className="flex justify-center mb-4">
            <QRCodeSVG
              value={`00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000520400005303986540${total.toFixed(2).replace('.', '')}5802BR5925LANCHONETE SABOR E ARTE6009SAO PAULO62070503***6304E2CA`}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-center text-sm text-gray-600">
            Escaneie o código QR com seu aplicativo de pagamento
          </p>
        </div>
      )}

      {selectedPaymentMethod === 'card' && (
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Número do Cartão
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Validade
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="MM/AA"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="123"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Nome no Cartão
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="NOME COMO ESTÁ NO CARTÃO"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const Cart: React.FC = () => {
  const {
    cart,
    total,
    removeFromCart,
    updateQuantity,
    isCheckoutOpen,
    setCheckoutOpen,
    selectedPaymentMethod,
    clearCart
  } = useOrderStore();

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-2 text-amber-900">
            <ShoppingCart className="w-5 h-5" />
            <h3 className="font-serif text-lg">Seu Pedido</h3>
          </div>
          <button
            onClick={() => setCheckoutOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-4 space-y-4 overflow-auto max-h-[60vh]">
          {!isCheckoutOpen ? (
            <>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-2 p-2 bg-amber-50 rounded">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-1 hover:bg-amber-100 rounded"
                      >
                        <Minus className="w-4 h-4 text-amber-700" />
                      </button>
                      
                      <span className="w-8 text-center">{item.quantity}</span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-amber-100 rounded"
                      >
                        <Plus className="w-4 h-4 text-amber-700" />
                      </button>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 hover:bg-red-100 rounded ml-2"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-amber-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-gray-900">Total:</span>
                  <span className="font-bold text-amber-900">R$ {total.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={() => setCheckoutOpen(true)}
                  className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Ir para Pagamento
                </button>
              </div>
            </>
          ) : (
            <>
              <PaymentMethods />
              
              <div className="mt-6 pt-4 border-t border-amber-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-gray-900">Total a Pagar:</span>
                  <span className="font-bold text-amber-900">R$ {total.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={() => {
                    if (!selectedPaymentMethod) {
                      alert('Por favor, selecione uma forma de pagamento.');
                      return;
                    }
                    alert('Pagamento processado com sucesso!');
                    clearCart();
                  }}
                  className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Finalizar Pagamento
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};