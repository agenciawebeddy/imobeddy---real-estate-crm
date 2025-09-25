import React from 'react';
import { X, BedDouble, Bath, Square, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Property } from '../types';

interface ViewPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

const StatusBadge: React.FC<{ status: Property['status'] }> = ({ status }) => {
  const baseClasses = 'px-4 py-2 text-sm font-bold rounded-full';
  const statusClasses = {
    'À Venda': 'bg-green-500/20 text-green-300 border border-green-500/30',
    'Pendente': 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    'Vendido': 'bg-red-500/20 text-red-300 border border-red-500/30',
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const ViewPropertyModal: React.FC<ViewPropertyModalProps> = ({ isOpen, onClose, property }) => {
  if (!isOpen || !property) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Data não disponível';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-brand-primary rounded-2xl border border-brand-accent/20 shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 text-brand-light hover:text-white bg-brand-secondary/80 rounded-full p-2 transition-colors"
        >
          <X size={24} />
        </button>
        
        {/* Header com imagem */}
        <div className="relative">
          <img 
            src={property.image_url} 
            alt={property.name || property.address}
            className="w-full h-80 object-cover rounded-t-2xl"
          />
          <div className="absolute bottom-4 left-4">
            <StatusBadge status={property.status} />
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="p-8">
          {/* Título e preço */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              {property.name || 'Imóvel sem nome'}
            </h2>
            <div className="flex items-center text-brand-light mb-3">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-lg">{property.address}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-6 h-6 text-brand-cta mr-2" />
              <span className="text-4xl font-bold text-brand-cta">
                R$ {property.price.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>

          {/* Características principais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-brand-secondary p-6 rounded-xl border border-brand-accent/20">
              <div className="flex items-center mb-3">
                <BedDouble className="w-6 h-6 text-brand-cta mr-3" />
                <span className="text-brand-light font-medium">Quartos</span>
              </div>
              <span className="text-3xl font-bold text-white">{property.beds}</span>
            </div>
            
            <div className="bg-brand-secondary p-6 rounded-xl border border-brand-accent/20">
              <div className="flex items-center mb-3">
                <Bath className="w-6 h-6 text-brand-cta mr-3" />
                <span className="text-brand-light font-medium">Banheiros</span>
              </div>
              <span className="text-3xl font-bold text-white">{property.baths}</span>
            </div>
            
            <div className="bg-brand-secondary p-6 rounded-xl border border-brand-accent/20">
              <div className="flex items-center mb-3">
                <Square className="w-6 h-6 text-brand-cta mr-3" />
                <span className="text-brand-light font-medium">Área</span>
              </div>
              <span className="text-3xl font-bold text-white">{property.sqft} m²</span>
            </div>
          </div>

          {/* Informações adicionais */}
          <div className="bg-brand-secondary p-6 rounded-xl border border-brand-accent/20">
            <h3 className="text-xl font-bold text-white mb-4">Informações Adicionais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-brand-light font-medium">ID do Imóvel:</span>
                <p className="text-white font-mono text-sm">{property.id}</p>
              </div>
              <div>
                <span className="text-brand-light font-medium">Data de Cadastro:</span>
                <p className="text-white">{formatDate(property.created_at)}</p>
              </div>
              <div>
                <span className="text-brand-light font-medium">Status:</span>
                <p className="text-white">{property.status}</p>
              </div>
              <div>
                <span className="text-brand-light font-medium">Preço por m²:</span>
                <p className="text-white font-bold">
                  R$ {(property.price / property.sqft).toLocaleString('pt-BR', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Botão de fechar */}
          <div className="flex justify-end mt-8">
            <button 
              onClick={onClose}
              className="bg-brand-cta text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-400 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPropertyModal;