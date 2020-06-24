export const youtubeEmbeddable = (youtubeUrl) => {
  const video_id = youtubeId(youtubeUrl);
  return `https://www.youtube.com/embed/${video_id}?rel=0`
}

const youtubeId = (youtubeUrl) => {
  let video_id = youtubeUrl.split('v=')[1];
  const ampersandPosition = video_id.indexOf('&');
  if(ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }
  return video_id    
}

