async function game(gameJsonUrl, jsonParser = JSON.parse) {
  game["play_scene"]=function (scene) {
    var scene = game["data"].scenes[scene];
    game["buttons"].classList.add("hidden");
    game["video"].classList.remove("hidden");
    if(scene.url){
      game["video"].src = scene.url;
      game["video"].load();
      game["video"].addEventListener("ended", ()=>{
        game["display_buttons"](scene);
      });
      game["video"].oncanplay = ()=>{game["video"].play()};
    } else if (scene.bg) {
      game["video"].poster = scene.bg;
      game["video"].src="";
      game["display_buttons"](scene);
    } else {
      game["video"].classList.add("hidden");
      game["display_buttons"](scene);
    }
  }
  game["display_buttons"] = function (scene) {
    if(game.data.ongui){
      eval(game.data.ongui);
    }
    game["buttons"].innerHTML="";
    game["buttons"].classList.remove("hidden");
    if(scene.title) {
      game["buttons"].innerHTML+=`<h1>${scene.title}</h1>`;
    }
    if(scene.subtitle) {
      game["buttons"].innerHTML+=`<p>${scene.subtitle}</p>`;
    }
    if(!scene.buttons) {
      return;
    }
    scene.buttons.forEach(button => {
      var btn = document.createElement("button");
      if (button.icon) {
        var img = document.createElement("img");
        img.src=button.icon;
        img.draggable = false;
        btn.append(img);
      }
      btn.innerHTML += button.label;
      btn.classList.add("button");
      btn.addEventListener("click", ()=>{
        if(button.onclick){
          eval(button.onclick);
        }
        if(button.scene){
          if (typeof button.scene === "string") {
            game["play_scene"](button.scene);
          } else if (Array.isArray(button.scene) && button.scene.length !== 0) {
            game["play_scene"](button.scene[Math.floor(Math.random()*button.scene.length)]);
          }
        }
      });
      game["buttons"].append(btn);
    });
  }

  game["remove_dupes"]=function () {
    if(document.getElementById("clickengine_video")){
      document.getElementById("clickengine_video").remove();
    }
    if(document.getElementById("clickengine_style")){
      document.getElementById("clickengine_style").remove();
    }
    if(document.getElementById("clickengine_buttons")){
     document.getElementById("clickengine_buttons").remove(); 
    }
  }

  game["startgame"]=function () {

    if(game.data.onstart){
      eval(game.data.onstart);
    }
    
    if (game.data.mainscene) {
      game["play_scene"](game.data.mainscene);
    } else {
      game["play_scene"](Object.keys(game.data.scenes)[0]);
    }
  }
  
  var c = await fetch(gameJsonUrl);
  var d = await c.blob();
  var textContent = await d.text();
  game.data = jsonParser(textContent);

  game["remove_dupes"]();

  game["video"] = document.createElement("video");
  game["video"].controls = false;
  game["video"].draggable = false;
  game["video"].addEventListener("click", (e)=>{e.preventDefault()});
  game["video"].addEventListener("contextmenu", (e)=>{e.preventDefault()});
  game["video"].id = "clickengine_video";
  game["video"].style = `position: fixed; z-index: 1; top: 50%; left: 50%; width: 100%; transform: translate(-50%, -50%)`;
  document.body.append(game["video"]);

  game["style"] = document.createElement("style");
  game["style"].id = "clickengine_style";
  game["style"].innerHTML = `.hidden {display: none !important; }
  
  .button {
    text-align: center;
    background: transparent;
    font-size: 2rem;
    color: ${game.data.theme === "light" ? "black" : "white"};
    text-shadow: 2px 2px 2px rgba(0,0,0,0.5);
    border: 0;
    cursor: pointer;
    transition: 0.35s;
    margin: 1.5rem;
  }

  .button:hover {
    transform: scale(1.2);
  }

  .button>img {
    width: 10rem;
    display: block;
  }

  html, body {
    background: ${game.data.theme === "light" ? "white" : "black"};
  }

   #clickengine_buttons>h1{
      font-size: 4rem;
   }

   #clickengine_buttons>p{
      font-size: 1.5rem;
   }
  
  `;
  document.body.append(game["style"]);

  game["buttons"] = document.createElement("div");
  game["buttons"].id = "clickengine_buttons";
  game["buttons"].style = `position: fixed; z-index: 2; top: 50%; left: 50%; width: 100%; transform: translate(-50%, -50%); text-align: center; color: ${game.data.theme === "light" ? "black" : "white"}; text-shadow: 2px 2px 2px rgba(0,0,0,0.5);`;
  document.body.append(game["buttons"]);
  
  game["startgame"]();
}
