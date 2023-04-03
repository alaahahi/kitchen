<template>
    <div>
        <div class="container" ref="mainCategory">
            <div class="row">
                <div v-for="(category,index) in resultsCategory" :key=index class="col-md-4 mt-4 p-3" style="height:auto;">
                    <router-link :to="'/search/'+category.slug+'/'"
                        class="card  position-relative bg-category h-100">
                        <img v-if="!category.image" src="/web-asset/img/noResultC.png" alt="category image">
                        <img v-if="category.image" :src=category.image alt="category image">
                        <div class="card-body text-end position-absolute bottom-0 end-0 text-white">
                            <h2 class="card-title  fw-bold fs-4">{{category.name}}</h2>
                            <p class="text-decoration-none text-white fs-5">{{category.description}}</p>
                        </div>
                    </router-link>
                </div>
                <div>
            </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    export default {
    props:['resultsCategory'],
     data() {
        return {
            next: 0,
            prev: 0,
            is_mounted:false,
            disabled: true,
            categorys: [],
            // resultsCategory:[],
            categorysSelected: [],
            more: 8,
            moreSelected: 8,
            disabledSelected: true,
            loadingMore: false,
            loadingMoreSelected: false,
            allcategory: {},
            allcategorySelected: {},
        }
    },
    methods:{
        getCategory(skip = 0) {
            this.http.get('/categories?type=character&skip=' + skip)
                .then(async (response) => {
                    this.categorys = [...this.categorys, ...response.data.items ];
                    this.prev = skip
                    this.next = skip +24
                    this.categorysSelected=  this.categorys
                    try {
                        
                    } catch (error) {
                        
                    }
                })
        },
    },
    goto(refName) {
        var element = this.$refs[refName];
        var top = element.offsetTop - 50;
        window.scrollTo(0, top);
    },
    
    created() {
    }

    }
 
    </script>