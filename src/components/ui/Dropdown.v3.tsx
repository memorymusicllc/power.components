/**
 * Dropdown Component v3
 * 
 * Constitutional Authority: Article I (Full-Auto Mandate), Article III (The Loop), Article IX (Guardian Protocol)
 * 
 * A comprehensive dropdown component with multiple variants:
 * - Basic dropdown with search
 * - Multi-select dropdown
 * - Icon dropdown with custom styling
 * - Async dropdown with loading states
 * - Grouped dropdown with categories
 * 
 * @version 3.0.0
 * @date 2025-01-15
 * @schema pow3r.v3.data.json
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronDown, 
  Search, 
  Check, 
  X, 
  Loader2,
  Filter,
  Star,
  User,
  Settings,
  Heart,
  Zap,
  Shield,
  Globe,
  Lock,
  Unlock
} from 'lucide-react';

// Types
interface DropdownOption {
  id: string;
  label: string;
  value: string;
  icon?: React.ComponentType<any>;
  description?: string;
  disabled?: boolean;
  group?: string;
  metadata?: Record<string, any>;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  multiSelect?: boolean;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  maxHeight?: number;
  showIcons?: boolean;
  groupBy?: string;
  async?: boolean;
  onSearch?: (query: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

// Main Dropdown Component
export default function DropdownV3({
  options = [],
  value,
  onChange,
  placeholder = "Select an option...",
  searchable = false,
  multiSelect = false,
  disabled = false,
  loading = false,
  error,
  variant = 'default',
  size = 'md',
  className = '',
  maxHeight = 200,
  showIcons = false,
  groupBy,
  async = false,
  onSearch,
  onLoadMore,
  hasMore = false
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Filter options based on search query
  const filteredOptions = useCallback(() => {
    let filtered = options;
    
    if (searchQuery) {
      filtered = options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        option.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (groupBy) {
      const grouped = filtered.reduce((acc, option) => {
        const group = option.group || 'Other';
        if (!acc[group]) acc[group] = [];
        acc[group].push(option);
        return acc;
      }, {} as Record<string, DropdownOption[]>);

      return grouped;
    }

    return filtered;
  }, [options, searchQuery, groupBy]);

  // Handle option selection
  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;

    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(option.value)
        ? currentValues.filter(v => v !== option.value)
        : [...currentValues, option.value];
      onChange(newValues);
    } else {
      onChange(option.value);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    const filtered = groupBy ? Object.values(filteredOptions()).flat() : filteredOptions() as DropdownOption[];
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex(prev => 
          prev < filtered.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filtered.length - 1
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (highlightedIndex >= 0 && filtered[highlightedIndex]) {
          handleSelect(filtered[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchQuery('');
        setHighlightedIndex(-1);
        break;
    }
  };

  // Get selected options
  const getSelectedOptions = () => {
    if (multiSelect && Array.isArray(value)) {
      return options.filter(option => value.includes(option.value));
    } else if (!multiSelect && value) {
      return options.filter(option => option.value === value);
    }
    return [];
  };

  // Get display text
  const getDisplayText = () => {
    const selected = getSelectedOptions();
    if (selected.length === 0) return placeholder;
    if (multiSelect) {
      if (selected.length === 1) return selected[0].label;
      return `${selected.length} items selected`;
    }
    return selected[0]?.label || placeholder;
  };

  // Get variant styles
  const getVariantStyles = () => {
    const baseStyles = "border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
    
    switch (variant) {
      case 'outline':
        return `${baseStyles} border-gray-300 dark:border-gray-600 bg-transparent hover:border-gray-400 dark:hover:border-gray-500`;
      case 'ghost':
        return `${baseStyles} border-transparent bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800`;
      case 'filled':
        return `${baseStyles} border-transparent bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700`;
      default:
        return `${baseStyles} border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500`;
    }
  };

  // Get size styles
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'lg':
        return 'px-4 py-3 text-lg';
      default:
        return 'px-3 py-2 text-base';
    }
  };

  const selectedOptions = getSelectedOptions();
  const filtered = filteredOptions();

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          w-full flex items-center justify-between
          ${getVariantStyles()}
          ${getSizeStyles()}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${error ? 'border-red-500 focus:ring-red-500' : ''}
        `}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={placeholder}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {showIcons && selectedOptions.length > 0 && selectedOptions[0].icon && (() => {
            const IconComponent = selectedOptions[0].icon!;
            return <IconComponent className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />;
          })()}
          <span className={`truncate ${selectedOptions.length === 0 ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
            {getDisplayText()}
          </span>
        </div>
        
        <div className="flex items-center gap-1 flex-shrink-0">
          {loading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          {/* Search Input */}
          {searchable && (
            <div className="p-2 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    onSearch?.(e.target.value);
                  }}
                  placeholder="Search options..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Options List */}
          <div
            ref={listRef}
            className="max-h-60 overflow-y-auto"
            style={{ maxHeight: `${maxHeight}px` }}
          >
            {groupBy ? (
              // Grouped options
              Object.entries(filtered as Record<string, DropdownOption[]>).map(([group, groupOptions]) => (
                <div key={group}>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 sticky top-0">
                    {group}
                  </div>
                  {groupOptions.map((option, index) => (
                    <DropdownOption
                      key={option.id}
                      option={option}
                      isSelected={multiSelect ? (value as string[])?.includes(option.value) : value === option.value}
                      isHighlighted={highlightedIndex === index}
                      showIcons={showIcons}
                      multiSelect={multiSelect}
                      onClick={() => handleSelect(option)}
                    />
                  ))}
                </div>
              ))
            ) : (
              // Regular options
              (filtered as DropdownOption[]).map((option, index) => (
                <DropdownOption
                  key={option.id}
                  option={option}
                  isSelected={multiSelect ? (value as string[])?.includes(option.value) : value === option.value}
                  isHighlighted={highlightedIndex === index}
                  showIcons={showIcons}
                  multiSelect={multiSelect}
                  onClick={() => handleSelect(option)}
                />
              ))
            )}

            {/* Load More Button */}
            {async && hasMore && onLoadMore && (
              <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={onLoadMore}
                  className="w-full px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-md transition-colors"
                >
                  Load More
                </button>
              </div>
            )}

            {/* No Results */}
            {(filtered as DropdownOption[]).length === 0 && (
              <div className="px-3 py-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Dropdown Option Component
interface DropdownOptionProps {
  option: DropdownOption;
  isSelected: boolean;
  isHighlighted: boolean;
  showIcons: boolean;
  multiSelect: boolean;
  onClick: () => void;
}

function DropdownOption({
  option,
  isSelected,
  isHighlighted,
  showIcons,
  multiSelect,
  onClick
}: DropdownOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={option.disabled}
      className={`
        w-full px-3 py-2 text-left text-sm transition-colors
        ${isHighlighted ? 'bg-blue-50 dark:bg-blue-900' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}
        ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isSelected ? 'bg-blue-100 dark:bg-blue-800' : ''}
      `}
    >
      <div className="flex items-center gap-3">
        {/* Multi-select checkbox */}
        {multiSelect && (
          <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
            isSelected 
              ? 'bg-blue-600 border-blue-600' 
              : 'border-gray-300 dark:border-gray-600'
          }`}>
            {isSelected && <Check className="w-3 h-3 text-white" />}
          </div>
        )}

        {/* Icon */}
        {showIcons && option.icon && (() => {
          const IconComponent = option.icon!;
          return <IconComponent className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />;
        })()}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-900 dark:text-white truncate">
            {option.label}
          </div>
          {option.description && (
            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {option.description}
            </div>
          )}
        </div>

        {/* Single-select checkmark */}
        {!multiSelect && isSelected && (
          <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
        )}
      </div>
    </button>
  );
}

// Dropdown Demo Component
export function DropdownDemo() {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Sample options
  const options: DropdownOption[] = [
    { id: '1', label: 'Dashboard', value: 'dashboard', icon: Settings, description: 'Main dashboard view' },
    { id: '2', label: 'Analytics', value: 'analytics', icon: BarChart3, description: 'Data analytics and insights' },
    { id: '3', label: 'Users', value: 'users', icon: User, description: 'User management' },
    { id: '4', label: 'Settings', value: 'settings', icon: Settings, description: 'Application settings' },
    { id: '5', label: 'Security', value: 'security', icon: Shield, description: 'Security and privacy' },
    { id: '6', label: 'Performance', value: 'performance', icon: Zap, description: 'Performance monitoring' },
    { id: '7', label: 'Global', value: 'global', icon: Globe, description: 'Global configuration' },
    { id: '8', label: 'Favorites', value: 'favorites', icon: Heart, description: 'Your favorite items' },
  ];

  const groupedOptions: DropdownOption[] = [
    { id: '1', label: 'Dashboard', value: 'dashboard', icon: Settings, group: 'Navigation' },
    { id: '2', label: 'Analytics', value: 'analytics', icon: BarChart3, group: 'Navigation' },
    { id: '3', label: 'Users', value: 'users', icon: User, group: 'Management' },
    { id: '4', label: 'Settings', value: 'settings', icon: Settings, group: 'Management' },
    { id: '5', label: 'Security', value: 'security', icon: Shield, group: 'Security' },
    { id: '6', label: 'Performance', value: 'performance', icon: Zap, group: 'Security' },
  ];

  return (
    <div className="w-full h-full bg-gray-50 dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Filter className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Dropdown Component v3
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Comprehensive dropdown with multiple variants and features
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Basic Dropdown */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Dropdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Single Select
              </label>
              <DropdownV3
                options={options}
                value={selectedValue}
                onChange={setSelectedValue}
                placeholder="Choose an option..."
                searchable
                showIcons
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Multi Select
              </label>
              <DropdownV3
                options={options}
                value={selectedValues}
                onChange={setSelectedValues}
                placeholder="Choose multiple options..."
                multiSelect
                searchable
                showIcons
              />
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Variants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default
              </label>
              <DropdownV3
                options={options.slice(0, 4)}
                value=""
                onChange={() => {}}
                placeholder="Default variant"
                variant="default"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Outline
              </label>
              <DropdownV3
                options={options.slice(0, 4)}
                value=""
                onChange={() => {}}
                placeholder="Outline variant"
                variant="outline"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ghost
              </label>
              <DropdownV3
                options={options.slice(0, 4)}
                value=""
                onChange={() => {}}
                placeholder="Ghost variant"
                variant="ghost"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filled
              </label>
              <DropdownV3
                options={options.slice(0, 4)}
                value=""
                onChange={() => {}}
                placeholder="Filled variant"
                variant="filled"
              />
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sizes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Small
              </label>
              <DropdownV3
                options={options.slice(0, 4)}
                value=""
                onChange={() => {}}
                placeholder="Small size"
                size="sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Medium
              </label>
              <DropdownV3
                options={options.slice(0, 4)}
                value=""
                onChange={() => {}}
                placeholder="Medium size"
                size="md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Large
              </label>
              <DropdownV3
                options={options.slice(0, 4)}
                value=""
                onChange={() => {}}
                placeholder="Large size"
                size="lg"
              />
            </div>
          </div>
        </div>

        {/* Grouped Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Grouped Options</h3>
          <div className="max-w-md">
            <DropdownV3
              options={groupedOptions}
              value=""
              onChange={() => {}}
              placeholder="Choose from grouped options..."
              searchable
              showIcons
              groupBy="group"
            />
          </div>
        </div>

        {/* States */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">States</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Loading
              </label>
              <DropdownV3
                options={[]}
                value=""
                onChange={() => {}}
                placeholder="Loading options..."
                loading
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Disabled
              </label>
              <DropdownV3
                options={options.slice(0, 4)}
                value=""
                onChange={() => {}}
                placeholder="Disabled dropdown"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Error
              </label>
              <DropdownV3
                options={options.slice(0, 4)}
                value=""
                onChange={() => {}}
                placeholder="Error state"
                error="Please select a valid option"
              />
            </div>
          </div>
        </div>

        {/* Selected Values Display */}
        {(selectedValue || selectedValues.length > 0) && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Selected Values</h3>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              {selectedValue && (
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Single Select: </span>
                  <span className="text-sm text-gray-900 dark:text-white">{selectedValue}</span>
                </div>
              )}
              {selectedValues.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Multi Select: </span>
                  <span className="text-sm text-gray-900 dark:text-white">{selectedValues.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
