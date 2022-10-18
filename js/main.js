// give active class for active nav links
let navLinks = document.querySelectorAll("nav .nav-item .nav-link");
let hadith = document.querySelector(".hadith");
let lectures = document.querySelector(".lectures");
let quran = document.querySelector(".quran");
let prayer = document.querySelector(".prayer-time");

window.addEventListener("scroll", function () {
  if (hadith.style.top == 0) {
    navLinks.forEach((ele) => {
      ele.classList.remove("active");
    });
    document.querySelector(".ahadith-link").classList.add("active");
  } else if (lectures.style.top == 0) {
    navLinks.forEach((ele) => {
      ele.classList.remove("active");
    });
    document.querySelector(".quran-link").classList.add("active");
  } else if (quran.style.top == 0) {
    navLinks.forEach((ele) => {
      ele.classList.remove("active");
    });
    document.querySelector(".quran-link").classList.add("active");
  }
});

navLinks.forEach((ele) => {
  ele.addEventListener("click", function (e) {
    navLinks.forEach((ele) => {
      ele.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  });
});

// change nav background
let fixedNav = document.querySelector(".navbar");
let navContainer = document.querySelector(".navbar .container");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    fixedNav.classList.add("active");

    navContainer.classList.add("container-fluid");
    navContainer.classList.remove("container");
  } else {
    fixedNav.classList.remove("active");

    navContainer.classList.remove("container-fluid");
    navContainer.classList.add("container");
  }
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
  hadithIndex > 1896 ? (hadithIndex = 0) : hadithIndex;
  hadithIndex < 0 ? (hadithIndex = 1896) : hadithIndex;
  hadiths.then((data) => {
    hadithContiner.textContent = data.AllChapters[hadithIndex].Ar_Text;
    hadithNumber.textContent = `${data.AllChapters[hadithIndex].Hadith_ID}/${data.AllChapters.length}`;
    hadithIndex++;
  });
}

setInterval(hadithChange, 40000);
