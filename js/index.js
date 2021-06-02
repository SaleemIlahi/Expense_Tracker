"use strict"

// Selecting Item
const balance = document.querySelector(".balance-value span");
const income = document.querySelector(".income-value span");
const expense = document.querySelector(".expense-value span");
const chart = document.querySelector(".expense-circle-arc");
const title = document.querySelector(".title");
const price = document.querySelector(".price");

// Selecting Button
const incomeBtn = document.querySelector(".income-btn");
const expenseBtn = document.querySelector(".expense-btn");

// Selecting table body section
const allTable = document.querySelector(".allDetials table tbody");
const incomeTable = document.querySelector(".incomeDetials table tbody");
const expenseTable = document.querySelector(".expenseDetials table tbody");

// Selecting display section
const trackDetials = document.querySelector(".track-details");
const trackNav = document.querySelector(".track-nav");
const trackDetialsChildren = Array.from(trackDetials.children)
const trackNavChildren = Array.from(trackNav.children)

// Income Button function
incomeBtn.addEventListener('click',() => {
    let titleVal = title.value;
    let priceVal = price.value;
    income.innerText = parseInt(priceVal) + parseInt(income.innerText);  
    tableUpdate(titleVal,priceVal,allTable,"#5cdb95")
    tableUpdate(titleVal,priceVal,incomeTable,"#5cdb95")
    chartControl(priceVal);
})

// Expense Button function
expenseBtn.addEventListener('click',() => {
    let titleVal = title.value;
    let priceVal = price.value;
    expense.innerText = parseInt(priceVal) + parseInt(expense.innerText);
    tableUpdate(titleVal,priceVal,allTable,"#f64c72")
    tableUpdate(titleVal,priceVal,expenseTable,"#f64c72")
    chartControl(titleVal,priceVal)
})

// Balance Update
let balanceUpdate = () => {
    balance.innerText = parseInt(income.innerText) - parseInt(expense.innerText);
    if(parseInt(balance.innerText) < 0) alert("Your Balance is Now in Negative")
}

// Chart Control function
let chartControl = () => {
    let percent = Math.floor((parseInt(income.innerText) / (parseInt(income.innerText) + parseInt(expense.innerText))) * 100)
    chart.style.strokeDashoffset = Math.ceil(((360 - (360 * percent)) / 100) - 4);
    balanceUpdate();
}

// Updating table Section
let tableUpdate = (titleVal,priceVal,setTable,color) => {
    const date = new Date();
    const row = document.createElement("tr");
    const tableData =  `<td>${titleVal}</td>
                        <td><i class="fas fa-rupee-sign"></i>${priceVal}</td>
                        <td>${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</td>`;
    row.innerHTML += tableData;
    row.style.color = color;
    setTable.appendChild(row)
    title.value = "";
    price.value = "";
}

//Tab section
trackNavChildren.forEach(list => 
    list.addEventListener('click',() => {
        const curentNav = trackNav.querySelector(".active");
        const curentTrack = trackDetials.querySelector(".active");
        curentNav.classList.remove("active");
        curentTrack.classList.remove("active");
        list.classList.add("active");
        trackDetialsChildren[trackNavChildren.indexOf(list)].classList.add("active")
    }))

    