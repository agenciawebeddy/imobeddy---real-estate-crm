import React from 'react';
import { User, Bell, Palette, Lock } from 'lucide-react';

const SettingsCard: React.FC<{ title: string; description: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, description, icon, children }) => (
  <div className="bg-brand-primary p-6 rounded-2xl border border-brand-accent/20 shadow-lg">
    <div className="flex items-start mb-4">
      <div className="bg-brand-secondary p-3 rounded-lg mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-brand-light">{description}</p>
      </div>
    </div>
    <div className="mt-6">
      {children}
    </div>
  </div>
);

const Settings: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Configurações</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <SettingsCard
          title="Perfil"
          description="Atualize suas informações pessoais."
          icon={<User className="w-6 h-6 text-brand-cta" />}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-light mb-2">Nome</label>
              <input type="text" defaultValue="Eddy Silvério" className="w-full bg-brand-secondary border border-brand-accent/50 text-brand-lighter rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-cta" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-light mb-2">E-mail</label>
              <input type="email" defaultValue="eddy.silverio@imobeddy.com" className="w-full bg-brand-secondary border border-brand-accent/50 text-brand-lighter rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-cta" />
            </div>
            <button className="bg-brand-cta text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-400 transition-colors">Salvar Alterações</button>
          </div>
        </SettingsCard>

        {/* Notification Settings */}
        <SettingsCard
          title="Notificações"
          description="Gerencie como você recebe notificações."
          icon={<Bell className="w-6 h-6 text-green-400" />}
        >
          <div className="space-y-4 text-white">
            <div className="flex items-center justify-between">
              <span>Alertas de Novo Lead</span>
              <label className="switch">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-brand-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-cta"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span>Alertas de Negócio Fechado</span>
               <label className="switch">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-brand-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-cta"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <span>E-mail de Resumo Semanal</span>
               <label className="switch">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-brand-accent rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-cta"></div>
              </label>
            </div>
          </div>
        </SettingsCard>
        
        {/* Security Settings */}
        <SettingsCard
          title="Segurança"
          description="Altere sua senha e gerencie as configurações de segurança."
          icon={<Lock className="w-6 h-6 text-amber-400" />}
        >
          <div className="space-y-4">
             <div>
              <label className="block text-sm font-medium text-brand-light mb-2">Senha Atual</label>
              <input type="password" placeholder="••••••••" className="w-full bg-brand-secondary border border-brand-accent/50 text-brand-lighter rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-cta" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-light mb-2">Nova Senha</label>
              <input type="password" placeholder="••••••••" className="w-full bg-brand-secondary border border-brand-accent/50 text-brand-lighter rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-cta" />
            </div>
            <button className="bg-brand-cta text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-400 transition-colors">Atualizar Senha</button>
          </div>
        </SettingsCard>

        {/* Appearance Settings */}
        <SettingsCard
          title="Aparência"
          description="Personalize a aparência da aplicação."
          icon={<Palette className="w-6 h-6 text-indigo-400" />}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-light mb-2">Tema</label>
              <select className="w-full bg-brand-secondary border border-brand-accent/50 text-brand-lighter rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-brand-cta">
                <option>Escuro (Padrão)</option>
                <option>Claro (Em Breve)</option>
              </select>
            </div>
          </div>
        </SettingsCard>
      </div>
    </div>
  );
};

export default Settings;