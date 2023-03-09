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
// ** 날짜 계산 **

const thisYear = document.querySelector(".this-year");
// Date 생성자 함수 : 현재 날짜 정보를 가지고 있음
thisYear.textContent = new Date().getFullYear(); // 2023
