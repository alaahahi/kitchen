<template>
    <div>
        <div class="row" v-if="categories">
            <div class="mb-3 mt-1" v-if="categories.most_visited_categories">
                        
                            <h2 class="fw-bold float-end fs-3 most-visited-text mx-3 j-font-size">التصنيفات الأكثر زيارة
                            </h2>
                            <cardCatSlide :categorys="categories.most_visited_categories" />
                           
            </div>
            <div class="mb-3 mt-5" v-if="categories.last_characters_created_country.total_characters ">
                      
                            <h2 class="fw-bold float-end fs-3 most-visited-text mx-3 j-font-size">أحدث الإضافات
                                <span class="text-gray-80 fs-4 j-font-size">({{ categories.last_characters_created_country.total_characters }})</span>
                            </h2>
                            <cardCharacterSlideL :categorys="categories.last_characters_created_country.result" :count="categories.last_characters_created_country.total_characters"/>
            </div>
            <div class="mb-3 mt-5" v-if="categories.most_visited_that_belongs_to_category.total_characters ">
               
                            <h2 class="fw-bold float-end fs-3 most-visited-text mx-3 j-font-size">الأكثر زيارة خلال اليومين الماضيين
                                <span class="text-gray-80 j-font-size">({{ categories.most_visited_that_belongs_to_category.total_characters }})</span>
                            </h2>
                            <cardCharacterSlideV :categorys="categories.most_visited_that_belongs_to_category.result" :count="categories.most_visited_that_belongs_to_category.total_characters"/>
            </div>
            <div class="mb-3 mt-5" v-if="categories.most_search_with_category.total_characters ">
                    
                            <h2 class="fw-bold float-end fs-3 most-visited-text mx-3 j-font-size">الأكثر شهرة
                                <span class="text-gray-80 fs-4 j-font-size">({{ categories.most_search_with_category.total_characters }})</span>
                            </h2>
                            <cardCharacterSlideS :categorys="categories.most_search_with_category.result" :count="categories.most_search_with_category.total_characters"/>
            </div>
            <div class="mb-3 mt-5" v-if="categories.all_characters_with_categories.total_characters  ">
                       
                            <h2 class="fw-bold float-end fs-3 most-visited-text mx-3 j-font-size">كل الشخصيات
                                <span class="text-gray-80 fs-4 j-font-size">({{ categories.all_characters_with_categories.total_characters }})</span>
                            </h2>
                            <cardCharacterSlide :categorys="categories.all_characters_with_categories.result" :count="categories.all_characters_with_categories.total_characters"/>
            </div>
        </div>
    </div>
    </template>
    
    <script>

    import cardCatSlide from './cardCatSlide.vue'
    import cardCharacterSlide from './cardCharacterSlide.vue'
    import cardCharacterSlideV from './cardCharacterSlideV.vue'
    import cardCharacterSlideS from './cardCharacterSlideS.vue'
    import cardCharacterSlideL from './cardCharacterSlideL.vue'

    


    export default {
    components:{cardCatSlide,cardCharacterSlide,cardCharacterSlideV,cardCharacterSlideS,cardCharacterSlideL},
    props:[ 'categories'],
     data() {
        return {
            next: 0,
            prev: 0,
            is_mounted:false,
            disabled: true,
            category: [],
            categorysSelected: [],
            more: 8,
            moreSelected: 8,
            disabledSelected: true,
            loadingMore: false,
            loadingMoreSelected: false,
            allcategory: {},
            allcategorySelected: {},
            hooperSettings: {
            touchDrag: true,
            itemsToSlide:1,
            rtl:true,
            mouseDrag:false,
            wheelControl:false,

            itemsToShow: 1,
            breakpoints: {
            400: {
                centerMode: false,
                itemsToShow: 2
            },
            767: {
                centerMode: false,
                itemsToShow: 3
            },
            1000: {
                itemsToShow: 4,
            }
            }
        },
        }
    },
    methods:{
        getCategory(skip = 0) {
            this.http.get('/categories?type=character&skip=' + skip)
                .then(async (response) => {
                    this.category = response.data.items
                    this.prev = skip
                    this.next = skip +24
                    try {
                        
                    } catch (error) {
                        
                    }
                })
        },
    },
    
    created() {
        this.getCategory()
        // console.log('cat',this.categories.last_characters_created_country)
    }

    }
 
    </script>
    
<style scoped>

/* @media screen and (max-width: 340px) {
    .j-font-size{
        margin-left:0 !important;
        margin-right:0 !important; 
        font-size: 1.5rem !important;
    }
} */   
</style>

