
import { build } from 'esbuild';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));
const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: ['main-source.js'],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['es2020', 'chrome80', 'firefox75', 'safari13', 'edge80'],
  outfile: 'power-redact.min.js',
  format: 'iife',
  globalName: 'PowerRedact',
  banner: {
    js: `/*! Power Redact Plugin v${packageJson.version} | MIT License | Enhanced UX Features */`
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.VERSION': `"${packageJson.version}"`
  },
  plugins: [
    {
      name: 'build-info',
      setup(build) {
        build.onStart(() => {
          console.log(`🔨 Building Power Redact Plugin v${packageJson.version}...`);
        });
        
        build.onEnd((result) => {
          if (result.errors.length === 0) {
            console.log('✅ Build completed successfully!');
            console.log(`📦 Output: power-redact.min.js`);
            console.log(`🎯 Target: Modern browsers with mobile support`);
          } else {
            console.log('❌ Build failed with errors:');
            result.errors.forEach(error => console.log(error));
          }
        });
      }
    }
  ],
  // Advanced optimization options
  treeShaking: true,
  splitting: false,
  chunkNames: '[name]-[hash]',
  assetNames: '[name]-[hash]',
  metafile: true,
  
  // Mobile optimization
  mangleProps: /^_/,
  reserveProps: /^__/,
  
  // CSS handling (if needed)
  loader: {
    '.css': 'text',
    '.svg': 'text'
  }
};

// Development build options
const devBuildOptions = {
  ...buildOptions,
  minify: false,
  sourcemap: 'inline',
  define: {
    'process.env.NODE_ENV': '"development"',
    'process.env.VERSION': `"${packageJson.version}-dev"`
  }
};

async function buildPlugin() {
  try {
    if (isWatch) {
      console.log('👀 Starting watch mode...');
      const ctx = await build({
        ...devBuildOptions,
        watch: {
          onRebuild(error, result) {
            if (error) {
              console.error('❌ Watch build failed:', error);
            } else {
              console.log('🔄 Rebuilt successfully!');
            }
          }
        }
      });
      
      // Keep the process running
      process.on('SIGINT', () => {
        console.log('\n👋 Stopping watch mode...');
        ctx.dispose();
        process.exit(0);
      });
      
    } else {
      // Production build
      const result = await build(buildOptions);
      
      if (result.metafile) {
        const analysis = await build({
          ...buildOptions,
          metafile: true,
          write: false
        });
        
        console.log('\n📊 Bundle Analysis:');
        console.log(`Total size: ${(analysis.metafile.outputs['power-redact.min.js'].bytes / 1024).toFixed(2)} KB`);
      }
    }
    
  } catch (error) {
    console.error('💥 Build process failed:', error);
    process.exit(1);
  }
}

// Additional build configurations for different environments
export const configs = {
  production: buildOptions,
  development: devBuildOptions,
  
  // Standalone version (no bundling)
  standalone: {
    ...buildOptions,
    bundle: false,
    outfile: 'power-redact.standalone.js',
    format: 'esm'
  },
  
  // Legacy browser support
  legacy: {
    ...buildOptions,
    target: ['es2015', 'chrome60', 'firefox55', 'safari11', 'edge16'],
    outfile: 'power-redact.legacy.min.js'
  }
};

// Run the build
buildPlugin();
