<template>
    <div>
        <div style="background-image: url('web-asset/img/path104.png')">
            <div style="background-color: rgb(255 255 255 / 80%);">
                <div :class="{ 'w-100 h-100 bg-white position-fixed': loading}" style="margin-top: -13px;z-index:1 ;">
                    <div class="position-absolute top-50 start-50  bg-white"
                        :class="{ 'spinner-border text-primary spinner-border-xl': loading}"></div>
                </div>
                <breadcrumb :data=breadcrumbLsit />
                <h3 class="text-center fw-bold py-2">{{categoryName}}</h3>
            </div>
        </div>
        <div class="container" ref="charactour" v-if="!checkAllCharactour()">
            <h4 class="text-gray-60  text-center" v-if="checkAllCharactour()">لايوجد شخصيات في هذا التصنيف</h4>
            <div class="row">
                <div v-for="(charactour,index) in allCharactour" :key=index class="col-xl-3 col-md-4 col-sm-6 col-12 mt-4"
                    style="min-height: 353px;">
                    <a  :href="'/شخصيات/'+decodeURI(charactour.slug)+'/'"
                        class="card  position-relative bg-category h-100">
                        <img v-if="!charactour.image" class=" rounded-btn-img w-100" src="/web-asset/img/noResul.png" alt="charactour image">
                        <img v-if="charactour.image" class=" rounded-btn-img w-100" 
                              alt="carousel"
                            :src=charactour.image
                           >
                        <div class="card-body text-end position-absolute bottom-0 end-0 text-white">
                            <h2 class="card-title fs-5 fw-bold">{{charactour.character_name_ar}}</h2>
                            <h5 class="text-decoration-none fs-5 text-white " v-if="charactour.content">{{(charactour.content)|
                            truncate(30,'..')}}</h5>
                        </div>
                    </a>
                </div>
            </div>
            <div class="d-flex justify-content-center text-center w-auto mx-auto my-4" v-if="!checkAllCharactour()">
                <button @click="getAllCharactour(prev_char-24)" class="btn btn-primary py-2 mx-2"
                :class="(!prev_char || prev_char=='0')?'disabled':''"><i class="fa-solid fa-arrow-right mx-2"></i> السابق </button>
                <button @click="getAllCharactour(next_char)" class="btn btn-primary py-2 mx-2"
                :class="allCharactour.length <= 23 ?'disabled':''">التالي<i class="fa-solid fa-arrow-left mx-2"></i> </button>
            </div>
        </div>
        <div class="container"  ref="companies" v-if="!checkAllCompany()">
            <h4 class="text-gray-60  text-center" v-if="checkAllCompany()">لايوجد مؤسسات في هذا التصنيف</h4>
            <div class="row">
                <div v-for="(company,index) in companies" :key=index class="col-xl-3 col-md-4 col-sm-6 col-12 mt-4" style="max-height:270px ;">
                    <a  :href="'/شركات/'+decodeURI(company.slug)+'/'"
                        class="card  position-relative bg-category h-100">
                        <img v-if="!company.image" src="/web-asset/img/company-logo.png" alt="company image"
                            style="overflow: auto; object-fit: none;">
                            <img v-if="company.image" class=" rounded-btn-img w-100" 
                             alt="carousel"
                            :src=company.image
                            style="overflow: auto; object-fit: none;">
               
                        <div class="card-body text-end position-absolute bottom-0 end-0 text-white">
                            <h2 class="card-title fs-5 fw-bold">{{company.nameAR}}</h2>

                        </div>
                    </a>
                </div>
                
            </div>
            <div class="d-flex justify-content-center text-center w-auto mx-auto my-4" v-if="!checkAllCompany()">
                <button @click="getCompanies(prev_company-24)" class="btn btn-primary py-2 mx-2"
                    :class="(!prev_company || prev_company=='0')?'disabled':''"><i class="fa-solid fa-arrow-right mx-2"></i> السابق </button>
                <button @click="getCompanies(next_company)" class="btn btn-primary py-2 mx-2"
                :class="(!next_company || next_company==0)  || companies.length <= 23 ?'disabled':''">التالي<i class="fa-solid fa-arrow-left mx-2"></i> </button>
            </div>
        </div>
        
        <div>
        </div>
    </div>
