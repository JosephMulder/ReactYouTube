import React from 'react';
let youtubedata = require('../youtube.js').searchYouTube;


class SuggestedVideos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.changeVideo = this.changeVideo.bind(this);
    }

    changeVideo(data) {
        this.props.changeVid(data);
    }


    render() {
        return (
            <div className="suggestedvids">
              {this.props.data.map((video, index) => (
                <div className="row" key={index} onClick={() => this.changeVideo(video)}>
                    <div className="col-1">
                       <img src={`${video.snippet.thumbnails.high.url}`} className="thumbnail"/>
                    </div>
                    <div className="col-2">
                       <p>{video.snippet.title}</p>
                                      
                       <p>{video.snippet.channelTitle}</p>
                    </div>
                </div>
            
              ))}

            </div>
        )
    }
}

export default SuggestedVideos;
