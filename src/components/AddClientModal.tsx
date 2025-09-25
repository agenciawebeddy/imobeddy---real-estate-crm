import React, { useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import { X } from 'lucide-react';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientAdded: () => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose, onClientAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("Você precisa estar logado para adicionar um cliente.");
      setIsLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from('clients').insert({
      name,
      email,
      phone,
      user_id: user.id,
    });

    setIsLoading(false);

    if (insertError) {
      setError(insertError.message);
    } else {
      onClientAdded();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <div className="bg-brand-primary p-8 rounded-2xl border border-brand-accent/20 shadow-lg w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-light hover:text-white"><X size={24} /></button>
        <h2 className="text-2xl font-bold text-white mb-6">Adicionar Novo Cliente</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-brand-secondary p-3 rounded-lg border border-brand-accent/50" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-brand-secondary p-3 rounded-lg border border-brand-accent/50" />
          <input type="tel" placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-brand-secondary p-3 rounded-lg border border-brand-accent/50" />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end pt-4">
            <button type="button" onClick={onClose} className="text-brand-light font-bold py-2 px-4 rounded-lg hover:bg-brand-accent mr-2">Cancelar</button>
            <button type="submit" disabled={isLoading} className="bg-brand-cta text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-400 disabled:opacity-50">
              {isLoading ? 'Salvando...' : 'Salvar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;