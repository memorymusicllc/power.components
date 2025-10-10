# Component Library Policies

## Repository Management
- **PRIMARY REPOSITORY**: git@github.com:memorymusicllc/power.components.git
- **MANDATORY**: All new components MUST be pushed to the component repository
- **REQUIRED**: Use branch naming convention: `feature/component-name` or `enhancement/component-name`
- **PROHIBITED**: DO NOT create components in the main application repository
- **MANDATORY**: All component changes MUST be reviewed before merging

## Design System Compliance
- **MANDATORY**: All components MUST use the unbound design system from `src/lib/design-system/`
- **REQUIRED**: Components MUST use design tokens instead of hardcoded values
- **PROHIBITED**: DO NOT bypass the theme system for styling
- **MANDATORY**: All components MUST support theme switching
- **REQUIRED**: Components MUST be responsive and mobile-first

## Component Architecture
- **MANDATORY**: All components MUST follow compound component patterns where applicable
- **REQUIRED**: Components MUST use TypeScript with comprehensive interfaces
- **PROHIBITED**: DO NOT create components without proper TypeScript types
- **MANDATORY**: All components MUST implement error boundaries
- **REQUIRED**: Components MUST include performance optimizations (memoization, lazy loading)

## Accessibility Requirements
- **MANDATORY**: All components MUST be WCAG 2.1 AA compliant
- **REQUIRED**: Components MUST include proper ARIA attributes
- **PROHIBITED**: DO NOT create components without keyboard navigation support
- **MANDATORY**: All interactive elements MUST have focus indicators
- **REQUIRED**: Components MUST be screen reader compatible

## Code Quality Standards
- **MANDATORY**: All components MUST include comprehensive JSDoc comments
- **REQUIRED**: Components MUST have usage examples in documentation
- **PROHIBITED**: DO NOT create components without proper error handling
- **MANDATORY**: All components MUST include metadata for the component library
- **REQUIRED**: Components MUST follow the established naming conventions

## Testing Requirements
- **MANDATORY**: All components MUST have unit tests
- **REQUIRED**: Components MUST have accessibility tests
- **PROHIBITED**: DO NOT create components without proper test coverage
- **MANDATORY**: All components MUST have visual regression tests
- **REQUIRED**: Components MUST be tested across different themes

## Documentation Standards
- **MANDATORY**: All components MUST be documented in COMPONENT_LIBRARY_DOCUMENTATION.md
- **REQUIRED**: Components MUST include usage examples and prop documentation
- **PROHIBITED**: DO NOT create components without proper documentation
- **MANDATORY**: All components MUST include accessibility guidelines
- **REQUIRED**: Components MUST include performance considerations

## Version Control
- **MANDATORY**: All component changes MUST be committed with descriptive messages
- **REQUIRED**: Use conventional commit format: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`
- **PROHIBITED**: DO NOT commit components without proper testing
- **MANDATORY**: All components MUST be tagged with semantic versions
- **REQUIRED**: Maintain a changelog for all component updates

## Integration Guidelines
- **MANDATORY**: All components MUST be exported from the main index file
- **REQUIRED**: Components MUST be compatible with the existing application
- **PROHIBITED**: DO NOT create components that break existing functionality
- **MANDATORY**: All components MUST follow the established import/export patterns
- **REQUIRED**: Components MUST be tree-shakeable

## Performance Standards
- **MANDATORY**: All components MUST be optimized for performance
- **REQUIRED**: Components MUST use React.memo where appropriate
- **PROHIBITED**: DO NOT create components that cause unnecessary re-renders
- **MANDATORY**: All components MUST support lazy loading
- **REQUIRED**: Components MUST have minimal bundle size impact

## Security Requirements
- **MANDATORY**: All components MUST be secure by default
- **REQUIRED**: Components MUST sanitize user inputs
- **PROHIBITED**: DO NOT create components with security vulnerabilities
- **MANDATORY**: All components MUST follow security best practices
- **REQUIRED**: Components MUST be audited for security issues

## Maintenance Guidelines
- **MANDATORY**: All components MUST be maintainable and well-structured
- **REQUIRED**: Components MUST follow consistent code style
- **PROHIBITED**: DO NOT create components with complex, hard-to-understand logic
- **MANDATORY**: All components MUST be easily extensible
- **REQUIRED**: Components MUST have clear separation of concerns

## Enforcement Actions
- **VIOLATION**: Creating components outside the design system results in immediate rejection
- **VIOLATION**: Missing accessibility features results in mandatory fixes
- **VIOLATION**: Poor documentation results in blocked merges
- **VIOLATION**: Performance issues result in optimization requirements
- **VIOLATION**: Security vulnerabilities result in immediate security review

## Compliance Monitoring
- **REQUIRED**: All component submissions MUST pass automated checks
- **MANDATORY**: Manual review required for all new components
- **PROHIBITED**: DO NOT bypass compliance checks
- **REQUIRED**: Regular audits of component library compliance
- **MANDATORY**: Update policies based on new requirements and best practices
