import React from 'react';
import { Eye, Edit, Trash2, Calendar } from 'lucide-react';
import { Client } from '../types';

interface ClientsTableProps {
  clients: Client[];
  onView: (client: Client) => void;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients, onView, onEdit, onDelete }) => {
  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-brand-primary p-6 rounded-2xl border border-brand-accent/20 shadow-lg">
      {clients.length === 0 ? (
        <p className="text-brand-light text-center py-8">Nenhum cliente encontrado.</p>
      ) : (
        <div className="space-y-4">
          {clients.map(client => (
            <div key={client.id} className="grid grid-cols-5 items-center bg-brand-secondary p-4 rounded-xl hover:bg-brand-accent/50 transition-colors duration-200">
              <p className="font-semibold text-white col-span-1">{client.name}</p>
              <p className="text-brand-light col-span-1">{client.email}</p>
              <p className="text-brand-light col-span-1">{client.phone}</p>
              <div className="text-brand-light col-span-1 flex items-center">
                <Calendar size={16} className="mr-2" />
                {formatDate(client.lastContact)}
              </div>
              <div className="flex justify-end items-center space-x-3 col-span-1">
                <button onClick={() => onView(client)} className="text-brand-light hover:text-brand-cta transition-colors"><Eye size={18} /></button>
                <button onClick={() => onEdit(client)} className="text-brand-light hover:text-green-400 transition-colors"><Edit size={18} /></button>
                <button onClick={() => onDelete(client)} className="text-brand-light hover:text-red-400 transition-colors"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientsTable;