import React, { useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import { X } from 'lucide-react';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadAdded: () => void;
}

const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose, onLeadAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('');
  const [status, setStatus] = useState<'New' | 'Contacted' | 'Qualified' | 'Lost'>('New');
  const [assignedTo, setAssignedTo] = useState('You');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError("Você precisa estar logado para adicionar um lead.");
      setIsLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from('leads').insert({
      name,
      email,
      phone,
      source,
      status,
      assignedTo,
      user_id: user.id,
    });

    setIsLoading(false);

    if (insertError) {
      setError(insertError.message);
    } else {
      onLeadAdded();
      onClose();
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setSource('');
      setStatus('New');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <div className="bg-brand-primary p-8 rounded-2xl border border-brand-accent/20 shadow-lg w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-light hover:text-white">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">Adicionar Novo Lead</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-light mb-2">Nome</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-brand-secondary border border-brand-accent/50 text-brand-lighter rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-cta" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-light mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-brand-secondary border border-brand-accent/50 text-brand-lighter rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-cta" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-light mb-2">Telefone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-brand-secondary border border-brand-accent/50 text-brand-lighter rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-cta" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-light mb-2">Fonte</label>
            <input type="text" value={source} onChange={(e) => setSource(e.target.value)} className="w-full bg-brand-secondary border border-brand-accent/50 text-brand-lighter rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-cta" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-light mb-2">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full bg-brand-secondary border border-brand-accent/50 text-brand-lighter rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-cta">
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end pt-4">
            <button type="button" onClick={onClose} className="text-brand-light font-bold py-2 px-4 rounded-lg hover:bg-brand-accent mr-2">Cancelar</button>
            <button type="submit" disabled={isLoading} className="bg-brand-cta text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-400 transition-colors disabled:opacity-50">
              {isLoading ? 'Salvando...' : 'Salvar Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;