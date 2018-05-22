<template>
  <div class="Container">
    <div class="MainGraphic">
      <svg class="Hummingbird" viewBox="0 26 100 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M98.5,47.5C96.5,45.5,81,35,62,35c-2.1,0-4.2,0.1-6.2,0.3L39,26c0,4.5,1.3,9,2.4,12.1C31.7,40.7,23.3,44,16,44L0,34
	c0,8,4,16,4,16s-4,8-4,16l16-10c7.3,0,15.7,3.3,25.4,5.9C40.3,65,39,69.5,39,74l16.8-9.3c2,0.2,4.1,0.3,6.2,0.3
	c19,0,34.5-10.5,36.5-12.5S100.5,49.5,98.5,47.5z M85.5,50c-1.4,0-2.5-1.1-2.5-2.5s1.1-2.5,2.5-2.5s2.5,1.1,2.5,2.5
	C88,48.9,86.9,50,85.5,50z"/>
        <!--<path d="M35.5 5L54.7.6H32.3L35.5 5zM12.4 40.8l10.3-10.1-6.2-6.7-4.1 16.8zM33.8 5.3L30.5.8l-5.4 4 8.7.5zM20.8 4.6L8.8 0l1.9 4.1 10.1.5zM0 5l15.2 15.4 7.5-14.2L0 5zM34.2 6.8l-9.9-.5-8 15.2 7.4 8.1 8-7.9 2.5-14.9z"/>-->
      </svg>

      <svg class="Cog" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path d="M29.18 19.07c-1.678-2.908-.668-6.634 2.256-8.328L28.29 5.295c-.897.527-1.942.83-3.057.83-3.36 0-6.085-2.743-6.085-6.126h-6.29c.01 1.043-.25 2.102-.81 3.07-1.68 2.907-5.41 3.896-8.34 2.21L.566 10.727c.905.515 1.69 1.268 2.246 2.234 1.677 2.904.673 6.624-2.24 8.32l3.145 5.447c.895-.522 1.935-.82 3.044-.82 3.35 0 6.066 2.725 6.083 6.092h6.29c-.004-1.035.258-2.08.81-3.04 1.676-2.902 5.4-3.893 8.325-2.218l3.145-5.447c-.9-.515-1.678-1.266-2.232-2.226zM16 22.48c-3.578 0-6.48-2.902-6.48-6.48S12.423 9.52 16 9.52c3.578 0 6.48 2.902 6.48 6.48s-2.902 6.48-6.48 6.48z"/>
      </svg>

    </div>
    <h1 class="MainErrorTitle">
      404
    </h1>
    <p class="MainErrorDescription mb-3">
      Sorry, The Page You Are Looking For is Not Found
    </p>
    <vx-button to="/" class="btn btn-info">Back to Home</vx-button>
  </div>
  <!--<p class="page-container">404 <br>Page Not Found</p>-->
</template>

<style>

  .Container {
    margin-top: 50px;
    text-align: center;
    position: relative;
  }

  .MainErrorTitle {
    display: block;
    margin: 10px;
    color: #30A9DE;
    font-size: 4rem;
    font-weight: bolder;
    text-align: center;
  }

  .MainErrorDescription {
    max-width: 50%;
    margin: 0 auto;
    color: #30A9DE;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .MainGraphic {
    position: relative;
  }

  .Cog {
    width: 15rem;
    height: 15rem;
    fill: #6AAFE6;
    -webkit-animation-name: spin;
    -webkit-animation-duration: 4000ms;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    -moz-animation-name: spin;
    -moz-animation-duration: 4000ms;
    -moz-animation-iteration-count: infinite;
    -moz-animation-timing-function: linear;
    animation-name: CogAnimation;
    animation-duration: 5000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  .Hummingbird {
    position: absolute;
    width: 5rem;
    height: 5rem;
    fill: #30A9DE;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  @-moz-keyframes CogAnimation {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes CogAnimation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes CogAnimation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
