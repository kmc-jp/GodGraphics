import React from 'react'

export default class MultipleFileForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
        this.onChange = this.onChange.bind(this)
        this.handleClickImage = this.handleClickImage.bind(this)
    }

    getImages() {
        return this.state.images;
    }

    onChange(e) {
        var files = e.target.files;
        var images = this.state.images;
        for (var i = 0; i < files.length; ++i) {
            images.push(files[i]);
        }
        this.setState({ images: images });
    }

    handleClickImage(e, key) {
        var target = e.target;
        var num = target.getAttribute("data-num");
        var images = this.state.images;
        images.splice(num, 1);
        this.setState({ images: images });
    }

    render() {
        var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;
        var previews = [];
        var inputs = [];
        for (var i in this.state.images) {
            var image = this.state.images[i];
            previews.push(<img src={createObjectURL(image)} key={i} height="200" onClick={(this.handleClickImage)} data-num={i} style={{ cursor: "pointer", pointerEvents: "auto" }} />);

        }

        return (
            <div>
                <div style={{ position: "relative" }}>
                    <div style={{ position: "relative" }}>
                    </div>
                    <div style={{ position: "relative", width: "100%", minHeight: "200px", border: "1px solid black", zIndex: 1, pointerEvents: "none" }}>
                        {previews}
                        <span>
                            ファイルを選択する
                        </span>
                    </div>
                    < input style={{ width: "100%", height: "100%", opacity: "0", top: "0", left: "0", position: "absolute", zIndex: 0 }} type="file" accept="image/*" multiple onChange={this.onChange} value="" />
                </div>
            </div >
        );
    }
}