// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);
// Create a function to get the parameter's value (uuid) from the URL
function getParameter(parameterName) {
  const parameter = new URLSearchParams(window.location.search);
  return parameter.get(parameterName);
}

// save parameter's value in a varaible called uuid
const uuid = getParameter('uuid');

// add the src attribute to the model viewer based on the value of uuid
const src = `./glb/${uuid}.glb`;
document.getElementById('model-viewer').setAttribute('src', src);

// check if the requested file (src) exists
function doesFileExist(urlToFile) {
  const xhr = new XMLHttpRequest();
  xhr.open('HEAD', urlToFile, false);
  xhr.send();
  if (xhr.status === '404') {
    return false;
  }
  return true;
}

const result = doesFileExist(src);

if (result === true) {
  console.log('File exists');
} else {
  console.log('File does not exist');
  document.getElementById('msg').style.display = 'block';
}
