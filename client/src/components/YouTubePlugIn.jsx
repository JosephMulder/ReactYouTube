import React from 'react';
import YouTube from 'react-youtube';

class InYouTube extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        const opts = {
        height: '100%',
        width: '100%',
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 2
        }
        };
       
        return (
        <div className="Youtubeplayer">  
        <YouTube
            videoId={this.props.vidId}
            opts={opts}
            onReady={this._onReady}
        />
        </div>
        );
    }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default InYouTube;