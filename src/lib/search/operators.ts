/**
 * Logic Operators
 * Visual logic operators with glowing effects and keyboard shortcuts
 */

import { LogicOperator } from './types'

export const logicOperators: LogicOperator[] = [
  {
    id: 'and',
    symbol: '∧',
    label: 'AND',
    description: 'All conditions must be true',
    color: 'text-blue-500',
    glowColor: 'shadow-blue-500/50',
    keyboard: '&'
  },
  {
    id: 'or',
    symbol: '∨',
    label: 'OR',
    description: 'At least one condition must be true',
    color: 'text-green-500',
    glowColor: 'shadow-green-500/50',
    keyboard: '|'
  },
  {
    id: 'not',
    symbol: '¬',
    label: 'NOT',
    description: 'Condition must be false',
    color: 'text-red-500',
    glowColor: 'shadow-red-500/50',
    keyboard: '!'
  },
  {
    id: 'xor',
    symbol: '⊕',
    label: 'XOR',
    description: 'Exactly one condition must be true',
    color: 'text-purple-500',
    glowColor: 'shadow-purple-500/50',
    keyboard: '^'
  }
]

export function parseQueryWithOperators(query: string): {
  terms: string[]
  operators: LogicOperator[]
  logic: string
} {
  const terms: string[] = []
  const operators: LogicOperator[] = []
  let logic = ''
  
  // Split by operators and identify them
  const parts = query.split(/(\s+[&|!^]\s+|\s+AND\s+|\s+OR\s+|\s+NOT\s+|\s+XOR\s+)/i)
  
  parts.forEach(part => {
    const trimmed = part.trim()
    if (!trimmed) return
    
    const operator = logicOperators.find(op => 
      op.keyboard === trimmed || 
      op.label.toLowerCase() === trimmed.toLowerCase()
    )
    
    if (operator) {
      operators.push(operator)
      logic += ` ${operator.symbol} `
    } else {
      terms.push(trimmed)
      logic += ` "${trimmed}" `
    }
  })
  
  return { terms, operators, logic: logic.trim() }
}

export function applyLogicToResults(
  results: any[],
  terms: string[],
  operators: LogicOperator[]
): any[] {
  if (terms.length === 0) return results
  if (terms.length === 1) return results
  
  let filteredResults = results
  
  for (let i = 0; i < operators.length; i++) {
    const operator = operators[i]
    const leftTerm = terms[i]
    const rightTerm = terms[i + 1]
    
    if (!leftTerm || !rightTerm) continue
    
    const leftResults = filteredResults.filter(item => 
      JSON.stringify(item).toLowerCase().includes(leftTerm.toLowerCase())
    )
    const rightResults = filteredResults.filter(item => 
      JSON.stringify(item).toLowerCase().includes(rightTerm.toLowerCase())
    )
    
    switch (operator.id) {
      case 'and':
        filteredResults = leftResults.filter(item => 
          rightResults.some(right => right.id === item.id)
        )
        break
      case 'or':
        filteredResults = [...new Set([...leftResults, ...rightResults])]
        break
      case 'not':
        filteredResults = filteredResults.filter(item => 
          !leftResults.some(left => left.id === item.id)
        )
        break
      case 'xor':
        filteredResults = [
          ...leftResults.filter(item => !rightResults.some(right => right.id === item.id)),
          ...rightResults.filter(item => !leftResults.some(left => left.id === item.id))
        ]
        break
    }
  }
  
  return filteredResults
}
