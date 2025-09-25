import React from 'react';
import { BedDouble, Bath, Square, Eye, Edit, Trash2 } from 'lucide-react';
import { Property } from '../types';

const StatusBadge: React.FC<{ status: Property['status'] }> = ({ status }) => {
  const baseClasses = 'px-3 py-1 text-xs font-bold rounded-full';
  const statusClasses = {
    'À Venda': 'bg-green-500/20 text-green-300',
    'Pendente': 'bg-amber-500/20 text-amber-300',
    'Vendido': 'bg-red-500/20 text-red-300',
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

interface PropertyListingsProps {
  title?: string;
  properties: Property[];
  onView?: (property: Property) => void;
  onEdit?: (property: Property) => void;
  onDelete?: (property: Property) => void;
}

const PropertyListings: React.FC<PropertyListingsProps> = ({ title, properties, onView, onEdit, onDelete }) => {
  return (
    <div className="bg-brand-primary p-6 rounded-2xl border border-brand-accent/20 shadow-lg">
      {title && <h3 className="text-xl font-bold text-white mb-4">{title}</h3>}
       {properties.length === 0 ? (
        <p className="text-brand-light text-center py-8">Nenhum imóvel encontrado.</p>
      ) : (
        <div className="space-y-4">
          {properties.map(prop => (
            <div key={prop.id} className="flex items-center bg-brand-secondary p-4 rounded-xl hover:bg-brand-accent/50 transition-colors duration-200">
              <img src={prop.image_url} alt={prop.name || prop.address} className="w-32 h-24 object-cover rounded-lg" />
              <div className="flex-1 ml-4 grid grid-cols-4 items-center gap-4">
                <div className="col-span-2">
                  {prop.name ? (
                    <>
                      <p className="font-bold text-white text-lg">{prop.name}</p>
                      <p className="font-semibold text-brand-light text-sm">{prop.address}</p>
                    </>
                  ) : (
                    <p className="font-semibold text-white">{prop.address}</p>
                  )}
                  <p className="text-lg font-bold text-brand-cta mt-1">R${prop.price.toLocaleString('pt-BR')}</p>
                </div>
                <div className="flex items-center space-x-4 text-brand-light">
                  <span className="flex items-center"><BedDouble className="w-4 h-4 mr-2" />{prop.beds}</span>
                  <span className="flex items-center"><Bath className="w-4 h-4 mr-2" />{prop.baths}</span>
                  <span className="flex items-center"><Square className="w-4 h-4 mr-2" />{prop.sqft} m²</span>
                </div>
                <div className="flex justify-end items-center space-x-3">
                  <StatusBadge status={prop.status} />
                  {onView && <button onClick={() => onView(prop)} className="text-brand-light hover:text-brand-cta transition-colors"><Eye size={18} /></button>}
                  {onEdit && <button onClick={() => onEdit(prop)} className="text-brand-light hover:text-green-400 transition-colors"><Edit size={18} /></button>}
                  {onDelete && <button onClick={() => onDelete(prop)} className="text-brand-light hover:text-red-400 transition-colors"><Trash2 size={18} /></button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyListings;