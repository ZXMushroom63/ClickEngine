{
  "scenes": {
    "mainscene": {
      "title": "MrBest",
      "subtitle": "Rob a bank!",
      bg: "mrbest.png",
      "buttons": [
        {
          "scene": "start",
          "label": "Play",
          "icon": "goldingot.png",
        },
        {
          scene: "about",
          "label": "About",
          "icon": "torch.gif",
        }
      ]
    },
    "about": {
      title: "About",
      bg: "mrbest.png",
      subtitle: "This is a game.",
      buttons: [
        {
          scene: "mainscene",
          label: "< Back"
        }
      ]
    },
    "start": {
      "url": "https://www.shutterstock.com/shutterstock/videos/1060610926/preview/stock-footage-circuit-burst-digital-energy-explosion-particles-and-energy-flowing-through-circuits-and-spreading.mp4",
      "buttons": [
        {
          "scene": "mainscene",
          "label": "< Back"
        }
      ],
    }
  },
  "theme": "dark",
}
