import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { FileText, Download, Palette } from 'lucide-react';

// Original Templates
import { ClassicBlue } from '@/invoices/ClassicBlue';
import { ModernMinimal } from '@/invoices/ModernMinimal';
import { CorporateElegant } from '@/invoices/CorporateElegant';
import { CreativeBold } from '@/invoices/CreativeBold';
import { SimpleBlackWhite } from '@/invoices/SimpleBlackWhite';
import { GradientModern } from '@/invoices/GradientModern';
import { ProfessionalGray } from '@/invoices/ProfessionalGray';
import { VibrantPurple } from '@/invoices/VibrantPurple';
import { CleanGreen } from '@/invoices/CleanGreen';
import { LuxuryGold } from '@/invoices/LuxuryGold';

// Professional Templates
import { Template01 } from '@/invoices-pro/Template01';
import { Template02 } from '@/invoices-pro/Template02';
import { Template03 } from '@/invoices-pro/Template03';
import { Template04 } from '@/invoices-pro/Template04';
import { Template05 } from '@/invoices-pro/Template05';
import { Template06 } from '@/invoices-pro/Template06';
import { Template07 } from '@/invoices-pro/Template07';
import { Template08 } from '@/invoices-pro/Template08';
import { Template09 } from '@/invoices-pro/Template09';
import { Template10 } from '@/invoices-pro/Template10';

export default function App() {
  const [activeTab, setActiveTab] = useState('pro01');

  const invoiceTemplates = [
    // Professional Templates with Logo & Bank Details
    { id: 'pro01', name: 'Pro Blue Corporate', component: Template01, color: '#2563EB', category: 'Professional' },
    { id: 'pro02', name: 'Pro Dark Elegant', component: Template02, color: '#1E293B', category: 'Professional' },
    { id: 'pro03', name: 'Pro Indigo Sidebar', component: Template03, color: '#4F46E5', category: 'Professional' },
    { id: 'pro04', name: 'Pro Emerald Modern', component: Template04, color: '#10B981', category: 'Professional' },
    { id: 'pro05', name: 'Pro Orange Executive', component: Template05, color: '#F97316', category: 'Professional' },
    { id: 'pro06', name: 'Pro Classic Border', component: Template06, color: '#1F2937', category: 'Professional' },
    { id: 'pro07', name: 'Pro Teal Angular', component: Template07, color: '#14B8A6', category: 'Professional' },
    { id: 'pro08', name: 'Pro Rose Premium', component: Template08, color: '#F43F5E', category: 'Professional' },
    { id: 'pro09', name: 'Pro Violet Detailed', component: Template09, color: '#8B5CF6', category: 'Professional' },
    { id: 'pro10', name: 'Pro Cyan Business', component: Template10, color: '#06B6D4', category: 'Professional' },
    
    // Original Templates
    { id: 'classic', name: 'Classic Blue', component: ClassicBlue, color: '#2563EB', category: 'Original' },
    { id: 'minimal', name: 'Modern Minimal', component: ModernMinimal, color: '#1F2937', category: 'Original' },
    { id: 'corporate', name: 'Corporate Elegant', component: CorporateElegant, color: '#7C3AED', category: 'Original' },
    { id: 'creative', name: 'Creative Bold', component: CreativeBold, color: '#059669', category: 'Original' },
    { id: 'blackwhite', name: 'Simple B&W', component: SimpleBlackWhite, color: '#000000', category: 'Original' },
    { id: 'gradient', name: 'Gradient Modern', component: GradientModern, color: '#06B6D4', category: 'Original' },
    { id: 'gray', name: 'Professional Gray', component: ProfessionalGray, color: '#4B5563', category: 'Original' },
    { id: 'purple', name: 'Vibrant Purple', component: VibrantPurple, color: '#A855F7', category: 'Original' },
    { id: 'green', name: 'Clean Green', component: CleanGreen, color: '#10B981', category: 'Original' },
    { id: 'gold', name: 'Luxury Gold', component: LuxuryGold, color: '#D97706', category: 'Original' },
  ];

  const handlePrint = () => {
    window.print();
  };

  const professionalTemplates = invoiceTemplates.filter(t => t.category === 'Professional');
  const originalTemplates = invoiceTemplates.filter(t => t.category === 'Original');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <div className="bg-white shadow-md print:hidden">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Invoice Templates Collection</h1>
                <p className="text-gray-600">20 Professional HTML Invoice Designs</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                  <Palette className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-700">20 Designs</span>
                </div>
              </div>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Download className="w-5 h-5" />
                Print/Save PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 print:p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-6 print:hidden">
            <div className="mb-4">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Professional Templates (with Logo & Bank Details)</h3>
              <TabsList className="grid grid-cols-5 gap-2 h-auto bg-transparent">
                {professionalTemplates.map((template) => (
                  <TabsTrigger
                    key={template.id}
                    value={template.id}
                    className="flex items-center gap-2 px-4 py-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg transition-all hover:bg-gray-100"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: template.color }}
                    />
                    <span className="font-medium text-sm">{template.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-bold text-lg text-gray-900 mb-3">Original Templates</h3>
              <TabsList className="grid grid-cols-5 gap-2 h-auto bg-transparent">
                {originalTemplates.map((template) => (
                  <TabsTrigger
                    key={template.id}
                    value={template.id}
                    className="flex items-center gap-2 px-4 py-3 data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-lg transition-all hover:bg-gray-100"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: template.color }}
                    />
                    <span className="font-medium text-sm">{template.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          {/* Invoice Templates */}
          <div className="bg-gray-50 rounded-lg shadow-xl p-8 print:p-0 print:shadow-none print:bg-white">
            {invoiceTemplates.map((template) => (
              <TabsContent key={template.id} value={template.id} className="mt-0">
                <div className="print:shadow-none">
                  <template.component />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>

        {/* Info Section */}
        <div className="mt-8 grid grid-cols-3 gap-4 print:hidden">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Professional & Creative
            </h3>
            <p className="text-gray-600 text-sm">
              20 unique templates - 10 professional designs with logos & bank details, plus 10 creative styles.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Download className="w-5 h-5 text-purple-600" />
              Print Ready
            </h3>
            <p className="text-gray-600 text-sm">
              Click "Print/Save PDF" to download any template as a PDF or print directly from your browser.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Palette className="w-5 h-5 text-green-600" />
              Multiple Styles
            </h3>
            <p className="text-gray-600 text-sm">
              From minimal to luxury, corporate to creative - choose the perfect design for your business.
            </p>
          </div>
        </div>

        {/* Template List */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md print:hidden">
          <h3 className="font-bold text-xl mb-4">All 20 Templates:</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-600 mb-3">Professional Series (New)</h4>
              <div className="space-y-2">
                {professionalTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setActiveTab(template.id)}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: template.color }}
                    />
                    <span className="font-medium text-sm">{template.name}</span>
                    {activeTab === template.id && (
                      <span className="ml-auto text-blue-600 text-xs font-semibold">Active</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-purple-600 mb-3">Original Series</h4>
              <div className="space-y-2">
                {originalTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setActiveTab(template.id)}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: template.color }}
                    />
                    <span className="font-medium text-sm">{template.name}</span>
                    {activeTab === template.id && (
                      <span className="ml-auto text-purple-600 text-xs font-semibold">Active</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:bg-white {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}
