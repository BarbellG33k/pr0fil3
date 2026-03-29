import re

def main():
    filepath = '/home/guillermo/dev/pr0fil3/resume-alt.html'
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Update <select id="theme-select">
    old_select = """<select id="theme-select" class="theme-select" onchange="applyTheme(this.value)">
        <option value="editorial">Warm Editorial</option>
        <option value="executive">Executive Slate</option>
        <option value="carbon">Carbon Edge</option>
      </select>"""
    
    new_select = """<select id="theme-select" class="theme-select" onchange="applyTheme(this.value)">
        <option value="carbon">Carbon Edge</option>
        <option value="executive">Executive Edge</option>
        <option value="editorial">Warm Editorial</option>
        <option value="meridian">Meridian Dark</option>
        <option value="blueprint">Blueprint</option>
      </select>"""
    
    content = content.replace(old_select, new_select)

    # 2. Update CSS Themes
    old_css_themes = re.search(r':root \{.*?--transition: 0.5s cubic-bezier\(0.16, 1, 0.3, 1\);\n    \}', content, re.DOTALL)
    old_executive = re.search(r'\[data-theme="executive"\] \{.*?\n    \}', content, re.DOTALL)
    old_carbon = re.search(r'\[data-theme="carbon"\] \{.*?\n    \}', content, re.DOTALL)

    new_css_themes = """
    :root {
      /* Shared App Variables */
      --nav-width: 200px;
      --content-max: 800px;
      --border-radius: 12px;
      --transition: 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      
      /* Base Theme (Carbon Edge) Default */
      --heading-font: 'DM Serif Display', serif;
      --body-font: 'DM Sans', sans-serif;
      --ink: #111827;
      --ink-light: #374151;
      --ink-muted: #6b7280;
      --rule: #4b5563;
      --rule-subtle: #d1d5db;
      --accent: #0d7490;
      --accent-dark: #0a5a6e;
      --accent-light: #e0f2f7;
      --bg: #f9fafb;
      --page: #ffffff;
      
      --app-bg: var(--bg);
      --card-bg: var(--page);
      --glass-bg: rgba(255, 255, 255, 0.85);
      --glass-border: rgba(255, 255, 255, 0.5);
      --shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
      --shadow-hover: 0 15px 50px rgba(0,0,0,0.08);
    }

    [data-theme="carbon"] {
      --heading-font: 'DM Serif Display', serif;
      --body-font: 'DM Sans', sans-serif;
      --ink: #f3f4f6;
      --ink-light: #d1d5db;
      --ink-muted: #9ca3af;
      --rule: #374151;
      --rule-subtle: #1f2937;
      --accent: #38bdf8;
      --accent-dark: #0284c7;
      --accent-light: rgba(56, 189, 248, 0.1);
      --app-bg: #0f172a;
      --card-bg: #1e293b;
      --page: #1e293b;
      --glass-bg: rgba(30, 41, 59, 0.85);
      --glass-border: rgba(255, 255, 255, 0.05);
      --shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    [data-theme="executive"] {
      --heading-font: 'Inter', sans-serif;
      --body-font: 'Inter', sans-serif;
      --ink: #0f1923;
      --ink-light: #374151;
      --ink-muted: #6b7280;
      --rule: #94a3b8;
      --rule-subtle: #d1d9e0;
      --accent: #1e3a5f;
      --accent-dark: #152b47;
      --accent-light: #e8eef5;
      --app-bg: #e2e8f0;
      --card-bg: #ffffff;
      --glass-bg: rgba(255, 255, 255, 0.9);
      --shadow: 0 8px 30px rgba(15, 25, 35, 0.05);
    }

    [data-theme="editorial"] {
      --heading-font: 'Cormorant Garamond', serif;
      --body-font: 'DM Sans', sans-serif;
      --ink: #1a1a1a;
      --ink-light: #4a4a4a;
      --ink-muted: #888;
      --rule: #c8b99a;
      --rule-subtle: #e8e0d0;
      --accent: #8b6f47;
      --accent-dark: #7a5f3a;
      --accent-light: #f5f0e8;
      --app-bg: #fdfaf5;
      --card-bg: #ffffff;
      --glass-bg: rgba(253, 250, 245, 0.85);
      --shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
    }

    [data-theme="meridian"] {
      --heading-font: 'Space Grotesk', sans-serif;
      --body-font: 'Inter', sans-serif;
      --ink: #e6edf3;
      --ink-light: #c9d1d9;
      --ink-muted: #8b949e;
      --rule: #30363d;
      --rule-subtle: #21262d;
      --accent: #58a6ff;
      --accent-dark: #388bfd;
      --accent-light: rgba(88, 166, 255, 0.1);
      --app-bg: #010409;
      --card-bg: #0d1117;
      --glass-bg: rgba(13, 17, 23, 0.85);
      --glass-border: rgba(255, 255, 255, 0.05);
      --shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    [data-theme="blueprint"] {
      --heading-font: 'Space Grotesk', sans-serif;
      --body-font: 'Outfit', sans-serif;
      --ink: #0f172a;
      --ink-light: #1e3a5f;
      --ink-muted: #64748b;
      --rule: #bfdbfe;
      --rule-subtle: #eff6ff;
      --accent: #2563eb;
      --accent-dark: #1d4ed8;
      --accent-light: #dbeafe;
      --app-bg: #f0f4ff;
      --card-bg: #ffffff;
      --glass-bg: rgba(255, 255, 255, 0.9);
      --glass-border: rgba(37, 99, 235, 0.1);
      --shadow: 0 8px 30px rgba(37, 99, 235, 0.05);
    }
    """
    if old_css_themes and old_executive and old_carbon:
        # replace the entire block from the start of :root down to end of carbon
        start_idx = old_css_themes.start()
        end_idx = old_carbon.end()
        content = content[:start_idx] + new_css_themes.strip() + content[end_idx:]

    # 3. Update #header-right css for tighter horizontal layout
    old_header_css = """#header-right {
      display: flex; flex-direction: column; gap: 6px; text-align: right;
      font-size: 14px; color: var(--ink-light); 
    }"""
    
    new_header_css = """#header-right {
      display: flex; flex-direction: row; flex-wrap: wrap; gap: 8px 12px; justify-content: flex-end; align-items: center;
      font-size: 14px; color: var(--ink-light); max-width: 60%;
    }"""
    
    content = content.replace(old_header_css, new_header_css)

    # Make bullets visible inline
    if "display: none !important" in content.split('#header-right div')[0]:
        pass

    # 4. Replace THEMES object in JS
    js_themes_start = content.find("const THEMES = {")
    js_themes_end = content.find("\n    let currentTheme = ")
    
    if js_themes_start != -1 and js_themes_end != -1:
        new_js_themes = """const THEMES = {
      carbon: {
        name: 'Carbon Edge',
        attr: 'carbon',
        fonts: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap',
        colors: { INK: '#111827', INKL: '#374151', INKM: '#6b7280', ACC: '#0d7490', RULE: '#4b5563', JOBRULE: '#d1d5db' }
      },
      executive: {
        name: 'Executive Edge',
        attr: 'executive',
        fonts: 'https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap',
        colors: { INK: '#0f1923', INKL: '#374151', INKM: '#6b7280', ACC: '#1e3a5f', RULE: '#94a3b8', JOBRULE: '#d1d9e0' }
      },
      editorial: {
        name: 'Warm Editorial',
        attr: 'editorial',
        fonts: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap',
        colors: { INK: '#1a1a1a', INKL: '#4a4a4a', INKM: '#888888', ACC: '#8b6f47', RULE: '#c8b99a', JOBRULE: '#e8e0d0' }
      },
      meridian: {
        name: 'Meridian Dark',
        attr: 'meridian',
        fonts: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;600&display=swap',
        colors: { INK: '#e6edf3', INKL: '#c9d1d9', INKM: '#8b949e', ACC: '#58a6ff', RULE: '#30363d', JOBRULE: '#21262d' }
      },
      blueprint: {
        name: 'Blueprint',
        attr: 'blueprint',
        fonts: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600&display=swap',
        colors: { INK: '#0f172a', INKL: '#1e3a5f', INKM: '#64748b', ACC: '#2563eb', RULE: '#bfdbfe', JOBRULE: '#eff6ff' }
      }
    };"""
        
        content = content[:js_themes_start] + new_js_themes + content[js_themes_end:]
        
        # update currentTheme default string if needed
        content = content.replace("let currentTheme = 'editorial';", "let currentTheme = 'carbon';")

    with open(filepath, 'w') as f:
        f.write(content)

if __name__ == '__main__':
    main()
