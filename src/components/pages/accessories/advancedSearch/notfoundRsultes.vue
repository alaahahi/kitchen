<template>
                        <div v-if="show">
                        <div class="row text-center" style="z-index:75;padding: 0  0.8rem;">
                            <div class="dyn-height  rounded-btn mt-2 py-3">
                                <div class="m-auto pb-2">
                                    <img class="logo-kitchen px-2  rounded-btn-img" src="/web-asset/img/noResult.jpg"
                                        alt="no Result" />
                                    <img class="px-2 rounded-btn-img" src="/web-asset/img/noResult.jpg" alt="no Result" />
                                    <img class="logo-kitchen px-2 rounded-btn-img" src="/web-asset/img/noResult.jpg"
                                        alt="no Result" />
                                </div>
                                <h2 class="fw-bold">نأسف لعدم العثور على طلبك</h2>
                                <h5 class="text-black-80 py-2">نقترح عليك البحث عن اسم الشخصية بشكل دقيق
                                    <br>
                                    وإعادة التعيين مرة أخرى
                                </h5>
                                <div>
                                    <button v-if="false" class="btn btn-primary px-4 fw-bold">إعادة
                                        الضبط</button>
                                </div>
                            </div>
                        </div>
                    </div>
</template>

<script>
export default {
props:['show']
}
</script>