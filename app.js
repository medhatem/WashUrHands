navigator.getUserMedia = 
    navigator.getUserMedia ||
    navigator.webkitGetuserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;

const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
let model;

handTrack.startVideo(video).then( status => {
    if(status){
        navigator.getUserMedia(
            {video:{}}, 
            stream=>{
                video.srcObject = stream;
                setInterval(runDetection, 50);
            },
            err=> console.log(err)
            );
    }
});

function runDetection(){
    model.detect(video).then(predictions=> {
        console.log(predictions);
        if(predictions.length >0){
            audio.play();
        }
    })
}
handTrack.load().then( lmodel=>{
    model= lmodel;
});