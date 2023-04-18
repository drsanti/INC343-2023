console.log(`Click the button to add a new element`);

let b = document.getElementById(`btn1`);
b.addEventListener(`click`, ()=>{
    let ele = document.createElement(`h2`);
    ele.innerHTML = Math.random().toFixed(3);
    document.body.append(ele);
});