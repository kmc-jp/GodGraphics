import React from 'react';
import ReactDOM from 'react-dom'
import UploadForm from "./components/upload_form"

function EditForm(props) {
    var tags = props.tags.split(' ');
    var images = props.images.split(' ');

    return (
        <UploadForm
            id={props.id}
            title={props.title}
            caption={props.caption}
            tags={tags}
            images={images}
            editMode
        />
    );
}

ReactDOM.render(
    <EditForm
        id={document.querySelector('#container').getAttribute('data-id')}
        title={document.querySelector('#container').getAttribute('data-title')}
        caption={document.querySelector('#container').getAttribute('data-caption')}
        tags={document.querySelector('#container').getAttribute('data-tags')}
        images={document.querySelector('#container').getAttribute('data-images')}
    />,
    document.querySelector('#container')
);