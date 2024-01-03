function getCssVar(name) {

  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

function setCssVar(name, value) {

  document.querySelector(":root").style.setProperty(name, value)
}

function getCalculatedDimensions(elem) {

  let styles = window.getComputedStyle(elem);
  let width = (elem.offsetWidth + parseFloat(removeSuffix(styles["marginRight"], "px")) + parseFloat(removeSuffix(styles["marginLeft"], "px")));
  let height = (elem.offsetHeight + parseFloat(removeSuffix(styles["marginTop"], "px")) + parseFloat(removeSuffix(styles["marginBottom"], "px")));
  return { width: width, height: height };
}

function removeSuffix(value, suffix) {

  return value.split(suffix)[0];
}