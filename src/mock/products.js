var json = {
    id: 123456,
    img_url: "static/shops/logo_01.png",
    title: "华莱士(中南七星店)",
    score: 4.7,
    onoff: false,
    sales: 1272,
    start_price: 20,
    transport_price: 5,
    average_time: 20,
    average_price: 20,
    distance: 200,
    tag: '炸鸡炸串',
    offer: {
        sd: {
            status: true,
            title: "首单",
            text: "新用户下单立减14"
        },
        mj: {
            status: true,
            title: "满减",
            text: "满25减12，满40减18，满65减25"
        },
        vip: {
            status: true,
            title: "会员",
            text: "超级会员领取6元无门槛红包"
        },
        tj: {
            status: true,
            title: "特价",
            text: "特价商品2元起"
        },
        zp: {
            status: true,
            title: "满赠",
            text: "满40元送冰镇小鲜榨1份"
        },
        hb: {
            status: true,
            title: "红包",
            text: "下单反4元红包"
        }
    },
    show_offer: false,
    products_class: [
        {
            title: '热销',
            iconUrl: '',
            introduction: '大家喜欢吃才叫真好吃。',
            products: [
                {
                    name: '皮蛋瘦肉粥',
                    introduction: '皮蛋瘦肉粥是一种营养丰富的粥品皮蛋瘦肉粥是一种营养丰富的粥品皮蛋瘦肉粥是一种营养丰富的粥品皮蛋瘦肉粥是一种营养丰富的粥品皮蛋瘦肉粥是一种营养丰富的粥品皮蛋瘦肉粥是一种营养丰富的粥品皮蛋瘦肉粥是一种营养丰富的粥品',
                    price: [{
                        name: '',
                        price: 15.8
                    }],
                    sale_month: 1021,
                    like_: 0.98,
                    imgUrl: '/static/products/product-01.png',
                    product_id: '001',
                    is_new: false,
                    is_recommend: false,
                    is_sign: true,
                    is_discount: true,
                    discount: 6,
                    real_price: 9.5
                },
                {
                    name: '蒸饺',
                    introduction: '含醋包辣椒包(8个装)',
                    price: [{
                        name: '小份(8个)',
                        price: 13.8
                    }, {
                        name: '大份(16个)',
                        price: 26
                    }],
                    sale_month: 1021,
                    like_: 0.98,
                    imgUrl: '/static/products/product-02.png',
                    product_id: '002',
                    is_new: false,
                    is_recommend: true,
                    is_sign: false,
                    is_discount: false,
                    discount: 1,
                    real_price:'',
                },
                {
                    name: '养胃小米粥',
                    introduction: '小米即粟米，能开肠胃、补肾虚、益丹田，小米即粟米，能开肠胃、补肾虚、益丹田小米即粟米，能开肠胃、补肾虚、益丹田小米即粟米，能开肠胃、补肾虚、益丹田小米即粟米，能开肠胃、补肾虚、益丹田小米即粟米，能开肠胃、补肾虚、益丹田',
                    price: [{
                        name: '',
                        price: 16.8
                    }],
                    sale_month: 1021,
                    like_: 0.98,
                    imgUrl: '/static/products/product-03.png',
                    product_id: '003',
                    is_new: true,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: false,
                    discount: 1,
                    real_price:'',
                }
            ]
        },
        {
            title: '优惠',
            iconUrl: '',
            introduction: '折扣区 不享受满减。',
            products: [
                {
                    name: '青菜香菇瘦肉粥',
                    introduction: '青菜香菇瘦肉粥有很多做法 我们选用青菜香菇瘦肉粥有很多做法 我们选用青菜香菇瘦肉粥有很多做法 我们选用青菜香菇瘦肉粥有很多做法 我们选用青菜香菇瘦肉粥有很多做法 我们选用青菜香菇瘦肉粥有很多做法 我们选用青菜香菇瘦肉粥有很多做法 我们选用',
                    price: [{
                        name: '',
                        price: 16.9
                    }],
                    sale_month: 34,
                    like_: 0.98,
                    imgUrl: '/static/products/product-04.png',
                    product_id: '004',
                    is_new: false,
                    is_recommend: false,
                    is_sign: true,
                    is_discount: true,
                    discount: 5.9,
                    real_price:9.9,
                },
                {
                    name: '玉米胡萝卜香菇粥',
                    introduction: '玉米 胡萝卜 香菇都是非常有益的食材玉米 胡萝卜 香菇都是非常有益的食材玉米 胡萝卜 香菇都是非常有益的食材玉米 胡萝卜 香菇都是非常有益的食材',
                    price: [{
                        name: '',
                        price: 15.9
                    }],
                    sale_month: 34,
                    like_: 0.98,
                    imgUrl: '/static/products/product-05.png',
                    product_id: '005',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: true,
                    discount: 6.2,
                    real_price:9.9,
                },
                {
                    name: '清火银耳汤',
                    introduction: '大份',
                    price: [{
                        name: '',
                        price: 15.9
                    }],
                    sale_month: 1021,
                    like_: 0.98,
                    imgUrl: '/static/products/product-06.png',
                    product_id: '006',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: true,
                    discount: 6.2,
                    real_price:9.9,
                },
                {
                    name: '八宝粥',
                    introduction: '大份',
                    price: [{
                        name: '',
                        price: 15.9
                    }],
                    sale_month: 8,
                    like_: 0.98,
                    imgUrl: '/static/products/product-07.png',
                    product_id: '007',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: true,
                    discount: 6.2,
                    real_price:9.9,
                }
            ]
        },
        {
            title: '港式点心',
            iconUrl: '',
            introduction: '',
            products: [
                {
                    name: '港式烧麦',
                    introduction: '2个每份',
                    price: [{
                        name: '',
                        price: 13
                    }],
                    sale_month: 27,
                    like_: 0,
                    imgUrl: '/static/products/product-08.png',
                    product_id: '008',
                    is_new: true,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: true,
                    discount: 5,
                    real_price:6.5,
                },
                {
                    name: '港式叉烧包',
                    introduction: '3个/份',
                    price: [{
                        name: '',
                        price: 13
                    }],
                    sale_month: 53,
                    like_: 1,
                    imgUrl: '/static/products/product-09.png',
                    product_id: '009',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: false,
                    discount: '',
                    real_price:'',
                },
                {
                    name: '蒸 椰汁黄金糕',
                    introduction: '4个/份',
                    price: [{
                        name: '',
                        price: 13
                    }],
                    sale_month: 1021,
                    like_: 0.98,
                    imgUrl: '/static/products/product-10.png',
                    product_id: '010',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: false,
                    discount: '',
                    real_price:'',
                },
                {
                    name: '港式紫薯包',
                    introduction: '3个/份',
                    price: [{
                        name: '',
                        price: 13
                    }],
                    sale_month: 15,
                    like_: 0.98,
                    imgUrl: '/static/products/product-11.png',
                    product_id: '011',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: false,
                    discount: '',
                    real_price:'',
                }
            ]
        },
        {
            title: '夏季新品',
            iconUrl: '',
            introduction: '',
            products: [
                {
                    name: '糖水红豆粥(甜)',
                    introduction: '主要原料：大米 红豆',
                    price: [{
                        name: '',
                        price: 15.9
                    }],
                    sale_month: 59,
                    like_: 1,
                    imgUrl: '/static/products/product-12.png',
                    product_id: '012',
                    is_new: true,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: false,
                    discount: '',
                    real_price:'',
                },
                {
                    name: '青菜瘦肉粥',
                    introduction: '',
                    price: [{
                        name: '',
                        price: 15.9
                    }],
                    sale_month: 57,
                    like_: 1,
                    imgUrl: '/static/products/product-13.png',
                    product_id: '013',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: false,
                    discount: '',
                    real_price:'',
                },
                {
                    name: '港式叉烧包',
                    introduction: '3个/份',
                    price: [{
                        name: '',
                        price: 13
                    }],
                    sale_month: 53,
                    like_: 0.98,
                    imgUrl: '/static/products/product-14.png',
                    product_id: '014',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: false,
                    discount: '',
                    real_price:'',
                },
                {
                    name: '蒸 香菇肉馅饺',
                    introduction: '现包现蒸 特色水晶开口笑水晶饺子 每份15个',
                    price: [{
                        name: '',
                        price: 13.9
                    }],
                    sale_month: 49,
                    like_: 1,
                    imgUrl: '/static/products/product-15.png',
                    product_id: '015',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: false,
                    discount: '',
                    real_price:'',
                }
            ]
        },
        {
            title: '折扣套餐',
            iconUrl: '',
            introduction: '折扣区 不享受满减。',
            products: [
                {
                    name: '糖水红豆粥+奶黄包+榨菜',
                    introduction: '',
                    price: [{
                        name: '',
                        price: 35
                    }],
                    sale_month: 7,
                    like_: 0.98,
                    imgUrl: '/static/products/product-16.png',
                    product_id: '016',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: true,
                    discount: 4.8,
                    real_price:16.8,
                },
                {
                    name: '糖水红豆粥+紫薯包+榨菜',
                    introduction: '',
                    price: [{
                        name: '',
                        price: 35
                    }],
                    sale_month: 6,
                    like_: 0.98,
                    imgUrl: '/static/products/product-17.png',
                    product_id: '017',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: true,
                    discount: 4.8,
                    real_price:16.8,
                },
                {
                    name: '皮蛋瘦肉粥+港式叉烧包+榨菜',
                    introduction: '',
                    price: [{
                        name: '',
                        price: 40.8
                    }],
                    sale_month: 17,
                    like_: 0.98,
                    imgUrl: '/static/products/product-18.png',
                    product_id: '018',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: true,
                    discount: 4.1,
                    real_price:16.8,
                },
                {
                    name: '皮蛋瘦肉粥+蒸玉米肉馅饺+榨菜',
                    introduction: '',
                    price: [{
                        name: '',
                        price: 47
                    }],
                    sale_month: 6,
                    like_: 0.98,
                    imgUrl: '/static/products/product-19.png',
                    product_id: '019',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: false,
                    discount: '',
                    real_price: '',
                }
            ]
        },
        {
            title: '煲仔粥',
            iconUrl: '',
            introduction: '',
            products: [
                {
                    name: '皮蛋+青菜粥',
                    introduction: '',
                    price: [{
                        name: '',
                        price: 15.9
                    }],
                    sale_month: 17,
                    like_: 1,
                    imgUrl: '/static/products/product-20.png',
                    product_id: '020',
                    is_new: true,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: false,
                    discount: '',
                    real_price:'',
                },
                {
                    name: '青菜瘦肉粥',
                    introduction: '',
                    price: [{
                        name: '',
                        price: 15.9
                    }],
                    sale_month: 57,
                    like_: 1,
                    imgUrl: '/static/products/product-21.png',
                    product_id: '021',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: false,
                    discount: '',
                    real_price:'',
                },
                {
                    name: '玉米胡萝卜香菇粥',
                    introduction: '玉米 胡萝卜 香菇都是非常有益的食材玉米 胡萝卜 香菇都是非常有益的食材玉米 胡萝卜 香菇都是非常有益的食材玉米 胡萝卜 香菇都是非常有益的食材',
                    price: [{
                        name: '',
                        price: 15.9
                    }],
                    sale_month: 53,
                    like_: 0.98,
                    imgUrl: '/static/products/product-22.png',
                    product_id: '022',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: true,
                    discount:  6.2,
                    real_price: 9.9,
                },
                {
                    name: '小虾米瘦肉粥',
                    introduction: '小虾米瘦肉粥，营养极为丰富',
                    price: [{
                        name: '',
                        price: 15.9
                    }],
                    sale_month: 49,
                    like_: 1,
                    imgUrl: '/static/products/product-23.png',
                    product_id: '023',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: false,
                    discount: '',
                    real_price:'',
                }
            ]
        },{
            title: '中国风',
            iconUrl: '',
            introduction: '',
            products: [
                {
                    name: '香菇素菜包4个',
                    introduction: '',
                    price: [{
                        name: '',
                        price: 13.9
                    }],
                    sale_month: 17,
                    like_: 1,
                    imgUrl: '/static/products/product-24.png',
                    product_id: '024',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: false,
                    discount: '',
                    real_price:'',
                },
                {
                    name: '葱油花卷4个',
                    introduction: '',
                    price: [{
                        name: '',
                        price: 13.9
                    }],
                    sale_month: 18,
                    like_: 1,
                    imgUrl: '/static/products/product-25.png',
                    product_id: '025',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: false,
                    discount: '',
                    real_price:'',
                },
                {
                    name: '红糖开花馒头',
                    introduction: '每份3个',
                    price: [{
                        name: '',
                        price: 13.9
                    }],
                    sale_month: 53,
                    like_: 0.98,
                    imgUrl: '/static/products/product-26.png',
                    product_id: '026',
                    is_new: false,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: false,
                    discount:  '',
                    real_price: '',
                },
                {
                    name: '奶香小馒头',
                    introduction: '每份6个',
                    price: [{
                        name: '',
                        price: 13.9
                    }],
                    sale_month: 49,
                    like_: 1,
                    imgUrl: '/static/products/product-23.png',
                    product_id: '023',
                    is_new: true,
                    is_recommend: false,
                    is_sign: false,
                    is_discount: false,
                    discount: '',
                    real_price:'',
                }
            ]
        }
    ]
}
/* 2018-06-19 商品 4 5 6 7 8 mock数据未完成 */

export default json
