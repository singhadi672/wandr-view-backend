const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  kind: String,
  etag: String,
  items: [
    {
      kind: String,
      etag: String,
      id: String,
      snippet: {
        publishedAt: String,
        channelId: String,
        title: String,
        description: String,
        thumbnails: {
          default: {
            url: String,
            width: Number,
            height: Number,
          },
          medium: {
            url: String,
            width: Number,
            height: Number,
          },
          high: {
            url: String,
            width: Number,
            height: Number,
          },
          standard: {
            url: String,
            width: Number,
            height: Number,
          },
          maxres: {
            url: String,
            width: Number,
            height: Number,
          },
        },
        channelTitle: String,
        tags: Array,
        categoryId: String,
        liveBroadcastContent: String,
        defaultLanguage: String,
        localized: {
          title: String,
          description: String,
        },
        defaultAudioLanguage: String,
      },
      statistics: {
        viewCount: String,
        likeCount: String,
        dislikeCount: String,
        favoriteCount: String,
        commentCount: String,
      },
    },
  ],
  pageInfo: {
    totalResults: Number,
    resultsPerPage: Number,
  },
});

const Video = mongoose.model("Video", VideoSchema);

module.exports = { Video };
