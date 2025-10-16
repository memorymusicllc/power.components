/**
 * Component Store - Zustand State Management for v.3 Components
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * Centralized state management for all v.3 components using Zustand.
 * Provides reactive state updates and component lifecycle management.
 */

import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

// Component metadata interface
export interface ComponentMetadata {
  id: string;
  name: string;
  label: string;
  version: string;
  date: string;
  description: string;
  phase: string;
  category: string;
  tags: string[];
  usage: string;
  props: string[];
  example: string;
  documentation?: string;
  dependencies?: string[];
  status: 'active' | 'inactive' | 'deprecated' | 'development';
  health: 'healthy' | 'warning' | 'critical';
  performance: {
    renderTime: number;
    memoryUsage: number;
    errorRate: number;
    accessibilityScore: number;
    userSatisfaction: number;
  };
  constitutionalCompliance: number; // 0-100
  lastUpdated: string;
}

// Component state interface
export interface ComponentState {
  // Component registry
  components: Map<string, ComponentMetadata>;
  activeComponents: Set<string>;
  deprecatedComponents: Set<string>;
  
  // UI state
  searchQuery: string;
  selectedCategory: string;
  selectedComponent: string | null;
  isDarkMode: boolean;
  activeTab: 'components' | '3d' | 'workflows' | 'monitoring';
  
  // Performance metrics
  systemMetrics: {
    totalComponents: number;
    activeComponents: number;
    deprecatedComponents: number;
    averagePerformance: number;
    constitutionalCompliance: number;
    lastHealthCheck: string;
  };
  
  // Actions
  addComponent: (component: ComponentMetadata) => void;
  updateComponent: (id: string, updates: Partial<ComponentMetadata>) => void;
  removeComponent: (id: string) => void;
  activateComponent: (id: string) => void;
  deactivateComponent: (id: string) => void;
  deprecateComponent: (id: string) => void;
  
  // UI actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedComponent: (id: string | null) => void;
  toggleDarkMode: () => void;
  setActiveTab: (tab: 'components' | '3d' | 'workflows' | 'monitoring') => void;
  
  // Performance actions
  updateComponentPerformance: (id: string, performance: Partial<ComponentMetadata['performance']>) => void;
  updateSystemMetrics: () => void;
  performHealthCheck: () => void;
  
  // Utility actions
  getComponentById: (id: string) => ComponentMetadata | undefined;
  getComponentsByCategory: (category: string) => ComponentMetadata[];
  getFilteredComponents: () => ComponentMetadata[];
  getActiveComponents: () => ComponentMetadata[];
  getDeprecatedComponents: () => ComponentMetadata[];
}

