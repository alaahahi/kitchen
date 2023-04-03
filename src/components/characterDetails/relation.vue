<template>

                            <div class="col-md-6 mt-2"  v-if='relation != "" && relation'>
                               <h2 class="fs-5 fw-bold" style="color: #20211F;"><img  class="rounded-btn-img   ms-2" :src=imgicon width="20px">{{title}} </h2>
                                <div class="my-2 text-end " v-for="rel in relation" :key=rel.id :class="wide ? 'py-2 blockquote lh-lg fs-5':''"  v-show="rel.startNode.slug != rel.endNode.slug">
                                    <div class="row" >
                                    <div class="col-3 g-0   pt-3" :class="wide ? 'd-none':''">
                                    <router-link   v-if="rel.endNode.slug" :to="{ name: 'companyDetail', params: { id:decodeURI(rel.endNode.slug)+'/'  }}">
                                    <img v-if="rel.endNode.image" class="w-85  rounded-btn-img  border" :src="rel.endNode.image" alt="Companylogo">
                                    </router-link>
                                    <img v-if="rel.endNode.image && !rel.endNode.slug" class="w-85  rounded-btn-img  border" :src="rel.endNode.image" alt="Companylogo">
                                    <img v-if="!rel.endNode.image" class="w-85 rounded-btn-img  border" :src="'/../web-asset/img/v2-image.png'"   alt="Companylogo">
                                    </div>
                                    <div class="g-0" :class="wide ? 'col-md-12':'col-9'">
                                    <div >
                                    <p class="py-2 fw-bold lh-lg fs-16 mb-0">{{rel.Propoerties.information ? rel.Propoerties.information  : rel.Propoerties.desc}}</p>

                                    <router-link   v-if="rel.endNode.slug" :to="{ name: 'companyDetail', params: { id:decodeURI(rel.endNode.slug)+'/'  }}"  class="text-decoration-none fs-6 fw-bold text-primary">{{rel.endNode.nameAR}}
                                    </router-link>
                                    <p class="fw-bold"><span v-if="rel.Propoerties.current_position != 1" >{{formatDate(rel.Propoerties.start_date)}}</span>
                                    <span v-if="rel.Propoerties.end_date && rel.Propoerties.end_date!='-'">حتى
                                        {{formatDate(rel.Propoerties.end_date)}}</span>
                                        <span>{{worktimeCul(rel.Propoerties.start_date,rel.Propoerties.end_date,rel.Propoerties.current_position)}}</span>
                                        </p>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
</template>

<script>
import moment from 'moment'
export default {
props:['relation','relationCompany','title','order','wide','imgicon','slug'],

 methods: {
                   formatDate(value) {
                    if (!value) return ''
                    if(value.length == 4){
                     return value
                    }
                    if (value) {
                    return moment(String(value)).locale('ar-ly').format(" D  MMMM , YYYY")
                }
                },
        
               fixrelationNameAR (value) {
                                         try {
                    if (!value) return ''
                    if (value) {
 
                           return value.nameAR

                    }
                        } catch (error) {
                           return '' 
                        }
                },
               
         fixrelationImage (value) {
                   try {
                     if (!value) return ''
                     if (value.image) return value.image
                        } 
                        catch (error) {
                           return '' 
                        }
                },
      fixrelationslug (value) {
                   try {
                     if (!value) return ''
                     if (value.slug && value.slug!=this.slug) return value.slug
                        } 
                        catch (error) {
                           return '' 
                        }
                         return false 
                },
      worktimeCul(start,end,title){
             try {
                     if (start){
                     if (!end && title == 1) return   start.replace(/\D/g,'').substring(0,4)+ ' حتى الآن '
                      return ''
                     }
                     if (start && end) return '('+ moment(end).diff(moment(start), 'year')  + ' سنوات' +')'
                        } 
                        catch (error) {
                           return '' 
                        }
                },
                 },
}
</script>

<style>

</style>