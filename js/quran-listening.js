// fetching api of quraa
let quraa = fetch("../APIs/quran-listening.json")
  .then((response) => response.json())
  .then((response) => response.reciters);

//fetch quraa names
window.addEventListener("load", function () {
  quraa.then((resp) => {
    for (i = 0; i < resp.length; i++) {
      if (resp[i].count == 114 && resp[i].rewaya == "حفص عن عاصم") {
        let div = this.document.createElement("div");
        div.classList.add("qare");

        let h5 = this.document.createElement("h5");
        h5.textContent = resp[i].name;
        div.appendChild(h5);

        let p = this.document.createElement("p");
        p.textContent = `براوية ${resp[i].rewaya}`;
        div.appendChild(p);

        this.document.querySelector(".quraa .container").appendChild(div);
      }
    }
  });
});
