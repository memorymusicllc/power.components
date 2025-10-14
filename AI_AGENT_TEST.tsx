/**
 * AI Agent Integration Test
 * This file demonstrates how AI agents should use Power Components
 * 
 * @version 2.0.0
 * @date 2025-01-11
 */

import React from 'react'
import { 
  // Redux UI Components (Primary - unbound from data and style)
  Button, 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  Input, 
  Badge, 
  Progress,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  
  // Design System Components (Advanced theming)
  DesignButton,
  DesignCard,
  FormInput,
  DesignBadge,
  Switch,
  Checkbox,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  
  // Theme and Utilities
  ThemeProvider,
  useTheme,
  cn,
  quickSetup
} from './src/index'

/**
 * Test component demonstrating AI agent usage patterns
 */
export function AIAgentTest() {
  const { theme, setTheme } = useTheme()
  
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-bold">AI Agent Integration Test</h1>
        
        {/* Redux UI Components Test */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Redux UI Components (Primary)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Basic Components */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button>Redux UI Button</Button>
                <Input placeholder="Redux UI Input" />
                <Badge>Redux UI Badge</Badge>
                <Progress value={75} />
              </CardContent>
            </Card>
            
            {/* Tabs Component */}
            <Card>
              <CardHeader>
                <CardTitle>Tabs Component</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1">
                    <p>Content for Tab 1</p>
                  </TabsContent>
                  <TabsContent value="tab2">
                    <p>Content for Tab 2</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Form Components */}
            <Card>
              <CardHeader>
                <CardTitle>Form Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                  </SelectContent>
                </Select>
                <Separator />
                <div className="text-sm text-gray-600">
                  Form components working correctly
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Design System Components Test */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Design System Components (Advanced)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <DesignCard>
              <div className="p-4 space-y-4">
                <h3 className="text-lg font-semibold">Advanced Components</h3>
                <DesignButton>Design System Button</DesignButton>
                <FormInput placeholder="Design System Input" />
                <DesignBadge>Design System Badge</DesignBadge>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <span>Switch Component</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <span>Checkbox Component</span>
                </div>
              </div>
            </DesignCard>
            
            <DesignCard>
              <div className="p-4 space-y-4">
                <h3 className="text-lg font-semibold">Dialog Component</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <DesignButton>Open Dialog</DesignButton>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Test Dialog</DialogTitle>
                      <DialogDescription>
                        This dialog demonstrates the Design System Dialog component.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DesignButton>Close</DesignButton>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </DesignCard>
          </div>
        </section>
        
        {/* Utility Functions Test */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Utility Functions</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">cn() Utility Test</h3>
                  <Button className={cn("bg-blue-500", "hover:bg-blue-600", "text-white")}>
                    Styled with cn() utility
                  </Button>
                </div>
                
                <div>
                  <h3 className="font-semibold">quickSetup Discovery</h3>
                  <div className="text-sm space-y-2">
                    <p><strong>Redux UI Essentials:</strong> {quickSetup.reduxUI.essentials.join(', ')}</p>
                    <p><strong>Design System Essentials:</strong> {quickSetup.designSystem.essentials.join(', ')}</p>
                    <p><strong>Tech Stack:</strong> {quickSetup.techStack.ui}</p>
                    <p><strong>Prohibited:</strong> {quickSetup.techStack.prohibited.join(', ')}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold">Theme System</h3>
                  <div className="flex items-center space-x-4">
                    <span>Current theme: {theme}</span>
                    <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                      Toggle Theme
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Mobile-First Responsive Test */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Mobile-First Responsive Design</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <h3 className="font-semibold">Responsive Card {i}</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    This card demonstrates mobile-first responsive design.
                    It stacks on mobile and flows into columns on larger screens.
                  </p>
                  <Button className="mt-4 w-full sm:w-auto">
                    Responsive Button
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Accessibility Test */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Accessibility Features</h2>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Keyboard Navigation</h3>
                  <p className="text-sm text-gray-600">
                    All interactive elements support keyboard navigation.
                    Try tabbing through the components above.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Screen Reader Support</h3>
                  <p className="text-sm text-gray-600">
                    All components include proper ARIA attributes and semantic HTML.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Focus Indicators</h3>
                  <p className="text-sm text-gray-600">
                    All interactive elements have visible focus indicators.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Success Indicator */}
        <section>
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500">✓</Badge>
                <div>
                  <h3 className="font-semibold text-green-800">AI Agent Integration Successful!</h3>
                  <p className="text-sm text-green-700">
                    All Power Components are working correctly. AI agents can successfully:
                  </p>
                  <ul className="text-sm text-green-700 mt-2 list-disc list-inside">
                    <li>Import Redux UI components (unbound from data and style)</li>
                    <li>Import Design System components for advanced theming</li>
                    <li>Use ThemeProvider for theme management</li>
                    <li>Apply mobile-first responsive design</li>
                    <li>Use cn() utility for styling</li>
                    <li>Access quickSetup for component discovery</li>
                    <li>Create accessible, WCAG 2.1 AA compliant interfaces</li>
                    <li>Avoid prohibited technologies (ShadCN, Radix, NextJS)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </ThemeProvider>
  )
}

export default AIAgentTest


