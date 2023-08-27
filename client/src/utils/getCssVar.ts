const getCssVar = (name: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
};

export default getCssVar;