// Create the component store
export const useComponentStore = create<ComponentState>()(
  devtools(
    subscribeWithSelector(
      (set, get) => ({
        // Initial state
        components: new Map(),
        activeComponents: new Set(),
        deprecatedComponents: new Set(),
        
        searchQuery: '',
        selectedCategory: 'all',
        selectedComponent: null,
        isDarkMode: true,
        activeTab: 'components',
        
        systemMetrics: {
          totalComponents: 0,
          activeComponents: 0,
          deprecatedComponents: 0,
          averagePerformance: 0,
          constitutionalCompliance: 100,
          lastHealthCheck: new Date().toISOString()
        },
        
        // Component management actions
        addComponent: (component: ComponentMetadata) => {
          set((state) => {
            const newComponents = new Map(state.components);
            const newActiveComponents = new Set(state.activeComponents);
            const newDeprecatedComponents = new Set(state.deprecatedComponents);
            
            newComponents.set(component.id, component);
            if (component.status === 'active') {
              newActiveComponents.add(component.id);
            } else if (component.status === 'deprecated') {
              newDeprecatedComponents.add(component.id);
            }
            
            return {
              ...state,
              components: newComponents,
              activeComponents: newActiveComponents,
              deprecatedComponents: newDeprecatedComponents,
              systemMetrics: {
                ...state.systemMetrics,
                totalComponents: newComponents.size,
                activeComponents: newActiveComponents.size,
                deprecatedComponents: newDeprecatedComponents.size
              }
            };
          });
        },
        
        updateComponent: (id: string, updates: Partial<ComponentMetadata>) => {
          set((state) => {
            const component = state.components.get(id);
            if (component) {
              const updatedComponent = { ...component, ...updates, lastUpdated: new Date().toISOString() };
              state.components.set(id, updatedComponent);
              
              // Update status sets
              if (updates.status) {
                if (updates.status === 'active') {
                  state.activeComponents.add(id);
                  state.deprecatedComponents.delete(id);
                } else if (updates.status === 'deprecated') {
                  state.deprecatedComponents.add(id);
                  state.activeComponents.delete(id);
                } else {
                  state.activeComponents.delete(id);
                  state.deprecatedComponents.delete(id);
                }
              }
              
              state.systemMetrics.activeComponents = state.activeComponents.size;
              state.systemMetrics.deprecatedComponents = state.deprecatedComponents.size;
            }
          });
        },
        
        removeComponent: (id: string) => {
          set((state) => {
            state.components.delete(id);
            state.activeComponents.delete(id);
            state.deprecatedComponents.delete(id);
            state.systemMetrics.totalComponents = state.components.size;
            state.systemMetrics.activeComponents = state.activeComponents.size;
            state.systemMetrics.deprecatedComponents = state.deprecatedComponents.size;
          });
        },
        
        activateComponent: (id: string) => {
          set((state) => {
            const component = state.components.get(id);
            if (component) {
              component.status = 'active';
              component.lastUpdated = new Date().toISOString();
              state.activeComponents.add(id);
              state.deprecatedComponents.delete(id);
              state.systemMetrics.activeComponents = state.activeComponents.size;
              state.systemMetrics.deprecatedComponents = state.deprecatedComponents.size;
            }
          });
        },
        
        deactivateComponent: (id: string) => {
          set((state) => {
            const component = state.components.get(id);
            if (component) {
              component.status = 'inactive';
              component.lastUpdated = new Date().toISOString();
              state.activeComponents.delete(id);
              state.deprecatedComponents.delete(id);
              state.systemMetrics.activeComponents = state.activeComponents.size;
              state.systemMetrics.deprecatedComponents = state.deprecatedComponents.size;
            }
          });
        },
        
        deprecateComponent: (id: string) => {
          set((state) => {
            const component = state.components.get(id);
            if (component) {
              component.status = 'deprecated';
              component.lastUpdated = new Date().toISOString();
              state.deprecatedComponents.add(id);
              state.activeComponents.delete(id);
              state.systemMetrics.activeComponents = state.activeComponents.size;
              state.systemMetrics.deprecatedComponents = state.deprecatedComponents.size;
            }
          });
        },
        
        // UI actions
        setSearchQuery: (query: string) => {
          set((state) => {
            state.searchQuery = query;
          });
        },
        
        setSelectedCategory: (category: string) => {
          set((state) => {
            state.selectedCategory = category;
          });
        },
        
        setSelectedComponent: (id: string | null) => {
          set((state) => {
            state.selectedComponent = id;
          });
        },
        
        toggleDarkMode: () => {
          set((state) => {
            state.isDarkMode = !state.isDarkMode;
          });
        },
        
        setActiveTab: (tab: 'components' | '3d' | 'workflows' | 'monitoring') => {
          set((state) => {
            state.activeTab = tab;
          });
        },
        
        // Performance actions
        updateComponentPerformance: (id: string, performance: Partial<ComponentMetadata['performance']>) => {
          set((state) => {
            const component = state.components.get(id);
            if (component) {
              component.performance = { ...component.performance, ...performance };
              component.lastUpdated = new Date().toISOString();
            }
          });
        },
        
        updateSystemMetrics: () => {
          set((state) => {
            const components = Array.from(state.components.values());
            const activeComponents = components.filter(c => c.status === 'active');
            
            // Calculate average performance
            const totalPerformance = activeComponents.reduce((sum: number, c: ComponentMetadata) => {
              return sum + (c.performance.renderTime + c.performance.memoryUsage + c.performance.accessibilityScore * 100) / 3;
            }, 0);
            
            const averagePerformance = activeComponents.length > 0 
              ? totalPerformance / activeComponents.length 
              : 0;
            
            // Calculate constitutional compliance
            const totalCompliance = activeComponents.reduce((sum: number, c: ComponentMetadata) => sum + c.constitutionalCompliance, 0);
            const constitutionalCompliance = activeComponents.length > 0 
              ? totalCompliance / activeComponents.length 
              : 100;
            
            return {
              ...state,
              systemMetrics: {
                ...state.systemMetrics,
                averagePerformance,
                constitutionalCompliance
              }
            };
          });
        },
        
        performHealthCheck: () => {
          set((state) => {
            const components = Array.from(state.components.values());
            const updatedComponents = new Map(state.components);
            
            components.forEach((component: ComponentMetadata) => {
              // Update health based on performance metrics
              const { renderTime, errorRate, accessibilityScore } = component.performance;
              
              let health: 'healthy' | 'warning' | 'critical' = 'healthy';
              if (renderTime > 200 || errorRate > 0.05 || accessibilityScore < 0.9) {
                health = 'critical';
              } else if (renderTime > 100 || errorRate > 0.02 || accessibilityScore < 0.95) {
                health = 'warning';
              }
              
              const updatedComponent = {
                ...component,
                health,
                lastUpdated: new Date().toISOString()
              };
              
              updatedComponents.set(component.id, updatedComponent);
            });
            
            return {
              ...state,
              components: updatedComponents,
              systemMetrics: {
                ...state.systemMetrics,
                lastHealthCheck: new Date().toISOString()
              }
            };
          });
        },
        
        // Utility actions
        getComponentById: (id: string) => {
          return get().components.get(id);
        },
        
        getComponentsByCategory: (category: string) => {
          const components = Array.from(get().components.values());
          return category === 'all' 
            ? components 
            : components.filter(c => c.category === category);
        },
        
        getFilteredComponents: () => {
          const { components, searchQuery, selectedCategory } = get();
          let filtered = Array.from(components.values());
          
          // Filter by category
          if (selectedCategory !== 'all') {
            filtered = filtered.filter(c => c.category === selectedCategory);
          }
          
          // Filter by search query
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(c => 
              c.name.toLowerCase().includes(query) ||
              c.description.toLowerCase().includes(query) ||
              c.tags.some(tag => tag.toLowerCase().includes(query))
            );
          }
          
          return filtered;
        },
        
        getActiveComponents: () => {
          const { components, activeComponents } = get();
          return Array.from(activeComponents).map(id => components.get(id)).filter(Boolean) as ComponentMetadata[];
        },
        
        getDeprecatedComponents: () => {
          const { components, deprecatedComponents } = get();
          return Array.from(deprecatedComponents).map(id => components.get(id)).filter(Boolean) as ComponentMetadata[];
        }
      })
    ),
    {
      name: 'component-store',
      partialize: (state) => ({
        components: state.components,
        activeComponents: state.activeComponents,
        deprecatedComponents: state.deprecatedComponents,
        isDarkMode: state.isDarkMode,
        systemMetrics: state.systemMetrics
      })
    }
  )
);

