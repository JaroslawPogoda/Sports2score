const getElementButtonHome = document.querySelector(".homeButtonNavItem")
const getElementButtonAboutus = document.querySelector(".aboutButtonNavItem")
const getElementHTML= document.querySelector(".HTML")
const getElementReply= document.querySelector("#replay")
const getElementReplySubmitbutton = document.querySelector(".form__input--button")
// getElementButtonHome.addEventListener("click", ()=>{getElementHTML.innerHTML=
// `
// <!-- end of navigation -->
// <!-- current workspace -->
// <div id="container"><p id="league">The league </p>
// <table class="table_league"><tr><select id="leagues" ></select></tr>
// <tr><th>Rank:</th><th>Name:</th> <th>Matches:</th><th>Points:</th> <th class="visibleOnMobile">Won:</th> <th class="visibleOnMobile">Lost:</th><th class="visibleOnMobile">Drawn:</th><th class="visibleOnMobile">Difference:</th> <th class="visibleOnMobile">Conceded:</th> <th class="visibleOnMobile">Scored:</th></tr></table></tr></table>
// </div>
// <ion-icon class="arrow thatarrow" name="chevron-forward-outline" ></ion-icon>
// <ion-icon class="arrow2 thatarrow2" name="chevron-back-outline" ></ion-icon>


// `})

getElementReplySubmitbutton.addEventListener('click',()=>{getElementReply.innerText="Thank you for your feedback!!"})