</template>
<script>
import discover from '../home/discover.vue'
import breadcrumb from './accessories/breadcrumb.vue'
export default {
    components:
    {
        breadcrumb,
        discover,
    },
    data() {
        return {
            disabled: true,
            is_mounted: false,
            next_company: 0,
            prev_company: 0,
            next_char: 0,
            prev_char: 0,
            allCharactour: [],
            categorys: [],
            categorysSelected: [],
            morec: 0,
            disabledSelected: true,
            loading: true,
            loadingMore: false,
            loadingMorec: false,
            allcategory: {},
            allcategorySelected: {},
            disabled: true,
            categorys: [],
            categorysSelected: [],
            more: 0,
            disabledSelected: true,
            loadingMore: false,
            allcategory: {},
            allcategorySelected: {},
            country: 0,
            category: {},
            categoryName: "",
            nationality: "",
            countries: {},
            companies: [],
            charactours: {},
            allSubCategories: {},
            selectSubCategory: "",
            order: [],
            more: 0,
            vcompanies: true,
            vcharactours: true,
            'breadcrumbLsit': [],
            title: "يتم التحميل",
        }
    },
    metaInfo() {
        return {
            title: this.title
        }
    },
    methods: {
        goto(refName) {
        var element = this.$refs[refName];
        var top = element.offsetTop-50;
        window.scrollTo(0, top);
    },
        fixContent(value) {
            try {
                if (value) {
                    if (((value.split(".\r"))[0]).length > ((value.split(".<"))[0]).length) {
                        return (value.split(".<"))[0]
                    }
                    else return (value.split(".\r"))[0]
                }
            } catch (error) {
                return ''
            }
        },
        checkAllCharactour() {
            try {
                if (this.allCharactour.length) {
                    return false
                }
            } catch (error) {
                return true
            }
            return true
        },
        checkAllCharactourMore() {
            try {
                if (this.allCharactour.length > 9) {
                    return true
                }
            } catch (error) {
                return false
            }
            return false
        },
        checkAllCompany() {
            try {
                if (this.companies.length) {
                    return false
                }
            } catch (error) {
                return true
            }
            return true
        },
        checkAllCompanyMore() {
            try {
                if (this.companies.length > 9) {
                    return true
                }
            } catch (error) {
                return false
            }
            return false
        },
        fixContent(value) {
            try {
                if (value) {
                    return (value.split(".\r"))[0]
                }
            } catch (error) {
                return ''
            }
        },
        getCategories() {
            this.categoryName = this.$route.params.slug.replace(/-/g,' ')
            this.title = this.categoryName + ' | التصنيفات  | من هم؟ '
            this.breadcrumbLsit = [
                {
                    name: 'الرئيسية',
                    link: '/'
                },
                {
                    name: 'التصنيفات',
                    link: '/categories'
                },
                {
                    name:  this.categoryName,
                    link: '/' +this.$route.params.slug
                },
            ]

        },

        getAllCharactour(skip = 0) {
            this.allCharactour.forEach(element => {
                element.image = ""
            });
            this.loadingMore = true
            this.http.post('/charactour/filter_slug?skip='+skip+'&slug='+this.$route.params.slug)
                .then(async (response) => {
                    this.allCharactour = response.data.items
                    this.prev_char = skip
                    this.next_char = skip+24
                    this.loadingMore = false
                    this.loading = false
                    if(skip > 0){
                      this.goto('charactour')
                    }
                }).catch((error) => {
                        if (error) {
                          
                         console.log(error)
                        }
                    });
        },
        getCompanies(skip = 0) {
            this.companies.forEach(element => {
                element.image = ""
            });
            this.loadingMore = true
            this.http.post('/company/filter_slug?skip=' +skip+'&slug='+this.$route.params.slug)
                .then(async (response) => {
                    this.companies = response.data.items
                    this.prev_company =skip
                    this.next_company = skip+24
                    this.loadingMore = false
                    this.loading = false
                    if(skip > 0){
                    this.goto('companies')
                    }
                }).catch((error) => {
                        if (error) {
                          //  window.open('/not-found',"_self")
                        }
                    });
        },
    },
    filters: {
        formatPositions: function (value) {
            if (!value) return ''
            if (value) {
                try {
                    value = (JSON.parse(value)[0]).postion.trim().replace(/u([0-9A-F]{0,4})/g, '&#x$1')
                } catch (error) {
                    return ""
                }
                return value
            }
        },
        formatPositions: function (value) {
            if (!value) return ''
            if (value) {
                try {
                    value = (JSON.parse(value)[0]).postion.trim().replace(/u([0-9A-F]{0,4})/g, '&#x$1')
                } catch (error) {
                    return ""
                }
                return value
            }
        }
    },
    created() {

        this.getCategories();
        //  this.getCharactour()
        this.getCompanies()
        // this.getcountry();
        // this.getallSubCategories()
        this.getAllCharactour()
        // this.getCategory()
    }
};
</script>
<style>
.shados {
    box-shadow: 0px 0px 24px rgba(32, 33, 31, 0.06);
    border-radius: 12px;
}
.router-link-exact-active,.router-link-active{
    color:#212529 !important; 
}
.border {
    border-color: #F2F2F2 !important;

}

.p-c {
    top: 8px;
    right: 8px;
}
</style>


