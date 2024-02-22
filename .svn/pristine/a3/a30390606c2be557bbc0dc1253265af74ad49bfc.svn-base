<template>
<div id="carouselExampleIndicators" ref="mainSlide" class="carousel slide main-slide" data-bs-ride="carousel" data-interval="false">
    <ol class="carousel-indicators">
        <li v-for="item in SlideCount" :key="item" data-target="#carouselExampleIndicators" :data-slide-to="item-1" @click="ChangeCurrentSlide(item-1)" :class="{active: item == 1}" class="slide-csbt"></li>
    </ol>
    <div class="carousel-inner">
        <div class="carousel-item" v-for="item in SlideCount" :key="item" :class="{active:item==1}">
            <img src="../assets/20191012155749_1967.jpg" class="d-block w-100" alt="...">
        </div>
    </div>
    <button class="carousel-control-prev custom-button" @click="{if(currentSlide>0) ChangeCurrentSlide(currentSlide-1); else ChangeCurrentSlide(SlideCount-1);}" type="button" data-target="#carouselExampleIndicators" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </button>
    <button class="carousel-control-next custom-button" @click="{if(currentSlide < SlideCount-1) ChangeCurrentSlide(currentSlide+1); else ChangeCurrentSlide(0);}" type="button" data-target="#carouselExampleIndicators" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </button>
</div>
</template>

<script>
export default {
    name: "my-slide",
    mounted() {
        if (this.SlideDatas) console.log(this.SlideCount = this.SlideDatas.length);
        else
            console.log('Data is null');
        const myCarousel = this.$refs.mainSlide;
        myCarousel.addEventListener('slide.bs.carousel', (event) => {
            console.log('OKOKOKOKOK');
            const slideIndex = event.to;
            console.log(`Slide index: ${slideIndex}`);
        });
    },
    data() {
        return {
            currentSlide: 0,
            SlideCount: 2,
            stepAble: true
        }
    },
    props: {
        SlideDatas: Object
    },
    methods: {
        ChangeCurrentSlide: function (id) {
            if (this.stepAble) {
                this.stepAble = false;
                this.currentSlide = id;
                setTimeout(() => {
                    this.stepAble = true;
                    this.$emit('ChangeSlide', this.currentSlide);
                }, 700);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.custom-button {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    opacity: 0;
    top: 50%;
    background-color: rgba(73, 5, 104, 0.973);
}

.slide-csbt {
    cursor: pointer;
}

.main-slide {
    height: 90%;
}

img {
    height: 80vh;
}

.main-slide:hover {
    .custom-button {
        opacity: 0.6;
        box-shadow: 0px 15px 20px rgba(216, 151, 253, 0.4);
        cursor: pointer;
    }
}
</style>
