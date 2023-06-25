const dayInput=document.querySelector(".input-age div input:nth-of-type(1)")
const monthInput=document.querySelector(".input-age div:nth-of-type(2) input")
const yearInput = document.querySelector(".input-age div:nth-of-type(3) input")

const yearsOutput=document.querySelector(".output-age p:nth-of-type(1)")
const monthsOutput=document.querySelector(".output-age p:nth-of-type(2)")
const daysOutput=document.querySelector(".output-age p:nth-of-type(3)")

const monthsWithThirtyoneDays = [1, 5, 7, 8, 10, 12];
const febraury = 2;    
function speciallMonthErrorHandling(val) {
    if (monthsWithThirtyoneDays.includes(val)) {
        return 31;
    } else if (val === febraury) {
        return 28;
    } else {
        return 30;
    }
}
function errorText(val) {
    if (val === "") {
        return "This field is required";
    } else {
        return "This must be a valid date";
    }
}
function showErroMsg(input,message) {
    message.textContent = errorText(input.value);
    message.classList.add("show");
    input.classList.add("invalid-input"); 
}
function hideErrorMsg(input,message) {
        message.classList.remove("show");
        input.classList.remove("invalid-input");
}

function invalidInputHandling(input,maxVal) {
    const invalidMessage = input.parentElement.querySelector("p");
    if (input.value === "") {
        showErroMsg(input, invalidMessage);
    } else {
        if (input.classList.contains("invalid-input")) {
            hideErrorMsg(input,invalidMessage);
        }
    }
    if (isNaN(Number(input.value)) ||
    input.value > maxVal) {
        showErroMsg(input, invalidMessage);

    } else {
        if (input.classList.contains("invalid-input")) {
            hideErrorMsg(input,invalidMessage);
        }
    }
}

function handleMonthDays() {
    const monthValue = monthInput.value ? parseInt(monthInput.value) : 1;
    invalidInputHandling(dayInput,speciallMonthErrorHandling(monthValue))

}

dayInput.addEventListener("input", () => {
    handleMonthDays();
    convertInputAgeToOutputAge()
})
monthInput.addEventListener("input", () => { 

    invalidInputHandling(monthInput, 12)
    handleMonthDays();
    convertInputAgeToOutputAge()
})
yearInput.addEventListener("input", () => {
    const currentYear = new Date().getFullYear();
    invalidInputHandling(yearInput,currentYear)
    convertInputAgeToOutputAge()
})
function convertInputAgeToOutputAge() {
  if (
    yearInput.value === "" ||
    dayInput.value === "" ||
    monthInput.value === ""
  ) {
    return;
  } else {
    const currentYear = new Date().getFullYear();
    const inputYear = parseInt(yearInput.value);
    const inputMonth = parseInt(monthInput.value);
    const inputDay = parseInt(dayInput.value);

    let ageInYears = currentYear - inputYear;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
    const currentDay = currentDate.getDate();

    let ageInMonths = currentMonth - inputMonth;
    let ageInDays = currentDay - inputDay;

      if (ageInDays < 0) {
          ageInMonths--;
          ageInDays += speciallMonthErrorHandling(currentMonth-1);
      }
      if (ageInMonths < 0) {
          ageInYears--;
          ageInMonths += 12;

      }
    yearsOutput.innerHTML = `
      <p><span>${ageInYears}</span> years</p>
    `;

    monthsOutput.innerHTML = `
      <p><span>${ageInMonths}</span> months</p>
    `;

    daysOutput.innerHTML = `
      <p><span>${ageInDays}</span> days</p>
    `;
  }
}

