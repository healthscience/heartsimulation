<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Heart Share (alpha)</title>
    </head>
    <body>
        <h1>Heart Share</h1>
        <div id="app">
            <label>Volume</label>
            <p>{{ volume }}</p>

            <label for="bpm">BPM</label>
            <input type="number" id="bpm" v-model.number="bpm">

            <label for="amplitude">Amplitude</label>
            <input type="number" id="amplitude" v-model.number="amplitude">

            <p>Last Draw: {{ lastBeat }}</p>
            <p>Hertz: {{ getHertz }}</p>
            <p>Draw rate: {{ drawRate }}</p>

        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.8/vue.js" integrity="sha256-14zEfMOpgDY6yDOn9QHrJThIrKbaLGmAWxSWOwgpVQM=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/88/three.min.js" integrity="sha256-6fhm481uY9c152qGWIVgE7KbzaCj5WjCi3BGIpZef2E=" crossorigin="anonymous"></script>
        <script src="assets/js/heartCanvas.js?v=<?php echo time(); ?>"></script>

        <script>
            var heartApp = new Vue({
                el: '#app',
                data: {
                    heart: heartShape,
                    group: group,
                    volume: 0,
                    bpm: 60,
                    amplitude: 0.25,
                    increasing: true,
                    lastBeat: 0,
                    drawRate: 0,
                },
                computed: {
                    getHertz: function () {
                        return (this.bpm / 60);
                    }
                },
                methods: {
                    beat: function () {

                        var now = performance.now();
                        // how long since the last draw (360ms for a 60hz screen)
                        this.drawRate = now - this.lastBeat;
                        this.lastBeat = now;
                        // how much do we need to scale up?


                        if (this.increasing) {
                            scale = scale + 1;
                            if (scale > 10) {
                                this.increasing = false;
                            }
                        } else {
                            scale--;
                            if (scale < 2) {
                                this.increasing = true;
                            }
                        }
                    },
                    render: function () {
                        group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
                        group.scale.z = scale;
//                        renderer.render(scene, camera);
                        if (typeof heartApp !== "undefined") {
                            this.beat();
                        }
                    },
                    animate: function () {
                        requestAnimationFrame(this.animate);
                        this.render();
                    }
                },
                mounted: function () {
                    this.lastBeat = performance.now();
                }
            });
            heartApp.animate();
        </script>

    </body>
</html>

var increasing = true;
