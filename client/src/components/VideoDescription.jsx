import React from 'react';


class VideoDescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            image: ["j.jpg", "poly.jpg", "guy.jpg", "cnn.jpg", "adobe.jpg", "madeon.jpg", "minute.jpg", "photo.jpg", "rich.jpg", "userprofile.jpg", "bald.jpg"],
            views: ["225,408 views", "7,487,421 views", "48,370 views", "78,448 views", "508,395 views", "455,045 views", "1,014,427 views", "2,459,794 views", "14,285 views", "154,915 views", "52,990 views"]
        }// YouTube Api doesn't provide the youtube accounts image or the video views so I had to save some and randomize them on output
    }


    render() {
        return (
            
            <div className="description">
               <div className="top">
                  <h1>{this.props.vidinfo.title}</h1>
                  <p>{this.state.views[this.props.vidinfo.randomNum]}</p>
               </div>

               <div className="userprofile">
                 <div className="channelcontainer">
                    <img src={this.state.image[this.props.vidinfo.randomNum]} className="channelphoto"/>
                    <p>{this.props.vidinfo.channelName}</p>
                    <p>{this.props.vidinfo.publishedAt}</p>

                    <div className="videodescription">
                        {this.props.vidinfo.viddes.split('\n').map((item, key) => (
                            <p key={key}>
                                {item}
                                <br/>
                            </p>
                        ))
                            }
                    </div>
                 </div> 
               </div>
            </div>
        )
    }
}

export default VideoDescription;