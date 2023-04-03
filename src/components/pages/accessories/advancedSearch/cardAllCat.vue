<template>
    <div>
        <div class="container" ref="mainCategory">
            <div class="row">
                <div v-for="(category,index) in categorys" :key=index class="col-md-4 mt-4 p-3" style="height:auto;">
                    <router-link :to="'/search/'+category.slug+'/'"
                        class="card  position-relative bg-category h-100" style="min-height: 250px;">
                        <img v-if="!category.image" src="/web-asset/img/noResultC.png" alt="category image">
                        <img v-if="category.image" :src=category.image alt="category image">
                        <div class="card-body text-end position-absolute bottom-0 end-0 text-white">
                            <h2 class="card-title  fw-bold fs-4">{{category.name}}</h2>
                            <p class="text-decoration-none text-white fs-5">{{category.description}}</p>
                        </div>
                    </router-link>
                </div>
                <div>
                <div class="d-flex justify-content-center text-center w-auto mx-auto my-4">
                    <button @click="getCategory(next)" class="btn btn-primary py-2 mx-2 fw-bold"
                    :class="categorys.length <= 23 ?'disabled':''">
                    عرض المزيد
                    <svg class="mx-2" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 0C2.23325 0 2.625 0.391751 2.625 0.875V2.7136C3.73633 1.57928 5.28546 0.875 7 0.875C9.66823 0.875 11.9358 2.58066 12.7762 4.95841C12.9373 5.41404 12.6985 5.91394 12.2429 6.07498C11.7872 6.23603 11.2873 5.99722 11.1263 5.54159C10.5253 3.84117 8.90354 2.625 7 2.625C5.56943 2.625 4.29803 3.31189 3.49943 4.375H6.125C6.60825 4.375 7 4.76675 7 5.25C7 5.73325 6.60825 6.125 6.125 6.125H1.75C1.26675 6.125 0.875 5.73325 0.875 5.25V0.875C0.875 0.391751 1.26675 0 1.75 0ZM1.75714 7.92502C2.21277 7.76397 2.71268 8.00278 2.87372 8.45841C3.47473 10.1588 5.09646 11.375 7 11.375C8.43057 11.375 9.70197 10.6881 10.5006 9.625L7.875 9.625C7.39175 9.625 7 9.23325 7 8.75C7 8.26675 7.39175 7.875 7.875 7.875H12.25C12.4821 7.875 12.7046 7.96719 12.8687 8.13128C13.0328 8.29537 13.125 8.51793 13.125 8.75V13.125C13.125 13.6082 12.7333 14 12.25 14C11.7668 14 11.375 13.6082 11.375 13.125V11.2864C10.2637 12.4207 8.71455 13.125 7 13.125C4.33177 13.125 2.06417 11.4193 1.22375 9.04159C1.06271 8.58596 1.30152 8.08606 1.75714 7.92502Z" fill="white"/>
                    </svg>
                </button>
                </div>
            </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    export default {
    props:['resultsCompany']  ,
     data() {
        return {
            next: 0,
            prev: 0,
            is_mounted:false,
            disabled: true,
            categorys: [],
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
    created() {
        this.getCategory()
    }

    }
 
    </script>