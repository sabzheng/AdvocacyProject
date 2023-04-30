// TODO: Query for button with an id "theme-button"
let themeButton = document.getElementById("theme-button");
// TODO: Complete the toggleDarkMode function
const toggleDarkMode = () => {
  // Write your code to manipulate the DOM here
  //console.log("clicked button");
  document.body.classList.toggle("dark-mode");
  
}

// TODO: Register a 'click' eventlistener for the theme button
// Set toggleDarkMode as the callback function.
themeButton.addEventListener("click",toggleDarkMode);

//Add your query for the sign now button here
let signNowButton = document.getElementById("sign-now-button");

let count = 3;

const addSignature= (person)=>{
  // let name = document.getElementById("name").value;
  // let hometown = document.getElementById("hometown").value;
  // let email = document.getElementById("email").value;

  //console.log(name+" "+hometown+" "+email);
  const para = document.createElement("p");
  const sigText = document.createTextNode(`🖊️ ${person.name} from ${person.hometown} supports this.`);
  para.appendChild(sigText);

  const sigSection = document.querySelector(".signatures");

  sigSection.appendChild(para);

  const counter = document.getElementById("counter");

  counter.remove();

  const new_counter = document.createElement("p");
  new_counter.id = "counter";
  count+=1;
  const counterText = document.createTextNode("🎉 "+count+" people signed this petition and support this cause.");
  new_counter.appendChild(counterText);
  sigSection.appendChild(new_counter);
  
  document.getElementById("sign-petition").reset();
  console.log("successfully add new signature.");
  
  //write code to manipulate the DOM
}

//signNowButton.addEventListener("click",addSignature);

//eventlistener for clicking the sign-now-button

// TODO: Complete validation form
const validateForm = () => {

  let containsErrors = false;
  const email = document.getElementById('email');

  let petitionInputs = document.getElementById("sign-petition").elements;

  let person = {
    name: petitionInputs[0].value, // accesses and saves value of first input
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value
  }
  // TODO: Loop through all inputs
  for (let i = 0; i < petitionInputs.length; i++) {
    // TODO: Validate the value of each input
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add('error');
    }else {
      petitionInputs[i].classList.remove('error');
    }
  }
  if (!email.value.includes('.com')) {
    containsErrors = true;
    email.classList.add('error');
  }else{
    email.classList.remove('error');
  }
  
  // TODO: Call addSignature() and clear fields if no errors
  if(containsErrors == false){
    addSignature(person);
    toggleModal(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }

}

signNowButton.addEventListener('click', validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

let revealableContainers = document.querySelectorAll(".revealable");
let windowHeight = window.innerHeight;

const reveal = () => {
  for (let i=0;i<revealableContainers.length;i++){
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      /* add the active class to the revealableContainer's classlist */
      revealableContainers[i].classList.add("active")
    } else {
      /* remove the active class to the revealableContainer's classlist */
      revealableContainers[i].classList.remove("active")
    }
  }
}

window.addEventListener('scroll', reveal);

let scaleFactor = 1;
let modalImage = document.getElementById("modal-img");

const scaleImage = () => {
  if(scaleFactor === 1) {
    scaleFactor = 0.8;
  }else{
    scaleFactor = 1;
  }
  modalImage.style.transform = `scale(${scaleFactor})`;
}

const toggleModal = (person) => {
  let intervalId = setInterval(scaleImage, 500);
  let modal = document.getElementById("thanks-modal");
  let modalContent = document.getElementById("thanks-modal-content");
  modal.style.display = "flex";
  modalContent.textContent = `Thank you so much ${person.name}! ${person.hometown} represent!`
   console.log(modalContent.textContent);

  setTimeout(()=>{
    modal.style.display = "none";
    clearInterval(intervalId)
  }, 5000)
}