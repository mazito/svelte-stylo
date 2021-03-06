import { DefaultTheme } from './default-theme'
import { DefaultExtras } from './extra-domains'
import { buildDomains } from './domains'
import { sortBreakpoints } from './breakpoints'

let _themes = {
  'default': DefaultTheme
}; 

let _wireframesOn = false;

let _current = _themes['default'];


export default {

  get(name) {
    /**
     * Get the named Theme.
     * @returns: the named Theme or the default one if none.
     */
    if (!name) return _themes['default'];
    return _themes[name] || _themes['default'];
  },
  
  build(name, spec) {
    /**
     * Builds the new Theme using the given Specification.
     */
    _themes[name] = spec || DefaultTheme;
    _themes[name].viewports = sortBreakpoints(_themes[name].breakpoints)
    return this;
  },
  
  wireframes(state) {
    if (state === undefined) return _wireframesOn;
    _wireframesOn = state; // True or False
    return this;
  },

  active(name) {
    /**
     * Activates the named theme and returns it.
     */
    if (!name) return _current;
    _current = _themes[name] || _themes['default'];
    buildDomains(_current, DefaultExtras);
    return _current;
  },
}