// Selectors for common use cases
export const useComponentSelectors = () => {
  const components = useComponentStore((state: ComponentState) => Array.from(state.components.values()));
  const activeComponents = useComponentStore((state: ComponentState) => state.getActiveComponents());
  const deprecatedComponents = useComponentStore((state: ComponentState) => state.getDeprecatedComponents());
  const filteredComponents = useComponentStore((state: ComponentState) => state.getFilteredComponents());
  const systemMetrics = useComponentStore((state: ComponentState) => state.systemMetrics);
  const searchQuery = useComponentStore((state: ComponentState) => state.searchQuery);
  const selectedCategory = useComponentStore((state: ComponentState) => state.selectedCategory);
  const selectedComponent = useComponentStore((state: ComponentState) => state.selectedComponent);
  const isDarkMode = useComponentStore((state: ComponentState) => state.isDarkMode);
  const activeTab = useComponentStore((state: ComponentState) => state.activeTab);
  
  return {
    components,
    activeComponents,
    deprecatedComponents,
    filteredComponents,
    systemMetrics,
    searchQuery,
    selectedCategory,
    selectedComponent,
    isDarkMode,
    activeTab
  };
};

// Actions selector
export const useComponentActions = () => {
  const addComponent = useComponentStore(state => state.addComponent);
  const updateComponent = useComponentStore(state => state.updateComponent);
  const removeComponent = useComponentStore(state => state.removeComponent);
  const activateComponent = useComponentStore(state => state.activateComponent);
  const deactivateComponent = useComponentStore(state => state.deactivateComponent);
  const deprecateComponent = useComponentStore(state => state.deprecateComponent);
  const setSearchQuery = useComponentStore(state => state.setSearchQuery);
  const setSelectedCategory = useComponentStore(state => state.setSelectedCategory);
  const setSelectedComponent = useComponentStore(state => state.setSelectedComponent);
  const toggleDarkMode = useComponentStore(state => state.toggleDarkMode);
  const setActiveTab = useComponentStore(state => state.setActiveTab);
  const updateComponentPerformance = useComponentStore(state => state.updateComponentPerformance);
  const updateSystemMetrics = useComponentStore(state => state.updateSystemMetrics);
  const performHealthCheck = useComponentStore(state => state.performHealthCheck);
  
  return {
    addComponent,
    updateComponent,
    removeComponent,
    activateComponent,
    deactivateComponent,
    deprecateComponent,
    setSearchQuery,
    setSelectedCategory,
    setSelectedComponent,
    toggleDarkMode,
    setActiveTab,
    updateComponentPerformance,
    updateSystemMetrics,
    performHealthCheck
  };
};

