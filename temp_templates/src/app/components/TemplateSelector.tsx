import React from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Check } from 'lucide-react';
import { invoiceTemplates, TemplateConfig } from '@/lib/templates/templateConfigs';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Choose a Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(invoiceTemplates).map(([key, template]) => (
          <TemplateCard
            key={key}
            template={template}
            isSelected={selectedTemplate === key}
            onSelect={() => onSelectTemplate(key)}
          />
        ))}
      </div>
    </div>
  );
};

interface TemplateCardProps {
  template: TemplateConfig;
  isSelected: boolean;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
}) => {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold">{template.name}</h3>
            <p className="text-sm text-muted-foreground">{template.description}</p>
          </div>
          {isSelected && (
            <div className="size-6 rounded-full bg-primary flex items-center justify-center">
              <Check className="size-4 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Color Preview */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground mb-2">
            Color Scheme
          </div>
          <div className="flex gap-2">
            <div
              className="size-8 rounded-md border"
              style={{ backgroundColor: template.colors.primary }}
              title="Primary"
            />
            <div
              className="size-8 rounded-md border"
              style={{ backgroundColor: template.colors.secondary }}
              title="Secondary"
            />
            <div
              className="size-8 rounded-md border"
              style={{ backgroundColor: template.colors.accent }}
              title="Accent"
            />
          </div>
        </div>

        {/* Layout Info */}
        <div className="mt-4 pt-4 border-t text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Layout:</span>
            <span className="font-medium capitalize">{template.layout}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Logo Position:</span>
            <span className="font-medium capitalize">
              {template.logoPosition.replace('-', ' ')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Font:</span>
            <span className="font-medium">{template.typography.fontFamily}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
