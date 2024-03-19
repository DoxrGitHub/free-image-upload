function uploadImage(webhook="https://discord.com/api/webhooks/1219672783101886604/Jlg3TV-rwpyV9ZZveeYwJOutrkHC3vusdDdOtwjAymOX4jq4Se9Zm_GFz2CNyubGudul") {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    if (!file) {
        return 'Please select an image file to upload.';
    }

    const formData = new FormData();
    formData.append('file', file);

    // Extract the file name before uploading
    const fileName = file.name;

    return fetch(webhook, {
        method: 'POST',
        body: formData
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        if (data && data.attachments && data.attachments.length > 0) {
            const attachment = data.attachments[0];
            // Return both the file name and the URL
            return `File Name: ${fileName}, Image URL: ${attachment.url}`;
        } else {
            return 'Failed to upload image.';
        }
    }).catch(error => {
        console.error('Error:', error);
        return 'Error uploading image: ' + error.message;
    });
}
