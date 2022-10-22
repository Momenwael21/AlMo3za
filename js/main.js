//give active class for active nav links by click
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
  hadithIndex > 1895 ? (hadithIndex = 0) : hadithIndex;
  hadithIndex < 0 ? (hadithIndex = 1895) : hadithIndex;
  hadiths.then((data) => {
    hadithContiner.textContent = data.AllChapters[hadithIndex].Ar_Text;
    hadithNumber.textContent = `${data.AllChapters[hadithIndex].Hadith_ID}/${data.AllChapters.length}`;
    hadithIndex++;
  });
}

setInterval(hadithChange, 40000);
