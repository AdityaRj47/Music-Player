document.addEventListener("DOMContentLoaded", function(){
  
//Song list
  const songs=[
    {
        title:"Drive breakbeat",
        duration:"1:49",
        thumbnail:"./data/preview-img-1.jpg",
        src:"./data/track1.mp3",
        artist:"Rockot",
        year:2023,
//added some new properties as per given in  Level 2
        isVerified:true,
        followers: 1371245,
        monthlyListener:1234567,
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        title:"Titanium",
        duration:"1:46",
        thumbnail:"./data/preview-img-2.jpg",
        src:"./data/track2.mp3",
        artist:"AlisiaBeats",
        year:2023,
//added some new properties as per given in  Level 2
        isVerified:true,
        followers: 1371245,
        monthlyListener:1234567,
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        title:"Science Documentary",
        duration:"2:07",
        thumbnail:"./data/preview-img-3.jpg",
        src:"./data/track3.mp3",
        artist:"Lexin_Music",
        year:2023,
//added some new properties as per given in  Level 2
        isVerified:true,
        followers: 1371245,
        monthlyListener:1234567,
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
        title:"Once In Paris",
        duration:"2:12",
        thumbnail:"./data/preview-img-4.jpg",
        src:"./data/track4.mp3",
        artist:"Pumpupthemind",
        year:2023,
//added some new properties as per given in  Level 2
        isVerified: false,
        followers: 1371245,
        monthlyListener:1234567,
        description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }
  ];
//Audio constructor
  let audio=new Audio();
  
//Getting access to DOM elements
  const songList= document.getElementById("song-List");
  const thumbnail=document.getElementById("thumbnail");
  const trackTitle=document.getElementById("player-title");
  const trackDescription=document.getElementById("player-description");
  const  progress= document.getElementById("progress");
  const  currTime= document.getElementById("current-time");
  const  leftTime= document.getElementById("time-left");
  // const restartBtn=document.getElementById("restart");
  const playPauseBtn=document.getElementById("play-pause");
  // const stopBtn=document.getElementById("stop");
  const volumeControl=document.getElementById("volume");
////////adding new buttons fr level 2///////////////////
  const shuffleBtn=document.getElementById("shuffle");
  const prevBtn= document.getElementById("prev");
  const nextBtn=document.getElementById("next");
  const loopImg=document.getElementById("loop-img");
  const shuffleImg= document.getElementById("shuffle-img");
  const repeatBtn=document.getElementById("repeat");
  const customDropdown=document.getElementById("custom-dropdown");
  const dropdownItems=document.querySelectorAll(".custom-dropdown-item");
  const thumbnailContainer=document.getElementById("thumbnail-container");

//Attach event listeners to element
  playPauseBtn.addEventListener("click",playPause);
  // restartBtn.addEventListener("click",restart);
  // stopBtn.addEventListener("click",stopTrack);
  progress.addEventListener("input", function(){ // function for if USER slides the slider
     audio.currentTime=progress.value; 
   });
  volumeControl.addEventListener("input",updateVolume);
  audio.addEventListener("timeupdate",updateProgress); //changes the progress along with time stamp
  audio.addEventListener("play",()=> updatePlayPauseBtn(true));//show pause icon
  audio.addEventListener("pause",()=> updatePlayPauseBtn(false));//show play icon
  //////////////////adding aevent listeners/////////////////////////
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click",()=> nextSong(true));
  audio.addEventListener("ended",()=> nextSong(false));//goes to the next song without clicking
  shuffleBtn.addEventListener("click", toggleShuffleMode);
  repeatBtn.addEventListener("click",toggleRepeatMode);
  customDropdown.addEventListener("click",toggleDropdown);
  // ADD the event to preview details
  thumbnailContainer.addEventListener("click", openpreviewModel);

//To store index of track being played
  let currentSongIndex=0;
  /////For LEVEL 2//////
  let isShuffleMode=true;
  let isRepeatMode=false;
  
  loadSong(currentSongIndex);

  const updatePlayPauseBtn = (paused) =>{
      playPauseBtn.innerHTML= paused 
      ? `<img src="./icons/pause-button.svg"/>`
      : `<img src="./icons/play-button.svg"/>`;
  };

  //function to play or pause
  function playPause(){
    if(audio.paused){
        audio.play();
        updatePlayPauseBtn(audio.paused);
    }else{
        audio.pause();
        updatePlayPauseBtn(audio.paused);
    }
  }

//loading new songs with song details
  function loadSong(index){
    const currentSong= songs[index];
    audio.src = currentSong.src;
    thumbnail.src = currentSong.thumbnail;
    trackTitle.innerText = currentSong.title;
    trackDescription.innerText = currentSong.artist;
    leftTime.textContent = "00.00";
    audio.addEventListener("loadedmetadata", function(){
      progress.max = audio.duration;
    });
    updateCurrentSongHighlight(index);
  }

//to play the next track the track
// function restart() {
//  audio.currentTime=0;
//  audio.play();
// }

//to stop the track
  // function stopTrack(){
  //   audio.currentTime=0;
  //   audio.pause();
  // }

//Navigate to previous song
  function prevSong(){
    // currentSongIndex = currentSongIndex-1;
    loadSong(currentSongIndex-1);
    audio.play();
  }
//Naviagate to next song
  function nextSong(isBtnClicked){
    if(isShuffleMode || isBtnClicked){
      currentSongIndex++;
      loadSong(currentSongIndex);
      audio.play();
    }else{
      audio.currentTime= 0;
      progress.value= 0;
      audio.play();
    }
  }

//Toggle the shuffleMode
 function toggleShuffleMode(){
   isShuffleMode=true;
   isRepeatMode=false;
  shuffleImg.src="./icons/shuffle-highlighted.svg";
  loopImg.src="./icons/loop.svg";
  updateButtonState(shuffleBtn,isShuffleMode);//activates shuffle, deactivates repeat,updates to highlighted shuffle
 }
 //Toggle the repeatMode
 function toggleRepeatMode(){
   isShuffleMode=false;
   isRepeatMode=true;
   shuffleImg.src="./icons/shuffle.svg";
   loopImg.src="./icons/loop-highlighted.svg";
   updateButtonState(repeatBtn,isRepeatMode);
 }

 function updateButtonState(button, isActive){ //highlights or highlight removal the button
   if(isActive){
    button.classList.add("selected");
   }else{
    button.classList.remove("selected");
   }
 }
 
 function toggleDropdown(){
   if(document.getElementById("dropdown-list-items").style.display==="block"){
    document.getElementById("dropdown-list-items").style="display:none"; //can NOT be seen
   }else{
    document.getElementById("dropdown-list-items").style="display:block";//can be seen
   }
 }

 dropdownItems.forEach(function(item) {
    item.addEventListener("click", function(){
      const selectedVal = this.getAttribute("data-value");
      audio.playbackRate = parseFloat(selectedVal);
      dropdownItems.forEach(function(item) {
        item.classList.remove("selected-speed");
      });
      this.classList.add("selected-speed");
   });
 });

//to change the volume bar
  function updateVolume(){
    audio.volume = volumeControl.value;
  }

//if the user changes the progress bar and changing the time
  function updateProgress(){
    const remainingTime=audio.duration-audio.currentTime;
    progress.value=audio.currentTime;
    currTime.textContent = `${formatTime(audio.currentTime)}`;
    leftTime.textContent = `${
      "-" + (remainingTime >=0 ? formatTime(remainingTime) : "00.00")
    }`;
  }

  function formatTime(time){
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${padZero(minutes)} : ${padZero(seconds)}`;
  }

  function padZero(number){
    return(number < 10 ? "0" : "") + number;
  }

  function updateCurrentSongHighlight() {
    const titleElements = document.querySelectorAll(".track-title");
    titleElements.forEach((element) => {
      element.classList.remove("current-song");
     });
     const currentSongTitleElement = document.querySelector(
      `.item-container[data-index = "${currentSongIndex}"] .track-title`
     );
     
     if(currentSongTitleElement){
      currentSongTitleElement.classList.add("current-song");
    }
  }
  
//to render list of songs in left menu from given array
  function renderSongList(){
//clear existing list
   songList.innerHTML = "";
   songs.forEach((song,index) =>{
    const itemContainer = document.createElement("div");
    const thumbnailImg = document.createElement("img");
    const itemImg = document.createElement("div");
    const imgElement = document.createElement("img");
    const trackDataContainer = document.createElement("div");
    const trackTitle = document.createElement("p");
    const trackArtist = document.createElement("p");
    const trackDurationContainer = document.createElement("div");
    const trackDuration = document.createElement("p");
    const trackYear = document.createElement("p");
 
//Assign the classes and attributes to elements
   itemContainer.classList.add("item-container");
   thumbnailImg.classList.add("list-thumbnail");
   itemContainer.setAttribute("data-index", index);
   itemImg.classList.add("item-img");
   trackDataContainer.classList.add("track-data-container");
   trackTitle.classList.add("track-title");
   trackArtist.classList.add("track-artist");
   trackDurationContainer.classList.add("track-duration-container");
   trackDuration.classList.add("track-duration");
   trackYear.classList.add("track-year");
    
   itemContainer.addEventListener("click" ,() => {
     currentSongIndex =index;
      loadSong(currentSongIndex);
      audio.play();
      updatePlayPauseBtn();
   });

   imgElement.src = "./icons/outline.svg";
   thumbnailImg.src = song.thumbnail;
   trackTitle.textContent = song.title;
   trackArtist.textContent = song.artist || "Umknown Artist";
   trackDuration.textContent = song.duration;
   trackYear.textContent = song.year || "Unknown Year";

//Append to respective parent container
   itemImg.appendChild(imgElement);
   itemImg.appendChild(thumbnailImg);
   trackDataContainer.appendChild(trackTitle);
   trackDataContainer.appendChild(trackArtist);
   trackDurationContainer.appendChild(trackDuration);
   trackDurationContainer.appendChild(trackYear);

   itemContainer.appendChild(itemImg);
   itemContainer.appendChild(trackDataContainer);
   itemContainer.appendChild(trackDurationContainer);

   songList.appendChild(itemContainer);
   updateCurrentSongHighlight(currentSongIndex);
   });
 }
 renderSongList();
 
//  Model JS 
//Accessing Model elements
  const previewModel = document.getElementById("preview-model");
  const closeModel = document.getElementById("close-model");
  const previewImage = document.getElementById("preview-image");
  const previewDescription = document.getElementById("preview-description");
  const previewArtist = document.getElementById("preview-artist");
  const followCount = document.getElementById("follow-count");
  const listenerCount = document.getElementById("listener-count");

  function openpreviewModel() {
   const currentTrack= songs[currentSongIndex];
    previewModel.style.display = "flex";
   previewImage.src = currentTrack.thumbnail;
   previewDescription.innerText = currentTrack.description;
   previewArtist.innerText = currentTrack.artist;
   followCount.innerText = currentTrack.followers;
   listenerCount.innerText = currentTrack.monthlyListener;
   if(!currentTrack.isVerified){
     document.getElementById("verified").style.display = "none";
   }else{
     document.getElementById("verified").style.display = "flex";
   }
  }
  closeModel.addEventListener("click",closePreviewModel);
  function closePreviewModel(){
   previewModel.style.display = "none";
  }
  window.addEventListener("click",function(event){
   if(event.target === previewModel){
     closePreviewModel();
   }
 });
});