export const DATA_SPEC_ATTRIBUTE_NAME = 'data-spec';

/**
* Finds all instances of components in the rendered `componentWrapper` that are DOM components
* with the `data-spec` attribute matching `name`.
* @param {ReactWrapper} componentWrapper - Rendered componentWrapper (result of mount, shallow, or render)
* @param {string} specName - Name of `data-spec` attribute value to find
* @param {string|Function} typeFilter - (Optional) Expected type of the wrappers (defaults to all HTML tags)
* @returns {ReactComponent[]} All matching DOM components
*/
export const getSpecWrapper = (componentWrapper, specName, typeFilter) => {
    let specWrappers;

    if (!typeFilter) {
        specWrappers = componentWrapper.find(`[${DATA_SPEC_ATTRIBUTE_NAME}="${specName}"]`);
    } else {
        specWrappers = componentWrapper.findWhere((wrapper) => (
            wrapper.prop(DATA_SPEC_ATTRIBUTE_NAME) === specName && wrapper.type() === typeFilter
        ));
    }

    return specWrappers;
}


window.matchMedia = window.matchMedia || function() {
  return {
    matches : false,
    addListener : () => {},
    removeListener: () => {}
  }
}
