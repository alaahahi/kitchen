const homePage = () =>import ( '../components/pages/homePage.vue')
const profilePage = () =>import ( '../components/pages/profile/profilePage.vue')
const characterYoufollowerPage = () =>import ( '../components/pages/profile/characterYoufollower.vue')
const myAdds = () =>import ( '../components/pages/profile/myAdds.vue')
const notficition = () =>import ( '../components/pages/profile/notficition.vue')
const login = () =>import ( '../components/pages/auth/login.vue')
const loginMagic = () =>import ( '../components/pages/auth/loginMagic.vue')
const email = () =>import ( '../components/pages/auth/email.vue')
const confirmRest = () =>import ( '../components/pages/auth/confirmRest.vue')
const erorr404 = () =>import ( '../components/pages/accessories/erorr404.vue')
const categories = () =>import ( '../components/pages/categories.vue')
const companyPage = () =>import ( '../components/pages/companyPage\.vue')
const characterPage = () =>import ( '../components/pages/characterPage.vue')
const searchPage = () =>import ( '../components/pages/searchPage.vue')
const companiesPage = () =>import ( '../components/pages/companiesPage.vue')
const addCompany = () =>import ('../components/company/addCompany.vue')
const addCharacter = () =>import ('../components/character/addCharacter.vue')
const allCharactours = () =>import ('../components/character/allCharactours.vue')
const allCharacterPage = () =>import ( '../components/pages/allCharacterPage.vue')
const allCompanyPage = () =>import ( '../components/pages/allCompanyPage.vue')
const requestToVerifyCompany = () =>import ('../components/company/requestToVerifyCompany.vue')
const requestToVerifyCharactour = () =>import ('../components/character/requestToVerifyCharactour.vue')
const discoverPage = () =>import ( '../components/pages/discoverPage.vue')
const categoriesPage = () =>import ( '../components/pages/categoriesPage.vue')
const advancedSearchPage = () =>import ( '../components/pages/advancedSearchPage.vue')
const subscriptions = () =>import ( '../components/pages/subscriptions.vue')
const seeMorePage = () =>import ( '../components/pages/seeMorePage.vue')
const seeMorePageInfo = () =>import ( '../components/pages/seeMorePageInfo.vue')
const companyDetailsPage = () =>import ( '../components/pages/companyDetailsPage.vue')
const characterProfile = () =>import ( '../components/pages/characterProfile.vue')
const Public = () =>import ( '../components/layouts/public.vue')
const profile = () =>import ( '../components/layouts/profile.vue')
const Protected = () =>import ( '../components/layouts/protected.vue')
const register = () =>import ( '../components/pages/auth/register.vue')
const codePhone = () =>import ( '../components/pages/auth/codePhone.vue')
const resetPassword = () =>import ( '../components/pages/auth/resetPassword.vue')
const subscription = () =>import ( '../components/pages/subscription.vue')
const subscriptionPage = () =>import ( '../components/pages/profile/subscriptionPage.vue')
const success = () =>import ( '../components/pages/payment/success.vue')
const failed = () =>import ( '../components/pages/payment/failed.vue')
const aboutUs = () =>import ( '../components/pages/aboutUs.vue')
const feedback = () =>import ( '../components/pages/feedback.vue')
const advancedSearchCatPage = () =>import ( '../components/pages/advancedSearchCatPage.vue')
const advancedSearchCatSlug = () =>import ( '../components/pages/advancedSearchCatSlug.vue')
const advancedSearchCatSlugLatest = () =>import ( '../components/pages/advancedSearchCatSlugLatest.vue')
const advancedSearchCatSlugMostSearched = () =>import ( '../components/pages/advancedSearchCatSlugMostSearched.vue')
const advancedSearchCatSlugMostVisited = () =>import ( '../components/pages/advancedSearchCatSlugMostVisited.vue')



