var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 함수 이름 변경하면 안됨
function onYouTubeIframeAPIReady() {
  // <div id="player"></div>
  new YT.Player("player", {
    //  최초 재생할 유튭, 영상 ID
    videoId: "An6LvWQuj_8",
    playerVars: {
      // 자동재생
      autoplay: true,
      // 반복재생 => 반복할 비디오 목록 필요
      loop: true,
      // 반복재생 할 유튜브 영상 ID 목록
      playlist: "An6LvWQuj_8",
    },
    events: {
      // 메소드 실행
      onReady: function (event) {
        // event.target : 재생되는 영상
        // mute() : 음소거
        event.target.mute();
      },
    },
  });
}
