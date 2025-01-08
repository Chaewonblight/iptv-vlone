 const videos = [
      {
        manifestUri: 'https://linearjitp02-playback.astro.com.my/dash-wv/linear/9983/default.mpd',
        clearKey: {
          'aa48b28bd723f91214887df6ed9fad10' : 'b5a3a800848120c843ae0fa68c09c261'
        }
      },
      
   {
        manifestUri: 'https://jungotvstream-chanall.akamaized.net/jungotv/hallypop/stream.m3u8',
        clearKey: {
          '' : ''
        }
      },
      

    ];

    async function loadVideo(index) {
      const player = window.player;
      const { manifestUri, clearKey } = videos[index];
      console.log('Loading video:', manifestUri);

      player.configure({
        drm: {
          clearKeys: clearKey
        }
      });

      try {
        await player.load(manifestUri);
        console.log('Video loaded successfully!');
      } catch (error) {
        console.error('Error loading video:', error);
      }
    }

    function initApp() {
      shaka.polyfill.installAll();
      if (shaka.Player.isBrowserSupported()) {
        init();
      } else {
        console.error('Browser not supported!');
      }
    }

    async function init() {
      const video = document.getElementById('video');
      const ui = video['ui'];
      const controls = ui.getControls();
      const player = controls.getPlayer();
      const config = {
        'seekBarColors': {
          base: 'rgba(255, 255, 255, 0.3)',
          buffered: 'rgba(255, 255, 255, 0.54)',
          played: 'rgb(255, 255, 255)'
        }
      };

      player.configure({
        drm: {
          clearKeys: videos[0].clearKey
        }
      });

      ui.configure(config);
      window.player = player;
      window.ui = ui;
      window.controls = controls;
      player.addEventListener("error", onPlayerErrorEvent);
      controls.addEventListener("error", onUIErrorEvent);

      try {
        await player.load(videos[0].manifestUri);
        console.log('The video has now been loaded!');
      } catch (error) {
        console.error('Error loading video:', error);
      }
    }

    function onPlayerErrorEvent(errorEvent) {
      console.error('Player error:', errorEvent.detail);
    }

    function onUIErrorEvent(errorEvent) {
      console.error('UI error:', errorEvent.detail);
    }

    document.addEventListener('shaka-ui-loaded', init);
    document.addEventListener('shaka-ui-load-failed', initFailed);
    document.addEventListener('DOMContentLoaded', initApp);

    function initFailed() {
      console.error('Shaka UI failed to load');
    }

    Object.defineProperty(navigator, 'userAgent', {
      get: function () {
        return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.4044.138 Safari/537.36';
      }
    });
