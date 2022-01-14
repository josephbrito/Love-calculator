const yourname = document.querySelector("#fname");
const crushname = document.querySelector("#lname");
const btn = document.querySelector("#btn");
const results = document.querySelector("#results");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (yourname.value.length == 0 || crushname.value.length == 0) {
    alert("Insira os dados!");
    return;
  }

  fetch(
    "https://love-calculator.p.rapidapi.com/getPercentage?sname=jose&fname=John",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "love-calculator.p.rapidapi.com",
        "x-rapidapi-key": "666498a1b2msh62bc688bf28eafep1a1ea5jsnc3cce76a50e5",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      const fname = yourname.value;
      const sname = crushname.value;
      let random = getRandomIntInclusive(1, 100);

      data.fname = fname;
      data.sname = sname;
      data.percentage = random;

      yourname.value = "";
      crushname.value = "";

      results.classList.add("results-popup");

      if (results.classList.contains("results-popup")) {
        let popup = document.querySelector(".results-popup");

        popup.innerHTML = `<button class="cancel" onclick = "window.location.reload()">X</button>
        <p class="p-result"><strong>${fname}</strong>, seu relacionamento com o(a) <strong>${sname}</strong> tem <strong>${random}%</strong> de chances de dar certo`;
      }

      console.log(data);
    })
    .catch((err) => {
      console.error("Ocorreu algum erro", err);
    });
});

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // max & min both included
}
