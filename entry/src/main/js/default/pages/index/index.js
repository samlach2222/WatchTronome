import utils from '../../common/utils.js';
import router from '@system.router';
import app from '@system.app';

export default {
    data: {
        value: 0,
        buttonLaunch: '/common/images/PlayButton.png',
        metronomeUp: false,
        intervalID: 0,
    },

    /**
     * Function called by TouchMove.
     * Close the application and delete the interval
     */
    ReturnToMenu() {
        app.terminate();
        clearInterval(this.intervalID);
        this.metronomeUp = false;
    },

    /**
     * Function called when the play/stop button is pressed
     * If the metronome is up, stop the metronome
     * If the metronome is down, play the metronome
     */
    PlayTempo() {
        if (!this.metronomeUp) { // if metronome not launched
            // set interval and save id
            this.intervalID = setInterval(function () {
                utils.vibrateWatch();
            }, 60 * (1000 / this.value));
            this.metronomeUp = true;

            // set button stats
            this.buttonLaunch = '/common/images/StopButton.png';
        }
        else {
            clearInterval(this.intervalID);
            this.metronomeUp = false;

            // set button stats
            this.buttonLaunch = '/common/images/PlayButton.png';
        }
    },

    /**
     * Function called when the minus button is pressed.
     * Reduce the tempo by 1.
     */
    MinusBpm() {
        if (this.value > 0) {
            this.value--;
        }
    },

    /**
     * Function called when the plus button is pressed.
     * Reduce the tempo by 1.
     */
    MinusBpmLP() {
        if (this.value > 10) {
            this.value -= 10;
        }
    },

    /**
     * Function called when the plus button is long pressed.
     * Increase the tempo by 10.
     */
    PlusBpm() {
        if (this.value < 300) {
            this.value++;
        }
    },

    /**
     * Function called when the minus button is long pressed.
     * Reduce the tempo by 10.
     */
    PlusBpmLP() {
        if (this.value < 290) {
            this.value += 10;
        }
    },
    SliderSetValue(e) {
        this.value = e.progress; // for API 4, in API 5 we need e.value
    },

    /**
     * Function called when user swipe the screen
     * The bottom swipe close this window and open the rhythm window.
     * The right swipe close the application
     *
     * @param e direction of the swipe
     */
    touchMove(e) { // Handle the swipe event.
        if (e.direction == "top") { // Swipe right to exit.
            console.debug("Go to RhythmPage");
            clearInterval(this.intervalID);
            this.metronomeUp = false;
            router.replace({
                uri: 'pages/RhythmPage/RhythmPage',
                params: {
                    rhythmValue: this.value,
                },
            });
        }
        else if (e.direction == "right") {
            console.debug("Application onDestroy");
            clearInterval(this.intervalID);
            this.metronomeUp = false;
            app.terminate();
        }
    },

    /**
     * Function called when user swipe the screen at the slider
     * This function do nothing and avoid the touchMove function to be called when using the slider.
     *
     * @param e direction of the swipe
     */
    touchMoveNotQuit(e) { // Handle the swipe event of slider but do nothing.
        console.log("Slider is moving");
    },
}

