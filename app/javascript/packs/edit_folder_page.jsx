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

var dom = document.querySelector('#container');

ReactDOM.render(
    <EditForm
        id={dom.getAttribute('data-id')}
        title={dom.getAttribute('data-title')}
        caption={dom.getAttribute('data-caption')}
        tags={dom.getAttribute('data-tags')}
        images={dom.getAttribute('data-images')}
    />,
    dom
);