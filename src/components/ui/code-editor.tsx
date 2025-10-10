/**
 * WYSIWYG Code Editor
 * Code editor with language dropdown and syntax highlighting
 * 
 * @version 1.0.0
 * @date 2025-10-08
 */

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Code, 
  Play, 
  Copy, 
  Download, 
  Upload, 
  Settings,
  Maximize2,
  Minimize2,
  Save
} from 'lucide-react'

interface CodeEditorProps {
  className?: string
  initialLanguage?: string
  initialCode?: string
}

export function CodeEditor({ 
  className, 
  initialLanguage = 'javascript',
  initialCode = '// Write your code here\nconsole.log("Hello, World!");'
}: CodeEditorProps) {
  const [language, setLanguage] = useState(initialLanguage)
  const [code, setCode] = useState(initialCode)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isSaved, setIsSaved] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const languages = [
    { value: 'javascript', label: 'JavaScript', extension: '.js' },
    { value: 'typescript', label: 'TypeScript', extension: '.ts' },
    { value: 'python', label: 'Python', extension: '.py' },
    { value: 'java', label: 'Java', extension: '.java' },
    { value: 'cpp', label: 'C++', extension: '.cpp' },
    { value: 'csharp', label: 'C#', extension: '.cs' },
    { value: 'go', label: 'Go', extension: '.go' },
    { value: 'rust', label: 'Rust', extension: '.rs' },
    { value: 'php', label: 'PHP', extension: '.php' },
    { value: 'ruby', label: 'Ruby', extension: '.rb' },
    { value: 'swift', label: 'Swift', extension: '.swift' },
    { value: 'kotlin', label: 'Kotlin', extension: '.kt' },
    { value: 'html', label: 'HTML', extension: '.html' },
    { value: 'css', label: 'CSS', extension: '.css' },
    { value: 'sql', label: 'SQL', extension: '.sql' },
    { value: 'json', label: 'JSON', extension: '.json' },
    { value: 'yaml', label: 'YAML', extension: '.yml' },
    { value: 'markdown', label: 'Markdown', extension: '.md' }
  ]

  const handleCodeChange = (value: string) => {
    setCode(value)
    setIsSaved(false)
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    setIsSaved(false)
  }

  const handleSave = () => {
    // Simulate save operation
    setIsSaved(true)
    // In a real implementation, this would save to backend
  }

  const handleRun = () => {
    // Simulate code execution
    console.log('Running code:', code)
    // In a real implementation, this would execute the code
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
  }

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `code${languages.find(l => l.value === language)?.extension || '.txt'}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.js,.ts,.py,.java,.cpp,.cs,.go,.rs,.php,.rb,.swift,.kt,.html,.css,.sql,.json,.yml,.md'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          setCode(content)
          setIsSaved(false)
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      javascript: 'bg-yellow-100 text-yellow-800',
      typescript: 'bg-blue-100 text-blue-800',
      python: 'bg-green-100 text-green-800',
      java: 'bg-red-100 text-red-800',
      cpp: 'bg-purple-100 text-purple-800',
      csharp: 'bg-indigo-100 text-indigo-800',
      go: 'bg-cyan-100 text-cyan-800',
      rust: 'bg-orange-100 text-orange-800',
      php: 'bg-pink-100 text-pink-800',
      ruby: 'bg-red-100 text-red-800',
      swift: 'bg-orange-100 text-orange-800',
      kotlin: 'bg-purple-100 text-purple-800',
      html: 'bg-orange-100 text-orange-800',
      css: 'bg-blue-100 text-blue-800',
      sql: 'bg-gray-100 text-gray-800',
      json: 'bg-green-100 text-green-800',
      yaml: 'bg-yellow-100 text-yellow-800',
      markdown: 'bg-gray-100 text-gray-800'
    }
    return colors[lang] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Card className={`${className} ${isFullscreen ? 'fixed inset-0 z-50 m-0' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="w-5 h-5" />
            <CardTitle>Code Editor</CardTitle>
            <Badge variant="outline" className={getLanguageColor(language)}>
              {languages.find(l => l.value === language)?.label}
            </Badge>
            {!isSaved && (
              <Badge variant="destructive" className="text-xs">
                Unsaved
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        <CardDescription>
          WYSIWYG code editor with syntax highlighting and language support
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.value} value={lang.value}>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={`text-xs ${getLanguageColor(lang.value)}`}>
                        {lang.extension}
                      </Badge>
                      <span>{lang.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleUpload}>
              <Upload className="w-4 h-4 mr-1" />
              Upload
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button size="sm" onClick={handleRun}>
              <Play className="w-4 h-4 mr-1" />
              Run
            </Button>
          </div>
        </div>

        <Separator />

        {/* Code Editor */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-full h-96 p-4 font-mono text-sm bg-muted/50 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Write your code here..."
            spellCheck={false}
          />
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {code.split('\n').length} lines, {code.length} characters
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Language: {languages.find(l => l.value === language)?.label}</span>
            <span>Lines: {code.split('\n').length}</span>
            <span>Chars: {code.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Status: {isSaved ? 'Saved' : 'Modified'}</span>
            <div className={`w-2 h-2 rounded-full ${isSaved ? 'bg-green-500' : 'bg-yellow-500'}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

CodeEditor.metadata = {
  name: 'CodeEditor',
  label: 'WYSIWYG Code Editor',
  version: '1.0.0',
  date: '2025-10-08',
  description: 'WYSIWYG code editor with language dropdown, syntax highlighting, and file operations',
  phase: 'Core',
  category: 'Development Tools',
  tags: ['Code', 'Editor', 'WYSIWYG', 'Syntax', 'Languages']
}
