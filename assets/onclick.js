function onc(service) {
  if (service === 'discord') {
    oncDiscord();
  }
}

function oncDiscord() {
  uploadImage()
  .then(result => {
    // Extract the file name from the result string
    const fileNameStartIndex = result.indexOf('File Name: ') + 'File Name: '.length;
    const fileNameEndIndex = result.indexOf(', Image URL:');
    const fileName = result.substring(fileNameStartIndex, fileNameEndIndex);

    // Extract the Image URL from the result string
    const imageUrlStartIndex = result.indexOf('Image URL: ') + 'Image URL: '.length;
    const imageUrlEndIndex = result.length;
    const imageUrl = result.substring(imageUrlStartIndex, imageUrlEndIndex);

    // Update the innerHTML of the 'output' element with the extracted file name
    const outputElement = document.getElementById('output');
    const newDiv = document.createElement('div');
    newDiv.className = 'minicontainer';
    newDiv.textContent = fileName;
    newDiv.addEventListener('click', () => {
      navigator.clipboard.writeText(imageUrl)
        .then(() => {
          console.log('Image URL copied to clipboard');
        })
        .catch(err => {
          console.error('Failed to copy Image URL: ', err);
        });
    });
    outputElement.appendChild(newDiv);
    outputElement.appendChild(document.createElement('br'));
  });
}