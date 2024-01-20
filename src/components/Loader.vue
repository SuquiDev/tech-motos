<template>
<!--  <div class="all-screen">-->
<!--    <section class="dots-container">-->
<!--      <div class="dot"></div>-->
<!--      <div class="dot"></div>-->
<!--      <div class="dot"></div>-->
<!--      <div class="dot"></div>-->
<!--      <div class="dot"></div>-->
<!--    </section>-->
<!--  </div>-->


  <div id="loop" class="center"></div>
  <div id="bike-wrapper" class="center">
    <div id="bike" class="centerBike"></div>
  </div>


</template>

<script>
  export default {
    name: "loader"
  }
</script>

<style scoped>
.centerBike {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 26px;
  margin-left: -12px;
  z-index: 10;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}

#loop {
  height: 100px;
  width: 100px;
  border: #bb5f27 solid 4px;
  border-radius: 200px;
}

#loop:before {
  background: linear-gradient(to left, rgba(187, 95, 39, 0) 0%, rgba(187, 95, 39, 1) 30%, rgba(187, 95, 39, 1) 70%, rgba(187, 95, 39, 0) 100%);
  content: "";
  display: block;
  height: 4px;
  left: -100px;
  position: relative;
  top: 100px;
  width: 300px;
}

#bike-wrapper {
  height: 108px;
  width: 108px;
  animation: drive 3s linear infinite;
}

#bike {
  height: 24px;
  width: 25px;
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/133687/motorbike.png");
}

@keyframes drive {
  0% {
    margin-left: -364px;
    opacity: 0;
  }
  33.33% {
    transform: rotate(0deg);
    margin-left: -50px;
    opacity: 1;
  }
  66.66% {
    transform: rotate(-360deg);
    margin-left: -50px;
    opacity: 1;
  }
  100% {
    margin-left: 264px;
    transform: rotate(-360deg);
    opacity: 0;
  }
}
</style>

<!--<style scoped>-->
<!--.all-screen{-->
<!--  position: absolute;-->
<!--  inset: 0 0 0 0;-->

<!--}-->
<!--.dots-container {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--  height: 100%;-->
<!--  width: 100%;-->
<!--  background-color: rgba(211, 211, 211, 0.5);-->
<!--  padding: 2rem;-->
<!--  border-radius: 10px;-->
<!--  gap: .5rem;-->
<!--}-->

<!--.dot {-->
<!--  height: 20px;-->
<!--  width: 20px;-->
<!--  margin-right: 10px;-->
<!--  border-radius: 10px;-->
<!--  background-color: #EA5B0C;-->
<!--  animation: pulse 1.5s infinite ease-in-out;-->
<!--}-->

<!--.dot:last-child {-->
<!--  margin-right: 0;-->
<!--}-->

<!--.dot:nth-child(1) {-->
<!--  animation-delay: -0.3s;-->
<!--}-->

<!--.dot:nth-child(2) {-->
<!--  animation-delay: -0.1s;-->
<!--}-->

<!--.dot:nth-child(3) {-->
<!--  animation-delay: 0.1s;-->
<!--}-->

<!--@keyframes pulse {-->
<!--  0% {-->
<!--    transform: scale(0.8);-->
<!--    background-color: #ffa77e;-->
<!--    box-shadow: 0 0 0 0 rgb(255, 167, 126);-->
<!--  }-->

<!--  50% {-->
<!--    transform: scale(1.2);-->
<!--    background-color: #FFA328;-->
<!--    box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);-->
<!--  }-->

<!--  100% {-->
<!--    transform: scale(0.8);-->
<!--    background-color: #EA5B0C;-->
<!--    box-shadow: 0 0 0 0 rgb(222, 140, 100);-->
<!--  }-->
<!--}-->
<!--</style>-->