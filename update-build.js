const fs = require('fs');
const path = require('path');

// Read the current built JavaScript file
const jsPath = path.join(__dirname, 'dist/assets/main-ChBMqOdv.js');
const jsContent = fs.readFileSync(jsPath, 'utf8');

// Read the updated ComponentLibrary.tsx
const componentPath = path.join(__dirname, 'ComponentLibrary.tsx');
const componentContent = fs.readFileSync(componentPath, 'utf8');

// Extract component data from ComponentLibrary.tsx
const componentDataMatch = componentContent.match(/const componentData: ComponentMetadata\[\] = \[([\s\S]*?)\]/);
if (componentDataMatch) {
  const componentData = componentDataMatch[1];
  
  // Count components
  const componentCount = (componentData.match(/id:/g) || []).length;
  console.log(`Found ${componentCount} components in ComponentLibrary.tsx`);
  
  // Update the built file with a simple replacement
  // This is a basic approach - in a real scenario, you'd want to properly rebuild
  const updatedContent = jsContent.replace(
    /const componentData[^=]*=\[[\s\S]*?\];/,
    `const componentData = [${componentData}];`
  );
  
  // Write the updated file
  fs.writeFileSync(jsPath, updatedContent);
  console.log('Updated built JavaScript file with new components');
} else {
  console.log('Could not find component data in ComponentLibrary.tsx');
}