// Initialize store with v.3 components
export const initializeComponentStore = () => {
  try {
    const state = useComponentStore.getState();
    if (!state || !state.addComponent) {
      console.warn('Component store not ready, retrying...');
      setTimeout(initializeComponentStore, 100);
      return;
    }
    
    const { addComponent } = state;
  
  // Add v.3 components from the data
  const v3Components: ComponentMetadata[] = [
    {
      id: 'automation-engine-v3',
      name: 'AutomationEngineV3',
      label: 'Automation Engine v3',
      version: '3.0.0',
      date: '2025-01-11',
      description: 'AI-driven automation engine with self-healing capabilities',
      phase: 'production',
      category: 'dashboard',
      tags: ['automation', 'ai', 'self-healing', 'workflow'],
      usage: 'Primary automation orchestrator for the A-TEAM system',
      props: ['workflows', 'agents', 'monitoring'],
      example: '<AutomationEngineV3 />',
      status: 'active',
      health: 'healthy',
      performance: {
        renderTime: 45,
        memoryUsage: 25,
        errorRate: 0.01,
        accessibilityScore: 0.98,
        userSatisfaction: 4.8
      },
      constitutionalCompliance: 100,
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'ai-response-system-v3',
      name: 'AIResponseSystemV3',
      label: 'AI Response System v3',
      version: '3.0.0',
      date: '2025-01-11',
      description: 'Intelligent response system with natural language processing',
      phase: 'production',
      category: 'dashboard',
      tags: ['ai', 'nlp', 'response', 'intelligence'],
      usage: 'Handles AI responses and natural language interactions',
      props: ['prompts', 'responses', 'context'],
      example: '<AIResponseSystemV3 />',
      status: 'active',
      health: 'healthy',
      performance: {
        renderTime: 60,
        memoryUsage: 35,
        errorRate: 0.02,
        accessibilityScore: 0.95,
        userSatisfaction: 4.6
      },
      constitutionalCompliance: 100,
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'search-3d-v3',
      name: 'Search3DV3',
      label: 'Search 3D v3',
      version: '3.0.0',
      date: '2025-01-11',
      description: '3D visualization search engine with semantic understanding',
      phase: 'production',
      category: 'search',
      tags: ['search', '3d', 'visualization', 'semantic'],
      usage: 'Universal search with 3D visualization capabilities',
      props: ['query', 'results', 'visualization'],
      example: '<Search3DV3 />',
      status: 'active',
      health: 'healthy',
      performance: {
        renderTime: 80,
        memoryUsage: 45,
        errorRate: 0.015,
        accessibilityScore: 0.92,
        userSatisfaction: 4.7
      },
      constitutionalCompliance: 100,
      lastUpdated: new Date().toISOString()
    }
  ];
  
    // Add all v.3 components to the store
    v3Components.forEach(component => {
      addComponent(component);
    });
    
    // Update system metrics
    useComponentStore.getState().updateSystemMetrics();
    
    console.log('✅ Component Store initialized successfully');
  } catch (error) {
    console.error('Failed to initialize component store:', error);
    // Retry after a delay
    setTimeout(initializeComponentStore, 500);
  }
};

export default useComponentStore;
