import type { ToastMessageOptions } from 'primevue/toast';
import { defineStore } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { i18n } from '@/plugins/i18n';
import { getCurrentLocale, smsErrorsEnum } from '@/plugins/i18n/models';

type ToastsSeverity = Exclude<ToastMessageOptions['severity'], undefined>;

export const useToastStore = defineStore('toast', () => {
  const toast = useToast();
  const life = 4000;

  const defaultTitles: Partial<Record<ToastsSeverity, string>> = {
    success: 'toast.success',
    error: 'toast.error',
    warn: 'toast.warn',
    info: 'toast.info',
  };

  const fireToast = (severity: ToastsSeverity, title: string, text?: string) => {
    const summary = text ? title : i18n.global.t(defaultTitles[severity]!);
    const message = text || title;

    const detail = (message && smsErrorsEnum[message]) ? smsErrorsEnum[message][getCurrentLocale()] : message;

    toast.add({ severity, summary, detail, life });
  };

  return {
    success: (title: string, text?: string) => fireToast('success', title, text),
    info: (title: string, text?: string) => fireToast('info', title, text),
    warning: (title: string, text?: string) => fireToast('warn', title, text),
    error: (title: string, text?: string) => fireToast('error', title, text),
  };
});
