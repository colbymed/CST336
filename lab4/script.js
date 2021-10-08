var stateData;
getStates();
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#password").addEventListener("click", displaySuggestedPassword);
document.querySelector("#userName").addEventListener("change", validateUserName);
document.querySelector("#states").addEventListener("change", addCounties);
document.querySelector("#button").addEventListener("click", validate);

async function displayCity() {
  let zipCode = document.querySelector("#zip").value;
  let url = `https://cst336.herokuapp.com/projects/api/cityInfoAPI.php?zip=${zipCode}`;
  let data = await fetchData(url);
  if (data == false) {
    document.querySelector("#validZip").innerHTML = " Zip code not found";
    document.querySelector("#city").innerHTML = "";
    document.querySelector("#latitude").innerHTML= "";
    document.querySelector("#longitude").innerHTML = "";
  } else {
    document.querySelector("#validZip").innerHTML = "";
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML= data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
  }
}

async function displaySuggestedPassword() {
  let url = "https://itcdland.csumb.edu/~milara/api/suggestedPwd.php?length=8";
  let data  = await fetchData(url);
  document.querySelector("#suggested").innerHTML = ` Suggested Password: ${data.password}`;
}
async function validateUserName(){
  let userName = document.querySelector("#userName").value;
  let validation = `https://cst336.herokuapp.com/projects/api/usernamesAPI.php?username=${userName}`;
  let data = await fetchData(validation);
  if (data.available && userName.length != 0){
    document.querySelector("#availability").innerHTML = " Username available";
    document.querySelector("#availability").style.color = "green";
    return data.available;
  }
  else{
    document.querySelector("#availability").innerHTML = " Username unavailable";
    document.querySelector("#availability").style.color = "red";
    return false;
  }
}
async function getStates() {
  let url = "https://cst336.herokuapp.com/projects/api/state_abbrAPI.php";
  stateData = await fetchData(url);
  for (i = 0; i < stateData.length; i++) {
    document.querySelector("#states").innerHTML += `<option>${stateData[i].state}</option>`;
  }
}
async function addCounties() {
  let state = document.querySelector("#states").value;
  // console.log(state);
  let usps = "";
  for (i = 0; i < stateData.length; i++) {
    if (stateData[i].state == state) {
      usps = stateData[i].usps;
    }
  }
  let url = `https://cst336.herokuapp.com/projects/api/countyListAPI.php?state=${usps}`;
  let data = await fetchData(url);
  document.querySelector("#counties").innerHTML = "<option>Select:</option>"
  for (i = 0; i < data.length; i++) {
    document.querySelector("#counties").innerHTML += `<option>${data[i].county}</option>`;
  }
}
async function validate() {
  let correct = true;
  let userName = document.querySelector("#userName").value;
  let password = document.querySelector("#password").value;
  let passwordRetype = document.querySelector("#passwordRetype").value;
  document.querySelector("#submitValid").innerHTML = "";
  if (await validateUserName() == false) {
    document.querySelector("#submitValid").innerHTML += " Invalid Username! ";
    correct = false;
  }
  if (userName == "") {
    document.querySelector("#submitValid").innerHTML += " No Username! ";
    correct = false;
  }
  if (password.length < 6) {
    document.querySelector("#submitValid").innerHTML += " Password must be at least 6 characters! "; 
    correct = false;
  } 
  if (password != passwordRetype) {
    document.querySelector("#submitValid").innerHTML += " Passwords do not match! "; 
    correct = false;
  }
  if (correct) {
    document.querySelector("#correct").innerHTML = "<div class='m-2 alert alert-success' role='alert'>Sign up successful!</div>";
  } else {
    document.querySelector("#correct").innerHTML = "<div class='m-2 alert alert-danger' role='alert'>Sign up failed! Please check all entries.</div>"
  }
}

async function fetchData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
} 