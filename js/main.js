// ** 검색창 **

const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");

searchEl.addEventListener("click", function () {
  searchInputEl.focus();
});

// focus 되었을 경우, 동작 설정
searchInputEl.addEventListener("focus", function () {
  // input 요소가 focus 되면, search 부분에 focused 라는 class 추가
  searchEl.classList.add("focused");
  // input 요소에 속성 추가
  searchInputEl.setAttribute("placeholder", "통합검색");
});

// focus가 해제되면, 동작 설정
searchInputEl.addEventListener("blur", function () {
  // input 요소가 focus 해제되면, search 부분에 focused class 삭제
  searchEl.classList.remove("focused");
  searchInputEl.setAttribute("placeholder", "");
});

// --------------------------------------------
// ** 배지 & 위로 가기 버튼 **

const badgeEl = document.querySelector("header .badges");

// window.addEventListener("scroll", function () {
//   // 스크롤 이벤트 추가
//   console.log("scroll!");
// });

const toTopEl = document.querySelector("#to-top");
// 위로가기 버튼을 누르면 scroll 올려줌 => gsap ScrollToPlugin 사용
toTopEl.addEventListener("click", function () {
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });
});

window.addEventListener(
  "scroll",
  _.throttle(function () {
    //  _.throttle(함수, 시간)
    // => lodash의 부하방지(throttle)를 이용하여 3초마다 이벤트 발생하도록 설정
    console.log(window.scrollY);
    if (window.scrollY > 500) {
      // 배지 숨기기
      // gsap.to(요소, 지속시간, 옵션)
      gsap.to(badgeEl, 0.6, {
        // 0.6초에 걸쳐 애니메이션 작동
        opacity: 0,
        display: "none",
      });
      // 위로가기 버튼 보이기
      gsap.to(toTopEl, 0.2, {
        x: 0,
      });
    } else {
      // 배지 보이기
      // badgeEl.style.display = "block";
      gsap.to(badgeEl, 0.6, {
        opacity: 1,
        display: "block",
      });
      // 위로가기 버튼 숨기기
      gsap.to(toTopEl, 0.2, {
        // 오른쪽으로 100px 이동하면서 사라짐
        x: 100,
      });
    }
  }, 300)
);

// --------------------------------------------
// ** Visual : fade-in 효과 넣기 **

const fadeEls = document.querySelectorAll(".visual .fade-in");
// 요소의 개수만크 forEach함수 실행
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    // delay : 지연시간
    // index에 따라 0.6초씩 더해가면서 동작
    delay: (index + 1) * 0.6,
    opacity: 1,
  });
});

// --------------------------------------------
// ** Swiper - 공지사항 슬라이드 **
// new Swiper(선택자, 옵션)

// notice-line
new Swiper(".notice-line .swiper-container", {
  // 슬라이드 방향
  direction: "vertical",
  // 자동재생
  autoplay: true,
  // 반복재생
  loop: true,
});

// promotion
new Swiper(".promotion .swiper-container", {
  // 기본 방향 : 수평(horizental)
  // direction: "horizental",
  // 한 번에 보여줄 슬라이드 개수
  slidesPerView: 3,
  // 슬라이드 사이 여백
  spaceBetween: 10,
  // 1번 슬라이드가 가운데
  centeredSlides: true,
  // 반복재생
  loop: true,
  // 자동재생
  autoplay: {
    // 기본값은 3000ms => 5000ms로 설정
    delay: 5000,
  },
  // pagination
  pagination: {
    // 페이지 번호 요소 선택자
    el: ".promotion .swiper-pagination",
    // 사용자의 페이지 번호 요소 제어 여부
    clickable: true,
  },
  // 네비게이션 기능
  navigation: {
    // 앞으로 가기 버튼
    prevEl: ".promotion .swiper-prev",
    // 뒤로 가기 버튼
    nextEl: ".promotion .swiper-next",
  },
});

// --------------------------------------------
// ** 프로모션 토글버튼 동작 **
const promotionEl = document.querySelector(".promotion");
const promotionToggleBtn = document.querySelector(".toggle-promotion");

let isHidePromotion = false; // 프로모션이 숨겨져 있는 지 확인하는 버튼

promotionToggleBtn.addEventListener("click", function () {
  isHidePromotion = !isHidePromotion;
  if (isHidePromotion) {
    // 숨김 처리
    promotionEl.classList.add("hide"); // 프로모션에 hide 클래스 추가
  } else {
    // 보임 처리
    promotionEl.classList.remove("hide"); // 프로모션에 hide 클래스 삭제
  }
});

// --------------------------------------------
// ** floating - 아이콘 둥둥 떠다니도록 하기 **

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션)
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시강
    {
      //옵션
      // y축으로 얼만큼 움직일 것인가
      y: size,
      // 반복횟수 : -1이면 무한 반복
      repeat: -1,
      // 한 번 재생된 애니메이션을 다시 뒤로 재생하는 것
      yoyo: true,
      // easing 함수를 이용해서 움직임 여러 방법으로 제어
      ease: Power1.easeInOut,
      delay: random(0, delay),
    }
  );
}

floatingObject(".floating1", 1, 15);
floatingObject(".floating2", 0.5, 15);
floatingObject(".floating3", 1.5, 20);

// --------------------------------------------
// ** Scroll Magic **
// 스크롤 내리면 각 section 요소들이 보이기 시작하도록 하기

const spyEls = document.querySelectorAll("section.scroll-spy");
spyEls.forEach(function (spyEl) {
  // 특정 요소 감지 메서드 지정
  new ScrollMagic.Scene({
    // 감시 요소 지정
    triggerElement: spyEl,
    // 감시하려는 요소가 viewport의 0.8 지점이 되면 hook이 걸림
    triggerHook: 0.8,
  })
    .setClassToggle(spyEl, "show")
    .addTo(new ScrollMagic.Controller()); // Controller : 실제 동작구조를 만들어 줌
});

// --------------------------------------------
// ** Swiper - AWARDS 슬라이드 **

new Swiper(".awards .swiper-container", {
  // direction: horizental,
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    // 앞으로 가기 버튼
    prevEl: ".awards .swiper-prev",
    // 뒤로 가기 버튼
    nextEl: ".awards .swiper-next",
  },
});

// --------------------------------------------
// ** 날짜 계산 **

const thisYear = document.querySelector(".this-year");
// Date 생성자 함수 : 현재 날짜 정보를 가지고 있음
thisYear.textContent = new Date().getFullYear(); // 2023
