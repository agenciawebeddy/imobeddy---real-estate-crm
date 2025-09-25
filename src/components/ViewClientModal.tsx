import React, { useState, useEffect, useCallback } from 'react';
import { X, User, Mail, Phone, Home, Calendar, PlusCircle } from 'lucide-react';
import { Client, Property, PurchaseOrder } from '../types';
import { supabase } from '../integrations/supabase/client';
import LinkPropertyModal from './LinkPropertyModal';

interface ViewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
}

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string | number | undefined | null }> = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="text-brand-cta mr-4 mt-1">{icon}</div>
    <div>
      <p className="text-sm text-brand-light">{label}</p>
      <p className="text-white font-semibold">{value || 'N/A'}</p>
    </div>
  </div>
);

const ViewClientModal: React.FC<ViewClientModalProps> = ({ isOpen, onClose, client }) => {
  const [linkedProperties, setLinkedProperties] = useState<Property[]>([]);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  const fetchLinkedProperties = useCallback(async () => {
    if (!client) return;
    
    const { data: orders, error: ordersError } = await supabase
      .from('purchase_orders')
      .select('property_id')
      .eq('client_id', client.id);

    if (ordersError || !orders || orders.length === 0) {
      setLinkedProperties([]);
      return;
    }

    const propertyIds = orders.map(o => o.property_id);
    
    const { data: properties, error: propertiesError } = await supabase
      .from('properties')
      .select('*')
      .in('id', propertyIds);

    if (propertiesError) {
      console.error("Error fetching linked properties:", propertiesError);
      setLinkedProperties([]);
    } else {
      setLinkedProperties(properties as Property[]);
    }
  }, [client]);

  useEffect(() => {
    if (isOpen) {
      fetchLinkedProperties();
    }
  }, [isOpen, fetchLinkedProperties]);

  if (!isOpen || !client) return null;

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
        <div className="bg-brand-primary p-8 rounded-2xl border border-brand-accent/20 shadow-lg w-full max-w-2xl relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-brand-light hover:text-white">
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-white mb-6">Detalhes do Cliente</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <DetailItem icon={<User size={20} />} label="Nome" value={client.name} />
              <DetailItem icon={<Mail size={20} />} label="Email" value={client.email} />
              <DetailItem icon={<Phone size={20} />} label="Telefone" value={client.phone} />
              <DetailItem icon={<Calendar size={20} />} label="Último Contato" value={formatDate(client.lastContact)} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Imóveis de Interesse</h3>
                <button onClick={() => setIsLinkModalOpen(true)} className="flex items-center text-sm bg-brand-cta/20 text-brand-cta font-semibold py-2 px-3 rounded-lg hover:bg-brand-cta/40">
                  <PlusCircle size={16} className="mr-2" />
                  Vincular
                </button>
              </div>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {linkedProperties.length > 0 ? (
                  linkedProperties.map(prop => (
                    <div key={prop.id} className="bg-brand-secondary p-3 rounded-lg">
                      <p className="font-semibold text-white">{prop.name || prop.address}</p>
                      <p className="text-sm text-brand-light">R${prop.price.toLocaleString('pt-BR')}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-brand-light text-sm text-center py-4">Nenhum imóvel vinculado.</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-8">
            <button onClick={onClose} className="bg-brand-cta text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-400 transition-colors">
              Fechar
            </button>
          </div>
        </div>
      </div>
      <LinkPropertyModal 
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        onPropertyLinked={() => {
          fetchLinkedProperties();
          setIsLinkModalOpen(false);
        }}
        client={client}
      />
    </>
  );
};

export default ViewClientModal;