import type { ToastMessageOptions } from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';

type ToastsSeverity = Exclude<ToastMessageOptions['severity'], undefined>;

let toastService: ReturnType<typeof createToastService>;

function createToastService() {
  const { t } = useI18n();
  const toast = useToast();
  const life = 4000;

  const defaultTitles: Partial<Record<ToastsSeverity, string>> = {
    success: 'toast.success',
    error: 'toast.error',
    warn: 'toast.warn',
    info: 'toast.info',
  };

  const fireToast = (severity: ToastsSeverity, title: string, text?: string) => {
    const summary = text ? title : t(defaultTitles[severity]!);
    const detail = text || title;
    toast.add({ severity, summary, detail, life });
  };

  return {
    success: (title: string, text?: string) => fireToast('success', title, text),
    info: (title: string, text?: string) => fireToast('info', title, text),
    warning: (title: string, text?: string) => fireToast('warn', title, text),
    error: (title: string, text?: string) => fireToast('error', title, text),
  };
}

export function useToastService() {
  if (!toastService) toastService = createToastService();
  return toastService;
}
