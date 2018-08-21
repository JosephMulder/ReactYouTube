import React from 'react';
import YouTubePlugIn from './YouTubePlugIn.jsx';
import SuggestedVideos from './SuggestedVideos.jsx';
import VideoDescription from './VideoDescription.jsx';
let youtubedata = require('../youtube.js').searchYouTube;
let apikey = require('../apikey.js').api;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vidData: [{snippet: {title: "hi", channelTitle:"hi", thumbnails: {high: {url: "https://i.ytimg.com/vi/NO2DaxhoWHk/hqdefault.jpg"}}}}],
            intialVidId: "lha5tQO0H-8",
            term: '',
            vidinfo: {title: "Nudging: The Future of Advertising", channelName: "PolyMatter", publishedAt: "Published on Oct 13, 2017",randomNum: 1,  viddes: `Advertising tries to convince you to buy things, but nudging is about influencing customers without their knowing. It's only going to be used more and more, but where should we place limits (if at all)?
            *This video includes a paid sponsor. This sponsor was not involved in the making of the video, nor did they write any of the script. All portions of the advertisement are located at the end of the video, which was paid for as sponsored advertising content. This channel is not directly affiliated with the sponsored company, but does explicitly endorse their product after testing it firsthand. If you have questions or concerns about sponsored content, please email PolyMatter using the channel page.
            Music: Hidden Agenda Kevin MacLeod (incompetech.com) Licensed under Creative Commons: By Attribution 3.0 License`}
        }
        this.youtubeplayer = this.youtubeplayer.bind(this);
        this.onChange = this.onChange.bind(this);
        this.searching = this.searching.bind(this);
        this.changeVid = this.changeVid.bind(this);
    }

    componentWillMount() {
        this.youtubeplayer();
    }

    onChange(e) {
        this.setState({
            term: e.target.value
        });
    }

    youtubeplayer() {
        let options = {
         key: apikey,
         part: 'snippet',
         q: "Nudging: The Future of Advertising",
         type: 'video',
         videoEmbeddable: 'true',
         maxResults: 11
        }
        youtubedata(options, (data) => {
            this.setState({vidData: data.items.slice(1)});
        })
     }

     searching(event) {
        event.preventDefault();
        event.stopPropagation();
        let options = {
            key: apikey,
            part: 'snippet',
            q: this.state.term,
            type: 'video',
            videoEmbeddable: 'true',
            maxResults: 11
           }
           youtubedata(options, (data) => {
               var date = data.items[0].snippet.publishedAt;

               var datePublished = function() {
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                date = date.slice(0, 10).split('-');
                if (date[2][0] === '0') {
                    date[2] = date[2][1];
                }
                return "Published on " + months[Number(date[1]) -1] + ' ' + date[2] + ', ' + date[0];
              }
            var selectedDate = datePublished();
            var randomNum = Math.round(Math.random() * 10);
             this.setState({vidData: data.items.slice(1), intialVidId: data.items[0].id.videoId,
            vidinfo: {title: data.items[0].snippet.title, channelName: data.items[0].snippet.channelTitle,randomNum: randomNum,  viddes: data.items[0].snippet.description, publishedAt: selectedDate}});
        });
     }

     changeVid(data) {
        var selectedVid = data.id.videoId;
        var selectedTitle = data.snippet.title;
        var selectedChannelName = data.snippet.channelTitle;
        var selectedVidDes = data.snippet.description;
        var date = data.snippet.publishedAt;

        var datePublished = function() {
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            date = date.slice(0, 10).split('-');
            if (date[2][0] === '0') {
                date[2] = date[2][1];
            }
            return "Published on " + months[Number(date[1]) -1] + ' ' + date[2] + ', ' + date[0];
          }
        var selectedDate = datePublished();
        var randomNum = Math.round(Math.random() * 10);

        let options = {
            key: apikey,
            part: 'snippet',
            q: data.snippet.title,
            type: 'video',
            videoEmbeddable: 'true',
            maxResults: 11
           }
           youtubedata(options, (data) => {
             this.setState({vidData: data.items.slice(1), intialVidId: selectedVid,
            vidinfo: {title: selectedTitle, channelName: selectedChannelName, randomNum: randomNum, viddes: selectedVidDes, publishedAt: selectedDate}});
        });
     }

    render() {
        return (
            <div>
                <div className="navbar" >

                  <div className="logo" >
                      <img src="youtubelogo.jpg" className="youtubelogo"/>
                  </div>
                  <form className="searchform" onSubmit={this.searching}>
                        <input  className="inputsearch" type="text" placeholder="Search" value={this.state.term} onChange={this.onChange}/>
                        <button className="buttonsearch" type="submit" ><img src="search.png" className="searchimg"/></button>
                    </form>
                </div>
                <YouTubePlugIn vidId={this.state.intialVidId}/>
                <SuggestedVideos data={this.state.vidData} changeVid={this.changeVid}/>
                <VideoDescription vidinfo={this.state.vidinfo}/>
            </div>
        )
    }
}

export default App;