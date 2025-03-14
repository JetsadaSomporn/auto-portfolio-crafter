
import { Card, CardContent } from "@/components/ui/card";
import { themes } from "@/lib/themes";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { ThemeId } from "@/types/portfolio";

const ThemeSelector = () => {
  const { settings, updateSettings } = usePortfolio();

  const handleThemeChange = (themeId: ThemeId) => {
    updateSettings({ theme: themeId });
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium mb-3">Choose a theme</div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <Card 
            key={theme.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              settings.theme === theme.id 
                ? 'ring-2 ring-primary ring-offset-2' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => handleThemeChange(theme.id)}
          >
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-medium">{theme.name}</h3>
                <p className="text-xs text-muted-foreground">{theme.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
