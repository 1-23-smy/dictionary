let input = document.querySelector("#input");
let btn = document.querySelector("#search");
let not_found = document.querySelector(".notfound");
let api_key = "3859e5ab-48eb-4527-baf7-65c6688fa088";
let defBox = document.querySelector(".def");
let audiobox = document.querySelector(".audio");
let loading = document.querySelector(".Loading");
let heading=document.querySelector('.heading');
btn.addEventListener("click", (e) => {
  e.preventDefault();
  //clear data
  audiobox.innerHTML = "";
  not_found.innerText = "";
  defBox.innerText = "";

  //Get input data

  let word = input.value;
  word === "" ? alert("Word is Required") : getData(word);
  //Call API get data
});

async function getData(word) {
  loading.style.display = "block";
  //Ajax call
  const response = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${api_key}`
  );
  const data = await response.json();
  // console.log(data);
  //if empty result
  if (!data.length) {
    loading.style.display = "none";
    not_found.textContent = "No result Found";
  }

  //if result is suggestion

  if (typeof data[0] === "string") {
    loading.style.display = "none";
    let heading = document.createElement("h3");
    heading.innerText = "Did you mean?";
    not_found.appendChild(heading);

    data.forEach((element) => {
      let suggestion = document.createElement("span");
      suggestion.classList.add("Suggested");
      suggestion.innerText = element;

      not_found.appendChild(suggestion);
    });
  }
  //To get the defination
  loading.style.display = "none";
  let defination = data[0].shortdef[0];
  defBox.innerHTML = defination;

  const soundName = data[0].hwi.prs[0].sound.audio;
  if (soundName) {
    renderSound(soundName);
  }
}
function renderSound(soundName) {
  let subfolder = soundName.charAt(0);
  let soundsrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${api_key}`;
  let aud = document.createElement("audio");
  aud.src = soundsrc;
  aud.controls = true;
  audiobox.appendChild(aud);
}

let head=document.createElement('h1');
head.classList.add('headings');
head.innerText="Namaste🙏";
heading.appendChild(head);