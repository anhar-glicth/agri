import React from 'react';
import { AppNotification } from '@/types';
import { Bell, X, AlertCircle, CheckCircle2, Info, Check } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-850 rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between mb-4 pr-6">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-800 dark:text-emerald-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Notifikasi & Peringatan Dini
            </h3>
          </div>

          <button
            onClick={onMarkAllRead}
            className="text-xs text-emerald-800 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Tandai dibaca</span>
          </button>
        </div>

        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                n.read
                  ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 opacity-80'
                  : 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-800/60'
              }`}
            >
              {n.type === 'alert' && (
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              )}
              {n.type === 'success' && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              )}
              {n.type === 'info' && <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />}

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {n.title}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-normal">
                  {n.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
