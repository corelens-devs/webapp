
import { useEffect } from 'react';

export const useScripts = (scripts = []) => {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        // Check if script is already loaded
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        script.async = false;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
      });
    };

    const loadAllScripts = async () => {
      try {
        for (const script of scripts) {
          await loadScript(script);
        }
        console.log('All scripts loaded successfully');
      } catch (error) {
        console.error('Error loading scripts:', error);
      }
    };

    loadAllScripts();

    return () => {
      // Cleanup if needed
      scripts.forEach(src => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script && script.dataset.removable !== 'false') {
          script.remove();
        }
      });
    };
  }, [scripts]);
};

export default useScripts;
