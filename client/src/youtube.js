import $ from 'jquery';

var searchYouTube = (options, callback) => {
    return $.get('https://www.googleapis.com/youtube/v3/search', options, (data) => {
      callback(data);
    })   
  };

module.exports.searchYouTube = searchYouTube;