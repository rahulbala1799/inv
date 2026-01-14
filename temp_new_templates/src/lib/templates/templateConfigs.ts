// Template configurations for invoice PDF generation
export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  layout: 'classic' | 'modern' | 'minimal' | 'bold';
  logoPosition: 'top-left' | 'top-center' | 'top-right';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    fontFamily: 'Helvetica' | 'Times-Roman' | 'Courier';
    headerSize: number;
    bodySize: number;
  };
  spacing: {
    margin: number;
    padding: number;
    gap: number;
  };
  features: {
    showTaxBreakdown: boolean;
    showPaymentTerms: boolean;
    showBankDetails: boolean;
    showNotes: boolean;
  };
  styling: {
    headerBackground?: string;
    tableHeaderBackground?: string;
    rowAlternating: boolean;
    borderColor: string;
    totalsBackground?: string;
  };
}

export const invoiceTemplates: Record<string, TemplateConfig> = {
  classicBlue: {
    id: 'classic-blue',
    name: 'Classic Professional',
    description: 'Traditional blue and white design with clean lines',
    layout: 'classic',
    logoPosition: 'top-left',
    colors: {
      primary: '#2563EB',
      secondary: '#64748B',
      accent: '#3B82F6',
      background: '#FFFFFF',
      text: '#1E293B',
    },
    typography: {
      fontFamily: 'Helvetica',
      headerSize: 24,
      bodySize: 10,
    },
    spacing: {
      margin: 40,
      padding: 15,
      gap: 10,
    },
    features: {
      showTaxBreakdown: true,
      showPaymentTerms: true,
      showBankDetails: true,
      showNotes: true,
    },
    styling: {
      headerBackground: '#F1F5F9',
      tableHeaderBackground: '#EFF6FF',
      rowAlternating: true,
      borderColor: '#CBD5E1',
      totalsBackground: '#F8FAFC',
    },
  },

  modernMinimal: {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean, contemporary design with subtle accents',
    layout: 'modern',
    logoPosition: 'top-right',
    colors: {
      primary: '#0F172A',
      secondary: '#64748B',
      accent: '#06B6D4',
      background: '#FFFFFF',
      text: '#334155',
    },
    typography: {
      fontFamily: 'Helvetica',
      headerSize: 28,
      bodySize: 9,
    },
    spacing: {
      margin: 50,
      padding: 12,
      gap: 8,
    },
    features: {
      showTaxBreakdown: false,
      showPaymentTerms: true,
      showBankDetails: true,
      showNotes: true,
    },
    styling: {
      headerBackground: undefined,
      tableHeaderBackground: '#F8FAFC',
      rowAlternating: false,
      borderColor: '#E2E8F0',
      totalsBackground: undefined,
    },
  },

  boldGreen: {
    id: 'bold-green',
    name: 'Bold & Creative',
    description: 'Eye-catching design with vibrant green accents',
    layout: 'bold',
    logoPosition: 'top-center',
    colors: {
      primary: '#059669',
      secondary: '#374151',
      accent: '#10B981',
      background: '#FFFFFF',
      text: '#1F2937',
    },
    typography: {
      fontFamily: 'Helvetica',
      headerSize: 26,
      bodySize: 10,
    },
    spacing: {
      margin: 45,
      padding: 18,
      gap: 12,
    },
    features: {
      showTaxBreakdown: true,
      showPaymentTerms: true,
      showBankDetails: true,
      showNotes: true,
    },
    styling: {
      headerBackground: '#ECFDF5',
      tableHeaderBackground: '#D1FAE5',
      rowAlternating: true,
      borderColor: '#A7F3D0',
      totalsBackground: '#F0FDF4',
    },
  },

  elegantPurple: {
    id: 'elegant-purple',
    name: 'Elegant Corporate',
    description: 'Sophisticated purple theme for premium look',
    layout: 'classic',
    logoPosition: 'top-left',
    colors: {
      primary: '#7C3AED',
      secondary: '#6B7280',
      accent: '#8B5CF6',
      background: '#FFFFFF',
      text: '#111827',
    },
    typography: {
      fontFamily: 'Times-Roman',
      headerSize: 26,
      bodySize: 10,
    },
    spacing: {
      margin: 40,
      padding: 16,
      gap: 10,
    },
    features: {
      showTaxBreakdown: true,
      showPaymentTerms: true,
      showBankDetails: true,
      showNotes: true,
    },
    styling: {
      headerBackground: '#FAF5FF',
      tableHeaderBackground: '#F3E8FF',
      rowAlternating: true,
      borderColor: '#DDD6FE',
      totalsBackground: '#F5F3FF',
    },
  },
};

export const getTemplateById = (id: string): TemplateConfig => {
  return invoiceTemplates[id] || invoiceTemplates.classicBlue;
};
