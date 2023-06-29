import { Controller } from "@hotwired/stimulus"
import anime from 'animejs/lib/anime.es.js';

export default class extends Controller {
  connect() {
    const clouds = document.querySelectorAll(".cloud")
    //This animation creates an endless loop of clouds going form left to right

    //For each cloud apply initial animation
    clouds.forEach((cloud) => {
      initialCycle(cloud);
    })

    //Initial cycle starts
    function initialCycle(cloud) {
      //Svw left is current cloud location
      let svwLeft = parseInt(cloud.style.left.split('s')[0]);
      //Calculate how far to end of screen
      let leftoverSvw = (100 - svwLeft) + 10;
      //Set Animation time
      let animationTime = 100000;
      //Calculate 1svw per second of animation time
      let animationPerSvw = animationTime / 100;
      //Calculate animation duration based on remaining distance to end of screen
      let timeToEnd = animationPerSvw * leftoverSvw;

      //Initial animeJS timeline
      var cloudT1 = anime.timeline({
        targets: cloud,
        easing: 'linear'
      })
      //Move to end of screen
      .add({
        left: `${svwLeft + leftoverSvw}svw`,
        duration: timeToEnd
      })
      //Reset to left side of screen
      .add({
        left: `${svwLeft - 110}svw`,
        duration: 1
      });
      //When initial animation cycle is complete call the animation loop function
      cloudT1.finished.then(() => {
        loopCycle(cloud);
      });
    }

    //Did the same thing but adjusted some values
    function loopCycle(cloud) {

      let loopTime = 100000;
      let svwStartPosition = parseInt(cloud.style.left.split('s')[0]);
      let svwToFinish = (100 - svwStartPosition) + 110;
      let svwPerSecond = loopTime / 100;
      let timeDuration = svwPerSecond * svwToFinish;

      var cloudT2 = anime.timeline({
        targets: cloud,
        easing: 'linear',
        loop:true
      }).add({
        left: `${svwStartPosition + svwToFinish}svw`,
        duration: timeDuration
      }).add({
        left: `${svwStartPosition}svw`,
        duration: 1
      });
    }
  }

}
