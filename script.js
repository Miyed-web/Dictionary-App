const result = document.querySelector(".result");
const sound = document.getElementById('sound');
const btn = document.getElementById('search-btn');

async function word(){
  const inputWord = document.getElementById('input-box').value;
  
  let response= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`);
  let data = await response.json();
  console.log(data);
  try{
  result.innerHTML = data.map(i=>{
    return `<div class="word">
       <h3 >${data[0].word}</h3>
       <button onclick="playSound()" id="playSound">
         <span class="material-symbols-outlined">
        volume_up
       </span>
       </button>
     </div>
     <div class="details">
       <p>pos:</p>
       <p>/${data[0].meanings[0].partOfSpeech}/</p>

     </div>
     <p class="word-meaning">
       ${data[0].meanings[0].definitions[0].definition}
     </p>
     <p class="word-example">
       ${data[0].meanings[0].example || ""}
     </p>
     
     <p class="more">Learn more :</p>
     <code><a href="${data[0].sourceUrls[0]}">${data[0].sourceUrls[0]}</a></code>`
    
  })
sound.setAttribute("src",data[0].phonetics[0].audio) 
}
  catch(e){
    result.innerHTML= `<h3 style="margin-top:20px;font-size:23px;font-weight:400;color:red;text-align:center;">No definition founded</h3>`
  }
    }
btn.addEventListener("click", ()=>{
  word()
  
    
})



function playSound(){
  sound.play()
}
