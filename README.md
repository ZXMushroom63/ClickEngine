# ClickEngine
A game engine in pure JavaScript that let's you make Henry Stickmin like games with JSON.

Simply add the script file to some HTML:
```
<script src="engine.js" onload="game('myGame.json')"></script>
```

On the onload event you call the `game(string jsonUrl)` function.

this is the structure of a json file:
```
{
  "scenes": {
    "exampleScene": {
      "title": "My New Game", /*/Optional/*/
      "subtitle": "A very cool game!!!", /*/Optional/*/
      "url": "exampleVideo.mp4", /*/Optional, the video to play. UI is shown after the video finishes playing./*/
      "bg": "example.png", /*/Optional, if there is no video, use an image instead./*/
      "buttons": [
        {
          "scene": "exampleScene", /*/Optional, the scene id to play onclick. If you pass an array, it will pick a random element./*/
          "label": "A Label!!!" /*/Required/*/
          "onclick": "alert('Hello World')", /*/Optional, script to run on button clicked./*/
          "icon": "icon.png", /*/Optional, image to display on button./*/
        }
      ]
    }
  },
  "theme": "dark", /*/Optional, either light or dark, dark by default./*/
  "ongui": "alert('Hello World')", /*/Optional, script to run every time gui is displayed./*/
  "onstart": "alert('Hello World')", /*/Optional, script to when the game starts./*/
  "mainscene": "exampleScene" /*/Optional, initial scene to play/*/
}
```

Please note that the initial scene should not have a video, because many browsers disable autoplay before user interaction.

How to use a custom json parser:
<br>`game('myGame.json', MyJson.parse)`