export default [
    {
        path: "/User",
        component: Public,
        children: [


          {
            path: "/email",
            component: email,
            name:"email",
          },

          {
            
            path: "/code=:email",
            component: codePhone,
            meta: {
              guest: true,
          }
          },
          {
            path: "/resetPassword",
            component: resetPassword,
            name: 'resetPassword',
       },
        ],
      },
      {
        path: "/myProfile",
        component: profile,
        children: [
          {
            path: "/profile",
            component: profilePage,
            name: 'profile',
            meta: {
                requiresAuth: true
            }
          },
          {
            path: '/mySubscription',
            component: subscriptionPage,
            name: 'subscriptionPage',
            meta: {
                requiresAuth: true
            }
            },
            {
            path: '/characterYoufollowerPage',
            component: characterYoufollowerPage,
            name: 'characterYoufollowerPage',
            meta: {
                requiresAuth: true
            }
            },
            {
              path: '/myAdds',
              component: myAdds,
              name: 'myAdds',
              meta: {
                  requiresAuth: true
              }
              },
              {
                path: '/notficition',
                component: notficition,
                name: 'notficition',
                meta: {
                    requiresAuth: true
                }
                }
        ],
      },
      {
        path: '/auth/:provide/callback',
        component: {
          template: '<div class="auth-component"></div>'
        }
      },
      {
        path: "/",
        component: Protected,
        children: [
          {
            path:encodeURI('تسجيل-الدخول'),
            component: register,
            name:"login",
            meta: {
              guest: true,
          }
          },
              {
                path:encodeURI('التسجيل'),
                component: register ,
                name:"register",
                meta: {
                  guest: true,
              }
            },
            {
              path: "/confirmRest",
              component: confirmRest,
              name:"confirmRest",
              meta: {
                guest: false,
            }
            },
            {
                path: '/',
                component: homePage,
                name: '/',
                meta: {
                    guest: false,
                    //requiresAuth: true   //requiresAuth: true encodeURI('الرئيسية'),
                }
            },
            {
                path: '/discover',
                component: discoverPage,
                name: 'discover',
                meta: {
                    guest: false,
                }
            },
            {
              path: '/categories',
              component: categoriesPage,
              name: 'categories',
              meta: {
                  guest: false,
              }
          },
          {
            path: encodeURI('البحث-المتقدم'),
            component: advancedSearchPage,
            name: 'advancedSearchPage',
            meta: {
                guest: false,
            }
          },
          {
            path:  encodeURI('شخصيات')+'/:id'+'/:type',
            component: seeMorePage,
            name: 'seeMorePage',
            meta: {
                guest: false,
            }
          },
          {
            path:  encodeURI('شركات')+'/:id'+'/:type',
            component: seeMorePageInfo,
            name: 'seeMorePageInfo',
            meta: {
                guest: false,
            }
          },
          {
            path: '/company_category/:slug/',
            component: categories,
            name: 'company_category',
            meta: {
                guest: false
            }
            },
            {
              path: '/people_category/:slug/',
              component: categories,
              name: 'people_category',
              meta: {
                  guest: false
              }
              },
            {
                path: '/companiesGuide',
                component: companyPage,
                name: 'companiesGuide',
                meta: {
                    guest: false
            }
            },
            {
              path: '/charactersGuide',
              component: characterPage,
              name: 'charactersGuide',
              meta: {
                  guest: false
              }
          },
          {
            path:  encodeURI('جميع-الشخصيات'),
            component: allCharacterPage,
            name: 'allCharacterPage',
            meta: {
                guest: false
            }
        },
        {
          path: '/subscriptions',
          component: subscriptions,
          name: 'subscriptions',
          meta: {
            guest: false
         }
        },
        {
          path:  encodeURI('جميع-الشركات'),
          component: allCompanyPage,
          name: 'allCompanyPage',
          meta: {
              guest: false
          }
      },
          {
            path: '/allCharactours',
            component: allCharactours,
            name: 'allCharactours',
            meta: {
                guest: false
            }
        },
            {
              path: '/companies=:type',
              component: companiesPage,
              name: 'companiesPage',
              meta: {
                  guest: false
              }
          },
            //{path:  encodeURI('الشركات')+'/'+decodeURI(':id'), component: companyDetailsPage,name: 'companyDetail',meta: {guest: false}},
            {
              path: '/addCompany',
              component: addCompany,
              name: 'addCompany',
              meta: {
                requiresAuth: true
            }
            },
  
            {
              path: '/requestToVerifyCompany'+'/:id'+'/:name',
              component: requestToVerifyCompany,
              name: 'requestToVerifyCompany',
              meta: {
                requiresAuth: true
            }
            },
            //{path:  encodeURI('الشخصيات')+'/:id',component: characterProfile,name: 'characterProfile',meta: {guest: false}},
            {
              path: '/addCharacter',
              component: addCharacter,
              name: 'addCharacter',
              meta: {
                requiresAuth: true
            }
            },
            {
              path: '/requestToVerifyCharactour'+'/:id'+'/:name',
              component: requestToVerifyCharactour,
              name: 'requestToVerifyCharactour',
              meta: {
                requiresAuth: true
            }
            },
            {
                path: '/subscription',
                component: subscription,
                name: 'subscription',
                meta: {
                    guest: false
                }
            },
            {
              path: '/search',
              component: searchPage,
              name: 'search',
              meta: {
                  guest: false
              }
          },
          
          {
            path: encodeURI('عن-من-هم'),
            component: aboutUs,
            name: 'aboutUs',
            meta: {
                guest: false
            }
          },
          {
            path: encodeURI('شكاوى-وملاحظات'),
            component:feedback,
            name: 'feedback',
            meta: {
                guest: false
            }
          },
          {
            path: "/success",
            component: success,
          },
          {
            path: "/failed",
            component: failed,
          },
            {
              path: "/loginMagic",
              component: loginMagic,
            },
            {path: '/sy',component: homePage,meta: { code: 'sy' }},
            {path: '/ae',component: homePage,meta: { code: 'ae' }},
            {path: '/sa',component: homePage,meta: { code: 'sa' }},
            {path: '/eg',component: homePage,meta: { code: 'eg' }},
            {path: '/iq',component: homePage,meta: { code: 'iq' }},
            {path: '/bh',component: homePage,meta: { code: 'bh' }},
            {path: '/om',component: homePage,meta: { code: 'om' }},
            {path: '/qa',component: homePage,meta: { code: 'qa' }},
            {path: '/kw',component: homePage,meta: { code: 'kw' }},
            {path: '/lb',component: homePage,meta: { code: 'lb' }},
            {path: '/ly',component: homePage,meta: { code: 'ly' }},
            {path: '/:slug/',component: categories,meta: {guest: false}},

            {path: '/all/:slug/',component: advancedSearchCatSlug,meta: {guest: false}},
            {path: '/search/:slug/',component: advancedSearchCatPage,meta: {guest: false}},

            {path: '/latest/:slug/',component: advancedSearchCatSlugLatest,meta: {guest: false}},

            {path: '/searched/:slug/',component: advancedSearchCatSlugMostSearched,meta: {guest: false}},

            {path: '/visited/:slug/',component: advancedSearchCatSlugMostVisited,meta: {guest: false}},

            { path: '/not-found',  name: 'page404',component:erorr404 },   
            { path: '*',  redirect: '/not-found' },   
        ],
        
      },
]