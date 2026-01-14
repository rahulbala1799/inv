import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { FileText, Download, Palette } from 'lucide-react';
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

export default function App() {
  const [activeTab, setActiveTab] = useState('classic');

  const invoiceTemplates = [
    { id: 'classic', name: 'Classic Blue', component: ClassicBlue, color: '#2563EB' },
    { id: 'minimal', name: 'Modern Minimal', component: ModernMinimal, color: '#1F2937' },
    { id: 'corporate', name: 'Corporate Elegant', component: CorporateElegant, color: '#7C3AED' },
    { id: 'creative', name: 'Creative Bold', component: CreativeBold, color: '#059669' },
    { id: 'blackwhite', name: 'Simple B&W', component: SimpleBlackWhite, color: '#000000' },
    { id: 'gradient', name: 'Gradient Modern', component: GradientModern, color: '#06B6D4' },
    { id: 'gray', name: 'Professional Gray', component: ProfessionalGray, color: '#4B5563' },
    { id: 'purple', name: 'Vibrant Purple', component: VibrantPurple, color: '#A855F7' },
    { id: 'green', name: 'Clean Green', component: CleanGreen, color: '#10B981' },
    { id: 'gold', name: 'Luxury Gold', component: LuxuryGold, color: '#D97706' },
  ];

  const handlePrint = () => {
    window.print();
  };

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
                <h1 className="text-3xl font-bold text-gray-800">Invoice Templates</h1>
                <p className="text-gray-600">10 Professional HTML Invoice Designs</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                  <Palette className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-700">10 Designs</span>
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
            <TabsList className="grid grid-cols-5 gap-2 h-auto bg-transparent">
              {invoiceTemplates.map((template) => (
                <TabsTrigger
                  key={template.id}
                  value={template.id}
                  className="flex items-center gap-2 px-4 py-3 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg transition-all hover:bg-gray-100"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: template.color }}
                  />
                  <span className="font-medium">{template.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
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
              Professional Templates
            </h3>
            <p className="text-gray-600 text-sm">
              Each template is designed for professional invoicing with complete details and formatting.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Download className="w-5 h-5 text-purple-600" />
              Print Ready
            </h3>
            <p className="text-gray-600 text-sm">
              Click "Print/Save PDF" to download any template as a PDF or print directly.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Palette className="w-5 h-5 text-green-600" />
              Multiple Styles
            </h3>
            <p className="text-gray-600 text-sm">
              Choose from 10 different designs - from minimal to luxury, we've got you covered.
            </p>
          </div>
        </div>

        {/* Template List */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md print:hidden">
          <h3 className="font-bold text-xl mb-4">Available Templates:</h3>
          <div className="grid grid-cols-2 gap-3">
            {invoiceTemplates.map((template) => (
              <div
                key={template.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setActiveTab(template.id)}
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: template.color }}
                />
                <span className="font-medium">{template.name}</span>
                {activeTab === template.id && (
                  <span className="ml-auto text-blue-600 text-sm font-semibold">Active</span>
                )}
              </div>
            ))}
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
