import StyleDictionary from 'style-dictionary';
import { transforms } from 'style-dictionary/enums';

// Custom format function for Tailwind v4
const tailwindV4ThemeFormat = ({ dictionary }) => {
  const tokens = dictionary.allTokens;
  let themeContent = '';
  
  // Group tokens by category for better organization
  const grouped = {};
  
  tokens.forEach(token => {
    // Access the transformed value - Style Dictionary stores it in token.value
    // Handle both W3C format ($value) and legacy format (value)
    let value = token.value;
    
    // If value is undefined, try other sources
    if (value === undefined || value === null) {
      value = token.originalValue || token.$value;
      
      // For legacy format with "value" property, check the raw token
      if (value === undefined && token.original && token.original.value) {
        value = token.original.value;
      }
    }
    
    // Skip tokens without values
    if (value === undefined || value === null) {
      return;
    }
    
    const category = token.path[0]; // color, font, etc.
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push({ ...token, resolvedValue: value });
  });
  
  // Output by category with comments
  Object.keys(grouped).sort().forEach(category => {
    if (grouped[category].length > 0) {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
      themeContent += `\n  /* ${categoryName} */\n`;
      
      grouped[category].forEach(token => {
        // Build the variable name: --color-orange-50, --font-editorial, etc.
        const name = token.path.join('-');
        const cssVar = `--${name}`;
        const value = token.resolvedValue || token.value || token.originalValue || token.$value;
        themeContent += `  ${cssVar}: ${value};\n`;
      });
    }
  });
  
  return `/* Tailwind v4 Theme Configuration */\n@theme {${themeContent}}`;
};

// Register the format
StyleDictionary.registerFormat({
  name: 'css/tailwind-v4-theme',
  format: tailwindV4ThemeFormat
});

export default {
  source: [
    'themes/theme.light.json'
  ],
  platforms: {
    light: {
      transforms: [
        transforms.attributeCti,
        transforms.nameKebab,
        transforms.colorCss,
        transforms.sizePxToRem,
      ],
      buildPath: 'app/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/tailwind-v4-theme'
        }
      ]
    }
  }
};

