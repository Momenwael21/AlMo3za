//give active class for active nav links by scroll
let navLinks = document.querySelectorAll("nav .nav-item .nav-link");
let sections = document.querySelectorAll("section");

window.addEventListener("scroll", function () {
  var scrollPosition = document.documentElement.scrollTop;
  sections.forEach((section) => {
    if (
      scrollPosition + 200 > section.offsetTop &&
      scrollPosition < section.offsetTop + section.offsetHeight
    ) {
      navLinks.forEach((link) => link.classList.remove("active"));
      navLinks.forEach((link) => {
        if (link.classList.contains(`${section.className}-link`)) {
          link.classList.add("active");
        }
      });
    }
  });
});

// give active class for active nav links by click
navLinks.forEach((ele) => {
  ele.addEventListener("click", function (e) {
    navLinks.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  });
});

// change nav background
let fixedNav = document.querySelector("nav");
let navContainer = document.querySelector(".navbar .container");
let navToggler = document.querySelector(".navbar .navbar-toggler");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    fixedNav.classList.add("active");
  } else {
    fixedNav.classList.remove("active");
  }
  navToggler.addEventListener("click", function () {
    fixedNav.classList.add("active");
  });
});

document
  .querySelector(".navbar-toggler")
  .addEventListener("click", function () {
    if (this.ariaExpanded) {
      fixedNav.classList.add("active");
    } else if (!this.ariaExpanded) {
      fixedNav.classList.remove("active");
    }
  });

// change hadiths
let hadithContiner = document.querySelector(".hadith-container");
let hadithNumber = document.querySelector(".hadith-number");

let btnPrev = document.querySelector(".hadith .buttons .btn-previous");
let btnNext = document.querySelector(".hadith .buttons .btn-next");

let hadithIndex = 0;

let hadiths = fetch(
  "https://ahadith-api.herokuapp.com/api/ahadith/all/ar-tashkeel"
).then((resp) => resp.json());
// .then((resp) => {
//   resp.AllChapters.length = 300;
//   return resp;
// });

hadithChange();

btnNext.addEventListener("click", function () {
  hadithChange();
});

btnPrev.addEventListener("click", function () {
  hadithIndex = hadithIndex - 2;
  hadithChange();
});

function hadithChange() {
  hadithIndex > 1895 ? (hadithIndex = 0) : hadithIndex;
  hadithIndex < 0 ? (hadithIndex = 1895) : hadithIndex;
  hadiths.then((data) => {
    hadithContiner.textContent = data.AllChapters[hadithIndex].Ar_Text;
    hadithNumber.textContent = `${data.AllChapters[hadithIndex].Hadith_ID}/${data.AllChapters.length}`;
    hadithIndex++;
  });
}
setInterval(hadithChange, 40000);

// fetch prayer time
let timeCards = document.querySelectorAll(".prayer-time .card");
function getPrayerTime() {
  let currentDT = new Date();
  fetch(
    `https://api.aladhan.com/v1/calendarByCity?city=Mansoura&country=Egypt&method=2&month=${
      currentDT.getMonth() + 1
    }&year=${currentDT.getFullYear()}`
  )
    .then((response) => response.json())
    .then(
      (timesOfCurrentMonth) =>
        timesOfCurrentMonth.data[`${currentDT.getDate() - 1}`]
    )
    .then((timesOfToday) => {
      //get date of today hijri
      let hijriContainer = document.querySelector(".prayer-time .hijri");
      hijriContainer.textContent = `${timesOfToday.date.hijri.day} من ${timesOfToday.date.hijri.month.ar} لعام ${timesOfToday.date.hijri.year}`;

      // get prayer times
      let keys = Object.keys(timesOfToday.timings);
      timeCards.forEach((card) => {
        for (i = 0; i < 11; i++) {
          if (card.classList[1] == keys[i]) {
            let timeContainer = document.querySelector(
              `.prayer-time .time-cards .${card.classList[1]} .time`
            );
            let prayTime =
              timesOfToday.timings[`${card.classList[1]}`].split(" ")[0];

            if (prayTime.split(":")[0] > 12) {
              timeContainer.textContent = `${prayTime.split(":")[0] - 12}:${
                prayTime.split(":")[1]
              } مساءً`;
            } else {
              timeContainer.textContent = `${prayTime} صباحاً`;
            }
          }
        }
      });
    });
}

getPrayerTime();
