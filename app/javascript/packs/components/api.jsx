var api = (uri, { ...props }) => {
    return fetch('/api/' + uri, { body: props.body, method: props.method }).then(response => {
        return response.json();
    });
}

export default api;