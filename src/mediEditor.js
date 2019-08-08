const editor = new MediumEditor('.medium-editor');

const saveUrl = 'http://lib.stenrine.com/medi/post';

const postNameBox = document.getElementById('post-name');
let postName = '';
postNameBox.addEventListener('change', (event) => {
    postName = event.target.innerHtml;
    console.log('postName is ', postName);
});

const saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => {
    fetch(saveUrl, {
        method: 'POST',
        body: JSON.stringify({
            postHtml: editor.getContent,
            postName: postName;
        }),
    }).then(function(response) {
        if(response.ok) {
            console.log('response ok!', response);
            //response.blob().then(function(myBlob) {
            //    var objectURL = URL.createObjectURL(myBlob);
            //    myImage.src = objectURL;
            //});
        } else {
            console.log('Network response was not ok.');
        }
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
    });
});



